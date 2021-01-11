package game.serialization;

import com.fasterxml.jackson.databind.ObjectMapper;
import game.models.mapBuilder.GameMap;
import game.models.mapBuilder.LoadMapBuilder;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;


/**
 * Class for loading game maps. There are two principle methods
 * 1 - when starting the server load all maps from directoryPath
 * 2 - save new map for further load
 */
public class MapsLoader {

    private final String directoryPath;
    // Key value is the name of the map
    private Map<String, GameMap> maps;


    public MapsLoader(final String directoryPath) {
        this.directoryPath = directoryPath;
    } // test?

    public MapsLoader() {
        this.directoryPath = Paths.get("")
                .toAbsolutePath()
                .toString() + "/src/main/java/game/maps/";
        this.load();
    }

    /*         Accessors   */
    public String getDirectoryPath() {
        return directoryPath;
    }

    public Map<String, GameMap> getMaps() {
        return maps;
    }


    /**
     * As all maps will be stored in a .json format this method retrieves their names and returns an array
     */
    public String[] getAllTextFiles() {
        return new File(directoryPath).list((dir, name) -> {
            final String lowercaseName = name.toLowerCase();
            return lowercaseName.endsWith("map.json");
        });
    }

    /** Loading all maps from the specified directory path */

    public void load() {
        if (maps != null) {  // already loaded
            return;
        }
        maps = new HashMap<>();
        final String[] fileNames = getAllTextFiles();
        final LoadMapBuilder builder = LoadMapBuilder.create();

        Arrays.stream(fileNames).forEach(filename -> {
            final GameMap ast;
            ast = builder.mapName(directoryPath + filename).build();
            if (ast != null) {
                maps.put(ast.getName(), ast);
            }
        });

    }

    /**
     * Saving a new added map to the map directory (marshalling)
     */
    private void save(final GameMap m)  {
        final ObjectMapper mapper = new ObjectMapper();
        try {
            mapper.writerWithDefaultPrettyPrinter()
                    .writeValue(new File(directoryPath + m.getName() + "-map.json"), m);
        } catch (IOException e) {
            System.out.println("Error in marshalling map - " + m + " " + e.toString());
            e.printStackTrace();
        }
    }

    /**
     * This method adds a new generated map to the set of loaded maps, calling the method save
     * to write the map as a file in the predefined directory to enable further loading
     * of the same map
     *
     * @param m - map to add
     */

    public void addMap(final GameMap m) {
        if(m != null) {
            maps.put(m.getName(), m);
            save(m);
        }
    }
}
