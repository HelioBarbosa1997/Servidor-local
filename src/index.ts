import express, { type Request, type Response } from "express"
import { router as serviceRouter } from "./routes/servico.route.js"
import { router as userRouter } from "./routes/users.route.js"
import { router as propostaRoute } from "./routes/proposta.route.js"
import { router as prestadorRoute } from "./routes/prestador.route.js"
import { router as orcamentoRoute } from "./routes/orcamento.route.js"
import { router as prestacaoServicoRoute } from "./routes/prestadorServico.route.js"

const app = express()
app.use(express.json())

app.use("/service", serviceRouter)
app.use("/users", userRouter)
app.use("/proposta", propostaRoute)
app.use("/prestador", prestadorRoute)
app.use("/orcamento", orcamentoRoute)
app.use("/prestacao-servico", prestacaoServicoRoute)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!")
})


app.listen(8080, () => {
  console.log("Server running on port 8080")
})
