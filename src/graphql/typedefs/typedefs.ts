import { gql } from "graphql-tag"

export const typeDefs = gql`
    type Utilizador {
        id: ID!,
        nome: String!,
        numero_identificacao: String!,
        data_nascimento: String!,
        email: String!,
        telefone: String!,
        pais: String!,
        localidade: String,
        password: String,
        role: Role
        enabled: Boolean,
        created_at: String,
        updated_at: String
    }
    enum Role {
        CLIENTE = "cliente",
        ADMIN = "admin",
        PRESTADOR = "prestador",
        EMPRESA = "empresa"

    type Proposta {
        id: ID!,
        id_prestacao_servico: ID!,
        preco_hora: Float!,
        horas_estimadas: Int,
        id_prestador: ID!,
        estado: EstadoProposta,
        owner: String,
        enabled: boolean,
        created_at: string,
        updated_at: string
    }
    enum EstadoProposta {
        PENDENTE = "pendente",
        ACEITE = "aceite",
        CANCELADO = "cancelado"
    }

    type Service {
        id: ID!,
        nome: String!,
        descricao: String!,
        categoria: String!,
        enabled: Boolean,
        created_at: String,
        updated_at: String
    }

    type Prestador {
        id: ID!,
        taxaUrgencia: INT!,
        percentagemDesconto: INT!,
        minimoDesconto: INT!,
        nif: INT!,
        profissao: String,
        enable: boolean,
        created_at: string,
        updated_at: string
    }

    type PrestacaoServico {
        id: ID!,
        designacao: String!,
        subtotal: INT!,
        horas_estimadas: INT!,
        id_prestador: ID!,
        id_servicos: ID!,
        id_empresa: String!,
        tipo_prestador: TipoPrestador,
        preco_hora: INT!,
        urgente: Boolean,
        estado: EstadoPrestacao,
        id_orcamento: INT!,
        id_utilizadores: INT!,
        enabled: Boolean,
        created_at: String
        updated_at: String
    }
    enum TipoPrestador {
        PARATICULAR = "particular",
        EMPRESA = "empresa"
    }
    enum EstadoPrestacao {
        PENDENTE = "pendente",
        FINALIZADO = "finalizado",
        EM_PROCESSO = "em_processo",
        CANCELADO = "cancelado"
    }

    type Orcamento {
        id: ID!,
        total: INT!,
        id_utilizadores: ID!,
        enabled: Boolean,
        created: String,
        updated: String
    }

    type Empresa {
        id: INT!,
        designacao: String,
        descricao: String,
        nif: String
        icone: "",
        id_utilizadores: String,
        localidade: String,
        enabled: Boolean,
        created_at: String,
        updated_at: String
    }

    type Categoria {
        id: ID!,
        designacao: String,
        icone: String,
        created_at: String,
        updated_at: String
    }
}`
