import{ Router } from "express"
import { prestadorControler } from "../controllers/prestador.controlle.js"


const propostaRoute = {
    create:"/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id",
}

const router = Router()
router.get(propostaRoute.getAll,prestadorControler.getAll)
router.get(propostaRoute.getById,prestadorControler.get)
router.post(propostaRoute.create,prestadorControler.create)
router.put(propostaRoute.update,prestadorControler.updated)
router.delete(propostaRoute.delete,prestadorControler.delete)


export { router }