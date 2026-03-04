import { catalogoServico } from "./servico.js"
import { type PedidoServico, type PrestadorType, type Servico } from "./utils/types.js"


const taxaUrgencia: number = 0.3
const minimoParaDesconto: number = 100
const percentagemDesconto: number = 0.1

const servicosSelecionados: Servico[] = []
const prestadoresDeservico: PrestadorType[] = []
const prestadorSelecionados: PrestadorType[] = []

//Função para selecionar serviços e horasEstimadas
export function selecionarServico(nome: string) {
    for (let i = 0; i < catalogoServico.length; i++) {
        if (catalogoServico[i]?.nome === nome) {
            servicosSelecionados.push(catalogoServico[i]!)
            return true
        }
    }
    return false
}
// Funcção para criar prestadores de serviço
export function criarPrestadorDeServico(novoPrestador: PrestadorType) {
    //verificar se o prestador ja esta no array
    prestadoresDeservico.map((prestadorExistente: PrestadorType) => {
        if (prestadorExistente.nome === novoPrestador.nome) {
            return {
                status: false,
                message: "Ja exite um prestador de serviço com esse nome",
                data: null
            }
        }
    })
    //Se o prestador nao existir, adcionar um novo prestador
    prestadoresDeservico.push(novoPrestador)
    return {
        status: true,
        message: "Prestador de serviço adicionado com sucesso!",
        data: novoPrestador
    }
}
// Exercico TPC
// Função uqe recebe o nome do prestador
export function selecionarPrestatoresDeServico(nomeDoPrestador: string) {
    for (let i = 0; i < prestadoresDeservico.length; i++) {

        if (prestadoresDeservico[i]?.nome === nomeDoPrestador) {

            prestadorSelecionados.push(prestadoresDeservico[i]!)
            return true
        }
    }
    return false
}

//Funcção para editar um prestador de serviço
export function editarPrestadorDeServico(nomeDoPrestador: string, novosDadosDoPrestador: PrestadorType) {
    //Encontrar o prestador de serviço a editar na minha lista
    //Cilco que percore a lista e verifica o nome do prestadorde serviço
    prestadoresDeservico.map((prestadorExistente: PrestadorType) => {
        if (prestadorExistente.nome === nomeDoPrestador) {
            prestadorExistente.nome = novosDadosDoPrestador.nome
            prestadorExistente.precoHora = novosDadosDoPrestador.precoHora
            prestadorExistente.profissao = novosDadosDoPrestador.profissao
            prestadorExistente.minimoParaDesconto = novosDadosDoPrestador.minimoParaDesconto
            prestadorExistente.percentagemDesconto = novosDadosDoPrestador.percentagemDesconto
            prestadorExistente.taxaUrgencia = novosDadosDoPrestador.taxaUrgencia

            return {
                status: true,
                message: "Prestador de serviço editado com sucesso!",
                data: prestadorExistente
            }
        }

    })
    // Se nao existir nenhum prestador com o nome recebido, retoma uma mensagem de erro
    return {
        status: false,
        message: "Nao exite prestador de serviço com este nome!",
        data: null
    }
}
//Função para apagar um prestador de serviço
export function apagarPrestadorServico(nomeDoPrestador: string) {
    //Ciclo para percorer a lista de prestadores
    //for (let i = 0; i < prestadoresDeservico.length; i++) {
    //Se o nome for igual
    //if (prestadoresDeservico[i]?.nome === nomeDoPrestador) {
    //remover prestador 
    //prestadoresDeservico.splice(i, 1)

    //return {
    // status: true,
    //message: "Prestador removido com sucesso",
    // } 

    //  }
    // }
    //Nao encontrado prestador
    //return "Erro Prestador nao encontrado"
    prestadoresDeservico.filter(
        (prestadorExistente: PrestadorType) =>
            prestadorExistente.nome !== nomeDoPrestador
    )
    // Validar o nome do prestador
    if (nomeDoPrestador === "") {
        return {
            status: false,
            message: "O nome do prestador de serviço é obrigatorio!",
            data: prestadorSelecionados
        }
    }
    return {
        status: false,
        message: "Nenhum prestadorde serviço com nome foi encontrado!",
        data: null
    }

}

//Função para calcular orçamento
export function processarPedido(pedido: PedidoServico) {
    let totalBruto: number = 0
    let totalFinal: number = 0

    servicosSelecionados.map((servico: Servico) => {
        let totalDoServico: number = servico.precoHora * pedido.horasEstimadas
        totalBruto = totalBruto + totalDoServico
    })

    totalFinal = totalBruto

    if (pedido.urgente) {
        totalFinal = totalBruto + (totalBruto * taxaUrgencia)
    }
    if (totalBruto >= minimoParaDesconto) {
        totalFinal = totalFinal - (totalBruto * percentagemDesconto)
    }
    return totalFinal

    /*
    urgente: true
    taxaUrgente: 0.3
    totalBruto: 100
    totalTaxa: 100 * 0,3 = 30
    totalFinal: 100 + 30 = 130

    totalBruto: 100
    totalBruto apos urgencia: 150
    minimo desconto: 100
    percetagem: 10%
    desconto sobre o total final: 150 - 15 = 15
    desconto sobre o total bruto: 150 * 0.1 = 10
    */

}
