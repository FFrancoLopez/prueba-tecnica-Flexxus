import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class loginUserDto {
    @ApiProperty({ 
        description: 'correo electrónico de inicio de sesión.',
        example: 'juanperez@gmail.com' 
    })
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({ 
        description: 'Contraseña de inicio de sesión.',
        example: 'Ab345678!' 
    })
    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
        message:
        'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial',
    })
    @MinLength(8)
    @MaxLength(20)
    password: string;
}
