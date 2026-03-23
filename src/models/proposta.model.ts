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
    },
    async getAll() {
        try {
            const query = `SELECT * FROM tbl_proposta`

            const rows = await db.execute(query)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []

        } catch (error) {
            console.log(error)
            return null
        }
    },
    async get(id: string) {
        try {
            const query = `SELECT * FROM tbl_proposta WHERE id = ?`

            const value = [id]

            const rows = await db.execute(query, value)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

        } catch (error) {
            console.log(error)
            return null
        }
    },
    async update(id: string, PropostaAtualizado: PropostaTypeDB) {
        try {
            const query = `UPDATE tbl_proposta 
                    SET 
                        nome=?,
                        descricao=?,
                        categoria=?,
                        enabled=?,
                        uptaded=?

                    WHERE 
                        id=?
                            ;`
            const values = [
                
                id,
                PropostaAtualizado.id_prestacao_servico,
                PropostaAtualizado.preco_hora,
                PropostaAtualizado.horas_estimadas,
                PropostaAtualizado.estado,
                PropostaAtualizado.enabled,
                Date()
            ]
            const rows = await db.execute(query, values)

            return rows
        } catch (error) {
            console.log(error)
            return null
        }
    },

    async delete(id: string) {
        try {
            const query = `DELETE FROM tbl_proposta WHERE id=?`
            const value = [id]
            const rows: any = await db.execute(query, value)
            return rows[0]?.affectedRows === 0 ? null : rows

        } catch (error) {
            console.log(error)
            return null
        }
    }
}