
interface PedidoServico {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean;
};

function processarPedido(pedido: PedidoServico, precoHora: number) {

    const valorBase = pedido.horasEstimadas * precoHora;

    const taxaUrgencia = valorBase * 0.3 * Number(pedido.urgente);
    const total = valorBase + taxaUrgencia;

    return {
        cliente: pedido.cliente,
        descricao: pedido.descricao,
        horasEstimadas: pedido.horasEstimadas,
        urgente: pedido.urgente,
        valorBase,
        taxaUrgencia,
        total
    }
}