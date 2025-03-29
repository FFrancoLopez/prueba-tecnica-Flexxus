import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateArticleDto {
    @ApiProperty({
        description: 'Nombre del artículo',
        example: 'Monitor de 1080p',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name: string;

    @ApiProperty({
        description: 'Marca del artículo',
        example: 'LG',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(80)
    brand: string;
}
