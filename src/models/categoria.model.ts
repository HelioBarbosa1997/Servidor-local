import type { RowDataPacket } from "mysql2"
import type { CategoriaTypeBD } from "../utils/types.js"
import { generateUUID } from "../utils/uuid.js"
import db from "../lib/db.js"


export const categoriaModel = {
    async create(newCategoria: CategoriaTypeBD): Promise<CategoriaTypeBD | null> {
        try {
            const [rows] = await db.execute<CategoriaTypeBD & RowDataPacket[]>(
                `INSERT INTO tbl_categoria 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    generateUUID(),
                    newCategoria.designacao,
                    newCategoria.designacao,
                    newCategoria.icone,
                    newCategoria.icone,
                    new Date(),
                    new Date()
                ]
            )
            console.log({ rows })
            return rows as CategoriaTypeBD
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async getAll(): Promise<CategoriaTypeBD[] | null> {
        try {
            const query = `SELECT * FROM tbl_categoria`

            const [rows] = await db.execute<CategoriaTypeBD[] & RowDataPacket[]>(query);

            return rows as CategoriaTypeBD[]

        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async get(id: string): Promise<CategoriaTypeBD | null> {
        try {
            const query = `SELECT * FROM tbl_categoria WHERE id = ?`

            const value = [id]

            const [rows] = await db.execute<CategoriaTypeBD & RowDataPacket[]>(query, value)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] as CategoriaTypeBD : null

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async updated(id: string, updateCategoria: CategoriaTypeBD): Promise<CategoriaTypeBD | null> {
        try {
            const query = `UPDATE tbl_categoria
                        SET
                        id = ?,
                        designacao = ?,
                        icone = ?,
                        created_at = ?,
                        updated_at = ?

                        WHERE id = ?
                        `
            const values = [
                updateCategoria.id,
                updateCategoria.designacao,
                updateCategoria.icone,
                new Date(),
                new Date()
            ]
            const rows: any = await db.execute<CategoriaTypeBD & RowDataPacket[]>(query, values)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

        } catch (error) {
            console.log(error)
            return null
        }

    },

    async categoria(id: string): Promise<CategoriaTypeBD | null> {
        const query = `SELECT * FROM tbl_categoria`

        const value = [id]

        const [rows] = await db.execute<CategoriaTypeBD & RowDataPacket[]>(query, value)

        return rows as CategoriaTypeBD

    },

    async delete(id: string): Promise<CategoriaTypeBD | null> {
        try {
            const query = `DELETE tbl_categoria WHERE ID =? `

            const value = [id]

            const rows: any = await db.execute<CategoriaTypeBD & RowDataPacket[]>(query, value)

            return rows[0]?.affectedRows === 0 ? null : rows as CategoriaTypeBD
        } catch (error) {
            console.log(error)
            return null
        }

    },


}