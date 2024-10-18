import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { DireccionModule } from './modules/direccion/direccion.module';
import { DocumentacionModule } from './modules/documentacion/documentacion.module';
import { EmpleadorModule } from './modules/empleador/empleador.module';
import { CarreraModule } from './modules/carrera/carrera.module';
import { EmpresaModule } from './modules/empresa/empresa.module';
import { HabilidadModule } from './modules/habilidad/habilidad.module';
import { ProyectoModule } from './modules/proyecto/proyecto.module';
import { TitulacionModule } from './modules/titulacion/titulacion.module';


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
    // JWT
    AuthModule,
    UserModule,
    DireccionModule,
    DocumentacionModule,
    EmpleadorModule,
    CarreraModule,
    EmpresaModule,
    HabilidadModule,
    ProyectoModule,
    TitulacionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService
  ]
})
export class AppModule { }
