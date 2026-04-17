import{ Router } from "express"
import { orcamentoControler } from "../controllers/orcamento.controlle.js"
import { Role } from "../utils/types.js"
import AuthMiddleware, { authorize, isOwner } from "../security/auth.middleware.js"
import { OrcamentoModel } from "../models/orcamento.model.js"


const orcamentoRoute = {
    create:"/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id",
    calcular:"calcular/:id"
}

const router = Router()

router.use(AuthMiddleware)

router.get(orcamentoRoute.getAll,authorize([Role.ADMIN]),orcamentoControler.getAll)

router.get(orcamentoRoute.getById,authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]),orcamentoControler.get)

router.post(orcamentoRoute.create,authorize([Role.ADMIN, Role.CLIENTE,]),orcamentoControler.create)

router.put(orcamentoRoute.update,authorize([Role.ADMIN]),isOwner(OrcamentoModel, "owner"),orcamentoControler.updated)

router.delete(orcamentoRoute.delete,authorize([Role.ADMIN,]),isOwner(OrcamentoModel, "owner"),orcamentoControler.delete)

router.put(orcamentoRoute.calcular,authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]),orcamentoControler.calculateBudget)


export { router }