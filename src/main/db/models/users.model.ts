import { DataTypes, Sequelize } from "sequelize";
import moment from "moment";
import { id } from "./commom";

export function usersModel (sequelize: Sequelize) {
  return sequelize.define("users", {
    id: id(),
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "createdAt",
      get() {
        return moment(this.getDataValue("createdAt")).format("YYYY-MM-DD HH:mm:ss");
      }
    }
  });
}
