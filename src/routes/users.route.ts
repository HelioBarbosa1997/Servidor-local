import { Router } from "express"
import { userController } from "../controllers/users.controller.js"
import AuthMiddleware, { authorize } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"

const userRoutes = {
    create: "/create",
    getById: "/get-by-id/:id",
    get: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    login: "/login",
    updated: "/update",
    reset: "/reset"
}

const router = Router()
router.post(userRoutes.login, userController.login)

router.post(userRoutes.create, userController.createUsers)

router.use(AuthMiddleware)

router.put(userRoutes.updated,authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), userController.updatePassword)

router.put(userRoutes.reset,authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), userController.resetPassword)

router.get(userRoutes.get, authorize([Role.ADMIN]), userController.get)

router.get(userRoutes.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), userController.getUserById)

router.put(userRoutes.update, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), userController.update)

router.delete(userRoutes.delete, authorize([Role.ADMIN]), userController.delete)

export { router }