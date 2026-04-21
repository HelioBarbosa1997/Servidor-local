import { OrcamentoModel } from "../../models/orcamento.model.js";
import type { OrcamentoTypeDB } from "../../utils/types.js";

export const orcamentoResolver = {
    Query: {
        getAllOrcamento: async () => {
            return await OrcamentoModel.getAll();
        },

        getOrcamentoById: async (_: any, args: { id: string }) => {
            return await OrcamentoModel.get(args.id)
        }
    },

    Mutation: {
        createOrcamento: async (_: any, args: { orcamento: OrcamentoTypeDB }) => {
            return await OrcamentoModel.create(args.orcamento);
        },
        updateOrcamento: async (_: any, args: { id: string, orcamento: OrcamentoTypeDB }) => {
            return await OrcamentoModel.update(args.id, args.orcamento);
        },
        deleteOrcamento: async (_: any, args: { id: string }) => {
            return await OrcamentoModel.delete(args.id,);
        }

    }
}