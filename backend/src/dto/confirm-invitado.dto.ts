import { IsNotEmpty, IsArray, IsString } from 'class-validator';

export class ConfirmInvitadoDto {
  @IsNotEmpty()
  @IsString()
  codigo: string; // Código de autenticación

  @IsArray()
  @IsString({ each: true })
  extras: string[]; // Nombres de los invitados extra
}
