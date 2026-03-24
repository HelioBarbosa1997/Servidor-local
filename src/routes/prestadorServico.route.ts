import{ Router } from "express"
import { prestadorServicoControler } from "../controllers/prestadorServico.controller.js"


const prestadorServicoRoute = {
    create:"/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id"
}

const router = Router()
router.get(prestadorServicoRoute.getAll,prestadorServicoControler.getAll)
router.get(prestadorServicoRoute.getById,prestadorServicoControler.get)
router.post(prestadorServicoRoute.create,prestadorServicoControler.create)
router.put(prestadorServicoRoute.update,prestadorServicoControler.updated)
router.delete(prestadorServicoRoute.delete,prestadorServicoControler.delete)


export { router }