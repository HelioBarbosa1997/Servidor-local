import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { PrestacaoServicoDetalhadoType, PrestadorServicoTypeDB, pretadorDeServicoType } from "../utils/types.js";

export const PrestadorServicoModel = {
    async create(newPrestadorServico: PrestadorServicoTypeDB): Promise<PrestadorServicoTypeDB | null> {
        try {

            const [rows] = await db.execute<PrestadorServicoTypeDB & RowDataPacket[]>(
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

            return rows as PrestadorServicoTypeDB;

        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getAll(): Promise<PrestadorServicoTypeDB[] | null> {
        try {
            const query = `SELECT * FROM tbl_prestador_de_servico`

            const [rows] = await db.execute<PrestadorServicoTypeDB[] & RowDataPacket[]>(query)

            return rows as PrestadorServicoTypeDB[]

        } catch (error) {
            console.log(error)
            return null
        }

    },

    async get(id: string): Promise<PrestadorServicoTypeDB | null> {
        try {
            const query = `SELECT * FROM tbl_prestador_de_servico WHERE id = ?`

            const value = [id]

            const rows = await db.execute<PrestadorServicoTypeDB & RowDataPacket[]>(query, value)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] as PrestadorServicoTypeDB : null

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
    },
    async getByIdOrcamento(idOrcamento: string): Promise<PrestadorServicoTypeDB | null> {
        try {
            const [rows] = await db.execute<PrestadorServicoTypeDB[] & RowDataPacket[]>(
                `SELECT * TROM tbl_prestador_servico
                WHERE tbl_prestador_servico.id_orcamento`,

                [idOrcamento]
            )
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as PrestadorServicoTypeDB : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async getAllPrestacaoServicoDetalhada(limit: number, offset: number) {
        try {
            const query = `
            SELECT
                ps.id as id_prestacao_servico,
                ps.designacao as descricao,
                u.nome as nome_utilizador,
                u.email as email_utilizador,
                s.nome as nome_servico
                ps.crerated_at as data_pedido
                ps.urgente

            FROM tbl_prestacao_servico ps
            INNER JOIN tbl_utilizadores u ON ps.id_utilizador=u.id
            INNER JOIN tbl_servicos s ON ps.id_servico = s.id
            Order BY ps.created_at DESC
            LIMIT ? OFFSET ?
            `
            const [rows] = await db.execute<PrestacaoServicoDetalhadoType[] & RowDataPacket[]>(query, [limit.toString(), offset.toString()])

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows as PrestacaoServicoDetalhadoType[] : null
        } catch (err) {
            console.log(err)
            return null
        }
    }
}