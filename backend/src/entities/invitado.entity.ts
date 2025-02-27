import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("invitado")
export class Invitado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  numero: string;

  @Column({ default: 1 })
  numPersonas: number;

  @Column({ default: false })
  confirmado: boolean;

  @Column()
  codigo: string;

  @Column("simple-array", { nullable: true })
  acompanantes: string[];
}
