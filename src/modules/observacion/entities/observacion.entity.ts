import { Empresa } from 'src/modules/empresa/entities/empresa.entity';
import { Proyecto } from 'src/modules/proyecto/entities/proyecto.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Observacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  detalle: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @ManyToMany(() => Empresa, (empresa) => empresa.observaciones)
  empresas: Empresa[];

  @ManyToMany(() => Proyecto, (proyecto) => proyecto.observaciones)
  proyectos: Proyecto[];
}
