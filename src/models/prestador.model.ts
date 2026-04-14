import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { PrestadorType, PrestadorTypeDB, PropostaTypeDB } from "../utils/types.js";


export const PrestadorModel = {
    async create(newPrestador: PrestadorTypeDB): Promise<PrestadorTypeDB | null> {
        try {

            const [rows] = await db.execute<PrestadorTypeDB & RowDataPacket[]>(
                `INSERT INTO tbl_prestador
            ( id, taxaUrgencia, percentagemDesconto, minimoDesconto, nif, profissao, enable, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?,?)`,
                [
                    null,
                    newPrestador.taxaUrgencia,
                    newPrestador.percentagemDesconto,
                    newPrestador.minimoDesconto,
                    newPrestador.nif,
                    newPrestador.profissao,
                    newPrestador.enable,
                    new Date(),
                    new Date()
                ]
            );

            console.log({ rows });

            return rows as PrestadorTypeDB;

        } catch (error) {
            return null;
        }
    },
    async getAll(): Promise<PrestadorTypeDB[] | null> {
        try {

            const [rows] = await db.execute<PrestadorTypeDB[] & RowDataPacket[]>(`SELECT * FROM tbl_prestador`)

            return rows as PrestadorTypeDB[]

        } catch (error) {
            return null
        }
    },

    async get(id: string): Promise<PrestadorTypeDB | null> {
        try {
            const query = `SELECT * FROM tbl_prestador WHERE id = ?`

            const value = [id]

            const [rows] = await db.execute<PrestadorTypeDB & RowDataPacket[]>(query, value)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] as PrestadorTypeDB : null

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async update(id: string, PrestadorAtualizado: PrestadorTypeDB) {
        try {
            const query = `UPDATE tbl_prestador 
                    SET 
                        taxaUrgencia=?,
                        percentagemDesconto=?,
                        minimoDesconto=?,
                        nif=?,
                        profissao=?,
                        enabled=?,
                        uptaded=?

                    WHERE 
                        id=?
                            ;`
            const values = [

                PrestadorAtualizado.taxaUrgencia,
                PrestadorAtualizado.percentagemDesconto,
                PrestadorAtualizado.minimoDesconto,
                PrestadorAtualizado.nif,
                PrestadorAtualizado.profissao,
                PrestadorAtualizado.taxaUrgencia,
                PrestadorAtualizado.enable,
                Date()
            ]
            const rows = await db.execute(query, values)

            return rows
        } catch (error) {
            console.log(error)
            return null
        }
    },

    async delete(id: string): Promise<PrestadorTypeDB | null > {
        try {
            const query = `DELETE FROM tbl_prestador WHERE id=?`
            const value = [id]

            const[rows]: any = await db.execute<PrestadorTypeDB & RowDataPacket[]>(query, value)

            return rows[0]?.affectedRows === 0 ? null : rows as PrestadorTypeDB

        } catch (error) {
            console.log(error)
            return null
        }
    }
}