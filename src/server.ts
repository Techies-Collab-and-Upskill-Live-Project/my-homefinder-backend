import App from "./app";
import { UploadRoute } from "./routes/upload.route";
import { AuthRoute } from "./routes/auth.routes"; 

const application = new App([
  new UploadRoute(),
  new AuthRoute(), 
]);

application.startServer();
