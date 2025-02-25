import { Controller, Get, Post, Put, Delete, Query, Param, Body } from '@nestjs/common';
import { InvitadosService } from './invitados.service';
import { Invitado } from '../entities/invitado.entity';
import { InvitadoExtra } from '../entities/invitado-extra.entity';
import { ConfirmInvitadoDto } from '../dto/confirm-invitado.dto';
import { CreateInvitadoExtraDto } from '../dto/create-invitado-extra.dto';
import { UpdateInvitadoExtraDto } from '../dto/update-invitado-extra.dto';

@Controller('invitados')
export class InvitadosController {
  constructor(private readonly invitadosService: InvitadosService) {}

  // GET /invitados?nombre=opcional
  // Si se omite "nombre", devuelve todos los invitados
  @Get()
  async getInvitados(@Query('nombre') nombre?: string): Promise<Invitado[]> {
    return this.invitadosService.findInvitados(nombre);
  }

  // GET /invitados/:id
  @Get(':id')
  async getInvitado(@Param('id') id: string): Promise<Invitado> {
    return this.invitadosService.findById(+id);
  }

  // POST /invitados/:id/confirm
  @Post(':id/confirm')
  async confirmInvitado(
    @Param('id') id: string,
    @Body() confirmDto: ConfirmInvitadoDto,
  ): Promise<Invitado> {
    return this.invitadosService.confirmInvitado(+id, confirmDto);
  }

  // POST /invitados/:id/extra
  @Post(':id/extra')
  async addExtra(
    @Param('id') id: string,
    @Body() createExtraDto: CreateInvitadoExtraDto,
  ): Promise<InvitadoExtra> {
    return this.invitadosService.addExtra(+id, createExtraDto);
  }

  // PUT /invitados/extra/:extraId
  @Put('extra/:extraId')
  async updateExtra(
    @Param('extraId') extraId: string,
    @Body() updateExtraDto: UpdateInvitadoExtraDto,
  ): Promise<InvitadoExtra> {
    return this.invitadosService.updateExtra(+extraId, updateExtraDto);
  }

  // DELETE /invitados/extra/:extraId
  @Delete('extra/:extraId')
  async deleteExtra(@Param('extraId') extraId: string): Promise<{ message: string }> {
    await this.invitadosService.deleteExtra(+extraId);
    return { message: 'Invitado extra eliminado correctamente' };
  }
}
