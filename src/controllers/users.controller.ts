import { usersModel } from "../models/users.model.js"
import type { UserType } from "../utils/types.js"
import type { Request, Response } from "express"

export const userControler = {
    async createUsers(req: Request, res: Response) {
        const newUser: UserType = req.body

        if (!newUser) {
            res.status(400).json({
                status: "error",
                message: "Dados de utilizador invalidos",
                data: null
            })
        }

        console.log(newUser)

        const createUserResponse = await usersModel.create(newUser)

        res.json(createUserResponse)
    },


    async get(req: Request, res: Response) {
        const getUsersResponse = await usersModel.get()

        res.json(getUsersResponse);
    }
}

