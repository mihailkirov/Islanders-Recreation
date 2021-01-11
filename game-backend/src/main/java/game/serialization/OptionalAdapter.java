package game.serialization;

import javax.xml.bind.annotation.adapters.XmlAdapter;
import java.util.Optional;

public class OptionalAdapter<T> extends XmlAdapter<T, Optional<T>> {
    @Override
    public Optional<T> unmarshal(final T value) {
        return Optional.ofNullable(value);
    }

    @Override
    public T marshal(final Optional<T> value) {
        return value.orElse(null);
    }
}

