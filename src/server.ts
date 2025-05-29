import App from "./app";
import { UploadRoute } from "./routes/upload.route";

const application = new App([new UploadRoute()]);

application.startServer();
