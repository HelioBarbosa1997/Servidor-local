import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { ServicoDBType, ServicoDetalhadoType } from "../utils/types.js";
import { generateUUID } from "../utils/uuid.js";

export const ServiceModel = {
    async create(newService: ServicoDBType): Promise<ServicoDBType | null> {
        try {

            const query = `INSERT INTO tbl_servicos VALUES (?, ?, ?, ?, ?, ?, ?)`

            const values = [
                generateUUID(),
                newService.nome,
                newService.descricao,
                newService.categoria,
                newService.enabled,
                new Date(),
                new Date()
            ]

            const [rows] = await db.execute<ServicoDBType & RowDataPacket[]>(query, values)

            return rows as ServicoDBType;
        } catch (error) {
            console.log(error)
            return null
        }
    },

    async getAll(): Promise<ServicoDBType[] | null> {
        try {

            const [rows] = await db.execute<ServicoDBType[] & RowDataPacket[]>(`SELECT * FROM tbl_servicos`)

            return rows as ServicoDBType[]

        } catch (error) {
            console.log(error)
            return null
        }
    },
    async get(id: string): Promise<ServicoDBType | null> {
        try {
            const query = `SELECT * FROM tbl_servicos WHERE id = ?`

            const value = [id]

            const [rows] = await db.execute<ServicoDBType & RowDataPacket[]>(query, value)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] as ServicoDBType : null

        } catch (error) {
            console.log(error)
            return null
        }
    },
    async update(id: string, servicoAtualizado: ServicoDBType) {
        try {
            const query = `UPDATE tbl_servicos 
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
                servicoAtualizado.nome,
                servicoAtualizado.descricao,
                servicoAtualizado.categoria,
                servicoAtualizado.enabled,
                new Date(),
                id
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
            const query = `DELETE FROM tbl_servicos WHERE id=?`
            const value = [id]
            const rows: any = await db.execute(query, value)
            return rows[0]?.affectedRows === 0 ? null : rows

        } catch (error) {
            console.log(error)
            return null
        }
    },
    async getAllServicoDetalhado(limit: number, offset: number): Promise<ServicoDetalhadoType[] | null> {
        try {
            const query = `
            SELECT
                s.id
                s.nome
                s.descricao
                c.descricao as designacao_categoria
                c.icone as icone_categoria
                e.id as id_emprensa
                e.designacao as designacao_empresa
                e.icone as icone_empresa
                s.enabled
            `
            const values = [limit, offset]

            const [rows] = await db.execute<ServicoDetalhadoType & RowDataPacket[]>(query, values)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] as ServicoDetalhadoType[] : null
        } catch (error) {
            console.log(error)
            return null
        }
    }
}