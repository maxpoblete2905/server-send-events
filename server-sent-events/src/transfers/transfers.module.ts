import { Module } from '@nestjs/common';
import { TransfersController } from './transfers.controller';
import { TransfersService } from './transfers.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transfer } from '../models/Transfer';
import { sequelize } from '../config/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...sequelize.options,
      models: [Transfer],
    }),
    TransfersModule,
  ],
  controllers: [TransfersController],
  providers: [TransfersService],
})
export class TransfersModule {}
