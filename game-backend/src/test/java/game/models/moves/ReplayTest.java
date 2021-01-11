package game.models.moves;

import com.google.common.base.MoreObjects;
import game.models.Tuple;
import game.models.mapBuilder.GameMap;
import game.models.tiles.TileFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;


class ReplayTest {
    Replay replay;
    Replay replay2;
    List<Move> moves;
    final TileFactory tf = new TileFactory();
    GameMap default_map = new GameMap();
    @BeforeEach
    void setUp() {
        moves = new ArrayList<>();
        moves.add(new PlaceMove(tf.getTile(1), new Tuple<>(1, 10)));

        replay = new Replay(default_map, moves);
        replay2 = new Replay(default_map);
    }

    @Test
    void getMoves() {
        assertEquals(replay.getMoves(), moves);
    }

    @Test
    void addMove() {
        replay2.addMove(new PlaceMove(tf.getTile(1), new Tuple<>(1, 10)));
        assertEquals(replay.getMoves(), replay2.getMoves());
    }

    @Test
    void getMap() {
        assertEquals(replay.getMap(), default_map);
    }

    @Test
    void testToString() {
        assertEquals(MoreObjects
                .toStringHelper(replay)
                .add("moves", moves)
                .add("map", default_map)
                .toString(), replay.toString());
    }
}
