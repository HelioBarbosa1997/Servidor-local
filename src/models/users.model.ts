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

    
}