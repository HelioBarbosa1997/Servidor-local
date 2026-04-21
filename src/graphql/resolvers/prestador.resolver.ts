import { PrestadorModel } from "../../models/prestador.model.js";
import type { PrestadorTypeDB } from "../../utils/types.js";


export const prestadorResolver = {
    Query: {
        getAllPrestador: async () => {
            return await PrestadorModel.getAll();
        },
        getPrestadorById: async (_: any, args: { id: string }) => {
            return await PrestadorModel.get(args.id)
        }
    },

    Mutation: {
        createPrestador: async (_: any, args: { prestador: PrestadorTypeDB }) => {
            return await PrestadorModel.create(args.prestador);
        },
        updatePrestador: async (_: any, args: { id: string, prestador: PrestadorTypeDB }) => {
            return await PrestadorModel.update(args.id, args.prestador);
        },
        deletePrestador: async (_: any, args: { id: string }) => {
            return await PrestadorModel.delete(args.id,);
        }

    }
}