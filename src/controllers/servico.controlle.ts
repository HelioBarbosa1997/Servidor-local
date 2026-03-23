import { ServiceModel } from "../models/servico.model.js"
import type { ServicoDBType } from "../utils/types.js"
import type { Request, Response } from "express"

export const ServicoControler = {
    async createServico(req: Request, res: Response) {
        const newService: ServicoDBType = req.body

        if (!newService) {
            return res.status(400).json({
                status: "error",
                message: "Dados de servico invalidos",
                data: null
            })
        }
        const createServiceResponse = await ServiceModel.create(newService)

        if (createServiceResponse === null) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao criar servico",
                data: null
            })
        }
        res.status(200).json({
            status: "success",
            message: "Servico criado com sucesso",
            data: createServiceResponse
        })
    },
    async getAll(req: Request, res: Response) {
        const getAllServiceResponse = await ServiceModel.getAll()
        if (!getAllServiceResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar servidor",
                data: null
            })
        }
        return res.status(200).json({
            status: "sucess",
            message: "Serviços buscado com sucesso",
            data: getAllServiceResponse
        })
    },
    async get(req: Request, res: Response) {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Id do serviço nao fornecido",
                data: null
            })
        }
        const getServiceResponse = await ServiceModel.get(id as string)

        if (!getServiceResponse) {
            return res.status(404).json({
                status: "error",
                message: "Serviço nao encontrado!",
                data: null
            })
        }
        return res.status(200).json({
            status: "sucess",
            message: "Serviços encontrado com sucesso",
            data: getServiceResponse
        })
    },
    async updated(req: Request, res: Response) {
        const { id } = req.params

        const updateService: ServicoDBType = req.body

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

        const updateServiceResponse = await ServiceModel.update(id as string, updateService)
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

        const deleteServiceResponse = await ServiceModel.delete(id as string)

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
    }
}