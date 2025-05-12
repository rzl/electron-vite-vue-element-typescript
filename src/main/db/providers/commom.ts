import { tables } from '../entity/tables.entity'
import { table_columns } from '../entity/table_columns.entity'
import { buildTablesData, defaultModel } from '../utils';
import { configures } from '../entity/configures.entity';
import { dictionarys } from '../entity/dictionarys.entity';
import { users } from '../entity/users.entity';
import { defaultData } from '../defaultData';
export async function init(sequelize: any) {

    sequelize.addModels([
        configures,
        dictionarys,
        table_columns,
        tables,
        users,
    ]);
    defaultModel(sequelize)
    await buildTablesData(sequelize)
    await sequelize.sync({ alter: { drop: false } });
    defaultData(sequelize)

    return sequelize;
}