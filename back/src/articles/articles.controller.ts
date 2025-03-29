import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dtos/createArticle.dto';
import { UpdateArticleDto } from './dtos/updateArticle.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guards';
import { RolesGuard } from 'src/guards/roles.guards';
import { Roles } from 'src/decorators/roles.decorators';
import { UserRole } from '@prisma/client';

@Controller('articles')
export class ArticlesController {

    constructor(private readonly articlesService: ArticlesService) {}

    // Obtiene el artículo con dos filtros opcionales.
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    @Get()
    @ApiOperation({ description: 'Se obtienen todos los artículos al dejar los filtros vacíos.' })
    @ApiQuery({ name: 'name', required: false, type: String, description: 'Coloque el nombre del artículo para filtrar', example: 'Lavarropas Automático 8kg' })
    @ApiQuery({ name: 'isActive', required: false, type: Boolean }) 
    getArticles(
        @Query('name') name?: string, 
        @Query('isActive') isActive?: string
    ) {
        const activeStatus = isActive === 'true' ? true : isActive === 'false' ? false : undefined;
        return this.articlesService.getArticles(name, activeStatus);
    }

    // Obtiene un artículo por su id
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    @Get(':id')
    @ApiParam({ name: 'id', required: true, type: String, description: 'ID del artículo', example: 'cm8typg9t0003hvm0sp8xr5z8' })
    getArticleById(@Param('id') id: string){
        return this.articlesService.getArticleById(id);
    }

    // Obtiene un artículo por su nombre
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    @Get('name/:name')
    @ApiParam({ name: 'name', required: true, type: String, description: 'Nombre del artículo', example: 'Lavarropas Automático 8kg' })
    getArticleByName(@Param('name') name: string){
        return this.articlesService.getArticleByName(name);
    }

    // Crea un nuevo artículo (nombre y marca son obligatorios)
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Post()
    @ApiBody({type: CreateArticleDto, description: 'Datos del artículo que se va a crear.     ---> Acceso solo para administradores.'})
    createArticle(@Body() article: CreateArticleDto){
        return this.articlesService.createArticle(article);
    }

    // Actualiza los campos de un artículo (excepto su ID).
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Put(':id')
    @ApiParam({ name: 'id', required: true, type: String, description: 'ID del artículo', example: 'cm8typg9t0003hvm0sp8xr5z8' })
    @ApiBody({type: UpdateArticleDto, description: 'Datos del artículo a actualizar.     ---> Acceso solo para administradores.'})
    updateArticle(@Param('id') id: string, @Body() updateData: UpdateArticleDto) {
        return this.articlesService.updateArticle(id, updateData);
    }

    // Desactiva un artículo en lugar de eliminarlo
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Delete(':id')
    @ApiParam({ name: 'id', required: true, type: String, description: 'ID del artículo.     ---> Acceso solo para administradores.', example: 'cm8typg9t0003hvm0sp8xr5z8' })
    deactivateArticle(@Param('id') id: string) {
        return this.articlesService.deactivateArticle(id);
    }

}
