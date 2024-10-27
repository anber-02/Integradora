import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('aptitud')
export class Aptitude {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  aptitud: string;
}
