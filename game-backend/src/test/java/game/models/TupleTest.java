package game.models;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class TupleTest {
    Tuple<Integer, Integer> tuple1 = new Tuple<>(1, 2);
    Tuple<Integer, Integer> tuple2 = new Tuple<>(2, 3);
    Tuple<Integer, Integer> tuple3 = new Tuple<>(1, 2);

    @Test
    void testConstructor() {
        final String s = "(2, 1)";
        final Tuple<Integer, Integer> t = new Tuple<>(s);
        assertNotNull(t);
    }
    @Test
    void testConstructorError() {
        assertThrows(IllegalArgumentException.class, () -> new Tuple<>("2, 1"));
    }

    @Test
    void testToString() {
        assertEquals(tuple1.toString(), "(1, 2)");
    }

    @Test
    void testEquals() {
        assertEquals(tuple1, tuple3);
        assertNotEquals(tuple1, tuple2);
        assertNotEquals(tuple2, tuple3);
        assertNotEquals(tuple1, 5);
    }

    @Test
    void testHashCode() {
        int result;
        result = 31 + Integer.hashCode(1);
        result = 31 * result + Integer.hashCode(2);
        assertEquals(tuple1.hashCode(), result);
        assertNotEquals(tuple2.hashCode(), result);
    }
}
