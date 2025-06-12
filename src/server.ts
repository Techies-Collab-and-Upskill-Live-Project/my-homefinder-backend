import App from "./app";
import { UploadRoute } from "./routes/upload.route";
import { AuthRoute } from "./routes/auth.routes"; 
import UserRoutes from "./routes/user.routes";

const application = new App([
  new UserRoutes(),
  new UploadRoute(),
  new AuthRoute()
]);

application.startServer();
