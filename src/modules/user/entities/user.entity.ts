import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
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

  @Column()
  cargo: string;

  @Column()
  area_trabajo: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @OneToOne(() => Empresa, (empresa) => empresa.usuario)
  empresa: Empresa;

  @ManyToMany(() => Role, (roles) => roles.users)
  @JoinTable({
    name: 'rol_user',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'rol_id',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];
}
