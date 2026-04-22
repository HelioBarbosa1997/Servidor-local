import { categoriaModel } from "../../models/categoria.model.js";
import type { CategoriaTypeBD } from "../../utils/types.js";

export const categoriaResolver = {
    Query: {
        getAllCategoria: async () => {
            return await categoriaModel.getAll();
        },

        getCategoriaById: async (_: any, args: { id: string }) => {
            return await categoriaModel.get(args.id)
        }
    },

    Mutation: {
        createCategoria: async (_: any, args: { categoria: CategoriaTypeBD }) => {
            return await categoriaModel.create(args.categoria);
        },
        updateCategoria: async (_: any, args: { id: string, categoria: CategoriaTypeBD }) => {
            return await categoriaModel.updated(args.id, args.categoria);
        },
        deleteCategoria: async (_: any, args: { id: string }) => {
            return await categoriaModel.delete(args.id,);
        }
    }
    
}