import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Titulacion {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @Column()
    descripcion:string;

    @Column()
    tipo:string;
}
