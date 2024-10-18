import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Proyecto {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @Column()
    descripcion:string;
    
    @Column()
    participantes_requeridos:number;
    
    @Column()
    empresa_id:number;
}
