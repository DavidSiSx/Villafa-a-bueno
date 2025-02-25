import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitadosModule } from './invitados/invitados.module';
import { Invitado } from './entities/invitado.entity';
import { InvitadoExtra } from './entities/invitado-extra.entity';

@Module({
  imports: [
    // Configuración de TypeORM para conectar con MySQL
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',           // Cambia según tu entorno
      port: 3306,                  // Puerto de MySQL
      username: 'root',            // Tu usuario MySQL
      password: 'Zoe223344.',   // Tu contraseña MySQL (debe coincidir con el ALTER USER)
      database: 'fiestas_db',      // Nombre de tu base de datos
      entities: [Invitado, InvitadoExtra],
      synchronize: true,           // En desarrollo se recomienda true, en producción usa migraciones
    }),
    InvitadosModule,               // Módulo que contiene la lógica de los invitados
  ],
})
export class AppModule {}
