import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Role } from 'src/modules/roles/entities/role.entity';
import { Empresa } from 'src/modules/empresa/entities/empresa.entity';

@Entity({ name: 'usuario' })
@Unique(['email', 'num_telefono'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  num_telefono: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @OneToOne(() => Empresa, (empresa) => empresa.usuario)
  empresa: Empresa;

  @OneToOne(() => Role, (rol) => rol.user, { cascade: true })
  @JoinColumn()
  rol: Role;
}
