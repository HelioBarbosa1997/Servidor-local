
export interface PedidoServicoType {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean;
}

export interface ResponseType {
    status: boolean,
    message: string,
    data: ServicoType | null,
}

export interface ServicoType {
    nome: string,
    precoHora: number
    categoria: string
    minimoDescontado: number
    percentagemDesconto?: number
}

export interface PrestadorType {
    nome: string,
    precoHora: number,
    profissao: string,
    minimoParaDesconto: number,
    percentagemDesconto: number,
    taxaUrgencia: number,
    enabled: boolean,
    created_at: string,
    updated_at: string
}

export interface UserType {
    id: string,
    nome: string,
    numero_identificacao: string,
    data_nascimento: string,
    email: string,
    telefone: string,
    pais: string,
    localidade: string,
    password: string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}

export interface ServicoDBType {
    id: string,
    nome: string,
    descricao: string,
    categoria: string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}

export interface PropostaTypeDB {
    id: string,
    id_prestacao_servico: string,
    preco_hora: number,
    horas_estimadas: number,
    estado: string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}

export interface OrcamentoTypeDB {
    id: string,
    total: number,
    id_utilizadores: string,
    enabled: boolean,
    created: string,
    updated: string
}

export interface pretadorDeServicoType {
    id: string,
    designacao: string,
    subtotal: number,
    horas_estimadas: number,
    id_prestacao_servico: string,
    id_servicos: string,
    preco_hora: number,
    estado: string,
    id_orcamento: string,
    enabled: boolean,
    created: string,
    updated: string
}

