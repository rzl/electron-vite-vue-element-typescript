import { DataTypes, Model, ModelAttributeColumnOptions, ModelAttributes, Sequelize } from "sequelize";
import { encryptPassword } from "../utils";

/**
 * 通用ID字段
 * @returns ModelAttributeColumnOptions<Model<any, any>>
 */
export function id(opt?: ModelAttributeColumnOptions<Model<any, any>>): ModelAttributeColumnOptions<Model<any, any>> {
  let defaultModelAttributes: ModelAttributeColumnOptions<Model<any, any>> = {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true,
    field: "id"
  }
  if (opt) {
    defaultModelAttributes = { ...defaultModelAttributes, ...opt }
  }
  return defaultModelAttributes
}

/**
 * 租户ID
 * @returns ModelAttributeColumnOptions<Model<any, any>>
 */
export function tenantId(opt?: ModelAttributeColumnOptions<Model<any, any>>): ModelAttributeColumnOptions<Model<any, any>> {
  let defaultModelAttributes: ModelAttributeColumnOptions<Model<any, any>> = {
    type: DataTypes.STRING,
    defaultValue: '0',
    allowNull: false,
    field: "tenantId"
  }
  if (opt) {
    defaultModelAttributes = { ...defaultModelAttributes, ...opt }
  }
  return defaultModelAttributes
}

/**
 * 通用状态字段
 * @returns ModelAttributeColumnOptions<Model<any, any>>
 */
export function status(opt?: ModelAttributeColumnOptions<Model<any, any>>): ModelAttributeColumnOptions<Model<any, any>> {
  let defaultModelAttributes: ModelAttributeColumnOptions<Model<any, any>> = {
    type: DataTypes.STRING,
    defaultValue: '0',
    allowNull: false,
    field: "status"
  }
  if (opt) {
    defaultModelAttributes = { ...defaultModelAttributes, ...opt }
  }
  return defaultModelAttributes
}

/**
 * 通用流程状态字段
 * @returns ModelAttributeColumnOptions<Model<any, any>>
 */
export function bpmStatus(opt?: ModelAttributeColumnOptions<Model<any, any>>): ModelAttributeColumnOptions<Model<any, any>> {
  let defaultModelAttributes: ModelAttributeColumnOptions<Model<any, any>> = {
    type: DataTypes.STRING,
    defaultValue: 'pending',
    allowNull: false,
    field: "bpmStatus"
  }
  if (opt) {
    defaultModelAttributes = { ...defaultModelAttributes, ...opt }
  }
  return defaultModelAttributes
}

/**
 * 通用标签字段
 * @returns ModelAttributeColumnOptions<Model<any, any>>
 */
export function tags(opt?: ModelAttributeColumnOptions<Model<any, any>>): ModelAttributeColumnOptions<Model<any, any>> {
  let defaultModelAttributes: ModelAttributeColumnOptions<Model<any, any>> = {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
    allowNull: true,
    field: "tags"
  }
  if (opt) {
    defaultModelAttributes = { ...defaultModelAttributes, ...opt }
  }
  return defaultModelAttributes
}

export function remark(opt?: ModelAttributeColumnOptions<Model<any, any>>): ModelAttributeColumnOptions<Model<any, any>> {
  let defaultModelAttributes: ModelAttributeColumnOptions<Model<any, any>> = {
    type: DataTypes.TEXT,
    defaultValue: '',
    allowNull: true,
    field: "remark"
  }
  if (opt) {
    defaultModelAttributes = { ...defaultModelAttributes, ...opt }
  }
  return defaultModelAttributes
}

export function name(opt?: ModelAttributeColumnOptions<Model<any, any>>): ModelAttributeColumnOptions<Model<any, any>> {
  let defaultModelAttributes: ModelAttributeColumnOptions<Model<any, any>> = {
    type: DataTypes.STRING,
    defaultValue: '',
    allowNull: false,
    field: "name"
  }
  if (opt) {
    defaultModelAttributes = { ...defaultModelAttributes, ...opt }
  }
  return defaultModelAttributes
}

export function description(opt?: ModelAttributeColumnOptions<Model<any, any>>): ModelAttributeColumnOptions<Model<any, any>> {
  let defaultModelAttributes: ModelAttributeColumnOptions<Model<any, any>> = {
    type: DataTypes.TEXT,
    defaultValue: '',
    allowNull: true,
    field: "description"
  }
  if (opt) {
    defaultModelAttributes = { ...defaultModelAttributes, ...opt }
  }
  return defaultModelAttributes
}

export function parentId(opt?: ModelAttributeColumnOptions<Model<any, any>>): ModelAttributeColumnOptions<Model<any, any>> {
  let defaultModelAttributes: ModelAttributeColumnOptions<Model<any, any>> = {
    type: DataTypes.UUID,
    defaultValue: null,
    allowNull: true,
    field: "parentId"
  }
  if (opt) {
    defaultModelAttributes = { ...defaultModelAttributes, ...opt }
  }
  return defaultModelAttributes
}

export function scriptContent(opt?: ModelAttributeColumnOptions<Model<any, any>>): ModelAttributeColumnOptions<Model<any, any>> {
  let defaultModelAttributes: ModelAttributeColumnOptions<Model<any, any>> = {
    type: DataTypes.TEXT,
    defaultValue: '',
    allowNull: true,
    field: "scriptContent"
  }
  if (opt) {
    defaultModelAttributes = { ...defaultModelAttributes, ...opt }
  }
  return defaultModelAttributes
}

export function password(opt?: ModelAttributeColumnOptions<Model<any, any>>): ModelAttributeColumnOptions<Model<any, any>> {
  let defaultModelAttributes: ModelAttributeColumnOptions<Model<any, any>> = {
    type: DataTypes.TEXT,
    defaultValue: '',
    allowNull: true,
    field: "password",
    set(value: string) {
      // Assuming encryptPassword is a function that encrypts the password
      this.setDataValue('password', encryptPassword(value)); // Replace with actual encryption logic
    }
  }
  if (opt) {
    defaultModelAttributes = { ...defaultModelAttributes, ...opt }
  }
  return defaultModelAttributes
}