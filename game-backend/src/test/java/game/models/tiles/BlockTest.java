package game.models.tiles;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


/**
 * Test case for abstract class using instance class
 */
class BlockTest {
     Block circus;

    @BeforeEach
    void setUp() {
        circus = new Circus(12, 14);
    }

    @Test
    void defaultConstructorTest() {
        final Block tmp  = new Circus();
        assertNotNull(tmp);
        assertEquals(0, tmp.getPoints());
        assertEquals(0, tmp.getRadius());
    }

    @Test
    void getPoints() {
        assertEquals(12, circus.getPoints());
    }

    @Test
    void setPoints() {
        circus.setPoints(22);
        assertEquals(22, circus.getPoints());
    }

    @Test
    void getRadius() {
        assertEquals(14, circus.getRadius());
    }

    @Test
    void setRadius() {
        circus.setRadius(15);
        assertEquals(15, circus.getRadius());
    }

    @Test
    void testConstructors() {
        Fountain fountain = new Fountain();
        Fountain fountainCopy = new Fountain(5, 10);
        WindTurbine wind = new WindTurbine();
        House house = new House(5, 10);
        assertNotNull(fountain);
        assertNotNull(fountainCopy);
        assertNotNull(wind);
        assertNotNull(house);
    }

    @Test
    void testToString(){
        assertEquals(circus.toString(), "Circus{points=12, radius=14}");
    }
}
