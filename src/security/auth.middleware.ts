import type { Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                role: string
            }
        }
    }
}

export default function AuthMiddleware (req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json ({message: "utilizador nao autenticado"})
    }
    const token = authHeader.split(" ")[1]

    try {
        const decodedToken = jwt.verify(token as string, process.env.JWT_SECRET as string) as {id: string, email: string, role: string}

        req.user = {
            id: decodedToken.id,
            email:decodedToken.email,
            role: decodedToken.role
        }

        next()

    }catch (error)  {
        return res.json({message: "Token invalido"})
    }
}

export function authorize(roles: string []) {
    return (req: Request, res: Response, next: NextFunction) => {
        if(!req.user) {
            return res.status(401).json({message: "Utilizador nao autorizado!"})
        }
        if(roles.includes(req.user.role)) {
            return res.status(403).json({message: "Permissao insuficiente!"})
        }

        next()
    }
}