import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { OrcamentoTypeDB } from "../utils/types.js";



export const OrcamentoModel = {
    async create(newOrcamento: OrcamentoTypeDB): Promise<OrcamentoTypeDB | null> {
        try {

            const [rows] = await db.execute<OrcamentoTypeDB & RowDataPacket[]>(
                `INSERT INTO tbl_prestador
            ( id, total, id_utilizadores, enabled, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?,?)`,
                [
                    null,
                    newOrcamento.total,
                    newOrcamento.id_utilizadores,
                    newOrcamento.enabled,
                    new Date(),
                    new Date()
                ]
            );

            console.log({ rows });

            return rows as OrcamentoTypeDB;

        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getAll(): Promise<OrcamentoTypeDB[] | null> {
        try {

            const [rows] = await db.execute<OrcamentoTypeDB[] & RowDataPacket[]>(`SELECT * FROM tbl_orcamento`)

            return rows as OrcamentoTypeDB[]

        } catch (error) {
            console.log(error)
            return null
        }
    },   

    async get(id: string): Promise<OrcamentoTypeDB | null> {
        try {
            const query = `SELECT * FROM tbl_orcamento WHERE id = ?`

            const value = [id]

            const [rows] = await db.execute<OrcamentoTypeDB & RowDataPacket[]>(query, value)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] as OrcamentoTypeDB : null

        } catch (error) {
            console.log(error)
            return null
        }
    },


    async update(id: string, OrcamentoAtualizado: OrcamentoTypeDB) {
        try {
            const query = `UPDATE tbl_prestador 
                    SET 
                        id=?,
                        total=?,
                        id_utilizadores=?,
                        enabled=?,
                        uptaded=?

                    WHERE 
                        id=?
                            ;`
            const values = [

                id,
                OrcamentoAtualizado.id,
                OrcamentoAtualizado.total,
                OrcamentoAtualizado.id_utilizadores,
                OrcamentoAtualizado.enabled,
                new  Date()
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
            const query = `DELETE FROM tbl_orcamento WHERE id=?`
            const value = [id]
            const rows: any = await db.execute(query, value)
            return rows[0]?.affectedRows === 0 ? null : rows

        } catch (error) {
            console.log(error)
            return null
        }
    },


    /*
        //projecto final
        async calcularOrcamento(idOrcamento: number) {
            const connection = await db.getConnection();
    
            try {
                // 1. Buscar serviços do orçamento
                const [servicos]: any = await connection.query(
                    `
        SELECT preco_hora, horas_estimadas
        FROM tbl_prestacao_servico
        WHERE id_orcamento = ?
        `,
                    [idOrcamento]
                );
    
                if (servicos.length === 0) {
                    throw new Error("Nenhum serviço encontrado para este orçamento");
                }
    
                // 2. Calcular subtotal
                let subtotal = 0;
    
                for (const servico of servicos) {
                    subtotal += servico.preco_hora * servico.horas_estimadas;
                }
    
                // 3. Buscar dados do orçamento (urgência + prestador)
                const [[orcamento]]: any = await connection.query(
                    `
        SELECT o.taxa_urgencia, p.desconto
        FROM tbl_orcamento o
        LEFT JOIN tbl_prestadores p ON p.id = o.id_prestador
        WHERE o.id = ?
        `,
                    [idOrcamento]
                );
    
                if (!orcamento) {
                    throw new Error("Orçamento não encontrado");
                }
    
                let total = subtotal;
    
                // 4. Aplicar taxa de urgência
                if (orcamento.taxa_urgencia) {
                    total += total * (orcamento.taxa_urgencia / 100);
                }
    
                // 5. Aplicar desconto do prestador
                if (orcamento.desconto) {
                    total -= total * (orcamento.desconto / 100);
                }
    
                // 6. Atualizar total no banco
                await connection.query(
                    `
        UPDATE tbl_orcamento
        SET total = ?
        WHERE id = ?
        `,
                    [total, idOrcamento]
                );
    
                return {
                    subtotal,
                    total,
                };
    
            } catch (error) {
                throw error;
            } finally {
                connection.release();
            }
        },
    */

    async updateBudget(id: string, total: number) {
        try {
            const rows: any = await db.execute(
                `UPATED tbl_orcamento SET total = ?, updated_at = ? WHERE id = ?`,
                [total, new Date(), id]
            )
            return rows[0].affectedRows === 0 ? null : rows[0]
        } catch (err) {
            console.log(err)
            return null
        }
    }
}