import {PrismaClient} from "../generated/prisma";
import HTTPException from "../exceptions/http.exception";
import {StatusCodes} from "http-status-codes";
import {isEmpty} from "../utils/isEmpty.util";

export class UserService {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient();
    }

}