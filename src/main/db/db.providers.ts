import { Model, ModelCtor, Sequelize } from "sequelize";
import { usersModel } from "./models/users.model";
import { defaultData } from "./defaultData";
export const db: { [key: string]: ModelCtor<Model<any, any>> } = {}
export async function init(sequelize: Sequelize) {

    db.users = usersModel(sequelize)
    await sequelize.sync({ alter: { drop: true } });
    defaultData(sequelize)

    return sequelize;
}