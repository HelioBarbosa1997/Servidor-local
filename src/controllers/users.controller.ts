import { usersModel } from "../models/users.model.js"
import { comparePassword, hashPassword } from "../utils/password.js"
import type { AuthResponse, ResponseType, UserType } from "../utils/types.js"
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
        return res.status(200).json(response)
    },

    // Listar  os utilizadores por id
    async get(req: Request, res: Response) {
        const { id } = req.params

        const getUsersResponse = await usersModel.get(id as string)

        if (!getUsersResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Usuário não encontrado",
                data: null
            }
            return res.status(404).json(response);
        }

        const response: ResponseType<UserType> = {
            status: "success",
            message: "Usuario encontrado com sucesso",
            data: getUsersResponse,
        }
        return res.status(200).json(response)
    },


    async getUserById(req: Request, res: Response) {
        const { id } = req.query

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Id é obrigatório",
                data: null,
            }
            return res.status(400).json(response)
        }

        const getUserByIdResponse = await usersModel.getUserById(id as string)

        if (!getUserByIdResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Utilizador não encontrado",
                data: null,
            }
            return res.status(404).json(response)
        }

        const response: ResponseType<UserType> = {
            status: "success",
            message: "Utilizador encontrado",
            data: getUserByIdResponse,
        }
        return res.status(200).json(response)
    },


    async login(req: Request, res: Response) {
        const { email, password } = req.body

        console.log(email, password)

        if (!email || !password) {
            const response: ResponseType<null> = {
                status: "error",
                 message: "Credenciais inválidas",
                data: null,
            }
            return res.status(400).json(response)
        }

        const userData = await usersModel.getByEmail(email as string)

        console.log(userData)

        if (!userData) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Email ou senha incorretos",
                data: null,
            }
            return res.status(404).json(response)
        }


        const isPasswordValid = await comparePassword(password, userData.password)

        if (!isPasswordValid) {
            const respose: ResponseType<null> = {
                status: "error",
                message: "Credenciais invalidos",
                data: null
            }
            return res.status(401).json(respose)
        }

        const playload = {
            id: userData.id,
            email: userData.email,
            nome: userData.nome,
            role: userData.role
        }
        const token = jwt.sign(playload, process.env.JWT_SECRET as string, { expiresIn: "1h" })

        const response: ResponseType<AuthResponse> = {
            status: "success",
            message: "Login realizado com sucesso",
            data: {
                token,
                user: playload
            }
        }
        return res.status(200).json(response)
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
            const response: ResponseType<null> = {
                status: "error",
                message: "Credenciais inválidas",
                data: null
            }
            return res.status(400).json(response);
        }

        const userData = await usersModel.getByEmail(email);

        if (!userData) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Utilizador não encontrado",
                data: null
            }
            return res.status(404).json(response);
        }

        const updatePasswordResponse = await usersModel.updatePassword(
            userData.id,
            await hashPassword(newPassword)
        );

        if (!updatePasswordResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao atualizar password",
                data: null
            }
            return res.status(400).json(response);
        }

        const response: ResponseType<UserType> = {
            status: "success",
            message: "Password redefinida com sucesso",
            data: updatePasswordResponse
        }
        return res.status(200).json(response);
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
            const response: ResponseType<null> = {
                status: "error",
                message: "Id é obrigatório",
                data: null,
            }
            return res.status(400).json(response)
        }

        const deleteUserResponse = await usersModel.deleteUser(id as string)

        if (!deleteUserResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao apagar utilizador",
                data: null,
            }
            return res.status(400).json(response)
        }

        const response: ResponseType<UserType> = {
            status: "success",
            message: "Utilizador apagado com sucesso",
            data: deleteUserResponse,
        }
        return res.status(200).json(response)
    },
}