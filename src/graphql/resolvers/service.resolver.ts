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
        createService: async (_: any, args: { service: ServicoDBType }) => {
            return await ServiceModel.create(args.service);
        },
        updateService: async (_: any, args: { id: string, service: ServicoDBType }) => {
            return await ServiceModel.update(args.id, args.service);
        },
        deleteService: async (_: any, args: { id: string }) => {
            return await ServiceModel.delete(args.id,);
        }

    }
}