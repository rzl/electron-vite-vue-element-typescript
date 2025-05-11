import { randomUUID } from 'crypto';
import sequelize, { UUIDV4 } from 'sequelize';
import { Table, Column, Model, ForeignKey, HasMany, BelongsTo, IsUUID, PrimaryKey, Unique, AutoIncrement, Default } from 'sequelize-typescript';
import { Base } from './base.entity';
import { tables } from './tables.entity';

@Table
export class table_columns extends Base {


  @Column
  name: string //对应table

  @Column
  label: string //对应label
  
  @Column
  type: string //数据库类型
  
  @Column
  hidden: boolean

  @Column
  table_name: string

  @ForeignKey(() => tables)
  @Column
  table_id: string
}