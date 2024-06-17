import { Sequelize } from 'sequelize-typescript';
import { Transfer } from './Transfer.model';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'transfers',
  username: 'user',
  password: 'password',
  models: [Transfer],
  define: {
    timestamps: false, // Desactiva la inclusión automática de los campos createdAt y updatedAt globalmente
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
