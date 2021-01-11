package game.models.mapBuilder;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;


class RandomMapBuilderTest {
    RandomMapBuilder builder;
    @BeforeEach
    void setUp() {
        builder = RandomMapBuilder.create();
    }

    @Test
    void build() {
        final GameMap map = builder.build();
        assertEquals(10, map.getWidth());
        assertNotNull(map.getTiles());
        assertNotNull(map.getName());
        System.out.print(map.getName());
    }

    @Test
    void create() {
        assertNotNull(builder);
    }

    @Test
    void setWidth() {
        builder.setWidth(15);
        assertEquals(builder.getWidth(), 15);
    }

    @Test
    void LoadMapBuilderMapName() {
        final LoadMapBuilder loader = LoadMapBuilder.create();
        assertThrows(IllegalArgumentException.class,    () -> loader.mapName(null));
    }
}
