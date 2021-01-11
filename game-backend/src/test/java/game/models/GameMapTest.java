package game.models;

import game.models.mapBuilder.GameMap;
import game.models.tiles.Tile;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.TreeMap;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

class GameMapTest {
    GameMap map;

    @BeforeEach
    void setUp() {
        map = new GameMap();
    }

    @Test
    void testConstructor() {
        assertNotNull(map);
    }


    @Test
    void getName() {
        map.setName("Maxime");
        assertEquals("Maxime", map.getName());
    }


    @Test
    void getWidth() {
        //Default width test
        assertEquals(10, map.getWidth());
    }

    @Test
    void getFiveBestRes() {
        final Map<String, Integer> score = new TreeMap<>();
        score.put("Maxime", 1000);
        score.put("Philippe", 900);
        score.put("Peter", 1500);
        score.put("Proust", 200);
        score.put("Mihail", 130);
        score.put("T", 1500);
        score.put("A", 2000);

        map.setScores(score);
        assertNotNull(map.getScores());

        final Map<String,Integer> topFive = map.getFiveBestRes();
        System.out.println(topFive);
        assertNotNull(topFive);

    }

    @Test
    void getTiles() {
        //Construction test
        assertNotNull(map.getTiles());
    }

    @Test
    void setScores() {
        final Map<String, Integer> score = new TreeMap<>();
        score.put("Maxime",1000);
        score.put("Philippe",900);
        score.put("Peter",1500);
        score.put("Proust",200);
        score.put("Mihail",130);

        map.setScores(score);
        assertNotNull(map.getScores());
        assertThrows(IllegalArgumentException.class, () -> map.setScores(null));

    }
    @Test
    void setName() {
        map.setName("MaximeDurand");
        assertEquals("MaximeDurand", map.getName());
        assertThrows(IllegalArgumentException.class, () -> map.setName(null));
    }

    @Test
    void setNameNull() {
        assertThrows(IllegalArgumentException.class,    () -> map.setName(null));
    }

    @Test
    void setWidth() {
        map.setWidth(1);
        assertEquals(1, map.getWidth());

    }


    @Test
    void setFiveBestRes() {
    }

    @Test
    void setTiles() {
        final Map<Tuple<Integer, Integer>, Tile> tiles = new HashMap<>();
        // Reference test
        map.setTiles(tiles);
        assertEquals(tiles, map.getTiles());
    }


    @Test
    void setTilesNull() {
        assertThrows(IllegalArgumentException.class,   () -> map.setTiles(null));
    }

    @Test
    void testEquals() {
        assertNotEquals(map, null);
    }

    @Test
    void testHashCode() {
        assertEquals(Objects.hash(map.getName(), map.getScores(), map.getTiles(), map.getWidth()), map.hashCode());
    }
}
