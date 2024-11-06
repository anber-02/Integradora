import { Module } from '@nestjs/common';
import { AptitudesService } from './aptitudes.service';
import { AptitudesController } from './aptitudes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aptitude } from './entities/aptitude.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Aptitude])],
  controllers: [AptitudesController],
  providers: [AptitudesService],
})
export class AptitudesModule {}
