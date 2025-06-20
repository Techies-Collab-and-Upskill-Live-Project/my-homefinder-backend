import App from "./app"
import { UploadRoute } from "./routes/upload.route";
import { AuthRoute } from "./routes/auth.routes";
import { PropertyRoute } from "./routes/property.route";
import { MessageRoute } from "./routes/message.route";

const application = new App([
  new UploadRoute(),
  new AuthRoute(),
  new PropertyRoute(),
  new MessageRoute(),
]);

application.startServer();
