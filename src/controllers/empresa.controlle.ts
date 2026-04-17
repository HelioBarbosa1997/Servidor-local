import type { Request, Response } from "express"
import { empresaModel } from "../models/empresa.model.js"
import type { EmpresaTypeDB, ResponseType } from "../utils/types.js"


export const empresaController = {

    async createUsers(req: Request, res: Response) {
        const newEmpresa: EmpresaTypeDB = req.body

        if (!newEmpresa) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de utilizador inválidos",
                data: null,
            }
            return res.status(400).json(response)
        }

        console.log(newEmpresa)

        const createUserResponse = await empresaModel.create(newEmpresa)

        const response: ResponseType<EmpresaTypeDB> = {
            status: "success",
            message: "Utilizador criado com sucesso",
            data: createUserResponse,
        }
        return res.status(201).json(response)
    },

    async get(req: Request, res: Response) {
        const { id } = req.params

        const getUsersResponse = await empresaModel.get(id as string)

        if (!getUsersResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Usuário não encontrado",
                data: null
            }
            return res.status(404).json(response);
        }

        const response: ResponseType<EmpresaTypeDB> = {
            status: "success",
            message: "Usuario encontrado com sucesso",
            data: getUsersResponse,
        }
        return res.status(200).json(response)
    },

    async getAll(req: Request, res: Response) {
        const getAllServiceResponse = await empresaModel.getAll()
        if (!getAllServiceResponse) {

            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar servidor",
                data: null
            }
            return res.status(500).json(response)
        }

        const response: ResponseType<EmpresaTypeDB[]> = {
            status: "success",
            message: "Serviços buscado com sucesso",
            data: getAllServiceResponse
        }
        return res.status(200).json(response)
    },

    async updated(req: Request, res: Response) {
        const { id } = req.params

        const updateService: EmpresaTypeDB = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Id é obrigatorio!",
                data: null
            })
        }
        if (!updateService) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar servico",
                data: null
            })
        }

        const updateServiceResponse = await empresaModel.update(id as string, updateService)
        if (!updateServiceResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar servico",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Serviço atualizado com sucesso!",
            data: updateServiceResponse
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
    
            const deleteServiceResponse = await empresaModel.delete(id as string)
    
            if (!deleteServiceResponse) {
                return res.status(400).json({
                    status: "error",
                    message: "Erro ao apgar serviço!",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Serviço Pagado com sucesso",
                data: deleteServiceResponse
            })
        },
}