import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn  } from "typeorm";

@Entity()
export class Documentacion {
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    nombre_archivo:string;
    
    @Column()
    tipo_archivo:string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
      })
      fecha_subida: Date;

    @Column()
    url:string;

    @Column()
    empresa_id:number;
    
}
