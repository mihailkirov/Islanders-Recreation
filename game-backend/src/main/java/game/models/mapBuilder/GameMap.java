package game.models.mapBuilder;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.google.common.base.MoreObjects;
import game.models.Tuple;
import game.models.tiles.Tile;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.TreeMap;


/**
 * Map data structure. It'll be converted to JSON (marshalled)
 */
@JsonIgnoreProperties(ignoreUnknown = true)
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class GameMap {
    private String name;
    private int width = 10;
    private Map<String, Integer> scores;  //This map is not ordered on its Integer

    private Map<Tuple<Integer, Integer>, Tile> tiles;

    @Override
    public String toString() {
        return MoreObjects
                .toStringHelper(this)
                .add("name", name)
                .add("width", width)
                .add("scores", scores)
                .add("tiles", tiles)
                .add("fiveBestRes", this.getFiveBestRes())
                .toString();
    }

    /**
     * This method is only a basic constructor
     * Please use MapBuilders to construct GameMap objects
     */
    public GameMap() {
        scores = new TreeMap<>();
        tiles = new HashMap<>();
        name = "";
    }

    /* Getters and setters */
    public String getName() {
        return name;
    }
    public int getWidth() {
        return width;
    }

    /**
     * This method gives the 5 best scores and it associated players from the 'score' attribute of the GameMap
     */

    public Map<String, Integer> getFiveBestRes() {
        final Map<String, Integer> fiveBestRes = new TreeMap<>((o1, o2) -> scores.get(o2).compareTo(scores.get(o1)));
        scores.entrySet()
                .stream()
                .sorted((o1, o2) -> (o2.getValue()).compareTo(o1.getValue()))
                .limit(5)
                .forEach(elem -> fiveBestRes.put(elem.getKey(), elem.getValue()));
        // TODO opti this part to not sort everytime
        return fiveBestRes;
    }


    public Map<Tuple<Integer, Integer>, Tile> getTiles() {
        return tiles;
    }

    public void setName(final String name) throws IllegalArgumentException {
        if (name != null) {
            this.name = name;
        } else {
            throw new IllegalArgumentException("name can't be null");
        }

    }

    public void setWidth(final int width) {
        this.width = width;
    }

    public Map<String, Integer> getScores() {
        return scores;
    }

    /**
     * This method adds a score and it's player_name to the 'scores' attribute the GameMap
     *
     * @param score       - the new score to add,
     * @param player_name - the name associated to that score
     */
    public void addScore(final int score, final String player_name) {
        scores.put(player_name, score);
    }

    /**
     * This method replace the 'scores' attribute of the GameMap
     *
     * @param scores - Map<String, Integer> representing the scores
     */
    public void setScores(final Map<String, Integer> scores)
            throws IllegalArgumentException {
        if (scores == null) {
            throw new IllegalArgumentException("Illegal argument for results null");
        }

        this.scores = scores;
    }


    public void setTiles(final Map<Tuple<Integer, Integer>, Tile> tiles) throws IllegalArgumentException {
        if (tiles == null) {
            throw new IllegalArgumentException("Illegal argument for tiles - null ");
        }
        this.tiles = tiles;
    }

    @Override
    public boolean equals(final Object o) {
        if (o != null && (o.getClass() == this.getClass())) {
            final GameMap m = (GameMap) o;
            return m.name.equals(this.name)
                     && m.width == this.width
                    && m.tiles.equals(this.tiles)
                    && m.scores.equals(this.scores);
        }
        return false;
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, scores, tiles, width);
    }


}

