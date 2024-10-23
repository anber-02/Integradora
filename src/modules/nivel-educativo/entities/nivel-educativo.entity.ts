import { Carrera } from 'src/modules/carrera/entities/carrera.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class NivelEducativo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('text')
  descripcion: string;

  @Column()
  tipo: string;

  @Column()
  carrera_id: number;
  //   Relacionar este entidad con carreras de muchos a uno
  @ManyToOne(() => Carrera, (carrera) => carrera.nivelEducativo, {
    nullable: false,
  })
  @JoinColumn({ name: 'carrera_id' })
  carrera: Carrera;
}
