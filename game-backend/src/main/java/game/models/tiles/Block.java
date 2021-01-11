package game.models.tiles;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.google.common.base.MoreObjects;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlTransient;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, property = "type")
@XmlTransient
@XmlAccessorType(XmlAccessType.FIELD)
@XmlSeeAlso({Circus.class, Fountain.class, House.class, WindTurbine.class})
public abstract class Block {
    private  int points;
    private  int radius;

    public Block(final int points, final int radius) {
        this.points = points;
        this.radius = radius;
    }

    /*
    Default
     */
    public Block() {
        points = 0;
        radius = 0;
    }

    @Override
    public String toString() {
        return MoreObjects
                .toStringHelper(this)
                .add("points", points)
                .add("radius", radius)
                .toString();
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(final int points) {
        this.points = points;
    }

    public int getRadius() {
        return radius;
    }

    public void setRadius(final int radius) {
        this.radius = radius;
    }
}
