package game.resource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.hanleyt.JerseyExtension;
import game.models.Tuple;
import game.models.mapBuilder.GameMap;
import game.models.moves.PlaceMove;
import game.models.moves.Replay;
import game.models.tiles.TileFactory;
import game.serialization.MapsLoader;
import org.glassfish.jersey.internal.inject.AbstractBinder;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.RegisterExtension;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.GenericType;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URI;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestGameResource {
    static {
        System.setProperty("jersey.config.test.container.port", "0");
    }

//	static final Logger log = Logger.getLogger(TestGameResource.class.getSimpleName());

    @SuppressWarnings("unused")
    @RegisterExtension
    JerseyExtension jerseyExtension = new JerseyExtension(this::configureJersey);


    MapsLoader data;
    private GameMap default_map;

    Application configureJersey() {
        data = new MapsLoader();
        // data = Mockito.mock(Storage.class);
        return new ResourceConfig(GameResource.class)
                .register(MyExceptionMapper.class)
                .register(JacksonFeature.class)
                .register(new AbstractBinder() {
                    @Override
                    protected void configure() {
                        bind(data).to(MapsLoader.class);
                    }
                });
    }

//	<T> T LogJSONAndUnmarshallValue(final Response res, final Class<T> classToRead) {
//		res.bufferEntity();
//		final String json = res.readEntity(String.class);
//		log.log(Level.INFO, "JSON received: " + json);
//		final T obj = res.readEntity(classToRead);
//		res.close();
//		return obj;
//	}

    @BeforeEach
    public void init() {
        default_map = new GameMap();
    }

    @Test
    void testSaveReplay(final Client client, final URI baseUri) {
        final TileFactory tf = new TileFactory();
        final Replay replay = new Replay(default_map);
        replay.addMove(new PlaceMove(tf.getTile(1), new Tuple<>(1, 10)));
        replay.addMove(new PlaceMove(tf.getTile(2), new Tuple<>(5, 15)));

        final ObjectMapper map = new ObjectMapper();
        try {
            System.out.println(map.writerWithDefaultPrettyPrinter().writeValueAsString(replay));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        final Response res = client.target(baseUri)
                .path("game/replay/Maxime/test")
                .request(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .post(Entity.json(replay));

        assertEquals(Response.Status.OK.getStatusCode(), res.getStatus());
    }

    @Test
    void testGetReplay(final Client client, final URI baseUri) {
        final Response res = client.target(baseUri)
                .path("game/replay/Maxime/test2")
                .request()
                .get();
        final Replay rep = res.readEntity(Replay.class);
        System.out.println(rep);
        assertEquals(Response.Status.OK.getStatusCode(), res.getStatus());
        assertNotNull(rep);

    }

    // Example of a route test. The one for getting a list of available maps
    // To edit
    @Test
    void testGetNames(final Client client, final URI baseUri) {
        final Response res = client
                .target(baseUri)
                .path("game/maps/names")
                .request()
                .get();

        // Test case
        assertEquals(Response.Status.OK.getStatusCode(), res.getStatus());
        final List<String> names = res.readEntity(new GenericType<>() {
        });
        // add other assertions to check 'names'
        System.out.println(names);
        assertTrue(names.contains("test"));

    }

    @Test
    void testAddNewScore(final Client client, final URI baseUri) {

        final Response res = client
                .target(baseUri)
                .path("game/maps/test/Maxime/100")
                .request()
                .put(Entity.text(""));
        System.out.println(res.readEntity(GameMap.class));
        assertEquals(Response.Status.OK.getStatusCode(), res.getStatus());
    }

    @Test
    void testGetTopFiveScores(final Client client, final URI baseUri) {

        final Response res = client
                .target(baseUri)
                .path("game/maps/top_score/test")
                .request()
                .get();
        final Map<String, Integer> topScores = res.readEntity(new GenericType<>() {
        });
        System.out.println(topScores);
        assertNotNull(topScores);
        assertTrue(topScores.containsValue(100));
        assertEquals(topScores.get("Maxime"), 100);
    }

    @Test
    void testGetRandomMap(final Client client, final URI baseUri) {

        final Response res = client
                .target(baseUri)
                .path("game/maps/new")
                .request()
                .get();
        final GameMap newRandomMap = res.readEntity(GameMap.class);
        System.out.println(newRandomMap);
        assertNotNull(newRandomMap);
        assertNotNull(newRandomMap.getTiles());
        //Now check it was correctly added to the mapsLoader
        assertTrue(data.getMaps().containsKey(newRandomMap.getName()));
    }

    @Test
    void testLoadMap(final Client client, final URI baseUri) {
        final Response res = client
                .target(baseUri)
                .path("game/maps/test")
                .request()
                .get();
        final GameMap loadedMap = res.readEntity(GameMap.class);
        System.out.println(loadedMap);
        assertNotNull(loadedMap);
        assertNotNull(loadedMap.getTiles());
        //Now check it was correctly added to the mapsLoader
        assertTrue(data.getMaps().containsKey(loadedMap.getName()));

    }

    @Test
    void testCallsOnNonExistentMaps() {
        final MapsLoader loader = new MapsLoader();
        final GameResource game = new GameResource(loader);
        assertThrows(WebApplicationException.class, () -> game.getScoresFromMap("non_existant_map_test"));
        assertThrows(WebApplicationException.class, () -> game.storeScore("non_existant_map_test", "Maxime", 10));
        assertThrows(WebApplicationException.class, () -> game.getMapFromName("non_existant_map_test"));
        assertThrows(WebApplicationException.class, () -> game.getReplay("Maxime", "non_existant_map_test"));
    }

}
