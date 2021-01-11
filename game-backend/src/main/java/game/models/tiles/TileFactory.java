package game.models.tiles;

public class TileFactory {
    public Tile getTile(final int id) {
        if (id == 0) {
            return new Tree();
        }
        if (id == 1) {
            return new Water();
        }
        return new Grass();
    }
}
