import { PropostaModel } from "../models/proposta.model.js"
import type { PropostaTypeDB, ResponseType } from "../utils/types.js"
import type { Request, Response } from "express"

export const propostaControler = {
    async create(req: Request, res: Response) {
        const newProposta: PropostaTypeDB = req.body

        if (!newProposta) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Proposta de servico invalidos",
                data: null
            }
            return res.status(400).json(response)
        }
        const createPropostaResponse = await PropostaModel.create(newProposta)

        if (createPropostaResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar Proposta",
                data: null
            }
            return res.status(400).json(response)
        }

        const response: ResponseType<PropostaTypeDB> = {
            status: "success",
            message: "Proposta criado com sucesso",
            data: createPropostaResponse
        }
        res.status(200).json(response)
    },


    async getAll(req: Request, res: Response) {
        const getAllPropostaResponse = await PropostaModel.getAll()

        if (!getAllPropostaResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar servidor",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<PropostaTypeDB[]> = {
            status: "success",
            message: "Proposta buscado com sucesso",
            data: getAllPropostaResponse
        }
        return res.status(200).json(response)
    },
    async get(req: Request, res: Response) {
        const id = req.params.id

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Id de proposta nao fornecido",
                data: null
            }
            return res.status(400).json(response)
        }
        const getPropostaResponse = await PropostaModel.get(id as string)

        if (!getPropostaResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Proposta nao efetuado!",
                data: null
            }
            return res.status(404).json(response)
        }

        const response: ResponseType<PropostaTypeDB> = {
            status: "success",
            message: "Proposta efetuado com sucesso",
            data: getPropostaResponse
        }
        return res.status(200).json(response)
    },

    async updated(req: Request, res: Response) {
        const { id } = req.params

        const updateProposta: PropostaTypeDB = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Id é obrigatorio!",
                data: null
            })
        }
        if (!updateProposta) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar Proposta",
                data: null
            })
        }

        const updatePropostaResponse = await PropostaModel.update(id as string, updateProposta)
        if (!updatePropostaResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar Proposta",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Proposta atualizado com sucesso!",
            data: updatePropostaResponse
        })
    },

    //Projeto final
    async aceitar(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            await PropostaModel.aceitarProposta(id);

            return res.status(200).json({
                status: "success",
                message: "Proposta aceite com sucesso"
            });

        } catch (error: any) {
            return res.status(400).json({
                status: "error",
                message: error.message
            });
        }
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

        const deletePropostaResponse = await PropostaModel.delete(id as string)

        if (!deletePropostaResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao eliminar proposta!",
                data: null
            }
            return res.status(400).json(response)
        }

        const response: ResponseType<PropostaTypeDB> = {
            status: "success",
            message: "Proposta eliminado com sucesso",
            data: deletePropostaResponse
        }
        return res.status(200).json(response)
    }
}
