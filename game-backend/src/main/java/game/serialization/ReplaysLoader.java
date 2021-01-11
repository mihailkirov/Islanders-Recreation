package game.serialization;

import com.fasterxml.jackson.databind.ObjectMapper;
import game.models.moves.Replay;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;

public class ReplaysLoader {

    private final String directoryPath;

    public ReplaysLoader() {
        directoryPath = Paths.get("").toAbsolutePath().toString() + "/src/main/java/game/replays/";
    }

    public String getDirectoryPath() {
        return directoryPath;
    }

    public Replay getReplayFromFile(final String player_id, final String map_id) {

        Replay replay = null;
        try {
            final ObjectMapper mapper = new ObjectMapper();

            replay = mapper.readValue(new File(directoryPath + player_id + "-" + map_id + ".json"),
                    Replay.class);

        } catch (IOException e) {
            System.out.println("Exception in get replay - " + e.toString());
        }
        return replay;
    }

    public void writeReplay(final String player_n, final String map_n, final Replay replay) {


        final ObjectMapper mapper = new ObjectMapper();
        try {
            mapper.writerWithDefaultPrettyPrinter()
                    .writeValue(new File(directoryPath + player_n + "-" + map_n + ".json"), replay);
        } catch (IOException e) {
            System.out.println("Exception in write replay - " + e.toString());
            e.printStackTrace();
        }

    }

}
