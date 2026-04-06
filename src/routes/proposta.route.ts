import{ Router } from "express"
import { propostaControler } from "../controllers/proposta.controlle.js"

const propostaRoute = {
    create:"/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id",
    aceitar:"/aceitarProposta/:id"
}

const router = Router()
router.get(propostaRoute.getAll,propostaControler.getAll)
router.get(propostaRoute.getById,propostaControler.get)
router.post(propostaRoute.create,propostaControler.create)
router.put(propostaRoute.update,propostaControler.updated)
router.delete(propostaRoute.delete,propostaControler.delete)
router.put(propostaRoute.aceitar,propostaControler.aceitar)


export { router }