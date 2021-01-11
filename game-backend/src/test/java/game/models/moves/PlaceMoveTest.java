package game.models.moves;

import game.models.Tuple;
import game.models.mapBuilder.GameMap;
import game.models.mapBuilder.RandomMapBuilder;
import game.models.tiles.Grass;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

public class PlaceMoveTest {
    PlaceMove move;
    final GameMap random_map = RandomMapBuilder.create().build();

    @BeforeEach
    void setUp() {
        move = new PlaceMove(new Grass(), new Tuple<>(10,15));
    }

    @Test
    void execute() {
    }

}
