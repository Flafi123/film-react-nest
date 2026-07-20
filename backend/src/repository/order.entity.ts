import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  get _id(): string {
    return this.id;
  }

  @Column('uuid')
  filmId: string;

  @Column({ type: 'uuid', name: 'schedule_id' })
  sessionId: string;

  @Column()
  day: string;

  @Column()
  time: string;

  @Column()
  email: string;

  @Column('jsonb')
  tickets: { row: number; seat: number; seatAddress: string }[];
}
