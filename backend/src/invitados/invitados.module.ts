import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitadosService } from './invitados.service';
import { InvitadosController } from './invitados.controller';
import { Invitado } from '../entities/invitado.entity';
import { InvitadoExtra } from '../entities/invitado-extra.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invitado, InvitadoExtra])],
  providers: [InvitadosService],
  controllers: [InvitadosController],
})
export class InvitadosModule {}
