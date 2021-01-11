package game.models;


import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

/**
 * This class is our implementation of a tuple in Java
 */
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class Tuple<X, Y> {

    public X x;
    public Y y;

    public Tuple() {
        this.x = null;
        this.y = null;
    }

    public Tuple(final X x, final Y y) {
        this.x = x;
        this.y = y;
    }

    public Tuple(final String s) throws IllegalArgumentException {
//        System.out.println("string input for Tuple: " + s);
//        String tmp = s.replace("(", "");
//        tmp = tmp.replace(")", "");
//        String[] res = tmp.split(",", tmp.length());
//        res[1] = res[1].replace(" ", "");

        final Pattern pattern = Pattern.compile(".*\\((.*?)\\).*");

        final Matcher matcher = pattern.matcher(s);
        if (!matcher.find()) {
            System.out.println(s);
            throw new IllegalArgumentException("Bad format for tuple");
        }
        final List<Integer> array = Arrays.stream(matcher.group(1)
                .split(",\\s*"))
                .map(Integer::parseInt)
                .collect(Collectors.toList());

        final int xtmp = array.get(0); //array.get(0);
        final int ytmp = array.get(1); //array.get(1);
        final Tuple<X, Y> other_ = (Tuple<X, Y>) new Tuple<>(xtmp, ytmp);
        this.x = other_.x;
        this.y = other_.y;
    }

    @Override
    public String toString() {
        return "(" + x + ", " + y + ")";
    }

    @Override
    public boolean equals(final Object other) {
        if (other == this) {
            return true;
        }

        if (!(other instanceof Tuple)) {
            return false;
        }

        final Tuple<X, Y> other_ = (Tuple<X, Y>) other;

        // this may cause NPE if nulls are valid values for x or y. The logic may be improved to handle nulls properly, if needed.
        assert other_.x != null;
        if (!other_.x.equals(this.x)) {
            return false;
        }
        assert other_.y != null;
        return other_.y.equals(this.y);
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((x == null) ? 0 : x.hashCode());
        result = prime * result + ((y == null) ? 0 : y.hashCode());
        return result;
    }
}
