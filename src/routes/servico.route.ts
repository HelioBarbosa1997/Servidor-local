import {Router} from "express"
import { ServicoControler } from "../controllers/servico.controlle.js"
import { authorize } from "../security/auth.middleware.js"
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
router.get(ServiceRoute.getAll,ServicoControler.getAll)

router.get(ServiceRoute.getById,ServicoControler.get)

router.post(ServiceRoute.create,ServicoControler.createServico)

router.put(ServiceRoute.update,ServicoControler.updated)

router.delete(ServiceRoute.delete,authorize([Role.ADMIN]),ServicoControler.delete)

router.get(ServiceRoute.getAllDetailed,ServicoControler.getAllServicoDetalhado)


export { router }