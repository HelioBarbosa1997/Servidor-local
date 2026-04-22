import { PrestadorServicoModel } from "../../models/prestacaoServico.model.js";
import { PrestadorModel } from "../../models/prestador.model.js";
import { PropostaModel } from "../../models/proposta.model.js";
import type { PropostaTypeDB } from "../../utils/types.js";

export const propostaResolver = {
    Query: {
        getAllProposta: async () => {
            return await PropostaModel.getAll();
        },

        getPropostaById: async (_: any, args: { id: string }) => {
            return await PropostaModel.get(args.id)
        }
    },

    Mutation: {
        createProposta: async (_: any, args: { proposta: PropostaTypeDB }) => {
            return await PropostaModel.create(args.proposta);
        },
        updateProposta: async (_: any, args: { id: string, proposta: PropostaTypeDB }) => {
            return await PropostaModel.update(args.id, args.proposta);
        },
        deleteProposta: async (_: any, args: { id: string }) => {
            return await PropostaModel.delete(args.id,);
        }
    },
    // Relacionamento de tabela
    Proposta: {
        PrestacaoServico: async (parent: {id: string}) => {
            return await PrestadorServicoModel.get(parent.id)
        },
        Prestador: async (parent: { id: string}) => {
            return await PrestadorModel.get(parent.id)
        }
    }
}