import { Injectable, MessageEvent } from '@nestjs/common';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { sequelize } from '../config/sequelize';
import { Transfer } from '../models/Transfer';

@Injectable()
export class TransfersService {
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
    const newTransfer = new Transfer();
    newTransfer.sender = transferData.sender;
    newTransfer.receiver = transferData.receiver;
    newTransfer.amount = transferData.amount;
    newTransfer.transfer_date = new Date();
    newTransfer.commune = transferData.commune;

    await newTransfer.save();
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
