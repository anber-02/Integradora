import { Empresa } from 'src/modules/empresa/entities/empresa.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from '../enums/status.enum';

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

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.EN_PROCESO,
  })
  status: string;

  @Column()
  empresa_id: number;

  @ManyToOne(() => Empresa, (empresa) => empresa.documentos)
  @JoinColumn({ name: 'empresa_id' })
  empresa: Empresa;
}
