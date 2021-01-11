package game.models.tiles;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNull;


public class TileTest {
    Tile tile;
    Block block;
    class TileInherit extends Tile {
    }
    @BeforeEach
    void setUp() {
        tile = Mockito.mock(Tile.class, Mockito.CALLS_REAL_METHODS);
    }

    @Test
    void testAddBlock() {
        final House house = new House();
        tile.addBlock(house);
        assertTrue(tile.getBlock() instanceof House);
    }

    @Test
    void testGetBlock() {
        final House house = new House();
        assertNull(tile.getBlock());
        tile.addBlock(house);
        assertNotNull(tile.getBlock());
    }

    @Test
    void testEquals(){
        block = Mockito.mock(Block.class, Mockito.CALLS_REAL_METHODS);
        TileInherit tile = new TileInherit();
        TileInherit tile2 = new TileInherit();
        tile.addBlock(block);
        tile2.addBlock(block);
        assertEquals(tile, tile2);
        assertNotEquals(tile, null);
    }

}
