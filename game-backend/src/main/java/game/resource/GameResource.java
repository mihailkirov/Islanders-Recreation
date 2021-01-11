package game.resource;

import game.models.mapBuilder.GameMap;
import game.models.mapBuilder.RandomMapBuilder;
import game.models.moves.Replay;
import game.serialization.MapsLoader;
import game.serialization.ReplaysLoader;
import io.swagger.annotations.Api;
import logging.GameLogger;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.HttpURLConnection;
import java.util.ArrayList;
import java.util.List;

@Singleton
@Path("game")
@Api(value = "game")
public class GameResource {

    private final MapsLoader mapsLoader;
    private final ReplaysLoader replaysLoader;
    private final GameLogger logger;

    @Inject
    public GameResource(final MapsLoader maps) {
        super();
        mapsLoader = maps;
        replaysLoader = new ReplaysLoader();
        logger = new GameLogger();
    }

    /**
     * An URI to send to the client the available map names
     */
    @GET
    @Path("/maps/names")
    @Produces(MediaType.APPLICATION_JSON)
    public List<String> getMapNames() {
        return new ArrayList<>(mapsLoader.getMaps().keySet());
    }

    /**
     * A route to get top 5 scores of a map
     * Returns a Map<Player_name,Score they made>
     *
     * @param map_name - the name of the map
     * @return the top scores for the given map name
     */
    @GET
    @Path("/maps/top_score/{map_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getScoresFromMap(@PathParam("map_id") final String map_name) {

        final GameMap chosen_one = mapsLoader.getMaps().get(map_name);
        if (chosen_one != null) {
            logger.logInfo("Request for scores for map: " + map_name);
            return Response.status(HttpURLConnection.HTTP_OK)
                    .entity(chosen_one.getFiveBestRes())
                    .build();
        } else {
            logger.logWarning("Request for scores of a non-existing map: " + map_name);
            throw new WebApplicationException(
                    Response.status(HttpURLConnection.HTTP_BAD_REQUEST)
                            .build());
        }
    }

    /**
     * A route to store a new score made by a player on a map
     *
     * @param map_n    the map in which the score was made
     * @param player_n the player who made the score
     * @param newScore the score
     */
    @PUT
    @Path("/maps/{map_id}/{player_id}/{score}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response storeScore(@PathParam("map_id") final String map_n, @PathParam("player_id") final String player_n,
                               @PathParam("score") final int newScore) {
        //Find the correct map and update its score
        final GameMap chosenMap = mapsLoader.getMaps().get(map_n);
        if (chosenMap == null) {
            logger.logWarning("Trying to store a score on non valid map");
            throw new WebApplicationException(
                    Response.status(HttpURLConnection.HTTP_BAD_REQUEST)
                            .build());
        } else {

            // Now that we've updated the score in the GameMap object we need to update it in the GameMap.json file
            // If and only if the new score is better

            if (mapsLoader.getMaps().get(map_n).getScores().get(player_n) == null) {
                logger.logInfo("New score of " + newScore + " saved on map - " + map_n + " for player - " + player_n);
                chosenMap.addScore(newScore, player_n);
                mapsLoader.addMap(chosenMap);
            } else {
                final int precedentScore = mapsLoader.getMaps().get(map_n).getScores().get(player_n);
                System.out.println("score precedent: " +    precedentScore);
                if (newScore >= precedentScore) {
                    logger.logInfo("New score of " + newScore + " saved on map - " + map_n + " for player - " + player_n);
                    chosenMap.addScore(newScore, player_n);
                    mapsLoader.addMap(chosenMap);
                }
            }
            return Response.status(HttpURLConnection.HTTP_OK)
                    .entity(chosenMap)
                    .build();
        }
    }

    /**
     * A route to generate and return new random map. The method endpoint not only returns the new map freshly created
     * but also stores it for future use
     *
     * @return the new generated map
     */
    @GET
    @Path("/maps/new")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getRandomNewMap() {
        final GameMap map = RandomMapBuilder.create().build();
        mapsLoader.addMap(map);
        logger.logInfo("Newly generated map with name " + map.getName());
        return Response.status(HttpURLConnection.HTTP_OK)
                .entity(map)
                .build();
    }

    /**
     * A route to get the map data from its name
     *
     * @param map_name - the name of the map
     * @return the corresponding map
     */

    @GET
    @Path("/maps/{map_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getMapFromName(@PathParam("map_id") final String map_name) {

        final GameMap map = mapsLoader.getMaps().get(map_name);
        if (map != null) {
            logger.logInfo("Valid request for map with name - " + map_name);
            return Response.status(HttpURLConnection.HTTP_OK).entity(map).build();
        } else {
            logger.logWarning("Invalid request for map with name - " + map_name);
            throw new WebApplicationException(
                    Response.status(HttpURLConnection.HTTP_BAD_REQUEST)
                            .build());
        }
    }

    /**
     * A route to get the replay of a player on a given map identified by its name
     * From the dB find the correct list of Moves == replays
     *
     * @param player_n - the player name
     * @param map_n    - the map name
     * @return the replay
     */
    @GET
    @Path("replay/{player_id}/{map_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getReplay(@PathParam("player_id") final String player_n, @PathParam("map_id") final String map_n) {


        final Replay rep = replaysLoader.getReplayFromFile(player_n, map_n);
        if (rep == null) {
            logger.logWarning("Couldn't get replay of " + player_n + "on " + map_n + " from file.");
            throw new WebApplicationException(
                    Response.status(HttpURLConnection.HTTP_BAD_REQUEST)
                            .build());
        } else {
            logger.logInfo(" replay of " + player_n + "on " + map_n + " send to player.");
            return Response.status(Response.Status.OK).entity(rep).build();
        }
    }

    /**
     * Route to get all map names where a player has done a replay
     *
     * @param player_n - the player name
     * @return a list with the names of all maps containing replays of the player
     */
    @GET
    @Path("replay/{player_id}/")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllReplaysOfPlayer(@PathParam("player_id") final String player_n) {
        final List<String> mapNames = new ArrayList<>();
        this.mapsLoader
                .getMaps()
                .keySet()
                .forEach(mapName -> {
                    if (replaysLoader.getReplayFromFile(player_n, mapName) != null) {
                        mapNames.add(mapName);
                    }
                });
        logger.logInfo("Replays for player - " + player_n);
        return Response.status(Response.Status.OK).entity(mapNames).build();
    }


    /**
     * An endpoint to store the replay of a player on a map
     *
     * @param player_n - the player name who's replay will be saved
     * @param map_n    - the map on which the replay is saved
     * @param replay   - a sequence of "Moves"
     */
    @POST
    @Path("replay/{player_id}/{map_id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response saveReplay(@PathParam("player_id") final String player_n, @PathParam("map_id") final String map_n,
                               final Replay replay) {

        if (!(mapsLoader.getMaps().containsKey(map_n)
                && mapsLoader.getMaps()
                .get(map_n)
                .getScores()
                .containsKey(player_n))) {
            throw new WebApplicationException(
                    Response.status(HttpURLConnection.HTTP_BAD_REQUEST)
                            .build());
        } else {
            System.out.println(replay);
            replaysLoader.writeReplay(player_n, map_n, replay);
            logger.logInfo("Replay save from " + player_n + " on map - " + map_n);
            return Response.status(HttpURLConnection.HTTP_OK).build();
        }
    }


}

