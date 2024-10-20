import { Empresa } from 'src/modules/empresa/entities/empresa.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Direccion {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  calle: string;
  @Column()
  num_interior: string;
  @Column()
  num_exterior: string;
  @Column()
  colonia: string;
  @Column()
  municipio: string;
  @Column()
  estado: string;
  @Column()
  pais: string;
  @Column()
  codigo_postal: number;

  @OneToOne(() => Empresa, (empresa) => empresa.direccion)
  empresa: Empresa;
}
