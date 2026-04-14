import { ServiceModel } from "../models/servico.model.js"
import type { ResponseType, ServicoDBType, ServicoDetalhadoType } from "../utils/types.js"
import type { Request, Response } from "express"

export const ServicoControler = {
    async createServico(req: Request, res: Response) {
        const newService: ServicoDBType = req.body

        if (!newService) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de servico invalidos",
                data: null
            }
            return res.status(400).json(response)
        }
        const createServiceResponse = await ServiceModel.create(newService)

        if (createServiceResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar servico",
                data: null
            }
            return res.status(400).json(response)
        }

        const response: ResponseType<ServicoDBType> = {
            status: "success",
            message: "Servico criado com sucesso",
            data: createServiceResponse
        }
        res.status(200).json(response)
    },


    async getAll(req: Request, res: Response) {
        const getAllServiceResponse = await ServiceModel.getAll()
        if (!getAllServiceResponse) {

            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar servidor",
                data: null
            }
            return res.status(500).json(response)
        }

        const response: ResponseType<ServicoDBType[]> = {
            status: "success",
            message: "Serviços buscado com sucesso",
            data: getAllServiceResponse
        }
        return res.status(200).json(response)
    },


    async get(req: Request, res: Response) {
        const id = req.params.id
        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Id do serviço nao fornecido",
                data: null
            }
            return res.status(400).json(response)
        }
        const getServiceResponse = await ServiceModel.get(id as string)

        if (!getServiceResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Serviço nao encontrado!",
                data: null
            }
            return res.status(404).json(response)
        }

        const response: ResponseType<ServicoDBType> = {
            status: "success",
            message: "Serviços encontrado com sucesso",
            data: getServiceResponse
        }
        return res.status(200).json(response)
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
    },
    async getAllServicoDetalhado(req: Request, res: Response) {
        const { limit, offset } = req.query as { limit: string, offset: string }

            let LIMIT = 10
            let OFFSET = 0

        if (limit && parseInt(limit) > 0) LIMIT = parseInt(limit)
        if (offset && parseInt(offset) > 0) OFFSET = parseInt(offset)

            const getAllPrestacaoServicoResponse = await ServiceModel.getAllServicoDetalhado(LIMIT, OFFSET)

            if (!getAllPrestacaoServicoResponse) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Nenhum serviço encontrado",
                    data: null
                }
                return res.status(404).json(response);
            }

            const response: ResponseType<ServicoDetalhadoType[]> = {
                status: "success",
                message: "Serviços obtidos com sucesso",
                data: getAllPrestacaoServicoResponse
            }

            return res.status(200).json(response);

        } 
}
