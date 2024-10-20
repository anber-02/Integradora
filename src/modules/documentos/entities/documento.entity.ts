import { Empresa } from 'src/modules/empresa/entities/empresa.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Documento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre_archivo: string;

  @Column()
  tipo_archivo: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha_subida: Date;

  @Column()
  url: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.documentos)
  @JoinColumn({ name: 'empresa_id' })
  empresa: Empresa;
}
