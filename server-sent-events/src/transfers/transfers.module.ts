import { Module } from '@nestjs/common';
import { TransfersController } from './transfers.controller';
import { TransfersService } from './transfers.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';
import { Transfer } from './Transfer.model';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'transfers',
      username: 'user',
      password: 'password',
      models: [Transfer], // Aquí pasamos la instancia de Sequelize como parte de los modelos
      define: {
        timestamps: false, // Desactiva la inclusión automática de los campos createdAt y updatedAt globalmente
      },
    }),
    TransfersModule,
  ],
  controllers: [TransfersController],
  providers: [TransfersService],
})
export class TransfersModule {}
