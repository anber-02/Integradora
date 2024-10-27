import { AreaDesarrollo } from 'src/modules/area-desarrollo/entities/area-desarrollo.entity';
import { Proyecto } from 'src/modules/proyecto/entities/proyecto.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
// @Unique(['nomenclatura'])
export class Carrera {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  nomenclatura: string;

  @Column('text')
  descripcion: string;

  @Column()
  nivel_educativo: string;

  @Column({ nullable: true })
  imageUrl?: string; // Para almacenar la URL de la imagen

  @OneToMany(() => Proyecto, (proyecto) => proyecto.carrera)
  proyectos: Proyecto[];

  @OneToMany(() => AreaDesarrollo, (areaDesarrollo) => areaDesarrollo.carrera)
  areaDesarrollo: AreaDesarrollo[];
}
