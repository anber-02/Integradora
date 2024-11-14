import { Carrera } from 'src/modules/carrera/entities/carrera.entity';
import { Empresa } from 'src/modules/empresa/entities/empresa.entity';
import { Habilidad } from 'src/modules/habilidad/entities/habilidad.entity';
import { Observacion } from 'src/modules/observacion/entities/observacion.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Proyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  participantes_requeridos: number;

  @Column()
  empresa_id: number;

  @Column()
  carrera_id: number;

  @ManyToOne(() => Empresa, (empresa) => empresa.proyectos)
  @JoinColumn({ name: 'empresa_id' })
  empresa: Empresa;

  @ManyToOne(() => Carrera, (carrera) => carrera.proyectos, { nullable: false })
  @JoinColumn({ name: 'carrera_id' })
  carrera: Carrera;

  @ManyToMany(() => Observacion, (observacion) => observacion.empresas)
  @JoinTable({ name: 'proyecto_observacion' })
  observaciones: Observacion[];

  @ManyToMany(() => Habilidad, (habilidad) => habilidad.proyectos)
  @JoinTable({ name: 'proyecto_habilidad' })
  habilidades: Habilidad[];
}
