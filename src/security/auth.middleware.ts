import type { Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"

export default function AuthMiddleware (req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json ({message: "utilizador nao autenticado"})
    }
    const token = authHeader.split(" ")[1]

    try {
        const decodedToken = jwt.verify(token as string, process.env.JWT_SECRET as string)

        next()

    }catch (error)  {
        return res.json({message: "Token invalido"})
    }
}