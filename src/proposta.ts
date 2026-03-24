import db from "./lib/db.js";
import type { PropostaType } from "./utils/types.js";


export async function getPropostas() {
    const [rows] = await db.execute("SELECT * FROM tbl_servicos");
    return rows;
}

export async function getPropostasById(id: string) {
    const [rows] = await db.execute(
        "SELECT * FROM tbl_proposta WHERE id = ?",
        [id]
    );

    if (Array.isArray(rows) && rows.length === 0) return null

    return Array.isArray(rows) ? rows[0] : null;
}
export async function createPropostas(
    id: string,
    id_prestacao_servico: string,
    preco_hora: string,
    horas_estimadas: string,
    estado: string,
    enabled: boolean


) {
    try {

        const [rows] = await db.execute(
            `INSERT INTO tbl_proposta
            ( id, id_prestacao_servico, preco_hora, horas_estimadas, estado, enabled, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                null,
                id_prestacao_servico,
                preco_hora,
                horas_estimadas,
                estado,
                enabled,
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
    export async function getAll() {
        try {
            const query = `SELECT * FROM tbl_proposta`

            const rows = await db.execute(query)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []

        } catch (error) {
            console.log(error)
            return null
        }
    },
    export async function get(id: string) {
        try {
            const query = `SELECT * FROM tbl_proposta WHERE id = ?`

            const value = [id]

            const rows = await db.execute(query, value)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

        } catch (error) {
            console.log(error)
            return null
        }
    }
    export async function update(id: string, PropostaAtualizado: PropostaType) {
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
    }


export async function delete(id: string) {
    try {
        const query = `DELETE FROM tbl_proposta WHERE id=?`
        const value = [id]

        const rows: any = await db.execute(query, value)

        if (rows[0]?.affectedRows === 0) {
            return null
        }

        return rows

    } catch (error) {
        console.log(error)
        return null
    }
}
}
