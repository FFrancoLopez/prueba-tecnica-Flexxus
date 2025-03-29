import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
  import { UsersService } from './users.service';
  import { ApiBearerAuth } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { AuthGuard } from 'src/guards/auth.guards';
import { RolesGuard } from 'src/guards/roles.guards';
import { Roles } from 'src/decorators/roles.decorators';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @ApiBearerAuth()
    @Get()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    getAllUsers() {
      return this.usersService.getAllUsers();
    }
  
    @ApiBearerAuth()
    @Get(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    getUserById(@Param('id') id: string) {
      return this.usersService.getUserById(id);
    }

    @ApiBearerAuth()
    @Put('update-user/:id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
        return this.usersService.updateUser(id, user);
    }

    @ApiBearerAuth()
    @Get('email/:email')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    findUserByEmail(@Param('email') email: string) {
        return this.usersService.findUserByEmail(email);
    }

    
}