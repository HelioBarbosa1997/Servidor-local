import { empresaModel } from "../../models/empresa.model.js";
import type { EmpresaTypeDB } from "../../utils/types.js";

export const empresaResolver = {
    Query: {
        getAllEmpresa: async () => {
            return await empresaModel.getAll();
        },

        getEmpresaById: async (_: any, args: { id: string }) => {
            return await empresaModel.get(args.id)
        }
    },

    Mutation: {
        createEmpresa: async (_: any, args: { empresa: EmpresaTypeDB }) => {
            return await empresaModel.create(args.empresa);
        },
        updateEmpresa: async (_: any, args: { id: string, empresa: EmpresaTypeDB }) => {
            return await empresaModel.update(args.id, args.empresa);
        },
        deleteEmpresa: async (_: any, args: { id: string }) => {
            return await empresaModel.delete(args.id,);
        }

    }
}