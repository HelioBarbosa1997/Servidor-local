interface Servico {
    nome: string;
    precoHora: number;
    categoria: string;
    minimoDesconto: number;
    percentagemDesconto: number;
}

let catalogoServico: Servico[] = [];

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

// apagar um serviço
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

//obter um servico pelo nome

export function obterServico(nome: string): Servico | null {
    for (let i = 0; i < catalogoServico.length; i++) {
        if (catalogoServico[i]?.nome === nome) {
            return catalogoServico[i]!
        }
    }
    return null
}