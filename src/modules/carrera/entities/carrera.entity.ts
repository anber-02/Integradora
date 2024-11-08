import { Aptitude } from 'src/modules/aptitudes/entities/aptitude.entity';
import { AreaDesarrollo } from 'src/modules/area-desarrollo/entities/area-desarrollo.entity';
import { Proyecto } from 'src/modules/proyecto/entities/proyecto.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @ManyToMany(() => Aptitude, (aptitudes) => aptitudes.carreras)
  @JoinTable({
    name: 'carrera_aptitud',
    joinColumn: {
      name: 'carrera_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'aptitud_id',
      referencedColumnName: 'id',
    },
  })
  aptitudes: Aptitude[];

  @ManyToMany(() => AreaDesarrollo, (area) => area.carreras)
  @JoinTable({
    name: 'carrera_area',
    joinColumn: {
      name: 'carrera_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'area_desarrollo_id',
      referencedColumnName: 'id',
    },
  })
  areaDesarrollo: AreaDesarrollo[];
}
