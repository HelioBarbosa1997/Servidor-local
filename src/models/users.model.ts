import db from "../lib/db.js";
import { formatDateDDMMYYYY } from "../utils/date.js";
import { hashPassword } from "../utils/password.js";
import type { UserType } from "../utils/types.js";
import { generateUUID } from "../utils/uuid.js";

export const usersModel = {
    async create(newUser: UserType) {
        try {
            const [rows] = await db.execute(
                `INSERT INTO tbl_utilizadores 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    generateUUID(),
                    newUser.nome,
                    newUser.numero_identificacao,
                    formatDateDDMMYYYY(newUser.data_nascimento),
                    newUser.email,
                    newUser.telefone,
                    newUser.pais,
                    newUser.localidade,
                    await hashPassword(newUser.password),
                    newUser.enabled,
                    new Date(),
                    new Date()
                ]
            )
            console.log({ rows })
            return rows
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async get() {
        const [rows] = await db.execute("SELECT * FROM tbl_utilizadores")

        return rows
    },

    async getUserById(id: string) {
        try {
            const [rows] = await db.execute(
                `SELECT * FROM tbl_utilizadores 
        WHERE tbl_utilizadores.id = ?`,

                [id]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async updatedUser(id: string, updateUser: UserType) {
        try {
            const query = `UPDATE tbl_utilizadores
                        SET
                        nome = ?,
                        numero_identificacao = ?,
                        data_nascimento = ?,
                        email = ?,
                        telefone = ?,
                        pais = ?,
                        localidade = ?,
                        password = ?,
                        enabled = ?,
                        updated_at = ?

                        WHERE id = ?
                        `
            const values = [
                updateUser.nome,
                updateUser.numero_identificacao,
                formatDateDDMMYYYY(updateUser.data_nascimento),
                updateUser.email,
                updateUser.telefone,
                updateUser.pais,
                updateUser.localidade,
                await hashPassword(updateUser.password),
                updateUser.enabled,
                new Date(),
            ]
            const rows: any = await db.execute(query, values)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

        } catch (error) {
            console.log(error)
            return null
        }

    },


    async deleteUser(id: string) {
        try {
            const query = `DELETE tbl_utilizadore WHERE ID =? `

            const value = [id]

            const rows: any = await db.execute(query, value)

            return rows[0]?.affectedRows === 0 ? null : rows
        } catch (error) {
            console.log(error)
            return null
        }

    }
}
