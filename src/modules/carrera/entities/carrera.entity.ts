import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Carrera {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @Column()
    clave:string;

    @Column()
    descripcion:string;
}
