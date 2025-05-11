import { defaultUsers } from "./users";

export function defaultData(sequelize: any) {
    defaultUsers(sequelize)
}