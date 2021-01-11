package game.models.moves;

import game.models.Tuple;
import game.models.mapBuilder.GameMap;
import game.models.mapBuilder.RandomMapBuilder;
import game.models.tiles.Grass;
import org.junit.jupiter.api.Test;

import static org.junit.Assert.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;

class ReplaceMoveOnceTest {

    GameMap random_map = RandomMapBuilder.create().build();
    Tuple<Integer, Integer> coord = new Tuple<>(10, 15);
    Grass grass = new Grass();

    @Test
    void testConstructorFromMapCoord() {
        final ReplaceMoveOnce emptyMove = new ReplaceMoveOnce();
        assertNotNull(emptyMove);
        final ReplaceMoveOnce move = new ReplaceMoveOnce(grass, coord);
        assertEquals(move.getCoord(), coord);
    }

}
