import db from "../lib/db.js";
import type { PropostaTypeDB } from "../utils/types.js";


export const PropostaModel = {
    async create(newProposta: PropostaTypeDB) {
        try {

            const [rows] = await db.execute(
                `INSERT INTO tbl_proposta
            ( id, id_prestacao_servico, preco_hora, horas_estimadas, estado, enabled, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    null,
                    newProposta.id_prestacao_servico,
                    newProposta.preco_hora,
                    newProposta.horas_estimadas,
                    newProposta.estado,
                    newProposta.enabled,
                    new Date(),
                    new Date()
                ]
            );

            console.log({ rows });

            return rows;

        } catch (error) {
            console.log(error);
            return null;
        }
    }
}