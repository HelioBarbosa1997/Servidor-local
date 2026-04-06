import db from "./lib/db.js"
import type { PrestadorType } from "./utils/types.js"
import { generateUUID } from "./utils/uuid.js"

class Prestador {
    nome: string
    precoHora: number
    profissao: string
    minimoParaDesconto: number
    percentagemDesconto: number
    taxaUrgencia: number

    constructor(
        nomeDoPrestador: string,
        precoHoraDoPrestador: number,
        profissaoDoPrestador: string,
        minimoParaDescontoDoPrestador: number,
        percentagemDescontoDoPrestador: number,
        taxaUrgenciaDoPrestador: number
    ) {
        this.nome = nomeDoPrestador
        this.precoHora = precoHoraDoPrestador
        this.profissao = profissaoDoPrestador
        this.minimoParaDesconto = minimoParaDescontoDoPrestador
        this.percentagemDesconto = percentagemDescontoDoPrestador
        this.taxaUrgencia = taxaUrgenciaDoPrestador
    }

    alterarPrecoHora(novoPrecoHora: number) {
        this.precoHora = novoPrecoHora
    }

    alterarNome(novoNome: string) {
        this.nome = novoNome
    }
}

const prestador1 = new Prestador(
    "Tiago",
    100,
    "Desenvolvidor de software",
    1000,
    0.1,
    0.3
)

console.log(prestador1.precoHora) // preco hora do prestador, 100

prestador1.alterarPrecoHora(150)
prestador1.alterarNome("Tiago Soares")

console.log(prestador1.precoHora) // preco hora do prestador, 150
console.log(prestador1.nome) // nome do prestador, Tiago Soares

/* 
    nome: "Tiago"
    precoHora: 100
    profissao: "Desenvolvidor de software"
    minimoParaDesconto: 1000
    percentagemDesconto: 0.1
    taxaUrgencia: 0.3
*/



    export async function create(newPrestador: PrestadorType) {
        try {

            const [rows] = await db.execute(
                `INSERT INTO tbl_prestador
            ( id, nome, precoHora, minimoParaDesconto, percentagemDesconto, enabled, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?,?)`,
                [
                    generateUUID(),
                    newPrestador.nome,
                    newPrestador.precoHora,
                    newPrestador.minimoParaDesconto,
                    newPrestador.percentagemDesconto,
                    newPrestador.taxaUrgencia,
                    newPrestador.enabled,
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
    }
    export async function getAll() {
        try {
            const query = `SELECT * FROM tbl_prestador`

            const rows = await db.execute(query)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []

        } catch (error) {
            console.log(error)
            return null
        }
    }

    export async function get(id: string) {
        try {
            const query = `SELECT * FROM tbl_prestador WHERE id = ?`

            const value = [id]

            const rows = await db.execute(query, value)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

        } catch (error) {
            console.log(error)
            return null
        }
    }

    export async function update(id: string, PrestadorAtualizado: PrestadorType) {
        try {
            const query = `UPDATE tbl_prestador 
                    SET 
                        nome=?,
                        precoHora=?,
                        profissao=?,
                        minimoParaDesconto=?,
                        percentagemDesconto=?,
                        taxaUrgencia=?,
                        enabled=?,
                        uptaded=?

                    WHERE 
                        id=?
                            ;`
            const values = [
                
                PrestadorAtualizado.nome,
                PrestadorAtualizado.precoHora,
                PrestadorAtualizado.profissao,
                PrestadorAtualizado.minimoParaDesconto,
                PrestadorAtualizado.percentagemDesconto,
                PrestadorAtualizado.taxaUrgencia,
                PrestadorAtualizado.enabled,
                Date()
            ]
            const rows = await db.execute(query, values)

            return rows
        } catch (error) {
            console.log(error)
            return null
        }
    }

    export async function removerPrestador(id: string): Promise<boolean | null>  {
        try {
            const query = `DELETE FROM tbl_prestador WHERE id=?`
            const value = [id]
            const rows: any = await db.execute(query, value)
            return rows[0]?.affectedRows === 0 ? null : rows

        } catch (error) {
            console.log(error)
            return null
        }
    }
