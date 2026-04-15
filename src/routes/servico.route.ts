import {Router} from "express"
import { ServicoControler } from "../controllers/servico.controlle.js"
import AuthMiddleware, { authorize } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"

const ServiceRoute = {
    create:"/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id",
    getAllDetailed:"/all-detailed"
}
const router = Router()
router.get(ServiceRoute.getAll,authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]),ServicoControler.getAll)

router.get(ServiceRoute.getById,authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]),ServicoControler.get)

router.get(ServiceRoute.getAllDetailed,authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]),ServicoControler.getAllServicoDetalhado)

router.use(AuthMiddleware)

router.post(ServiceRoute.create,authorize([Role.ADMIN]),ServicoControler.createServico)

router.put(ServiceRoute.update,authorize([Role.ADMIN]),ServicoControler.updated)

router.delete(ServiceRoute.delete,authorize([Role.ADMIN]),ServicoControler.delete)



export { router }