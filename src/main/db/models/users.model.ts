import { DataTypes, Sequelize } from "sequelize";

export function usersModel (sequelize: Sequelize) {
  return sequelize.define("users", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
      field: "id",
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  });
}
