import { PrestadorServicoModel } from "../../models/prestacaoServico.model.js";
import { PrestadorModel } from "../../models/prestador.model.js";
import { usersModel } from "../../models/users.model.js";
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
    },

    //Relacionamento de tabelas
    PrestacaoServico: {
        Prestador: async (parent: { id: string }) => {
            return await PrestadorModel.get(parent.id)
        },
        Servico: async (parent: { id: string}) => {
            return await PrestadorModel.get(parent.id)
        },
        Empresa: async (parent: { id: string}) => {
            return await PrestadorModel.get(parent.id)
        },
        Orcamento: async (parent: { id: string}) => {
            return await PrestadorModel.get(parent.id)
        },
        Utilizadores: async (parent: {id: string}) => {
            return await usersModel.get(parent.id)
        }
    }
}