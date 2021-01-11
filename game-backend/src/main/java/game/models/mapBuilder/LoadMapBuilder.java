package game.models.mapBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.IOException;

/**
 * Map builder using a filename. The class constructs a map Object
 * from a Json file (deserializing)
 */
public final class LoadMapBuilder implements MapBuilder {

    String filename;

    @Override
    public GameMap build() {
        final ObjectMapper mapper = new ObjectMapper();
        GameMap ast = null;
        try {
            ast = mapper.readValue(new File(filename), GameMap.class);
        } catch (IOException e) {
            System.out.println("Exception in opening file to load map - " + e.toString());
            e.printStackTrace();
        }
        return ast;
    }

    private LoadMapBuilder() {
    }


    public LoadMapBuilder mapName(final String filename) throws IllegalArgumentException {
        if (filename == null) {
            throw new IllegalArgumentException("the file has to exist");
        } else {
            this.filename = filename;
        }
        return this;
    }

    public static LoadMapBuilder create() {
        return new LoadMapBuilder();
    }


}
