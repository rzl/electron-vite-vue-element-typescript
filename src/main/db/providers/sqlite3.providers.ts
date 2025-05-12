import { Sequelize } from 'sequelize-typescript';
import { init } from './commom';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {

    },
  },
];