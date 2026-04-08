import { OrcamentoModel } from "../models/orcamento.model.js"
import { PrestadorServicoModel } from "../models/prestacaoServico.model.js"
import { PropostaModel } from "../models/proposta.model.js"
import { EstadoProposta, type OrcamentoTypeDB, type PropostaTypeDB } from "../utils/types.js"
import type { Request, Response } from "express"

export const orcamentoControler = {
    async create(req: Request, res: Response) {
        const newOrcamento: OrcamentoTypeDB = req.body
        if (!newOrcamento) {
            return res.status(400).json({
                status: "error",
                message: "Orcamento de servico invalidos",
                data: null
            })
        }
        const createOrcamentoResponse = await OrcamentoModel.create(newOrcamento)

        if (createOrcamentoResponse === null) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao pedir orcamento",
                data: null
            })
        }
        res.status(200).json({
            status: "success",
            message: "Pedido de orcamento feito com sucesso",
            data: createOrcamentoResponse
        })
    },

    async getAll(req: Request, res: Response) {
        const getAllOrcamentoResponse = await OrcamentoModel.getAll()
        if (!getAllOrcamentoResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar servidor",
                data: null
            })
        }
        return res.status(200).json({
            status: "sucess",
            message: "Orcamento feito com sucesso",
            data: getAllOrcamentoResponse
        })
    },
    async get(req: Request, res: Response) {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Id de prestador nao encontrado!",
                data: null
            })
        }
        const getOrcamentoResponse = await OrcamentoModel.get(id as string)

        if (!getOrcamentoResponse) {
            return res.status(404).json({
                status: "error",
                message: "Prestador nao encontrado!",
                data: null
            })
        }
        return res.status(200).json({
            status: "sucess",
            message: "Prestador encontrado com sucesso!",
            data: getOrcamentoResponse
        })
    },

    async updated(req: Request, res: Response) {
        const { id } = req.params

        const updateOrcamento: OrcamentoTypeDB = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Id é obrigatorio!",
                data: null
            })
        }
        if (!updateOrcamento) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar orcamento",
                data: null
            })
        }

        const updateOrcamentoResponse = await OrcamentoModel.update(id as string, updateOrcamento)
        if (!updateOrcamentoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar orcamento!",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Orcamento atualizado com sucesso!",
            data: updateOrcamentoResponse
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

        const deleteOrcamentoResponse = await OrcamentoModel.delete(id as string)

        if (!deleteOrcamentoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao eliminar orcamento!",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Orcamento criado com sucesso",
            data: deleteOrcamentoResponse
        })
    },
    /*
    //projeto final
    async calcular(req: Request, res: Response) {
        try {
            const idOrcamento = Number(req.params.id);

            if (!idOrcamento) {
                return res.status(400).json({
                    message: "ID do orçamento inválido",
                });
            }

            const resultado = await OrcamentoModel.calcularOrcamento(idOrcamento);

            return res.status(200).json({
                message: "Orçamento calculado com sucesso",
                data: resultado,
            });

        } catch (error: any) {
            return res.status(500).json({
                message: error.message,
            });
        }
    }*/

    async calculateBudget(req:Request, res: Response) {
        const {id} = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Id é obrigatorio",
                data: null
            })
        }
        const prestacaoServico = await PrestadorServicoModel.getByIdOrcamento(id as string)

        if (!prestacaoServico) {
            return res.status(404).json({
                status: "error",
                message: "Prestacao de serviço nao encontrado"
            })
        }

        const proposals = await PropostaModel.getByPrestacaoServico(prestacaoServico.id)

        if(!proposals) {
            return res.status(404).json({
                status: "error",
                message: "Proposta nao encontrado",
                data: null
            })
        }
        const acceptedProposal: PropostaTypeDB | undefined = proposals.find((proposals) => proposals.estado === EstadoProposta.ACEITE)

        if(!acceptedProposal) {
            return res.status(404).json({
                status: "error",
                message: "Ainda nenhuma proposta foi aceite",
                data: null
            })
        }

        const precoHora = acceptedProposal.preco_hora
        const horasEstimadas = acceptedProposal.horas_estimadas

        //fetch prestador to get urgency
        const prestador = await PrestadorModel.get(acceptedProposal.id_prestador)

        if (!prestador) {
            return res.status(404).json({
                status: "error",
                message: "Prestador nao encontrado",
                data: null
            })
        }
        const urgencyTax = prestador.taxaUrgencia
        const minimumDiscount = prestador.minimoDesconto
        const discountPercentage = prestador.percentagemDesconto

        //calculate the budget based no utilis
        let subtotal = precoHora * horasEstimadas

        if (subtotal> minimumDiscount) {
            subtotal = subtotal * (1 - discountPercentage)
        }

        if (prestacaoServico.urgente) {
            subtotal = subtotal *(1 - urgencyTax)
        }

        const updateOrcamentoResponse = await OrcamentoModel.updateBudget(id as string)

        if (!updateOrcamentoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao calcular orcamento",
                data: null
            })
        }
        return res.status(200).json({
                status: "sucess",
                message: "Erro ao calcular orcamento",
                data: updateOrcamentoResponse
        })
    }
}