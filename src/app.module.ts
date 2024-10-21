import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { DireccionModule } from './modules/direccion/direccion.module';
import { CarreraModule } from './modules/carrera/carrera.module';
import { EmpresaModule } from './modules/empresa/empresa.module';
import { HabilidadModule } from './modules/habilidad/habilidad.module';
import { ProyectoModule } from './modules/proyecto/proyecto.module';
import { DocumentosModule } from './modules/documentos/documentos.module';
import { NivelEducativoModule } from './modules/nivel-educativo/nivel-educativo.module';
import { AreaDesarrolloModule } from './modules/area-desarrollo/area-desarrollo.module';
import { ObservacionModule } from './modules/observacion/observacion.module';
import { SolicitanteModule } from './modules/solicitante/solicitante.module';
import { ImagesModule } from './shared/images/images.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),

    AuthModule,
    UserModule,
    DireccionModule,
    CarreraModule,
    EmpresaModule,
    HabilidadModule,
    ProyectoModule,
    DocumentosModule,
    NivelEducativoModule,
    AreaDesarrolloModule,
    ObservacionModule,
    SolicitanteModule,
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
