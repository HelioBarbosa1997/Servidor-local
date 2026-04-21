import { PrestadorServicoModel } from "../../models/prestacaoServico.model.js";
import type { PrestadorServicoTypeDB } from "../../utils/types.js";

export const prestacaoServicoResolver = {
    Query: {
        getAllPrestacaoServico: async () => {
            return await PrestadorServicoModel.getAll();
        },

        getPrestacaoServicoById: async (_: any, args: { id: string }) => {
            return await PrestadorServicoModel.get(args.id)
        }
    },

    Mutation: {
        createPrestacaoPrestacao: async (_: any, args: { prestacaoServico: PrestadorServicoTypeDB }) => {
            return await PrestadorServicoModel.create(args.prestacaoServico);
        },
        updatePrestacaoServico: async (_: any, args: { id: string, prestacaoServico: PrestadorServicoTypeDB }) => {
            return await PrestadorServicoModel.update(args.id, args.prestacaoServico);
        },
        deletePrestacaoServico: async (_: any, args: { id: string }) => {
            return await PrestadorServicoModel.delete(args.id,);
        }

    }
}