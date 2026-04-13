import { usersModel } from "../models/users.model.js"
import { comparePassword, hashPassword } from "../utils/password.js"
import type { ResponseType, UserType } from "../utils/types.js"
import type { Request, Response } from "express"
import jwt from "jsonwebtoken"

export const userController = {

    async createUsers(req: Request, res: Response) {
        const newUser: UserType = req.body

        if (!newUser) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de utilizador inválidos",
                data: null,
            }
            return res.status(400).json(response)
        }

        console.log(newUser)

        const createUserResponse = await usersModel.create(newUser)

        const response: ResponseType<UserType> = {
            status: "success",
            message: "Utilizador criado com sucesso",
            data: createUserResponse,
        }
        return res.status(201).json(response)
    },

    // Listar  os utilizadores por id
    async get(req: Request, res: Response) {
        const getUsersResponse = await usersModel.get()
        return res.status(200).json({
            status: "success",
            data: getUsersResponse,
        })
    },


    async getUserById(req: Request, res: Response) {
        const { id } = req.query

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Id é obrigatório",
                data: null,
            })
        }

        const getUserByIdResponse = await usersModel.getUserById(id as string)

        if (!getUserByIdResponse) {
            return res.status(404).json({
                status: "error",
                message: "Utilizador não encontrado",
                data: null,
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Utilizador encontrado",
            data: getUserByIdResponse,
        })
    },


    async login(req: Request, res: Response) {
        const { email, password } = req.body

        console.log(email, password)

        if (!email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Credenciais inválidas",
                data: null,
            })
        }

        const userData = await usersModel.getByEmail(email as string)

        console.log(userData)

        if (!userData) {
            return res.status(404).json({
                status: "error",
                message: "Email ou senha incorretos",
                data: null,
            })
        }


        const isPasswordValid = await comparePassword(password, userData.password)

        if (!isPasswordValid) {
            return res.status(401).json({
                status: "error",
                message: "Credenciais invalidos",
                data: null
            })
        }

        const playload = {
            id: userData.id,
            email: userData.email,
            nome: userData.nome
        }
        const token = jwt.sign(playload, process.env.JWT_SECRET as string, { expiresIn: "1h" })

        return res.status(200).json({
            status: "sucess",
            message: "Login realizado com sucesso",
            data: {
                token,
                user: playload
            }
        })
    },

    async updatePassword(req: Request, res: Response) {
        const { id } = req.params
        const { password, newPassword } = req.body

        if (!password || !newPassword) {
            return res.status(400).json({
                status: "error",
                message: "Credencias inválidas",
                data: null
            })
        }

        const userData = await usersModel.getById(id as string)

        if (!userData) {
            return res.status(404).json({
                status: "error",
                message: "Utilizador não encontrado",
                data: null
            })
        }

        const isPwdValid = await comparePassword(password, userData!.password)

        if (!isPwdValid) {
            return res.status(400).json({
                status: "error",
                message: "Credenciais invalidas"
            })
        }

        const updatePasswordResponse = await usersModel.updatePassword(userData.id, await hashPassword(newPassword))

        if (!updatePasswordResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar password",
                data: null
            })
        }

        return res.status(200).json({
            status: "sucess",
            message: "Password atualizado com sucesso",
            data: updatePasswordResponse
        })

    },

    async resetPassword(req: Request, res: Response) {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({
                status: "error",
                message: "Credenciais inválidas",
                data: null
            });
        }

        const userData = await usersModel.getByEmail(email);

        if (!userData) {
            return res.status(404).json({
                status: "error",
                message: "Utilizador não encontrado",
                data: null
            });
        }

        const updatePasswordResponse = await usersModel.updatePassword(
            userData.id,
            await hashPassword(newPassword)
        );

        if (!updatePasswordResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar password",
                data: null
            });
        }

        return res.status(200).json({
            status: "sucess",
            message: "Password redefinida com sucesso",
            data: updatePasswordResponse
        });
    },


    async update(req: Request, res: Response) {
        const { id } = req.params
        const updatedUser: UserType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Id é obrigatório",
                data: null,
            })
        }

        if (!updatedUser) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar utilizador",
                data: null,
            })
        }

        const updateUserResponse = await usersModel.updatedUser(id as string, updatedUser)

        if (!updateUserResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar utilizador",
                data: null,
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Utilizador atualizado com sucesso",
            data: updateUserResponse,
        })
    },


    async delete(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Id é obrigatório",
                data: null,
            })
        }

        const deleteUserResponse = await usersModel.deleteUser(id as string)

        if (!deleteUserResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar utilizador",
                data: null,
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Utilizador apagado com sucesso",
            data: deleteUserResponse,
        })
    },
}