import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

// El forwardRef(() => SomeModule) se utiliza cuando un módulo
// depende de otro módulo que a su vez depende del primero.
// Esto le dice a NestJS que resuelva la dependencia de forma diferida.

@Module({
  imports: [TypeOrmModule.forFeature([Role]), AuthModule],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
