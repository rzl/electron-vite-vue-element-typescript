import sequelize from 'sequelize';
import { Table, Column, Model, ForeignKey, HasMany, BelongsTo } from 'sequelize-typescript';
import { Base } from './base.entity';
import { table_columns } from './table_columns.entity';

@Table
export class tables extends Base {
  @Column({
    type: sequelize.STRING,
    unique: true
  })
  name: string;

  @Column
  prop: string //对应prop

  @Column
  label: string //对应label

  @Column
  type: string //数据库类型

  @Column
  stat: number //表示表的状态

  @HasMany(() => table_columns, {
    sourceKey: 'id',
    foreignKey: 'table_id'
  })
  table_columns: table_columns[]

}