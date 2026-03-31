import { usersModel } from "../models/users.model.js"
import { comparePassword } from "../utils/password.js"
import type { UserType } from "../utils/types.js"
import type { Request, Response } from "express"
import jwt from "jsonwebtoken"

export const userController = {
    
    async createUsers(req: Request, res: Response) {
        const newUser: UserType = req.body

        if (!newUser) {
            return res.status(400).json({
                status: "error",
                message: "Dados de utilizador inválidos",
                data: null,
            })
        }

        console.log(newUser)

        const createUserResponse = await usersModel.create(newUser)

        return res.status(201).json({
            status: "success",
            message: "Utilizador criado com sucesso",
            data: createUserResponse,
        })
    },

    // Listar todos os utilizadores
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

        if (!email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Credenciais inválidas",
                data: null,
            })
        }

        const userData = await usersModel.getByEmail(email as string)

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
                message:"Credenciais invalidos",
                data: null
            })
        }

        const playload = {
            id: userData.id,
            email:userData.email,
            nome:userData.nome
        }
        const token = jwt.sign(playload, process.env.JWT_SECRET as string, {expiresIn: "1h"})

        return res.status(200).json({
            status: "sucess",
            message: "Login realizado com sucesso",
            data: {
                token,
                user:playload
            }
        })
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