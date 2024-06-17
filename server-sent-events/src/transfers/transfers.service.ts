import { Injectable, MessageEvent, Logger } from '@nestjs/common';
import { Observable, from, interval } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { sequelize } from './database.config';
import { Transfer } from './Transfer.model';

@Injectable()
export class TransfersService {
  private readonly logger = new Logger(TransfersService.name);

  getHello(): string {
    return 'Hello World!';
  }

  sendEvent(): Observable<MessageEvent> {
    return interval(3000).pipe(
      map((num: number) => ({
        data: 'emit server send event ' + (num + 1),
      })),
    );
  }

  async executeQuery(sql: string) {
    return sequelize.query(sql);
  }

  async addTransfer(transferData: any): Promise<void> {
    // Crea una nueva instancia del modelo de transferencia con los datos recibidos
    const newTransfer = new Transfer();
    newTransfer.sender = transferData.sender;
    newTransfer.receiver = transferData.receiver;
    newTransfer.amount = transferData.amount;
    newTransfer.transfer_date = new Date(); // Establece la fecha de transferencia como la fecha actual
    newTransfer.commune = transferData.commune;

    // Guarda la nueva transferencia en la base de datos
    await newTransfer.save();
  }

  listenToChanges(): Observable<MessageEvent> {
    // Escuchar cambios en la tabla "transfers"
    return from(Transfer.findAll()).pipe(
      switchMap((transfers) => {
        // Emitir los datos de la tabla cada vez que haya un cambio
        return new Observable<MessageEvent>((observer) => {
          observer.next({
            data: transfers, // Envía los datos como parte de la propiedad 'data'
          });
          Transfer.addHook('afterCreate', 'TransferChangeListener', () => {
            // Emitir nuevamente los datos de la tabla cuando se agrega un nuevo registro
            Transfer.findAll().then((updatedTransfers) => {
              observer.next({
                data: updatedTransfers, // Envía los datos actualizados como parte de la propiedad 'data'
              });
            });
          });
        });
      }),
    );
  }

  listenToChangesByColAgregate(): Observable<MessageEvent> {
    return new Observable<MessageEvent>((observer) => {
      Transfer.addHook('afterCreate', 'TransferChangeListener', (transfer) => {
        observer.next({
          data: transfer,
        });
      });
    });
  }

  async getAllTransfers(): Promise<Transfer[]> {
    return await Transfer.findAll();
  }
}
