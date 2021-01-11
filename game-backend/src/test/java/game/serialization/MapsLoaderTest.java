package game.serialization;

import game.models.mapBuilder.GameMap;
import game.models.mapBuilder.RandomMapBuilder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

class MapsLoaderTest {
    private MapsLoader loader;

    @BeforeEach
    public void setUp() {
        loader = new MapsLoader();
    }

    @Test
    void testAddingNewRandomMap() {
       final GameMap newRandomMap = RandomMapBuilder
                .create()
                .build();
        loader.addMap(newRandomMap);
        assertNotNull(loader.getMaps());
        assertTrue(loader.getMaps().containsKey(newRandomMap.getName()));
    }

    @Test
    void testGetMap() {
        final GameMap chosenMap = loader.getMaps().get("test");
        assertNotNull(chosenMap);
        assertEquals(chosenMap.getName(), "test");
        assertNotNull(chosenMap.getTiles());
    }

}
