import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
  import { UsersService } from './users.service';
  import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { AuthGuard } from 'src/guards/auth.guards';
import { RolesGuard } from 'src/guards/roles.guards';
import { Roles } from 'src/decorators/roles.decorators';
import { UpdateUserDto } from './dtos/updateUser.dto';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @ApiBearerAuth()
    @Get()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiOperation({ description: 'Obtiene todos los usuarios.     ---> Acceso solo para administradores.' })
    getAllUsers() {
      return this.usersService.getAllUsers();
    }
  
    @ApiBearerAuth()
    @Get(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiParam({ name: 'id', required: true, type: String, description: 'ID del usuario', example: 'cm8trtvn00000hv40e59xxtch' })
    getUserById(@Param('id') id: string) {
      return this.usersService.getUserById(id);
    }

    @ApiBearerAuth()
    @Put('update-user/:id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiParam({ name: 'id', required: true, type: String, description: 'ID del usuario', example: 'cm8trtvn00000hv40e59xxtch' })
    @ApiBody({type: UpdateUserDto, description: 'Datos del usuario a actualizar'})
    updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
        return this.usersService.updateUser(id, user);
    }

    @ApiBearerAuth()
    @Get('email/:email')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiParam({ name: 'email', required: true, type: String, description: 'Correo electrónico del usuario', example: 'juanperez@gmail.com' })
    findUserByEmail(@Param('email') email: string) {
        return this.usersService.findUserByEmail(email);
    }

    
}