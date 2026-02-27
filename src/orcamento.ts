import { catalogoServico } from "./servico.js"

import { type PedidoServico, type Servico } from "./utils/types.js"

const taxaUrgencia: number = 0.3
const minimoParaDesconto: number = 100
const percentagemDesconto: number = 0.1

const servicosSelecionados: Servico[] = []

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
