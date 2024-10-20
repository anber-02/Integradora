import { AreaDesarrollo } from 'src/modules/area-desarrollo/entities/area-desarrollo.entity';
import { NivelEducativo } from 'src/modules/nivel-educativo/entities/nivel-educativo.entity';
import { Proyecto } from 'src/modules/proyecto/entities/proyecto.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Carrera {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  clave: string;

  @Column()
  descripcion: string;

  @OneToMany(() => Proyecto, (proyecto) => proyecto.carrera)
  proyectos: Proyecto[];

  @OneToMany(() => NivelEducativo, (nivelEducativo) => nivelEducativo.carrera)
  nivelEducativo: NivelEducativo[];

  @OneToMany(() => AreaDesarrollo, (areaDesarrollo) => areaDesarrollo.carrera)
  areaDesarrollo: AreaDesarrollo[];
}
