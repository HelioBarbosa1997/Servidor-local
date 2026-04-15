import{ Router } from "express"
import { propostaControler } from "../controllers/proposta.controlle.js"
import { Role } from "../utils/types.js"
import { authorize } from "../security/auth.middleware.js"

const propostaRoute = {
    create:"/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id",
    aceitar:"/aceitarProposta/:id"
}

const router = Router()

router.get(propostaRoute.getAll,authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]),propostaControler.getAll)

router.get(propostaRoute.getById,authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]),propostaControler.get)

router.post(propostaRoute.create,authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]),propostaControler.create)

router.put(propostaRoute.update,authorize([Role.ADMIN]),propostaControler.updated)

router.delete(propostaRoute.delete,authorize([Role.ADMIN]),propostaControler.delete)

router.put(propostaRoute.aceitar,authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]),propostaControler.aceitar)


export { router }