import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean, Max, MaxLength } from 'class-validator';

export class UpdateArticleDto {
    @ApiProperty({
        description: 'Nombre del artículo (opcional)',
        example: 'Televisor LED 65"',
    })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiProperty({
    description: 'Marca del artículo (opcional)',
    example: 'Samsung',
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
