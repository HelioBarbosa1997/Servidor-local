import db from "./lib/db.js";
import type { PropostaType } from "./utils/types.js";

// --- BUSCAR TODAS AS PROPOSTAS ---
export async function getPropostas() {
    try {
        const [rows] = await db.execute("SELECT * FROM tbl_proposta");
        return rows;
    } catch (error) {
        console.error("Erro ao buscar propostas:", error);
        return [];
    }
}

// --- BUSCAR POR ID ---
export async function getPropostaById(id: string) {
    try {
        const [rows]: any = await db.execute(
            "SELECT * FROM tbl_proposta WHERE id = ?",
            [id]
        );
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error("Erro ao buscar proposta por ID:", error);
        return null;
    }
}

// --- CRIAR NOVA PROPOSTA ---
export async function createProposta(proposta: PropostaType) {
    try {
        const query = `
            INSERT INTO tbl_proposta 
            (id_prestacao_servico, preco_hora, horas_estimadas, estado, enabled, created_at, updated_at) 
            VALUES (?, ?, ?, ?, ?, NOW(), NOW())`;

        const values = [
            proposta.id_prestacao_servico,
            proposta.preco_hora,
            proposta.horas_estimadas,
            proposta.estado,
            proposta.enabled
        ];

        const [result] = await db.execute(query, values);
        return result;
    } catch (error) {
        console.error("Erro ao criar proposta:", error);
        return null;
    }
}

// --- ATUALIZAR PROPOSTA ---
export async function updateProposta(id: string, proposta: PropostaType) {
    try {
        const query = `
            UPDATE tbl_proposta 
            SET 
                id_prestacao_servico = ?, 
                preco_hora = ?, 
                horas_estimadas = ?, 
                estado = ?, 
                enabled = ?, 
                updated_at = NOW()
            WHERE id = ?`;

        const values = [
            proposta.id_prestacao_servico,
            proposta.preco_hora,
            proposta.horas_estimadas,
            proposta.estado,
            proposta.enabled,
            id
        ];

        const [result] = await db.execute(query, values);
        return result;
    } catch (error) {
        console.error("Erro ao atualizar proposta:", error);
        return null;
    }
}

// --- REMOVER PROPOSTA ---
// Nota: 'delete' é uma palavra reservada no JS, por isso usamos 'removerProposta'
export async function removerProposta(id: string) {
    try {
        const query = `DELETE FROM tbl_proposta WHERE id = ?`;
        const [result]: any = await db.execute(query, [id]);

        if (result.affectedRows === 0) return null;
        return result;
    } catch (error) {
        console.error("Erro ao remover proposta:", error);
        return null;
    }
}