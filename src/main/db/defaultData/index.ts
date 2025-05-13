import { Sequelize } from "sequelize";
import { defaultUsers } from "./users";

export async function defaultData(sequelize: Sequelize) {
    await defaultUsers(sequelize)
}