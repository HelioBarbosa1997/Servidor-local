import{ Router } from "express"
import { prestadorControler } from "../controllers/prestador.controlle.js"
import AuthMiddleware, { authorize, isOwner } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"
import { PrestadorModel } from "../models/prestador.model.js"


const prestadorRoute = {
    create:"/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id",
}

const router = Router()
router.get(prestadorRoute.getAll,authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]),prestadorControler.getAll)

router.get(prestadorRoute.getById,authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]),prestadorControler.get)

router.use(AuthMiddleware)

router.post(prestadorRoute.create, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR]),prestadorControler.create)

router.put(prestadorRoute.update,authorize ([Role.ADMIN]), isOwner(PrestadorModel, "owner"),prestadorControler.updated)

router.delete(prestadorRoute.delete,authorize ([Role.ADMIN]), isOwner(PrestadorModel, "owner"),prestadorControler.delete)


export { router }