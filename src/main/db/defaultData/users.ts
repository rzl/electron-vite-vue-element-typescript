import { encryptPassword } from "../utils";

const DEFAULT_USERS_KEY = '00000000-0000-4a7a-9125'
const DEFAULT_USERS_PASSWORD = '123456'

export function defaultUsers(sequelize: any) {
    var users = sequelize.models.users;
    users.findOrCreate({
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
}