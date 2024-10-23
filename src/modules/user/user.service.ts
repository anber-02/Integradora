import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private rolesService: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, nombre, password, num_telefono } = createUserDto;
    const user = this.userRepository.create({
      email,
      nombre,
      password,
      num_telefono,
    });
    // Ay que verificar esta funcion
    const userRole = await this.rolesService.findOneByName(createUserDto.rol);

    user.rol = userRole;
    await this.userRepository.save(user);
    return user;
  }

  findAll() {
    return this.userRepository.find({
      relations: { rol: true },
    });
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id: id },
      relations: {
        rol: true,
      },
    });
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      relations: {
        rol: true,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { email, nombre, password, num_telefono } = updateUserDto;
    const user = await this.userRepository.preload({
      id: id,
      email,
      nombre,
      password,
      num_telefono,
    });
    await this.userRepository.save(user);

    return user;
  }

  remove(id: number) {
    try {
      this.userRepository.delete(id);
    } catch (e) {
      throw new Error(e);
    }

    return { message: 'Usuario eliminado' };
  }
  async assignRolToUse(data: { user_id: number; rol_id: number }) {
    const { user_id, rol_id } = data;
    const user = await this.userRepository.findOne({
      where: { id: user_id },
      relations: { rol: true },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const role = await this.rolesService.findOne(rol_id);

    if (!role) {
      throw new Error('Role not found');
    }

    user.rol = role;
    await this.userRepository.save(user);

    return { message: 'Role assigned successfully' };
  }
}
