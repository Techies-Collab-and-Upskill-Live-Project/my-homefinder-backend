import {UserService} from "../services/user.service";
import {RequestWithUser} from "../interfaces/auth.interface";
import {NextFunction, Response} from "express";
import {tenantProfileInterface} from "../interfaces/profile.interface";
import {StatusCodes} from "http-status-codes";

class UserController {
    private userService;

    constructor() {
        this.userService = new UserService();
    }
}