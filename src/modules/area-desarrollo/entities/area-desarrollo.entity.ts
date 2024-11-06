import { Carrera } from 'src/modules/carrera/entities/carrera.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AreaDesarrollo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  area: string;

  @Column()
  carrera_id: number;
  // Relacionar esta tabla con carreras de muchos a unos
  @ManyToOne(() => Carrera, (carrera) => carrera.areaDesarrollo, {
    nullable: false,
  })
  @JoinColumn({ name: 'carrera_id' })
  carrera: Carrera;
}
