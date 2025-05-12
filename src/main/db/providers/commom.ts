import { tables } from '../entity/tables.entity'
import { table_columns } from '../entity/table_columns.entity'
import { buildTablesData } from '../utils';
import { configures } from '../entity/configures.entity';
import { dictionarys } from '../entity/dictionarys.entity';
import { users } from '../entity/users.entity';
import { defaultData } from '../defaultData';
import { Sequelize } from 'sequelize-typescript';
export async function init(sequelize: Sequelize) {

    sequelize.addModels([
        configures,
        dictionarys,
        table_columns,
        tables,
        users,
    ]);
    await sequelize.sync({ alter: { drop: false } });
    // await buildTablesData(sequelize)
    debugger
    await defaultData(sequelize)

    return sequelize;
}