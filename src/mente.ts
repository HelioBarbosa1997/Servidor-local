interface AlunosType {
    nome: string;
    endereco: string;
    contato?: string | null;
}

const alunos: Array<AlunosType> = [
    {
        nome: "Tiago",
        endereco: "Rua A",
        contato: 123456789
    },
]

let horasTrabalhadas: number = 10;
let precoHora: number = 10;
let taxaUrgencia: number = 10;
let desconto: number = 10;
let total: number = 10;

let variavel: string = "variavel"
desconto === taxaUrgencia && desconto > TaxaUrgencia ?
taxaUrgencia += desconto : TaxaUrgencia -= desconto;

total = (horasTrasbalhadas * precoHora) + taxaUrgencia - desconto;