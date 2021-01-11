package game.models.tiles;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class Fountain extends Block {

    public Fountain() {
        super();
    }

    public Fountain(final int points, final int radius) {
        super(points, radius);
    }
}
