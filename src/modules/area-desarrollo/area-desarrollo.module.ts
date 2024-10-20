import { Module } from '@nestjs/common';
import { AreaDesarrolloService } from './area-desarrollo.service';
import { AreaDesarrolloController } from './area-desarrollo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaDesarrollo } from './entities/area-desarrollo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AreaDesarrollo])],
  controllers: [AreaDesarrolloController],
  providers: [AreaDesarrolloService],
})
export class AreaDesarrolloModule {}
