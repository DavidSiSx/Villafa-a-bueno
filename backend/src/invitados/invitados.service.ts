import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Invitado } from '../entities/invitado.entity';
import { CreateInvitadoDto } from '../dto/create-invitado.dto';

@Injectable()
export class InvitadosService {
  constructor(
    @InjectRepository(Invitado)
    private readonly invitadoRepository: Repository<Invitado>,
  ) {}

  /**
   * Retorna todos los invitados o filtra por nombre (coincidencia parcial).
   */
  async findByNameOrAll(nombre: string): Promise<Invitado[]> {
    if (!nombre.trim()) {
      return this.invitadoRepository.find();
    }
    return this.invitadoRepository.find({
      where: { nombre: Like(`%${nombre}%`) },
    });
  }

  /**
   * Retorna un invitado por su ID.
   */
  async findOne(id: number): Promise<Invitado> {
    const invitado = await this.invitadoRepository.findOne({ where: { id } });
    if (!invitado) {
      throw new NotFoundException(`Invitado con ID ${id} no encontrado.`);
    }
    return invitado;
  }

  /**
   * Crea un nuevo invitado a partir de un DTO.
   */
  async create(createInvitadoDto: CreateInvitadoDto): Promise<Invitado> {
    const nuevoInvitado = this.invitadoRepository.create(createInvitadoDto);
    return this.invitadoRepository.save(nuevoInvitado);
  }

  /**
   * Confirma la asistencia de un invitado, valida el código y asigna acompañantes.
   */
  async confirmInvitado(id: number, codigo: string, extras: string[]): Promise<string> {
    const invitado = await this.invitadoRepository.findOne({ where: { id } });
    if (!invitado) {
      throw new NotFoundException('Invitado no encontrado.');
    }
    if (invitado.codigo.trim() !== codigo.trim()) {
      throw new BadRequestException('Código incorrecto.');
    }
    if (extras.length > invitado.numPersonas - 1) {
      throw new BadRequestException(`Solo puedes agregar hasta ${invitado.numPersonas - 1} acompañantes.`);
    }

    invitado.acompanantes = extras;
    invitado.confirmado = true;
    await this.invitadoRepository.save(invitado);

    return 'Confirmación exitosa.';
  }

  /**
   * Actualiza los datos de un invitado (nombre, teléfono, cupos, acompañantes, estado de confirmación).
   */
  async updateInvitado(id: number, updateData: Partial<Invitado>): Promise<Invitado> {
    const invitado = await this.invitadoRepository.findOne({ where: { id } });
    if (!invitado) {
      throw new NotFoundException('Invitado no encontrado.');
    }

    if (updateData.nombre) invitado.nombre = updateData.nombre;
    if (updateData.numero) invitado.numero = updateData.numero;
    if (updateData.numPersonas !== undefined) invitado.numPersonas = updateData.numPersonas;
    if (updateData.acompanantes) invitado.acompanantes = updateData.acompanantes;
    if (updateData.confirmado !== undefined) invitado.confirmado = updateData.confirmado;

    return this.invitadoRepository.save(invitado);
  }

  /**
   * Elimina un invitado por su ID.
   */
  async deleteInvitado(id: number): Promise<void> {
    const invitado = await this.invitadoRepository.findOne({ where: { id } });
    if (!invitado) {
      throw new NotFoundException('Invitado no encontrado.');
    }
    await this.invitadoRepository.remove(invitado);
  }
}
