package game.models.moves;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.google.common.base.MoreObjects;
import game.models.Tuple;
import game.models.tiles.Tile;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlTransient;
import java.util.Objects;


/**
 * Definition of the concept of Move
 */
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, property = "type")
@XmlTransient
@XmlSeeAlso({PlaceMove.class, ReplaceMoveOnce.class})
@XmlAccessorType(XmlAccessType.FIELD)
public abstract class Move {
    protected Tuple<Integer, Integer> coord;
    protected Tile tile;
    protected int points; // number of points that the move gained

    @Override
    public String toString() {
        return MoreObjects
                .toStringHelper(this)
                .add("coord", coord)
                .add("tile", tile)
                .toString();
    }

    public Tuple<Integer, Integer> getCoord() {
        return coord;
    }

    public void setCoord(final Tuple<Integer, Integer> coordinate)  throws  IllegalArgumentException {
        if(coordinate == null) {
            throw  new IllegalArgumentException("Coordinates argument has to be defined");
        }
        this.coord = coordinate;
    }

    public Tile getTile() {
        return tile;
    }

    public void setTile(final Tile tile) throws IllegalArgumentException {
        if(tile == null) {
            throw new IllegalArgumentException("Move is performed on a defined tile");
        }
        this.tile = tile;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(final int points) {
        this.points = points;
    }

    @Override
    public boolean equals(final Object o) {
        if (o == null) {
            return false;
        }
        if (o.getClass() != this.getClass()) {
            return false;
        }
        final Move other = (Move) o;

        return other.coord.equals(this.coord) && other.tile.equals(this.tile);
    }

    @Override
    public int hashCode() {
        return Objects.hash(tile, coord);
    }

}
