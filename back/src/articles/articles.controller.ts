import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dtos/createArticle.dto';
import { UpdateArticleDto } from './dtos/updateArticle.dto';

@Controller('articles')
export class ArticlesController {

    constructor(private readonly articlesService: ArticlesService) {}

    // Obtiene todos los artículos con dos filtros opcionales.
    @Get()
    getArticles(
        @Query('name') name?: string, 
        @Query('isActive') isActive?: string
    ) {
        const activeStatus = isActive === 'true' ? true : isActive === 'false' ? false : undefined;
        return this.articlesService.getArticles(name, activeStatus);
    }

    // Obtiene un artículo por su id
    @Get(':id')
    getArticleById(@Param('id') id: string){
        return this.articlesService.getArticleById(id);
    }

    // Obtiene un artículo por su nombre
    @Get('name/:name')
    getArticleByName(@Param('name') name: string){
        return this.articlesService.getArticleByName(name);
    }

    // Crea un nuevo artículo (nombre y marca son obligatorios)
    @Post()
    createArticle(@Body() article: CreateArticleDto){
        return this.articlesService.createArticle(article);
    }

    // Actualiza los campos de un artículo (excepto su ID).
    @Put(':id')
    updateArticle(@Param('id') id: string, @Body() updateData: UpdateArticleDto) {
        return this.articlesService.updateArticle(id, updateData);
    }

    // Desactiva un artículo en lugar de eliminarlo
    @Delete(':id')
    deactivateArticle(@Param('id') id: string) {
        return this.articlesService.deactivateArticle(id);
    }

}
