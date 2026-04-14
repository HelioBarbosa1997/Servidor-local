import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { PropostaTypeDB } from "../utils/types.js";


export const PropostaModel = {
    async create(newProposta: PropostaTypeDB): Promise<PropostaTypeDB | null> {
        try {

            const [rows] = await db.execute<PropostaTypeDB & RowDataPacket[]>(
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

            return rows as PropostaTypeDB;

        } catch (error) {
            console.log(error);
            return null;
        }
    },
    async getAll(): Promise<PropostaTypeDB[] | null> {
        try {
            const query = `SELECT * FROM tbl_proposta`

            const [rows] = await db.execute<PropostaTypeDB[] & RowDataPacket[]>(query)

            return rows as PropostaTypeDB[]

        } catch (error) {
            console.log(error)
            return null
        }
    },

    
    async get(id: string): Promise<PropostaTypeDB | null> {
        try {
            const query = `SELECT * FROM tbl_proposta WHERE id = ?`

            const value = [id]

            const [rows] = await db.execute<PropostaTypeDB & RowDataPacket[]>(query, value)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] as PropostaTypeDB : null

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

    async delete(id: string): Promise<PropostaTypeDB | null> {
        try {
            const query = `DELETE FROM tbl_proposta WHERE id=?`
            const value = [id]
            const rows: any = await db.execute<PropostaTypeDB & RowDataPacket[]>(query, value)

            return rows[0]?.affectedRows === 0 ? null : rows as PropostaTypeDB

        } catch (error) {
            console.log(error)
            return null
        }
    },


    //Projecto final
    async aceitarProposta(idProposta: number) {
        const conn = await db.getConnection();

        try {
            await conn.beginTransaction();

            // 1. Buscar prestação associada
            const [rows]: any = await conn.execute(
                `SELECT id_prestacao_servico FROM tbl_propostas WHERE id = ?`,
                [idProposta]
            );

            if (rows.length === 0) {
                throw new Error("Proposta não encontrada");
            }

            const idPrestacao = rows[0].id_prestacao_servico;

            // 2. Aceitar proposta
            await conn.execute(
                `UPDATE tbl_propostas SET estado = 'Aceite' WHERE id = ?`,
                [idProposta]
            );

            // 3. Rejeitar restantes
            await conn.execute(
                `UPDATE tbl_propostas 
            SET estado = 'Rejeitada' 
            WHERE id_prestacao_servico = ? AND id != ?`,
                [idPrestacao, idProposta]
            );

            // 4. Atualizar prestação
            await conn.execute(
                `UPDATE tbl_prestacao_servico 
            SET estado = 'Aceite' 
            WHERE id = ?`,
                [idPrestacao]
            );

            await conn.commit();

            return { success: true };

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },


    async getByPrestacaoServico(idPrestacaoServico: string): Promise<PropostaTypeDB[] | null> {
        try {
            const [rows] = await db.execute<PropostaTypeDB[] & RowDataPacket[]>(
                `SELECT * FROM tbl_proposta
                WHERE tbl_proposta.id_prestador_servico = ?`,

                [idPrestacaoServico]
            )
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows : null
        } catch (err) {
            console.log(err)
            return null
        }
    }
}