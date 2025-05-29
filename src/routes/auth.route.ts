import { Router } from 'express';
import { Routes } from '../interfaces/route.interface';
import { signup } from '../controllers/auth.controller';

class AuthRoute implements Routes {
  public path = '/api/auth';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/signup', signup);
  }
}

export default AuthRoute;
