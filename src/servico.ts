interface Servico {
    nome: string;
    precoHora: number;
    categoria: string;
    minimoDesconto: number;
    percentagemDesconto: number;
}

let catalogoServico: Servico[] = [];

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