import App from "./app";
import UserRoutes from "./routes/user.routes";

const application = new App([
    new UserRoutes()
]);

application.startServer();
