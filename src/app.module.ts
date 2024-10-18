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
import { AsesorEmpresarialInfoModule } from './modules/asesor_empresarial_info/asesor_empresarial_info.module';
import { EmpresaModule } from './modules/empresa/empresa.module';
import { EstadiaModule } from './modules/estadia/estadia.module';
import { HabilidadModule } from './modules/habilidad/habilidad.module';
import { ProyectoModule } from './modules/proyecto/proyecto.module';
import { ProyectoHabilidadModule } from './modules/proyecto_habilidad/proyecto_habilidad.module';
import { ProyectoTitulacionModule } from './modules/proyecto_titulacion/proyecto_titulacion.module';
import { RolesModule } from './modules/roles/roles.module';
import { SectorModule } from './modules/sector/sector.module';
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
    AsesorEmpresarialInfoModule,
    EmpresaModule,
    EstadiaModule,
    HabilidadModule,
    ProyectoModule,
    SectorModule,
    TitulacionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService
  ]
})
export class AppModule { }
