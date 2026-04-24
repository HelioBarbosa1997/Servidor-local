import { categoriaModel } from "../../models/categoria.model.js";
import { ServiceModel } from "../../models/servico.model.js";
import type { ServicoDBType } from "../../utils/types.js";

export const serviceResolver = {
    Query: {
        getAllService: async () => {
            return await ServiceModel.getAll();
        },
        getServiceById: async (_: any, args: { id: string }) => {
            return await ServiceModel.get(args.id)
        }
    },

    Mutation: {
        createService: async (_: any, args: { nome: string, descricao: string, categoria: string, enabled: boolean }) => {
            const service: ServicoDBType = {
                id: "",
                nome: args.nome,
                descricao: args.descricao,
                categoria: args.categoria,
                enabled: args.enabled,
                created_at: "",
                updated_at:""
            } 
            return await ServiceModel.create(service);
        },
        updateService: async (_: any, args: { id: string, service: ServicoDBType }) => {
            return await ServiceModel.update(args.id, args.service);
        },
        deleteService: async (_: any, args: { id: string }) => {
            return await ServiceModel.delete(args.id,);
        },
    },
    // Relacionamento de tabelas
    Servico: {
        Categoria: async (parent: { id: string}) => {
            return await categoriaModel.get(parent.id)
        }
    }
}