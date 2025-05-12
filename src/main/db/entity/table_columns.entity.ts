import { randomUUID } from 'crypto';
import sequelize, { UUIDV4 } from 'sequelize';
import { Table, Column, Model, ForeignKey, HasMany, BelongsTo, IsUUID, PrimaryKey, Unique, AutoIncrement, Default } from 'sequelize-typescript';
import { Base } from './base.entity';
import { tables } from './tables.entity';

@Table
export class table_columns extends Base {


  @Column(sequelize.STRING)
  name: string //对应table

  @Column(sequelize.STRING)
  label: string //对应label
  
  @Column(sequelize.STRING)
  type: string //数据库类型
  
  @Column(sequelize.BOOLEAN)
  hidden: boolean

  @Column(sequelize.STRING)
  table_name: string

  @ForeignKey(() => tables)
  @Column(sequelize.STRING)
  table_id: string
}