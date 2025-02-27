import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { InvitadosService } from './invitados.service';
import { CreateInvitadoDto } from '../dto/create-invitado.dto';
import { Invitado } from '../entities/invitado.entity';

@Controller('invitados')
export class InvitadosController {
  constructor(private readonly invitadosService: InvitadosService) {}

  /**
   * GET /invitados?nombre=algo
   * Obtiene todos los invitados o filtra por nombre (coincidencia parcial).
   */
  @Get()
  async getInvitados(@Query('nombre') nombre?: string): Promise<Invitado[]> {
    return this.invitadosService.findByNameOrAll(nombre || '');
  }

  /**
   * GET /invitados/:id
   * Retorna un invitado específico por ID.
   */
  @Get(':id')
  async getInvitado(@Param('id', ParseIntPipe) id: number): Promise<Invitado> {
    return this.invitadosService.findOne(id);
  }

  /**
   * POST /invitados
   * Crea un nuevo invitado con los datos del DTO.
   */
  @Post()
  async addInvitado(@Body() createInvitadoDto: CreateInvitadoDto): Promise<Invitado> {
    return this.invitadosService.create(createInvitadoDto);
  }

  /**
   * POST /invitados/:id/confirm
   * Confirma la asistencia de un invitado y asigna acompañantes.
   */
  @Post(':id/confirm')
  async confirmInvitado(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { codigo: string; extras: string[] },
  ) {
    return this.invitadosService.confirmInvitado(id, body.codigo, body.extras);
  }

  /**
   * PUT /invitados/:id
   * Actualiza los datos de un invitado (perfil editable).
   */
  @Put(':id')
  async updateInvitado(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<Invitado>,
  ): Promise<Invitado> {
    return this.invitadosService.updateInvitado(id, updateData);
  }

  /**
   * DELETE /invitados/:id
   * Elimina un invitado por su ID.
   */
  @Delete(':id')
  async deleteInvitado(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.invitadosService.deleteInvitado(id);
  }
}
