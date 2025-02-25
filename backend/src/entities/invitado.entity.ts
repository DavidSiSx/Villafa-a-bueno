import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { InvitadoExtra } from './invitado-extra.entity';

@Entity()
export class Invitado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  telefono: string;

  // Este campo representa el número de personas confirmadas o invitaciones extras disponibles
  @Column({ type: 'int', default: 0 })
  num_personas: number;

  @OneToMany(() => InvitadoExtra, extra => extra.invitado, { cascade: true })
  extras: InvitadoExtra[];
}
