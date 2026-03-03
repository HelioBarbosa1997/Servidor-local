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
