import { usersModel } from "../../models/users.model.js"
import type { UserType } from "../../utils/types.js";

export const userResolver = {
    Query: {
        getAllUsers: async () => {
            return await usersModel.getAll();
        },

        getUserById: async (_: any, args: { id: string }) => {
            return await usersModel.get(args.id)
        }
    },

    Mutation: {
        createUser: async (_: any, args: { user: UserType }) => {
            return await usersModel.create(args.user);
        },
        updatedUser: async (_: any, args: { id: string, user: UserType }) => {
            return await usersModel.updatedUser(args.id, args.user);
        },
        deleteUser: async (_: any, args: { id: string }) => {
            return await usersModel.deleteUser(args.id,);
        }

    }
}