import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/utils/matchPassword';


export class CreateUserDto {
    @ApiProperty({ 
        description: 'Nombre y apellido del usuario.',
        example: 'Juan Pérez' 
    })
    @IsNotEmpty()
    @IsString()
    @Length(3, 100)
    nameAndLastName: string;

    @ApiProperty({
        description: 'correo electrónico de inicio de sesión.',
        example: 'juanperez@gmail.com' 
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Contraseña de inicio de sesión.',
        example: 'Ab345678!' 
    })
    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
        message:
        'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial',
    })
    @MinLength(8)
    @MaxLength(20)
    password: string;

    @ApiProperty({ 
        description: 'Confirmación de la contraseña.',
        example: 'Ab345678!' 
    })
    @IsNotEmpty()
    @Validate(MatchPassword, ['password'])
    confirmPassword: string;

    @IsOptional()
    @IsNotEmpty()
    @IsEnum(UserRole)
    role?: UserRole;

}
