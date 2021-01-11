package game.models.mapBuilder;

import com.github.javafaker.Faker;
import game.models.Tuple;
import game.models.tiles.Tile;
import game.models.tiles.TileFactory;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.stream.IntStream;

public final class RandomMapBuilder implements MapBuilder {

    private int width = 10;

    @Override
    public GameMap build() {

        final GameMap map = new GameMap();
        // generating a random string name
        final Random random = new Random();
        final byte[] array = new byte[7]; // length is bounded by 7
        random.nextBytes(array);
        final Faker fake = new Faker();
        final String name = fake.nation().capitalCity();
        map.setName(name);
        map.setWidth(width);

        // Instantiating factory for the different tiles and constructing the
        final TileFactory factory = new TileFactory();
        final Map<Tuple<Integer, Integer>, Tile> tiles = new HashMap<>();

        IntStream.range(0, width).forEach(i -> IntStream.range(0, width)
                .forEach(j -> tiles.put(new Tuple<>(i, j),
                        factory.getTile(random
                                .nextInt(5)))));
        // We bound by 5 to have more Grass tiles than the others
        map.setTiles(tiles);
        return map;
    }

    private RandomMapBuilder() {

    }


    public static RandomMapBuilder create() {
        return new RandomMapBuilder();
    }

    public RandomMapBuilder setWidth(final int width) {
        this.width = width;
        return this;
    }
    public int getWidth() {
        return width;
    }
}
