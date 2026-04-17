import { Router } from "express"
import { userController } from "../controllers/users.controller.js"
import AuthMiddleware, { authorize, isOwner } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"
import { usersModel } from "../models/users.model.js"

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

router.put(userRoutes.updated,authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]),isOwner(usersModel, "owner"), userController.updatePassword)

router.put(userRoutes.reset,authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]),isOwner(usersModel, "owner"), userController.resetPassword)

router.get(userRoutes.get, authorize([Role.ADMIN]), userController.get)

router.get(userRoutes.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), userController.getUserById)

router.put(userRoutes.update, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]),isOwner(usersModel, "owner"), userController.update)

router.delete(userRoutes.delete, authorize([Role.ADMIN]),isOwner(usersModel, "owner"), userController.delete)

export { router }