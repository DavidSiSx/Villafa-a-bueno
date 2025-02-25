import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Invitado } from './invitado.entity';

@Entity()
export class InvitadoExtra {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Invitado, invitado => invitado.extras, { onDelete: 'CASCADE' })
  invitado: Invitado;
}
