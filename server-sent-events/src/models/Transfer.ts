import { Model, Column, DataType, Table } from 'sequelize-typescript';

@Table({ tableName: 'transfers' })
export class Transfer extends Model<Transfer> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING(100) })
  sender: string;

  @Column({ type: DataType.STRING(100) })
  receiver: string;

  @Column({ type: DataType.DECIMAL(10, 2) })
  amount: number;

  @Column({ type: DataType.DATE })
  transfer_date: Date;

  @Column({ type: DataType.STRING(100) })
  commune: string;
}
