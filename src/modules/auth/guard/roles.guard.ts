import {
  CanActivate,
  ExecutionContext,
  // ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { Role } from '../enums/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rol = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!rol) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('admin/access', user.rol);
    if (user.rol === Role.ADMIN) {
      return true;
    }

    // if (user.rol === Role.EMPRESA) {
    //   const idParam = request.params.id;
    //   if (idParam && user.id !== idParam) {
    //     throw new ForbiddenException(
    //       'No tienes permiso para acceder a los datos de otra empresa',
    //     );
    //   }
    // }

    return rol.some((role) => role === user.rol);
  }
}
