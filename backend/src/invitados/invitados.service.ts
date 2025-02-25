import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Invitado } from '../entities/invitado.entity';
import { InvitadoExtra } from '../entities/invitado-extra.entity';
import { ConfirmInvitadoDto } from '../dto/confirm-invitado.dto';
import { CreateInvitadoExtraDto } from '../dto/create-invitado-extra.dto';
import { UpdateInvitadoExtraDto } from '../dto/update-invitado-extra.dto';

@Injectable()
export class InvitadosService {
  constructor(
    @InjectRepository(Invitado)
    private readonly invitadosRepository: Repository<Invitado>,
    @InjectRepository(InvitadoExtra)
    private readonly invitadosExtraRepository: Repository<InvitadoExtra>,
  ) {}

  // Si se pasa un parámetro "nombre" se filtra; de lo contrario, devuelve todos los invitados.
  async findInvitados(nombre?: string): Promise<Invitado[]> {
    if (nombre) {
      return await this.invitadosRepository.find({
        where: { nombre: Like(`%${nombre}%`) },
        relations: ['extras'],
      });
    } else {
      return await this.invitadosRepository.find({ relations: ['extras'] });
    }
  }

  async findById(id: number): Promise<Invitado> {
    const invitado = await this.invitadosRepository.findOne({
      where: { id },
      relations: ['extras'],
    });
    if (!invitado) {
      throw new NotFoundException(`Invitado con ID ${id} no encontrado`);
    }
    return invitado;
  }

  // Actualiza el número de personas confirmadas para un invitado
  async confirmInvitado(id: number, confirmDto: ConfirmInvitadoDto): Promise<Invitado> {
    const invitado = await this.findById(id);
    invitado.num_personas = confirmDto.num_personas;
    return await this.invitadosRepository.save(invitado);
  }

  // Agrega un invitado extra relacionado con el invitado principal
  async addExtra(id: number, createExtraDto: CreateInvitadoExtraDto): Promise<InvitadoExtra> {
    const invitado = await this.findById(id);
    const extra = this.invitadosExtraRepository.create(createExtraDto);
    extra.invitado = invitado;
    return await this.invitadosExtraRepository.save(extra);
  }

  // Actualiza el nombre de un invitado extra
  async updateExtra(extraId: number, updateExtraDto: UpdateInvitadoExtraDto): Promise<InvitadoExtra> {
    const extra = await this.invitadosExtraRepository.findOne({ where: { id: extraId } });
    if (!extra) {
      throw new NotFoundException(`Invitado extra con ID ${extraId} no encontrado`);
    }
    extra.nombre = updateExtraDto.nombre;
    return await this.invitadosExtraRepository.save(extra);
  }

  // Elimina un invitado extra
  async deleteExtra(extraId: number): Promise<void> {
    const result = await this.invitadosExtraRepository.delete(extraId);
    if (result.affected === 0) {
      throw new NotFoundException(`Invitado extra con ID ${extraId} no encontrado`);
    }
  }
}
