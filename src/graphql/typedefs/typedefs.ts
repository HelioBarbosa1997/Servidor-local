import { gql } from "graphql-tag"

export const typeDefs = gql`
    type Utilizador {
        id: ID!
        nome: String!
        numero_identificacao: String!
        data_nascimento: String!
        email: String!
        telefone: String!
        pais: String!
        localidade: String
        password: String
        role: Role
        enabled: Boolean
        created_at: String
        updated_at: String
    }

    enum Role {
        CLIENTE
        ADMIN
        PRESTADOR
        EMPRESA 
    }

    type Proposta {
        id: ID!
        id_prestacao_servico: PrestacaoServico
        preco_hora: Float!
        horas_estimadas: Int
        id_prestador: Prestador
        estado: EstadoProposta
        owner: String
        enabled: Boolean
        created_at: String
        updated_at: String
    }

    enum EstadoProposta {
        PENDENTE
        ACEITE
        CANCELADO 
    }

    type Servico {
        id: ID!
        nome: String!
        descricao: String!
        categoria: String!
        enabled: Boolean
        created_at: String
        updated_at: String
    }

    type Prestador {
        id: ID!
        taxaUrgencia: Float!
        percentagemDesconto: Float!
        minimoDesconto: Float!
        nif: Int!
        profissao: String
        enabled: Boolean
        created_at: String
        updated_at: String
    }

    type PrestacaoServico {
        id: ID!
        designacao: String!
        subtotal: Int!
        horas_estimadas: Int!
        id_prestador: Prestador
        id_servicos: Servico!
        id_empresa: Empresa!
        tipo_prestador: TipoPrestador
        preco_hora: Int!
        urgente: Boolean
        estado: EstadoPrestacao
        id_orcamento: Orcamento!
        id_utilizadores: Utilizador
        enabled: Boolean
        created_at: String
        updated_at: String
    }

    enum TipoPrestador {
        PARATICULAR
        EMPRESA 
        }

    enum EstadoPrestacao {
        PENDENTE 
        FINALIZADO 
        EM_PROCESSO 
        CANCELADO 
        }

    type Orcamento {
        id: ID!
        total: Int!
        id_utilizadores: Utilizador
        enabled: Boolean
        created: String
        updated: String
        }

    type Empresa {
        id: Int!
        designacao: String
        descricao: String
        nif: String
        icone: String
        id_utilizadores: Utilizador
        localidade: String
        enabled: Boolean
        created_at: String
        updated_at: String
    }

    type Categoria {
        id: ID!
        designacao: String
        icone: String
        created_at: String
        updated_at: String
    }


    type Query {
        getAllUsers: [Utilizador],
        getUserById(id: ID!): Utilizador,

        getAllService: [Servico],
        getServiceById(id: ID!): Servico,

        getAllProposta: [Proposta],
        getPropostaById(id: ID!): Proposta,

        getAllPrestador: [Prestador],
        getPrestadorById(id: ID!): Prestador,

        getAllPrestacaoServico: [PrestacaoServico],
        getPrestacaoServicoById(id: ID!): PrestacaoServico,

        getAllOrcamento: [Orcamento],
        getOrcamentoById(id: ID!): Orcamento,

        getAllEmpresa: [Empresa],
        getEmpresaById(id: ID!): Empresa,

        getAllCategoria: [Categoria],
        getCategoriaById(id: ID!): Categoria
    }

    type Mutation {
        createUser(nome: String!, numero_identidade: String!, data_nascimento: String!, email: String!, password: String!, telefone: String!, pais: String!, localidade: String, role: Role, enebled: Boolean): Utilizador,
        updatedUser(id: ID!, nome: String, numero_identidade: String, data_nascimento: String, email: String, password: String, telefone: String, pais: String, localidade: String, role: Role, enebled: Boolean): Utilizador,
        deleteUser(id: ID!): Utilizador,

        createService(nome: String!, descricao: String, categoria: String, enabled: Boolean): Servico,
        updateService(id: ID!, nome: String, descricao: String, categoria: String, enabled: Boolean): Servico,
        deleteService(id: ID!): Servico,

        createProposta(id_prestacao_servico: String, id_prestador: String, preco_hora: Float!, horas_estimadas: Int!, estado: EstadoProposta, owner: String, enabled: Boolean): Proposta,
        updateProposta(id: ID!, id_prestacao_servico: String, id_prestador: String, preco_hora: Float, horas_estimadas: Int, estado: EstadoProposta, owner: String, enabled: Boolean): Proposta,
        deleteProposta(id: ID!): Proposta,

        createPrestador(id: ID!, taxa_urgencia: Float!, percentagem_desconto: Float!, minimo_desconto: Float!, nif: String, profissao: String!, enable: Boolean): Prestador,
        updatePrestador(id: ID!, taxa_urgencia: Float, percentagem_desconto: Float, minimo_desconto: Float, nif: String, profissao: String, enable: Boolean): Prestador,
        deletePrestador(id: ID!): Prestador,

        createPrestacaoServico(designacao: String!, subtotal: Float!, horas_estimadas: Int!, id_prestador: String, id_utilizador: String, id_servico: String, preco_hora: Float!, estado: EstadoPrestacao, id_orcamento: String, id_empresa: String, tipo_prestador: TipoPrestador, urgente: Boolean, enabled: Boolean): PrestacaoServico,
        updatePrestacaoServico(id: ID!, designacao: String, subtotal: Float, horas_estimadas: Int, id_prestador: String, id_utilizador: String, id_servico: String, preco_hora: Float, estado: EstadoPrestacao, id_orcamento: String, id_empresa: String, tipo_prestador: TipoPrestador, urgente: Boolean, enabled: Boolean): PrestacaoServico,
        deletePrestacaoServico(id: ID!): PrestacaoServico,

        createOrcamento(total: Float!, id_utilizadores: String, enabled: Boolean): Orcamento,
        updateOrcamento(id: ID!, total: Float, id_utilizadores: String, enabled: Boolean): Orcamento,
        deleteOrcamento(id: ID!): Orcamento,

        createEmpresa(designacao: String!, descricao: String, localizacao: String, nif: String, icone: String, id_utilizador: String!, enabled: Boolean): Empresa,
        updateEmpresa(id: ID!, designacao: String, descricao: String, localizacao: String, nif: String, icone: String, id_utilizador: String, enabled: Boolean): Empresa,
        deleteEmpresa(id: ID!): Empresa,

        createCategoria(designacao: String!, icone: String): Categoria,
        updateCategoria(id: ID!, designacao: String, icone: String): Categoria,
        deleteCategoria(id: ID!): Categoria
    }


`
