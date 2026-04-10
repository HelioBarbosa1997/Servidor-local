import{ Router } from "express"
import { orcamentoControler } from "../controllers/orcamento.controlle.js"


const orcamentoRoute = {
    create:"/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id",
    calcular:"calcular/:id"
}

const router = Router()
router.get(orcamentoRoute.getAll,orcamentoControler.getAll)
router.get(orcamentoRoute.getById,orcamentoControler.get)
router.post(orcamentoRoute.create,orcamentoControler.create)
router.put(orcamentoRoute.update,orcamentoControler.updated)
router.delete(orcamentoRoute.delete,orcamentoControler.delete)
router.put(orcamentoRoute.calcular,orcamentoControler.calculateBudget)


export { router }