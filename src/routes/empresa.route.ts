import{ Router } from "express"
import { empresaController } from "../controllers/empresa.controlle.js"
import AuthMiddleware, { authorize, isOwner } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"
import { empresaModel } from "../models/empresa.model.js"


const empresaRoute = {
    create:"/create",
    get:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id",
}

const router = Router()

router.use(AuthMiddleware)

router.get(empresaRoute.getAll,authorize([Role.ADMIN]),empresaController.getAll)

router.get(empresaRoute.get,authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]),empresaController.get)

router.post(empresaRoute.create,authorize([Role.ADMIN, Role.CLIENTE,]),empresaController.createUsers)

router.put(empresaRoute.update,authorize([Role.ADMIN]),isOwner(empresaModel, "owner"),empresaController.updated)

router.delete(empresaRoute.delete,authorize([Role.ADMIN,]),isOwner(empresaModel, "owner"),empresaController.delete)


export { router }

