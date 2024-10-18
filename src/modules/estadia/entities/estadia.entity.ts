import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Estadia {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
      })
      fecha_inicio: Date;

      @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
      })
      fecha_termino: Date;

    @Column()
    titulacion_id:number;
}
