import express, { type Request, type Response } from "express"
import { adicionarServico, listarServicos, apagarServico, obterServico } from "./servico.js"

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

app.listen(8080, () => {
    console.log("Server running on port 8080")
});