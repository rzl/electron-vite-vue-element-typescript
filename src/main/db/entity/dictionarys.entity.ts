/**
 * author: rzl
 * 系统字典，下拉，树状字典
 */
import { Table, Column, Model, ForeignKey, HasMany, BelongsTo, DataType, Comment } from 'sequelize-typescript';
import { Base, BaseModel, BaseScript } from './base.entity';
import sequelize from 'sequelize';

/**
 * 系统字典
 */
@Table
export class dictionarys extends BaseModel {
    @Comment('值')
    @Column(sequelize.STRING)
    value: string

    @Comment('父节点ID')
    @Column(sequelize.STRING)
    pid: string
}