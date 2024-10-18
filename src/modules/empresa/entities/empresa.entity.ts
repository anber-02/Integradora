import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Empresa {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    nombre:string;
    @Column()
    tipo:string;
    @Column()
    giro:string;
    @Column()
    razon_social:string;
    @Column()
    empleador_id:number;
    @Column()
    sector_id:number;
    @Column()
    direccion_id:number;
    @Column()
    verificada:boolean;
    @Column()
    size:string;
    @Column()
    ubicacion:string;
}