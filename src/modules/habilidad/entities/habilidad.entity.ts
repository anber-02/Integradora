import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Habilidad {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    nombre:string;
}

