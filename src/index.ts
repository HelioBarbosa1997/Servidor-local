import "dotenv/config"
import express, { type Request, type Response } from "express"
import { router as serviceRouter } from "./routes/servico.route.js"
import { router as userRouter } from "./routes/users.route.js"
import { router as propostaRouter } from "./routes/proposta.route.js"
import { router as prestadorRouter } from "./routes/prestador.route.js"
import { router as orcamentoRouter } from "./routes/orcamento.route.js"
import { router as prestacaoServicoRouter } from "./routes/prestadorServico.route.js"
import { router as empresaRouter } from "./routes/prestadorServico.route.js"
import { swaggerSpec } from "./docs/swagger.js"
import swaggerUi from "swagger-ui-express"
import { ApolloServer } from "@apollo/server"
import { resolvers, typeDefs } from "./graphql/index.js"
import { expressMiddleware } from "@as-integrations/express5"

const app = express()
app.use(express.json())

app.use("/service", serviceRouter)
app.use("/user", userRouter)
app.use("/proposta", propostaRouter)
app.use("/prestador", prestadorRouter)
app.use("/orcamento", orcamentoRouter)
app.use("/prestacao-servico", prestacaoServicoRouter)
app.use("/empresa", empresaRouter)

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const graphqlServer = new ApolloServer({
  typeDefs,
  resolvers
})

await graphqlServer.start()

app.use("/graphql",
  expressMiddleware(graphqlServer, {
    context: async ({ req }) => ({
      token: req.headers.authorization,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    })
  })
)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!")
})


app.listen(8080, () => {
  console.log("Server running on port 8080")
})
