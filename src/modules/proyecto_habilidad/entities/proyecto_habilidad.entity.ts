import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProyectoHabilidad {
    @Column()
    habilidad_id:number;

    @Column()
    proyecto_id:number;
}
