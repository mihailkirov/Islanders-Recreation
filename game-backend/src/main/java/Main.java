import game.resource.GameResource;
import game.resource.MyExceptionMapper;
import game.serialization.MapsLoader;
import org.glassfish.grizzly.http.server.CLStaticHttpHandler;
import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.internal.inject.AbstractBinder;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.server.ResourceConfig;

import javax.ws.rs.client.ClientBuilder;
import java.io.IOException;
import java.net.URI;

public final class Main {
    // Base URI the Grizzly HTTP server will listen on
    // When building docker images, replace the address with http://0.0.0.0:4444/
    // http://localhost:4444/ is for testing purpose only.
    public static final String HTTP_ADDRESS = "http://localhost:4444/";

    private Main() {
        super();
    }

    /**
     * Starts Grizzly HTTP server exposing JAX-RS resources defined in this application.
     *
     * @return Grizzly HTTP server.
     */
    public static HttpServer startServer() {
        final ResourceConfig rc = new ResourceConfig(GameResource.class)
                .register(MyExceptionMapper.class)
                .register(JacksonFeature.class)
                .register(io.swagger.jaxrs.listing.ApiListingResource.class)
                .register(io.swagger.jaxrs.listing.SwaggerSerializers.class)
                .register(new AbstractBinder() {
                    @Override
                    protected void configure() {
                        bind(MapsLoader.class).to(MapsLoader.class);
                    }
                });
        return GrizzlyHttpServerFactory.createHttpServer(URI.create(HTTP_ADDRESS), rc);
    }

    // http://localhost:4444/swag/index.html
    public static void main(final String[] args) throws IOException {
        final HttpServer server = startServer();
        // Required to access the web pages stored in the webapp folder.
        final ClassLoader loader = Main.class.getClassLoader();
        final CLStaticHttpHandler docsHandler = new CLStaticHttpHandler(loader, "swag/");
        docsHandler.setFileCacheEnabled(false);

        server.getServerConfiguration().addHttpHandler(docsHandler, "/swag/");
        ClientBuilder.newClient().target(HTTP_ADDRESS);
        System.in.read();
        server.shutdownNow();
    }
}
