import { Router } from "express"
import AuthMiddleware, { authorize, isOwner } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"
import { categoriaController } from "../controllers/categoria.controlle.js"
import { categoriaModel } from "../models/categoria.model.js"



const categoriaRouter = {
    create:"/create",
    get:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id",
}

const router = Router()

router.use(AuthMiddleware)

router.get(categoriaRouter.getAll,authorize([Role.ADMIN]),categoriaController.getAll)

router.get(categoriaRouter.get,authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]),categoriaController.get)

router.post(categoriaRouter.create,authorize([Role.ADMIN, Role.CLIENTE,]),categoriaController.createUsers)

router.put(categoriaRouter.update,authorize([Role.ADMIN]),isOwner(categoriaModel, "owner"),categoriaController.updated)

router.delete(categoriaRouter.delete,authorize([Role.ADMIN,]),isOwner(categoriaModel, "owner"),categoriaController.delete)


export { router }
