import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Empleador {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    nombre:string;
    @Column()
    cargo:string;
    @Column()
    email:string;
    @Column()
    num_telefono:string;
}
