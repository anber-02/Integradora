import { Carrera } from 'src/modules/carrera/entities/carrera.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('aptitud')
export class Aptitude {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  aptitud: string;

  @ManyToOne(() => Carrera, (carrera) => carrera.aptitudes, {
    nullable: false,
  })
  @JoinColumn({ name: 'carrera_id' })
  carrera: Carrera;
}
