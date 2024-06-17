import { Body, Controller, Get, Post, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TransfersService } from './transfers.service';
import { MessageEvent } from './interface';
import { Transfer } from './Transfer.model';

@Controller('api')
export class TransfersController {
  constructor(private readonly appService: TransfersService) {}

  @Sse('listen')
  sendEvent(): Observable<MessageEvent> {
    return this.appService.listenToChangesByColAgregate();
  }

  @Get('transfers')
  async getAllTransfers(): Promise<Transfer[]> {
    return await this.appService.getAllTransfers();
  }

  @Post('transfer')
  async addTransfer(@Body() transferData: Transfer): Promise<any> {
    try {
      await this.appService.addTransfer(transferData);
      return { message: 'Transferencia agregada correctamente' };
    } catch (error) {
      console.error('Error al agregar transferencia:', error);
      return { error: 'Error al agregar transferencia' };
    }
  }
}
