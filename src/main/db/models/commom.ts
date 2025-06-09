import { DataTypes, Model, ModelAttributeColumnOptions, ModelAttributes, Sequelize } from "sequelize";

/**
 * 通用ID字段
 * @returns ModelAttributeColumnOptions<Model<any, any>>
 */
export function id(): ModelAttributeColumnOptions<Model<any, any>> {
  let defaultModelAttributes: ModelAttributeColumnOptions<Model<any, any>> = {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true,
    field: "id"
  }
  return defaultModelAttributes
}

/**
 * 租户ID
 * @returns ModelAttributeColumnOptions<Model<any, any>>
 */
export function tenantId(): ModelAttributeColumnOptions<Model<any, any>> {
  let defaultModelAttributes: ModelAttributeColumnOptions<Model<any, any>> = {
    type: DataTypes.STRING,
    defaultValue: '0',
    allowNull: false,
    field: "tenantId"
  }
  return defaultModelAttributes
}

/**
 * 通用状态字段
 * @returns ModelAttributeColumnOptions<Model<any, any>>
 */
export function status(): ModelAttributeColumnOptions<Model<any, any>> {
  let defaultModelAttributes: ModelAttributeColumnOptions<Model<any, any>> = {
    type: DataTypes.STRING,
    defaultValue: '0',
    allowNull: false,
    field: "status"
  }
  return defaultModelAttributes
}

/**
 * 通用流程状态字段
 * @returns ModelAttributeColumnOptions<Model<any, any>>
 */
export function bpmStatus(): ModelAttributeColumnOptions<Model<any, any>> {
  let defaultModelAttributes: ModelAttributeColumnOptions<Model<any, any>> = {
    type: DataTypes.STRING,
    defaultValue: 'pending',
    allowNull: false,
    field: "bpmStatus"
  }
  return defaultModelAttributes
}

/**
 * 通用标签字段
 * @returns ModelAttributeColumnOptions<Model<any, any>>
 */
export function tags(): ModelAttributeColumnOptions<Model<any, any>> {
  let defaultModelAttributes: ModelAttributeColumnOptions<Model<any, any>> = {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
    allowNull: true,
    field: "tags"
  }
  return defaultModelAttributes
}

export function remark(): ModelAttributeColumnOptions<Model<any, any>> {
  let defaultModelAttributes: ModelAttributeColumnOptions<Model<any, any>> = {
    type: DataTypes.TEXT,
    defaultValue: '',
    allowNull: true,
    field: "remark"
  }
  return defaultModelAttributes
}

export function name(): ModelAttributeColumnOptions<Model<any, any>> {
  let defaultModelAttributes: ModelAttributeColumnOptions<Model<any, any>> = {
    type: DataTypes.STRING,
    defaultValue: '',
    allowNull: false,
    field: "name"
  }
  return defaultModelAttributes
}

export function description(): ModelAttributeColumnOptions<Model<any, any>> {
  let defaultModelAttributes: ModelAttributeColumnOptions<Model<any, any>> = {
    type: DataTypes.TEXT,
    defaultValue: '',
    allowNull: true,
    field: "description"
  }
  return defaultModelAttributes
}

export function parentId(): ModelAttributeColumnOptions<Model<any, any>> {
  let defaultModelAttributes: ModelAttributeColumnOptions<Model<any, any>> = {
    type: DataTypes.UUID,
    defaultValue: null,
    allowNull: true,
    field: "parentId"
  }
  return defaultModelAttributes
}

export function scriptContent(): ModelAttributeColumnOptions<Model<any, any>> {
  let defaultModelAttributes: ModelAttributeColumnOptions<Model<any, any>> = {
    type: DataTypes.TEXT,
    defaultValue: '',
    allowNull: true,
    field: "scriptContent"
  }
  return defaultModelAttributes
}