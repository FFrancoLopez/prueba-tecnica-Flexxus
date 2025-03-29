import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean, MaxLength } from 'class-validator';

export class UpdateArticleDto {
    @ApiProperty({
        description: 'Nombre del artículo (opcional)',
        example: 'Televisor LED 43 Full HD',
    })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    name?: string;

    @ApiProperty({
      description: 'Marca del artículo (opcional)',
      example: 'Philips',
    })
    @IsOptional()
    @IsString()
    @MaxLength(80)
    brand?: string;

    @ApiProperty({
      description: 'Marca como activo o inactivo al artículo (opcional)',
      example: 'false',
    })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
