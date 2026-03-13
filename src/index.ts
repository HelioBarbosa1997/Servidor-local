import express, { type Request, type Response } from "express"
import { adicionarServico, listarServicos, apagarServico, obterServico } from "./servico.js"
import { processarPedido, selecionarServico, selecionarPrestatoresDeServico, criarPrestadorDeServico, editarPrestadorDeServico, apagarPrestadorServico } from "./orcamento.js"
import { request } from "node:http"
import { getUserById, getUsers, userInside } from "./users.js";


const app = express()
app.use(express.json())

app.get("/hello", (req, res) => {
    console.log("Hello Word");
    res.send("Hello Word");
});

// rota pata adicionar serviço novo
app.post("/adicionar-servico", (req: Request, res: Response) => {
    const novoServico = req.body

    console.log(novoServico)
    const addServicoResponse = adicionarServico(novoServico)
    res.json(addServicoResponse)

    adicionarServico(novoServico)
})

// rota para listar todos os serviços
app.get("/listar-servico", (req: Request, res: Response) => {
    const listServicoResponse = listarServicos()

    res.json(listServicoResponse)
})
// Rota para apagar servico
app.delete("/apagar-servico", (req: Request, res: Response) => {
    const { nome } = req.query
    if (nome) {
        const apagarServicoResponse = apagarServico(nome as string)
        res.json(apagarServicoResponse)
    } else {
        res.json({
            menssage: "Nome do servico e obrigatorio"
        })
    }
})
//rota para obter serviço pelo nome
app.get("/obter-servico", (req: Request, res: Response) => {
    const { nome } = req.query
    if (nome) {
        const obterServicoResponse = obterServico(nome as string)
        res.json(obterServicoResponse)
    } else {
        res.json({
            message: "Nome do servico e obrigatorio"
        })
    }
})
//Rotas para selecionar serviços
app.post("/selecionar-servico", (req: Request, res: Response) => {
    const { nome } = req.body
    const selecionarServicoResponse = selecionarServico(nome as string)
    res.json(selecionarServicoResponse)
})
//Rota para calcular orcamento
app.post("/processarPedido", (req: Request, res: Response) => {
    const { pedido } = req.body
    const calcularOrcamentoResponse = processarPedido(pedido)
    res.json({
        message: "Orcamento calculado com sucesso!",
        orcamentoTotal: calcularOrcamentoResponse
    })
})
//Rota para selecionar prestador encontrado
app.post("/prestadorEncontrado", (req: Request, res: Response) => {
    const { nome } = req.body
    const prestadorEncontradoResponse = selecionarPrestatoresDeServico(nome as string)
    res.json({
        status: prestadorEncontradoResponse,
        message: "Prestador de serviço selecionado com sucesso!"
    })
})

//Rota  para criar pestadores de serviço
app.post("/criar-prestador", (req: Request, res: Response) => {
    const novoPrestador = req.body
    const criarPrestadorResponse = criarPrestadorDeServico(novoPrestador)
    res.json(criarPrestadorResponse)
})

//Rota para editar um prestador de serviço
app.put("/editarPrestadorDeServico", (req: Request, res: Response) => {
    const { nomeDoPrestador, novosDadosDoPrestador } = req.body
    const editarPrestadorResponse = editarPrestadorDeServico(nomeDoPrestador as string, novosDadosDoPrestador)
    res.json(editarPrestadorResponse)
})

app.delete("/apagar-prestador", (req: Request, res: Response) => {
    const { nomeDoPrestador } = req.query
    if (nomeDoPrestador) {
        const apagarPrestadorResponse = apagarPrestadorServico(nomeDoPrestador as string)
        res.json(apagarPrestadorResponse)
    }
})

//Rota para selecionar todos os presentes na base de dados
app.get("/get-users", async (req: Request, res: Response) => {
    const getUsersResponse = await getUsers()
    res.json(getUsersResponse)
})

//Rota para selecionar os utilizadores por id
app.get("/get-user-by-id", async (req: Request, res: Response) => {
    const { id } = req.query

    if (id) {
        const getUserByIdResponse = await getUserById(id as string)

        res.json(getUserByIdResponse)
    } else {
        res.json({
            message: "Id é obrigatorio"
        })
    }
})
/*
if (!getUserByResponse) {
res.status(404).json({
status:"error"
message:"Utilizador nao encontrado"
data: null
})
}
res.status(200).json({
status:"success"
message:"Utilizador encontrado"
data: getUserByResponse
 */

//Rota para cria utilizadores no BD
app.post("/user-inside", async (req: Request, res: Response) => {

    const user = req.body;

    if (!user) {
        return res.status(400).json({ error: "Utilizador nao encontrado!" });
    }

    const response = await userInside(user);

    res.json(response);
});



app.listen(8080, () => {
    console.log("Server running on port 8080")
});