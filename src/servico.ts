import { type PedidoServico, type Servico} from "./utils/types.js"
import db from "./lib/db.js"

export let catalogoServico: Servico[] = [];

// Adicionar um serviço novo
export function adicionarServico(servico: Servico) {

    if (servico.precoHora <= 0) {
        return {
            mensagem: "Preço inválido."
        };
    }

    for (let i = 0; i < catalogoServico.length; i++) {
        if (catalogoServico[i]?.nome === servico.nome) {
            return {
                mensagem: "Serviço já existe."
            };
        }
    }

    catalogoServico.push(servico);

    return {
        mensagem: "Serviço adicionado com sucesso.",
        nome: servico.nome,
        precoHora: servico.precoHora,
        totalServicos: catalogoServico.length
    };
}

// Listar todos os serviços

export function listarServicos(): Servico[] {
    // TODO: implimentar fetch de serviços
    return catalogoServico

}

// Apagar um serviço
export function apagarServico(nome: string): boolean {
    //TODO: implementar delete de serviço

    const novoCatalogoTemp: Servico[] = []

    for (let i = 0; i < catalogoServico.length; i++) {
        if (catalogoServico[i]?.nome !== undefined && catalogoServico[i]?.nome !== nome) {
            novoCatalogoTemp.push(catalogoServico[i]!)
        }
    } // Devolve um novo catalogo sem o servico que foi apagado

    catalogoServico = novoCatalogoTemp

    return true
}

//Obter um servico pelo nome

export function obterServico(nome: string): Servico | null {
    for (let i = 0; i < catalogoServico.length; i++) {
        if (catalogoServico[i]?.nome === nome) {
            return catalogoServico[i]!
        }
    }
    return null
}

// Funcões  servicos base de dados
export async function getService() {
    const [rows] = await db.execute("SELECT * FROM tbl_servicos")

    return rows;
}
export async function getServiceById(id: string) {
    const [rows] = await db.execute("SELECT * FROM tbl_servicos; WHERE SELECT * tbl_servicos.id = [id]")

    if (Array.isArray(rows) && rows.length === 0) return null
    return Array.isArray(rows) ? rows[0] : null
}

export async function serviceInside(service: any) {
    try {
    const body = `
    Insert Into tbl_servicos;
    (id, nome, descricao, categoria, enabled, created, updated)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        null, 
        service.nome,
        service.descricao,
        service.categoria,
        service.enabled,
        new Date(),
        new Date()
    ];

    const [results] = await db.execute(body, values);

    return results;
    } catch(err) {
        return null
    }
}
