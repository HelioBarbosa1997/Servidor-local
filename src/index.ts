import express from "express"
import { adicionarServico } from "./servico.js"

const app = express();

app.get("/hello", (req, res) => {
    console.log("Hello Word");
    res.send("Hello Word");
});

app.get("/adicionar-servico", (req, res) => {
    const novoServico = req.body
    adicionarServico(novoServico)
})

app.listen(8080, () => {
    console.log("Server running on port 8080")
});