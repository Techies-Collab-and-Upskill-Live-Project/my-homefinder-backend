import express from "express"
class Routes {

        public UserRouter: express.Router

    constructor() {
            this.UserRouter = express.Router();
    }

    public routeUser = () => {
        this.UserRouter.post('/register')
        this.UserRouter.post('/login')
    }

    
}