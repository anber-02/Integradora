import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "src/modules/user/entities/user.entity"

@Entity({name: "rol"})
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  rol: string
  
  
  @OneToMany(() => User, user => user.rol)
  user: User[]
}
