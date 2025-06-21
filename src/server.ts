import App from "./app"
import {UploadRoute} from "./routes/upload.route";
import {AuthRoute} from "./routes/auth.routes";
import {PropertyRoute} from "./routes/property.route";
import {MessageRoute} from "./routes/message.route";
import UserRoutes from "./routes/user.routes";

const application = new App([
    new UploadRoute(),
    new AuthRoute(),
    new PropertyRoute(),
    new MessageRoute(),
    new UserRoutes()
]);

application.startServer();
