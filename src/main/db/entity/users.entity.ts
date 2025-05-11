/**
 * author: rzl
 * 系统键值对配置
 */
import { Table, Column, Model, ForeignKey, HasMany, BelongsTo, DataType, Comment, BelongsToMany } from 'sequelize-typescript';
import { Base, BaseModel, BaseScript } from './base.entity';

/**
 * 系统键值对配置
 */
@Table
export class users extends Base {
    @Comment('用户名')
    @Column
    username: string

    @Comment('密码')
    @Column
    password: string

}