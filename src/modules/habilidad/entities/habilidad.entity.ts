import { Proyecto } from 'src/modules/proyecto/entities/proyecto.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Habilidad {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;

  @ManyToMany(() => Proyecto, (proyecto) => proyecto.habilidades)
  proyectos: Proyecto[];
}
