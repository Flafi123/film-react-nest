import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { ScheduleEntity } from './schedule.entity';

@Entity('films')
export class FilmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('float')
  rating: number;

  @Column()
  director: string;

  @Column('simple-array')
  tags: string[];

  @Column()
  image: string;

  @Column()
  cover: string;

  @Column()
  title: string;

  @Column()
  about: string;

  @Column()
  description: string;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.film, {
    cascade: true,
  })
  schedule: ScheduleEntity[];
}
