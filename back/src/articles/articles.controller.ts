import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dtos/createArticle.dto';
import { UpdateArticleDto } from './dtos/updateArticle.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guards';
import { RolesGuard } from 'src/guards/roles.guards';
import { Roles } from 'src/decorators/roles.decorators';
import { UserRole } from '@prisma/client';

@Controller('articles')
export class ArticlesController {

    constructor(private readonly articlesService: ArticlesService) {}

    // Obtiene todos los artículos con dos filtros opcionales.
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    @Get()
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
    getArticleById(@Param('id') id: string){
        return this.articlesService.getArticleById(id);
    }

    // Obtiene un artículo por su nombre
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    @Get('name/:name')
    getArticleByName(@Param('name') name: string){
        return this.articlesService.getArticleByName(name);
    }

    // Crea un nuevo artículo (nombre y marca son obligatorios)
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Post()
    createArticle(@Body() article: CreateArticleDto){
        return this.articlesService.createArticle(article);
    }

    // Actualiza los campos de un artículo (excepto su ID).
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Put(':id')
    updateArticle(@Param('id') id: string, @Body() updateData: UpdateArticleDto) {
        return this.articlesService.updateArticle(id, updateData);
    }

    // Desactiva un artículo en lugar de eliminarlo
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Delete(':id')
    deactivateArticle(@Param('id') id: string) {
        return this.articlesService.deactivateArticle(id);
    }

}
