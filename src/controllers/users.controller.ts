import { id } from "date-fns/locale"
import { usersModel } from "../models/users.model.js"
import { updateUser } from "../users.js"
import type { UserType } from "../utils/types.js"
import type { Request, Response } from "express"

export const userController = {
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
    },

    async getUserById(req: Request, res: Response) {
        const { id } = req.query

        if (id) {
            const getUserByIdResponse = await usersModel.getUserById(id as string)

            if (!getUserByIdResponse) {
                res.status(404).json({
                    status: "error",
                    message: "Utilizador nao encontrado",
                    data: null
                })
            }

            res.status(200).json({
                status: "success",
                message: "Utilizador encontrado",
                data: getUserByIdResponse
            })
        } else {
            res.status(400).json({
                status: "error",
                message: "Id eh obrigatorio",
                data: null
            })
        }
    },


    async updated(req: Request, res: Response) {
        const { id } = req.params

        const updateUser: UserType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Id é obrigatorio!",
                data: null
            })
        }
        if (!updateUser) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar utilizador",
                data: null
            })
        }

        const updateUserResponse = await usersModel.updatedUser(id as string, updateUser)
        if (!updateUserResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar utilizador",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Utilizador atualizado com sucesso!",
            data: updateUserResponse
        })
    },


    async delete(req: Request, res: Response) {
        const { id } = req.params


        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Id é obrigatorio",
                data: null
            })
        }

        const deleteUserResponse = await usersModel.deleteUser(id as string)

        if (!deleteUserResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar utilizador!",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Utilizador apagado com sucesso",
            data: deleteUserResponse
        })
    }
}


