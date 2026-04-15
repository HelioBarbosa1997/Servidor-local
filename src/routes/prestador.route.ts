import{ Router } from "express"
import { prestadorControler } from "../controllers/prestador.controlle.js"
import AuthMiddleware, { authorize } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"


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

router.put(prestadorRoute.update,authorize ([Role.ADMIN]),prestadorControler.updated)

router.delete(prestadorRoute.delete,authorize ([Role.ADMIN]),prestadorControler.delete)


export { router }