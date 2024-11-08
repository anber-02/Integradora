import { Carrera } from 'src/modules/carrera/entities/carrera.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AreaDesarrollo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @ManyToMany(() => Carrera, (carrera) => carrera.areaDesarrollo)
  carreras: Carrera[];
}
