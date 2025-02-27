import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateInvitadoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsString()
  numero: string;

  @IsNotEmpty()
  @IsNumber()
  numPersonas: number;

  @IsNotEmpty()
  @IsString()
  codigo: string;
}
