package game.models.moves;

import com.google.common.base.MoreObjects;
import game.models.mapBuilder.GameMap;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.ArrayList;
import java.util.List;

@XmlRootElement(name = "Replay")
@XmlAccessorType(XmlAccessType.FIELD)
public class Replay {
    private final List<Move> moves;
    protected GameMap map;

    public GameMap getMap() {
        return map;
    }

    public void setMap(final GameMap map) throws IllegalArgumentException {
        if(map == null) {
            throw  new IllegalArgumentException("Argument map of replay has to be defined");
        }
        this.map = map;
    }
    public Replay() {
        moves = new ArrayList<>();
    }

    public Replay(final GameMap map) {
        moves = new ArrayList<>();
        this.map = map;
    }

    public Replay(final GameMap map, final List<Move> moves) {
        this.moves = moves;
        this.map = map;
    }

    public List<Move> getMoves() {
        return moves;
    }

    public void addMove(final Move m) {
        moves.add(m);
    }

    @Override
    public String toString() {
        return MoreObjects
                .toStringHelper(this)
                .add("moves", moves)
                .add("map", map)
                .toString();
    }
}
