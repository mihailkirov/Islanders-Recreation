package game.models.moves;

import com.google.common.base.MoreObjects;
import game.models.Tuple;
import game.models.tiles.Grass;
import game.models.tiles.Water;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class MoveTest {
    Move move;

    class MoveInherit extends Move{}
    @BeforeEach
    void setUp() {
        move = Mockito.mock(Move.class, Mockito.CALLS_REAL_METHODS);
        move.setCoord(new Tuple<>(10,15));
        move.setTile(new Grass());
    }

    @Test
    void testToString() {
        assertEquals(move.toString(), MoreObjects
                .toStringHelper(move)
                .add("coord", new Tuple<>(10,15))
                .add("tile", new Grass())
                .toString());
    }

    @Test
    void testGetCoord() {
        assertEquals(move.getCoord(), new Tuple<>(10,15));
    }

    @Test
    void testSetCoord() {
        Tuple<Integer, Integer> tuple = new Tuple<>(12,10);
        move.setCoord(tuple);
        assertEquals(move.getCoord(), tuple);
        assertThrows(IllegalArgumentException.class,    () -> move.setCoord(null));
    }

    @Test
    void testGetTile() {
        assertEquals(move.getTile(), new Grass());
    }

    @Test
    void testSetTile() {
        move.setTile(new Water());
        assertEquals(move.getTile(), new Water());
        assertThrows(IllegalArgumentException.class,    () -> move.setTile(null));
    }


    @Test
    void testEquals() {
        MoveInherit moveInherit = new MoveInherit();
        MoveInherit moveInheritCopy = new MoveInherit();
        assertNotEquals(moveInherit, null);
        assertNotEquals(moveInherit, move);

        moveInherit.setCoord(new Tuple<>(10, 15));
        moveInherit.setTile(new Grass());
        moveInheritCopy.setCoord(new Tuple<>(10, 15));
        moveInheritCopy.setTile(new Grass());
        assertEquals(moveInherit, moveInheritCopy);

        moveInheritCopy.setCoord(new Tuple<>(10, 0));
        assertNotEquals(moveInherit, moveInheritCopy);
    }


}
