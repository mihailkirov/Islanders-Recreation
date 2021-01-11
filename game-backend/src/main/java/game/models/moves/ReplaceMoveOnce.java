package game.models.moves;

import com.google.common.base.MoreObjects;
import game.models.Tuple;
import game.models.tiles.Tile;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class ReplaceMoveOnce extends Move {
    private Move oldMove;

    public ReplaceMoveOnce() {
        super();
    }

    @Override
    public String toString() {
        return MoreObjects
                .toStringHelper(this)
                .add("coord", coord)
                .add("tile", tile)
                .add("move", oldMove)
                .toString();

    }

    public ReplaceMoveOnce(final Tile tile, final Tuple<Integer, Integer> coordinates) {
        super();
        this.coord = coordinates;
        this.tile = tile;
    }

    public Move getOldMove() {
        return oldMove;
    }

    public void setOldMove(final Move oldMove) {
        this.oldMove = oldMove;
    }

}
