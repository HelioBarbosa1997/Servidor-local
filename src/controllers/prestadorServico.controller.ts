import type { PrestadorServicoTypeDB, ResponseType } from "../utils/types.js"
import { PrestadorServicoModel } from "../models/prestacaoServico.model.js"
import type { Request, Response } from "express"



export const prestadorServicoControler = {
    async create(req: Request, res: Response) {
        const newPrestacaoServico: PrestadorServicoTypeDB = req.body
        if (!newPrestacaoServico) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Orcamento de servico invalidos",
                data: null
            }
            return res.status(400).json(response)
        }
        const createPrestadorServicoResponse = await PrestadorServicoModel.create(newPrestacaoServico)

        if (createPrestadorServicoResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao pedir orcamento",
                data: null
            }
            return res.status(400).json(response)
        }

        const response: ResponseType<PrestadorServicoTypeDB> = {
            status: "success",
            message: "Pedido de orcamento feito com sucesso",
            data: createPrestadorServicoResponse
        }
        res.status(200).json(response)
    },


    async getAll(req: Request, res: Response) {
        const getAllPrestadorServicoResponse = await PrestadorServicoModel.getAll()

        if (!getAllPrestadorServicoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar servidor",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<PrestadorServicoTypeDB[]> = {
            status: "success",
            message: "Prestacao de servico feito com sucesso",
            data: getAllPrestadorServicoResponse
        }
        return res.status(200).json(response)
    },

    async get(req: Request, res: Response) {
        const id = req.params.id
        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Id de prestação de serviço nao encontrado!",
                data: null
            }
            return res.status(400).json(response)
        }
        const getPrestadorServicoResponse = await PrestadorServicoModel.get(id as string)

        if (!getPrestadorServicoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Prestação de servico nao encontrado!",
                data: null
            }
            return res.status(404).json(response)
        }

        const response: ResponseType<PrestadorServicoTypeDB> = {
            status: "success",
            message: "Prestacao de serviço encontrado com sucesso!",
            data: getPrestadorServicoResponse
        }
        return res.status(200).json(response)
    },


    async updated(req: Request, res: Response) {
        const { id } = req.params

        const updatePrestadorServico: PrestadorServicoTypeDB = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Id é obrigatorio!",
                data: null
            })
        }
        if (!updatePrestadorServico) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar Prestador de serviço",
                data: null
            })
        }

        const updatePrestadorServicoResponse = await PrestadorServicoModel.update(id as string, updatePrestadorServico)
        if (!updatePrestadorServicoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar Prestador de serviço!",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Prestador de serviço atualizado com sucesso!",
            data: updatePrestadorServicoResponse
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

        const deletePrestadorServicoResponse = await PrestadorServicoModel.delete(id as string)

        if (!deletePrestadorServicoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao eliminar prestador de serviço!",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Prestador de serviço criado com sucesso",
            data: deletePrestadorServicoResponse
        })
    },

    async getAllPrestacaoServicoDetalhada(req: Request, res: Response) {
        const { limit, offset } = req.query as { limit: string, offset: string }

        let LIMIT = 10
        let OFFSET = 0

        if (limit && parseInt(limit) > 0) LIMIT = parseInt(limit)
        if (offset && parseInt(offset) > 0) OFFSET = parseInt(offset)

        const getAllPrestacaoServicoResponse = await PrestadorServicoModel.getAllPrestacaoServicoDetalhada(LIMIT, OFFSET)

        if (!getAllPrestacaoServicoResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar prestacoes de servico",
                data: null
            })
        }
        return res.status(200).json({
            status: "sucess",
            message: "Prestadocoes de servico buscadas com sucesso",
            data: getAllPrestacaoServicoResponse
        })
    }
}

