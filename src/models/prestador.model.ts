import db from "../lib/db.js";
import type { PrestadorType } from "../utils/types.js";


export const PrestadorModel = {
    async create(newPrestador: PrestadorType) {
        try {

            const [rows] = await db.execute(
                `INSERT INTO tbl_prestador
            ( id, nome, precoHora, minimoParaDesconto, percentagemDesconto, enabled, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?,?)`,
                [
                    null,
                    newPrestador.nome,
                    newPrestador.precoHora,
                    newPrestador.minimoParaDesconto,
                    newPrestador.percentagemDesconto,
                    newPrestador.taxaUrgencia,
                    newPrestador.enabled,
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
            const query = `SELECT * FROM tbl_prestador`

            const rows = await db.execute(query)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async get(id: string) {
        try {
            const query = `SELECT * FROM tbl_prestador WHERE id = ?`

            const value = [id]

            const rows = await db.execute(query, value)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async update(id: string, PrestadorAtualizado: PrestadorType) {
        try {
            const query = `UPDATE tbl_prestador 
                    SET 
                        nome=?,
                        precoHora=?,
                        profissao=?,
                        minimoParaDesconto=?,
                        percentagemDesconto=?,
                        taxaUrgencia=?,
                        enabled=?,
                        uptaded=?

                    WHERE 
                        id=?
                            ;`
            const values = [
                
                id,
                PrestadorAtualizado.nome,
                PrestadorAtualizado.precoHora,
                PrestadorAtualizado.profissao,
                PrestadorAtualizado.minimoParaDesconto,
                PrestadorAtualizado.percentagemDesconto,
                PrestadorAtualizado.taxaUrgencia,
                PrestadorAtualizado.enabled,
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
            const query = `DELETE FROM tbl_prestador WHERE id=?`
            const value = [id]
            const rows: any = await db.execute(query, value)
            return rows[0]?.affectedRows === 0 ? null : rows

        } catch (error) {
            console.log(error)
            return null
        }
    }
}