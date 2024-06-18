import { Sequelize } from 'sequelize-typescript';
import { Transfer } from '../models/Transfer';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'transfers',
  username: 'user',
  password: 'password',
  models: [Transfer],
  define: {
    timestamps: false,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión establecida correctamente.');
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  });
