import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/utils/matchPassword';


export class UpdateUserDto {
    @ApiProperty({ 
        description: 'Nombre y apellido del usuario.',
        example: 'Juan Pérez' 
    })
    @IsOptional()
    @IsString()
    @Length(3, 100)
    nameAndLastName?: string;

    @ApiProperty({
        description: 'correo electrónico de inicio de sesión.',
        example: 'juanperez@gmail.com' 
    })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({
        description: 'Contraseña de inicio de sesión.',
        example: 'Ab345678!' 
    })
    @IsOptional()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
        message:
        'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial',
    })
    @MinLength(8)
    @MaxLength(20)
    password?: string;

    @ApiProperty({ 
        description: 'Confirmación de la contraseña.',
        example: 'Ab345678!' 
    })
    @IsOptional()
    @Validate(MatchPassword, ['password'])
    confirmPassword?: string;

}
