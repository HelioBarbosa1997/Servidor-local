class prestador {
    nome: string
    precoHora: number
    profissao: string
    minimoParaDesconto: number
    percentagemDesconto: number
    taxaUrgencia: number

    constructor( nomeDoPrestador: string, precoHoraDoPrestador: number, profissaoDoPrestador: string, minomoDescontoDoPrestador: number, percetagemDescontoDoPrestador: number, taxaUrgenteDoPrestador: number) {
        this.nome = nomeDoPrestador
        this.precoHora = precoHoraDoPrestador
        this.profissao = profissaoDoPrestador
        this.minimoParaDesconto = minomoDescontoDoPrestador
        this.percentagemDesconto = percetagemDescontoDoPrestador
        this.taxaUrgencia = taxaUrgenteDoPrestador
    }
    alertarPrecoHora(novoPrecoHora: number) {
        this.precoHora = novoPrecoHora
    }
    alterarNome(novoNome: string) {
        this.nome = novoNome
    }
}
const prestador1 = new prestador("Helio", 200, "Desenvolvidor de software", 10000, 0.1, 0.3)

console.log(prestador1)

/* 
nome: "Helio"
precoHora: 200
profissao: Desenvolvedor de Software
minimoParaDesconto: 10000
percetagenDeDesconto: 0.1
taxaUrgencia: 0.3
*/