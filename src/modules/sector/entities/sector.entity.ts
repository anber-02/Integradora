import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sector {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    nombre:string;
}
