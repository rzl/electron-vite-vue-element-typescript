import { Sequelize } from "sequelize-typescript";
import { defaultUsers } from "./users";

export async function defaultData(sequelize: Sequelize) {
    await defaultUsers(sequelize)
}