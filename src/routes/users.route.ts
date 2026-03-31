import {Router} from "express"
import { userController } from "../controllers/users.controller.js"
import AuthMiddleware from "../security/auth.middleware.js"

const userRoutes = {
    create:"/create",
    getById:"/get-by-id/:id",
    get:"/",
    update:"/update/:id",
    delete:"/delete/:id",
    login: "/login"
}

const router = Router()
router.post(userRoutes.login, userController.login)
router.get(userRoutes.get, AuthMiddleware, userController.get)
router.get(userRoutes.getById, userController.getUserById)
router.post(userRoutes.create, userController.createUsers)
router.put(userRoutes.update, userController.update)
router.delete(userRoutes.delete, userController.delete)

export { router }