import { Body, Controller, Get, Post, Sse, MessageEvent } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TransfersService } from './transfers.service';
import { Transfer } from '../models/Transfer';

@Controller('api')
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @Sse('listen')
  sendEvent(): Observable<MessageEvent> {
    return this.transfersService.listenToChangesByColAgregate();
  }

  @Get('transfers')
  async getAllTransfers(): Promise<Transfer[]> {
    return await this.transfersService.getAllTransfers();
  }

  @Post('transfer')
  async addTransfer(@Body() transferData: Transfer): Promise<any> {
    try {
      await this.transfersService.addTransfer(transferData);
      return { message: 'Transferencia agregada correctamente' };
    } catch (error) {
      console.error('Error al agregar transferencia:', error);
      return { error: 'Error al agregar transferencia' };
    }
  }
}
