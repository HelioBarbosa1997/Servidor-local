import {Router} from "express"
import { ServicoControler } from "../controllers/servico.controlle.js"

const ServiceRoute = {
    create:"/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id"
}
const router = Router()
router.get(ServiceRoute.getAll,ServicoControler.getAll)
router.get(ServiceRoute.getById,ServicoControler.get)
router.post(ServiceRoute.create,ServicoControler.createServico)
router.put(ServiceRoute.update,ServicoControler.updated)
router.delete(ServiceRoute.delete,ServicoControler.delete)


export { router }