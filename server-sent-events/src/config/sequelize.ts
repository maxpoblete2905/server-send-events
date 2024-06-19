import { Sequelize } from 'sequelize-typescript';
import { Transfer } from '../models/Transfer';

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: DATABASE_HOST,
  port: parseInt(DATABASE_PORT),
  database: DATABASE_NAME,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
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
