import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ArticlesService {

    constructor( private readonly prisma: PrismaService ) {}

    async getArticles(name?: string, isActive?: boolean) {
        const article = await this.prisma.articles.findMany({
        where: {
            name: name ? { contains: name, mode: 'insensitive' } : undefined,
            isActive: isActive !== undefined ? isActive : undefined,
        },
        });

        if (!article.length) {
            throw new NotFoundException(`No se encontraron artículos con el nombre: ${name}`);
        }
        return article;
    }

    async getArticleById(id: string) {
        const article = await this.prisma.articles.findUnique({
        where: { id },
        });

        if (!article) {
        throw new NotFoundException(`No se encontró el artículo con ID: ${id}`);
        }

        return article;
    }

    async getArticleByName(name: string) {
        const article = await this.prisma.articles.findFirst({
        where: { name },
        });

        if (!article) {
        throw new NotFoundException(`No se encontró el artículo con nombre: ${name}`);
        }

        return article;
    }

    
    async createArticle(data: { name: string; brand: string }) {
        if (!data.name || !data.brand) {
        throw new BadRequestException('El nombre y la marca son obligatorios');
        }

        const existingArticle = await this.prisma.articles.findFirst({ where: { name: data.name } });

        if (existingArticle) {
            throw new BadRequestException('El artículo ya está registrado.');
        }
        return this.prisma.articles.create({
            data: {
                name: data.name,
                brand: data.brand,
                updatedAt: new Date(),
                isActive: true,
            },
        });
    }

    async updateArticle(id: string, updateData: any) {
        
        const existingArticle = await this.prisma.articles.findUnique({ where: { id } });

        if (!existingArticle) {
        throw new NotFoundException(`No se encontró el artículo con ID: ${id}`);
        }

        return this.prisma.articles.update({
            where: { id },
            data: { ...updateData, updatedAt: new Date() },
        });
    }

    async deactivateArticle(id: string) {
        
        const existingArticle = await this.prisma.articles.findUnique({ where: { id } });

        if (!existingArticle) {
        throw new NotFoundException(`No se encontró el artículo con ID: ${id}`);
        }

        await this.prisma.articles.update({
            where: { id },
            data: { isActive: false, updatedAt: new Date() },
        });
        return {message: 'Artículo eliminado con éxito.'};
    }
}
