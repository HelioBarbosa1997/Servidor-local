export interface Servico {
    nome: string;
    precoHora: number;
    categoria: string;
    minimoDesconto: number;
    percentagemDesconto: number;
}


export  interface PedidoServico {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean;
}

export interface PrestadorType {
    nome: string
    precoHora: number
    profissao: string
    minimoParaDesconto: number
    percentagemDesconto: number
    taxaUrgencia: number
}

