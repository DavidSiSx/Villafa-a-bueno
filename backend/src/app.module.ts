import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invitado } from './entities/invitado.entity';
import { InvitadoExtra } from './entities/invitado-extra.entity';
import { InvitadosModule } from './invitados/invitados.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Zoe223344.',
      database: 'fiesta',
      entities: [Invitado, InvitadoExtra],
      synchronize: true,
    }),
    InvitadosModule,
  ],
})
export class AppModule {}
