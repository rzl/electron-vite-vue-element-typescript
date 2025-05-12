/**
 * author: rzl
 * 系统键值对配置
 */
import { Table, Column, Model, ForeignKey, HasMany, BelongsTo, DataType, Comment } from 'sequelize-typescript';
import { Base, BaseModel, BaseScript } from './base.entity';
import sequelize from 'sequelize';

/**
 * 系统键值对配置
 */
@Table
export class configures extends BaseModel {
    @Comment('值')
    @Column(sequelize.STRING)
    value: string
}