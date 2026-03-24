import db from "../lib/db.js";
import type { PrestadorServicoTypeDB } from "../utils/types.js";

export const PrestadorServicoModel = {
    async create(newPrestadorServico: PrestadorServicoTypeDB) {
        try {

            const [rows] = await db.execute(
                `INSERT INTO tbl_prestador_servico
            ( id, designacao, subtotal, horas_estimadas, id_prestador, id_servicos, preco_hora, estado, id_orcamento, enabled, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?,?)`,
                [
                    null,
                    newPrestadorServico.designacao,
                    newPrestadorServico.subtotal,
                    newPrestadorServico.horas_estimadas,
                    newPrestadorServico.id_prestador,
                    newPrestadorServico.id_servicos,
                    newPrestadorServico.preco_hora,
                    newPrestadorServico.estado,
                    newPrestadorServico.id_orcamento,
                    newPrestadorServico.enabled,
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
            const query = `SELECT * FROM tbl_prestador_de_servico`

            const rows = await db.execute(query)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []

        } catch (error) {
            console.log(error)
            return null
        }

    },

    async get(id: string) {
        try {
            const query = `SELECT * FROM tbl_prestador_de_servico WHERE id = ?`

            const value = [id]

            const rows = await db.execute(query, value)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

        } catch (error) {
            console.log(error)
            return null
        }
    },
    async update(id: string, PrestadorServicoAtualizado: PrestadorServicoTypeDB) {
        try {
            const query = `UPDATE tbl_prestador_de_servico 
                    SET 
                    designacao=?, subtotal=?, horas_estimadas=?, id_prestador=?, id_servicos=?, preco_hora=?, estado=?, id_orcamento=?, enabled=?, updated_at=?

                    WHERE 
                        id=?
                            ;`
            const values = [

                PrestadorServicoAtualizado.designacao,
                PrestadorServicoAtualizado.subtotal,
                PrestadorServicoAtualizado.horas_estimadas,
                PrestadorServicoAtualizado.id_prestador,
                PrestadorServicoAtualizado.id_servicos,
                PrestadorServicoAtualizado.preco_hora,
                PrestadorServicoAtualizado.estado,
                PrestadorServicoAtualizado.id_orcamento,
                PrestadorServicoAtualizado.enabled,

                new Date()
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
            const query = `DELETE FROM tbl_prestador_de_servico WHERE id=?`
            const value = [id]
            const rows: any = await db.execute(query, value)
            return rows[0]?.affectedRows === 0 ? null : rows

        } catch (error) {
            console.log(error)
            return null
        }
    }
}