import{ Router } from "express"
import { propostaControler } from "../controllers/proposta.controlle.js"
import { Role } from "../utils/types.js"
import AuthMiddleware, { authorize, isOwner } from "../security/auth.middleware.js"
import { PropostaModel } from "../models/proposta.model.js"

const propostaRoute = {
    create:"/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id",
    aceitar:"/aceitarProposta/:id"
}

const router = Router()

router.use(AuthMiddleware)

router.get(propostaRoute.getAll,authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]),propostaControler.getAll)

router.get(propostaRoute.getById,authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]),propostaControler.get)

router.post(propostaRoute.create,authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]),propostaControler.create)

router.put(propostaRoute.update,authorize([Role.ADMIN, Role.EMPRESA, Role.PRESTADOR]), isOwner(PropostaModel, "owner"),propostaControler.updated)

router.delete(propostaRoute.delete,authorize([Role.ADMIN, Role.EMPRESA, Role.PRESTADOR]), isOwner(PropostaModel, "owner"),propostaControler.delete)

router.put(propostaRoute.aceitar,authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]),propostaControler.aceitar)


export { router }