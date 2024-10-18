import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProyectoTitulacion {
    @Column()
    proyecto_id:number;

    @Column()
    proyecto_empresa_id:number;

    @Column()
    titulacion_id:number;
}
