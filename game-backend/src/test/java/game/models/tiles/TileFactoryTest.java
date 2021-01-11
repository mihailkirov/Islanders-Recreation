package game.models.tiles;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;


class TileFactoryTest {
    TileFactory tileFactory;
    @BeforeEach
    void setUp() {
        tileFactory = new TileFactory();
    }

    @Test
    void getTile() {
        assertTrue(tileFactory.getTile(0) instanceof Tree);
        assertTrue(tileFactory.getTile(1) instanceof Water);
        assertTrue(tileFactory.getTile(2) instanceof Grass);

    }
}
