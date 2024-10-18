import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Estadia {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    fecha_inicio: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    fecha_termino: Date;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)'
    })
    createdAt: Date;

    @Column()
    titulacion_id:number;
}
