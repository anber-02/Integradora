import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AsesorEmpresarialInfo {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    nombre:string;
    @Column()
    email:string;
    @Column()
    num_telefono:string;
    @Column()
    area:string;
    @Column()
    cargo:string;
    @Column()
    proyecto_id:number;
}
