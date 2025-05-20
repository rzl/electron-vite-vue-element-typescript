import { Sequelize } from "sequelize";
import { encryptPassword } from "../utils";

const DEFAULT_USERS_KEY = '00000000-0000-4a7a-9125'
const DEFAULT_USERS_PASSWORD = '123456'

export async function defaultUsers(sequelize: Sequelize) {
    var users = sequelize.models.users;
    try {
        await users.findOrCreate({
            where: {
                id: `${DEFAULT_USERS_KEY}-000000000001`,
            },
            defaults: {
                id: `${DEFAULT_USERS_KEY}-000000000001`,
                username: "admin",
                password: encryptPassword(DEFAULT_USERS_PASSWORD),
                tenant_id: "0",
            },
        });
        await users.findOrCreate({
            where: {
                id: `${DEFAULT_USERS_KEY}-000000000002`,
            },
            defaults: {
                id: `${DEFAULT_USERS_KEY}-000000000002`,
                username: "user",
                password: encryptPassword(DEFAULT_USERS_PASSWORD),
                tenant_id: "0",
            },
        });
    } catch (error) {
        console.log(error)
    }
}