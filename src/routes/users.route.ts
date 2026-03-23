import {Router} from "express"
import { userController } from "../controllers/users.controller.js"

const userRoutes = {
    create:"/create",
    getById:"/get-by-id/:id",
    get:"/",
    update:"/update/:id",
    delete:"/delete/:id"
}

const router = Router()
router.get(userRoutes.get, userController.get)
router.get(userRoutes.getById, userController.getUserById)
router.post(userRoutes.create, userController.createUsers)
router.put(userRoutes.update, userController.updated)
router.delete(userRoutes.delete, userController.delete)

export { router }