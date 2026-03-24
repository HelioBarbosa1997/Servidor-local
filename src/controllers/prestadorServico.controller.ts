import type { PrestadorServicoTypeDB } from "../utils/types.js"
import { PrestadorServicoModel } from "../models/prestadorServico.model.js"
import type { Request, Response } from "express"



export const prestadorServicoControler = {
    async create(req: Request, res: Response) {
        const newPrestacaoServico: PrestadorServicoTypeDB = req.body
        if (!newPrestacaoServico) {
            return res.status(400).json({
                status: "error",
                message: "Orcamento de servico invalidos",
                data: null
            })
        }
        const createPrestadorServicoResponse = await PrestadorServicoModel.create(newPrestacaoServico)

        if (createPrestadorServicoResponse === null) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao pedir orcamento",
                data: null
            })
        }
        res.status(200).json({
            status: "success",
            message: "Pedido de orcamento feito com sucesso",
            data: createPrestadorServicoResponse
        })
    },
    async getAll(req: Request, res: Response) {
        const getAllPrestadorServicoResponse = await PrestadorServicoModel.getAll()
        if (!getAllPrestadorServicoResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar servidor",
                data: null
            })
        }
        return res.status(200).json({
            status: "sucess",
            message: "Prestacao de servico feito com sucesso",
            data: getAllPrestadorServicoResponse
        })
    },

    async get(req: Request, res: Response) {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Id de prestação de serviço nao encontrado!",
                data: null
            })
        }
        const getPrestadorServicoResponse = await PrestadorServicoModel.get(id as string)

        if (!getPrestadorServicoResponse) {
            return res.status(404).json({
                status: "error",
                message: "Prestação de servico nao encontrado!",
                data: null
            })
        }
        return res.status(200).json({
            status: "sucess",
            message: "Prestacao de serviço encontrado com sucesso!",
            data: getPrestadorServicoResponse
        })
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
        }
    }

