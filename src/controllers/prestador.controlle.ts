import type { Request, Response } from "express"
import type { PrestadorTypeDB, ResponseType } from "../utils/types.js"
import { PrestadorModel } from "../models/prestador.model.js"

export const prestadorControler = {
    async create(req: Request, res: Response) {
        const newPrestador: PrestadorTypeDB = req.body
        if (!newPrestador) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Prestador de servico invalidos",
                data: null
            }
            return res.status(400).json(response)


        }
        const createPrestadorResponse = await PrestadorModel.create(newPrestador)

        if (createPrestadorResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar Prestador",
                data: null
            }
            return res.status(400).json(response)
        }
        const response: ResponseType<PrestadorTypeDB> = {
            status: "success",
            message: "Prestador criado com sucesso",
            data: createPrestadorResponse
        }
        return res.status(200).json(response)
    },


    async getAll(req: Request, res: Response) {
        const getAllPrestadorResponse = await PrestadorModel.getAll()
        if (!getAllPrestadorResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar servidor",
                data: null
            }
            return res.status(500).json(response)
        }

        const response: ResponseType<PrestadorTypeDB[]> = {
            status: "success",
            message: "Prestador buscado com sucesso",
            data: getAllPrestadorResponse
        }
        return res.status(200).json(response)
    },

    async get(req: Request, res: Response) {
        const id = req.params.id
        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Id de prestador nao encontrado!",
                data: null
            }
            return res.status(400).json({

            })
        }
        const getPrestadorResponse = await PrestadorModel.get(id as string)

        if (!getPrestadorResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Prestador nao encontrado!",
                data: null
            }
            return res.status(404).json(response)

        }
        const response: ResponseType<PrestadorTypeDB> = {
            status: "success",
            message: "Prestador encontrado com sucesso!",
            data: getPrestadorResponse
        }
        return res.status(200).json(response)
    },

    async updated(req: Request, res: Response) {
        const { id } = req.params

        const updatePrestador: PrestadorTypeDB = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Id é obrigatorio!",
                data: null
            })
        }
        if (!updatePrestador) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar Prestador",
                data: null
            })
        }

        const updatePrestadorResponse = await PrestadorModel.update(id as string, updatePrestador)
        if (!updatePrestadorResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar Prestador!",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Prestador atualizado com sucesso!",
            data: updatePrestadorResponse
        })
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params


        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Id é obrigatorio",
                data: null
            }
            return res.status(400).json(response)
        }

        const deletePrestadorResponse = await PrestadorModel.delete(id as string)

        if (!deletePrestadorResponse) {
            const response : ResponseType<null> = {
                status: "error",
                message: "Erro ao eliminar prestador!",
                data: null
            }
            return res.status(400).json(response)
        }

        const response: ResponseType<PrestadorTypeDB> = {
            status: "success",
            message: "Prestador eliminado com sucesso",
            data: deletePrestadorResponse
        }
        return res.status(200).json(response)
    }
}