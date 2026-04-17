import{ Router } from "express"
import { prestadorServicoControler } from "../controllers/prestadorServico.controller.js"
import AuthMiddleware, { authorize, isOwner } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"
import { PrestadorModel } from "../models/prestador.model.js"


const prestadorServicoRoute = {
    create:"/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id",
    getAllPrestacaoServicoDetalhada:"/get-all-detalhado",
    prestacaoServicoByCategoria:"pres-servico-categoria"
}

const router = Router()
router.get(prestadorServicoRoute.getAll,authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]),prestadorServicoControler.getAll)

router.get(prestadorServicoRoute.getById,authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]),prestadorServicoControler.get)

router.get(prestadorServicoRoute.getAllPrestacaoServicoDetalhada, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]),prestadorServicoControler.getAllPrestacaoServicoDetalhada)

router.get(prestadorServicoRoute.prestacaoServicoByCategoria,authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]),prestadorServicoControler.prestacaoServicoByCategoria)

router.use(AuthMiddleware)

router.post(prestadorServicoRoute.create,authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]),prestadorServicoControler.create)

router.put(prestadorServicoRoute.update,authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), isOwner(PrestadorModel, "owner"),prestadorServicoControler.updated)

router.delete(prestadorServicoRoute.delete,authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), isOwner(PrestadorModel, "owner"),prestadorServicoControler.delete)


export { router }