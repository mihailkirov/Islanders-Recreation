package game.models.tiles;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.google.common.base.MoreObjects;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlSeeAlso;
import java.util.Objects;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, property = "type")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlSeeAlso({Tree.class, Water.class, Grass.class})
public abstract class Tile {

    private Block block;
    public Block getBlock() {
        return block;
    }


    @Override
    public String toString() {
        return MoreObjects
                .toStringHelper(this)
                .add("block", block)
                .toString();
    }

    @Override
    public boolean equals(final Object o) {

        if (o != null && (o.getClass().equals(this.getClass()))) {
            final Tile t = (Tile) o;
            if (t.getBlock() == null) {
                return this.getBlock() == null;
            }
            return t.getBlock().getClass().equals(this.getBlock().getClass());
        }
        return false;
    }

    @Override
    public int hashCode() {
        return Objects.hash(block);
    }


    /**
     * @param b: block to be added to the tile
     */
    public void addBlock(final Block b) {
        block = b;
    }



}
