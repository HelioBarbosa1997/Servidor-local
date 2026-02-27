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
