import type { RowDataPacket } from "mysql2"
import type { EmpresaTypeDB } from "../utils/types.js"
import { generateUUID } from "../utils/uuid.js"
import db from "../lib/db.js"


export const empresaModel = {
    async create(newEmpresa: EmpresaTypeDB): Promise<EmpresaTypeDB | null> {
        try {
            const [rows] = await db.execute<EmpresaTypeDB & RowDataPacket[]>(
                `INSERT INTO tbl_empresa 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    generateUUID(),
                    newEmpresa.designacao,
                    newEmpresa.descricao,
                    newEmpresa.nif,
                    newEmpresa.icone,
                    newEmpresa.id_utilizadores,
                    newEmpresa.localidade,
                    newEmpresa.enabled,
                    new Date(),
                    new Date()
                ]
            )
            console.log({ rows })
            return rows as EmpresaTypeDB
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async getAll(): Promise<EmpresaTypeDB[] | null> {
        try {
            const query = `SELECT * FROM tbl_empresa`

            const [rows] = await db.execute<EmpresaTypeDB[] & RowDataPacket[]>(query);

            return rows as EmpresaTypeDB[]

        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async get(id: string): Promise<EmpresaTypeDB | null> {
        try {
            const query = `SELECT * FROM tbl_empresa WHERE id = ?`

            const value = [id]

            const [rows] = await db.execute<EmpresaTypeDB & RowDataPacket[]>(query, value)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] as EmpresaTypeDB : null

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async update(id: string, updateEmpresa: EmpresaTypeDB): Promise<EmpresaTypeDB | null> {
        try {
            const query = `UPDATE tbl_empresa
                        SET
                        id = ?,
                        designacao = ?,
                        descricao = ?,
                        nif = ?,
                        icone = ?,
                        id_utilizadores = ?,
                        localidade = ?,
                        enabled = ?,
                        updated_at = ?

                        WHERE id = ?
                        `
            const values = [
                updateEmpresa.id,
                updateEmpresa.designacao,
                updateEmpresa.descricao,
                updateEmpresa.nif,
                updateEmpresa.icone,
                updateEmpresa.id_utilizadores,
                updateEmpresa.localidade,
                updateEmpresa.enabled,
                new Date(),
            ]
            const rows: any = await db.execute<EmpresaTypeDB & RowDataPacket[]>(query, values)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

        } catch (error) {
            console.log(error)
            return null
        }

    },

    async delete(id: string): Promise<EmpresaTypeDB | null> {
        try {
            const query = `DELETE tbl_empresa WHERE ID =? `

            const value = [id]

            const rows: any = await db.execute<EmpresaTypeDB & RowDataPacket[]>(query, value)

            return rows[0]?.affectedRows === 0 ? null : rows as EmpresaTypeDB
        } catch (error) {
            console.log(error)
            return null
        }

    },


}