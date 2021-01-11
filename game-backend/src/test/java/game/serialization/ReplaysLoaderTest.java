package game.serialization;

import game.models.Tuple;
import game.models.mapBuilder.GameMap;
import game.models.mapBuilder.RandomMapBuilder;
import game.models.moves.PlaceMove;
import game.models.moves.ReplaceMoveOnce;
import game.models.moves.Replay;
import game.models.tiles.TileFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.Assert.assertNotNull;


class ReplaysLoaderTest {
    private ReplaysLoader r;

    @BeforeEach
    public void setUp() {
        r = new ReplaysLoader();
    }


    @Test
    void testMarshalling() {
        final GameMap random_map = RandomMapBuilder.create().build();
        final TileFactory tf = new TileFactory();
        final Replay replay = new Replay(random_map);
        replay.addMove(new PlaceMove(tf.getTile(1), new Tuple<>(300, 10)));
        replay.addMove(new PlaceMove(tf.getTile(2), new Tuple<>(5, 15)));
        replay.addMove(new ReplaceMoveOnce(tf.getTile(2), new Tuple<>(5, 15)));

        r.writeReplay("Maxime", "test2", replay);
    }

    @Test
    void testUnmarshalling() {

        final Replay replay;
        replay = r.getReplayFromFile("Maxime", "test");
        System.out.println(r.getDirectoryPath());
        System.out.println(replay);
        assert replay != null;
        assertNotNull(replay.getMoves());
    }

}
