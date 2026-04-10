
export interface PedidoServicoType {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean;
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
    id_prestador: string,
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
export enum EstadoProposta {
    PENDENTE = "pendente",
    ACEITE = "aceite",
    CANCELADO = "cancelado"
}

export enum EstadoPrestacao {
    PENDENTE = "pendente",
    FINALIZADO = "finalizado",
    EM_PROCESSO = "em_processo",
    CANCELADO = "cancelado"
}

export interface PrestadorServicoTypeDB {
    id: string,
	designacao: string,
	subtotal: number,
	horas_estimadas: number,
	id_prestador: string,
	id_servicos: string,
	preco_hora: number,
    urgente: boolean,
	estado: string,
    id_orcamento: string,
    id_utilizadores: string,
	enabled: boolean,
	created_at: string
	updated_at: string
}

export interface PropostaType {
    id: string,
    id_prestacao_servico: string,
    preco_hora: number,
    horas_estimadas: number,
    estado: string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}

export interface PrestadorTypeDB {
    id: string,
    taxaUrgencia: number,
    percentagemDesconto: number,
    minimoDesconto: number,
    nif: number,
    profissao: string,
    enable: boolean,
    created_at: string,
    updated_at: string
}

export interface ResponseType<T> {
    status: "success" | "error",
    message: string,
    data: T | null
}

export interface PrestacaoServicoDetalhadoType {
    id: string,
    nome_utilizador: string,
    email_utilizador: string,
    nome_servico: string,
    descricao: string,
    data_pedido: string,
    urgente: boolean
}
