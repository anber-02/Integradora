import { AreaDesarrollo } from 'src/modules/area-desarrollo/entities/area-desarrollo.entity';
import { NivelEducativo } from 'src/modules/nivel-educativo/entities/nivel-educativo.entity';
import { Proyecto } from 'src/modules/proyecto/entities/proyecto.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['clave'])
export class Carrera {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  clave: string;

  @Column('text')
  descripcion: string;

  @Column({ nullable: true })
  imageUrl?: string; // Para almacenar la URL de la imagen

  @OneToMany(() => Proyecto, (proyecto) => proyecto.carrera)
  proyectos: Proyecto[];

  @OneToMany(() => NivelEducativo, (nivelEducativo) => nivelEducativo.carrera)
  nivelEducativo: NivelEducativo[];

  @OneToMany(() => AreaDesarrollo, (areaDesarrollo) => areaDesarrollo.carrera)
  areaDesarrollo: AreaDesarrollo[];
}
