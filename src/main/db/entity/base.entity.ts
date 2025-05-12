/**
 * author: rzl
 * 默认的表字段
 */
import sequelize, { UUIDV4 } from 'sequelize';
import { Table, Column, Model, ForeignKey, HasMany, BelongsTo, IsUUID, PrimaryKey, Default, Index, DataType, Comment, CreatedAt, UpdatedAt, DeletedAt, createIndexDecorator } from 'sequelize-typescript';

@Table
export class BaseWithoutID extends Model {
    /**
     * 租户ID
     */
     @Comment('租户ID')
     @Default('0')
     @Column(sequelize.STRING)
     tenant_id: string

 
     @Comment('创建时间')
     @CreatedAt
     @Column(DataType.NOW)
     created_at: Date
 
     @Comment('更新时间')
     @UpdatedAt
     @Column(DataType.NOW)
     updated_at: Date
 
     @Comment('删除时间')
     @DeletedAt
     @Column(DataType.NOW)
     delete_at: Date
 
     /**
      * 创建者ID
      */
     @Comment('创建者ID')
     @Column(sequelize.STRING)
     created_id: string
 
     /**
      * 最后更新的用户ID
      */
     @Comment('更新者ID')
     @Column(sequelize.STRING)
     update_id: string
 
     /**
      * 默认状态字段
      */
     @Comment('状态')
     @Column(sequelize.NUMBER)
     stat: number
 
     /**
      * 默认审核状态
      */
     @Comment('BPM状态')
     @Column(sequelize.NUMBER)
     bpm: number
 
     /**
      * 数据标签字段
      */
     @Comment('标签')
     @Column(sequelize.STRING)
     tag: string
 
     /**
      * 备注
      */
     @Comment('备注')
     @Column(DataType.TEXT)
     remark: string
}

@Table
export class Base extends BaseWithoutID {
    /**
     * ID UUID
     */
    @IsUUID(4)
    @PrimaryKey
    @Default(UUIDV4)
    @Comment('ID')
    @Column(sequelize.STRING)
    id: string

}

@Table
export class BaseModel extends Base {
    @Comment('名称')
    @Column(sequelize.STRING)
    name: string;

    @Comment('描述')
    @Column(sequelize.STRING)
    description: string
}

@Table
export class BaseTree extends BaseModel {
    @Comment('父节点ID')
    @Column(sequelize.STRING)
    pid: string
}

@Table
export class BaseScript extends BaseModel {
    @Comment('脚本内容')
    @Column(DataType.TEXT)
    script: string
}