import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { FilmEntity } from './film.entity';

@Entity('schedules')
export class ScheduleEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  daytime: string;

  @Column('int')
  hall: number;

  @Column('int')
  rows: number;

  @Column('int')
  seats: number;

  @Column('int')
  price: number;

  @Column('simple-array', { default: '' })
  taken: string[];

  @ManyToOne(() => FilmEntity, (film) => film.schedule, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'film_id' })
  film: FilmEntity;
}
