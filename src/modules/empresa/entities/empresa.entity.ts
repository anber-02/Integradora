import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Direccion } from 'src/modules/direccion/entities/direccion.entity';
// import { Solicitante } from 'src/modules/solicitante/entities/solicitante.entity';
import { Documento } from 'src/modules/documentos/entities/documento.entity';
import { Proyecto } from 'src/modules/proyecto/entities/proyecto.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Observacion } from 'src/modules/observacion/entities/observacion.entity';

@Entity()
export class Empresa {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @Column()
  tipo: string;
  @Column()
  giro: string;
  @Column()
  razon_social: string;
  @Column()
  sector: string;
  @Column()
  direccion_id: number;
  @Column()
  verificada: boolean;
  @Column()
  size: string;
  @Column()
  ubicacion: string;

  @Column()
  usuario_id: number;

  @OneToOne(() => User, (usuario) => usuario.empresa, { nullable: false })
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;

  @OneToOne(() => Direccion, (direccion) => direccion.empresa)
  @JoinColumn({ name: 'direccion_id' })
  direccion: Direccion;

  // @OneToOne(() => Solicitante, (solicitante) => solicitante.empresa)
  // @JoinColumn({ name: 'solicitante_id' })
  // solicitante: Solicitante;

  @OneToMany(() => Documento, (documento) => documento.empresa)
  documentos: Documento[];

  @OneToMany(() => Proyecto, (proyecto) => proyecto.empresa)
  proyectos: Proyecto[];

  @ManyToMany(() => Observacion, (observacion) => observacion.empresas)
  @JoinTable({ name: 'empresa_observacion' })
  observaciones: Observacion[];
}
