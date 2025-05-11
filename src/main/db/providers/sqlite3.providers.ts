import { Sequelize } from 'sequelize-typescript';
import { init } from './commom';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        },
        storage: './database.sqlite',
      })
      
      return await init(sequelize);
    },
  },
];