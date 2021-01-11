package logging;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.Date;
import java.util.logging.ConsoleHandler;
import java.util.logging.FileHandler;
import java.util.logging.Handler;
import java.util.logging.LogRecord;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;

/**
 * The class GameLogger will be used as an event logger for the incoming requests to the API
 * as well for debugging
 */
public class GameLogger {
    private static final Logger LOGGER  = Logger.getLogger(GameLogger.class.getName());
    static {
        Handler fh;
        try {
            fh = new FileHandler(Paths.get("")
                    .toAbsolutePath().toString() + "/src/main/java/logging/logs.txt");
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Switch to console handler");
            fh = new ConsoleHandler();
        }

        fh.setFormatter(new SimpleFormatter() {
                private static final String format = "[%1$tF %1$tT] [%2$-7s] %3$s %n";

                @Override
                public String formatMessage(final LogRecord record) {
                    return String.format(format,
                            new Date(record.getMillis()),
                            record.getLevel().getLocalizedName(),
                            record.getMessage()
                    );
                }
            });

        LOGGER.addHandler(fh);
        LOGGER.setUseParentHandlers(false);
       }

    public  GameLogger() {

    }

    public void logInfo(final String msg) {
        LOGGER.info(msg);
    }

    public void logWarning(final String msg) {
        LOGGER.warning(msg);
    }

}
