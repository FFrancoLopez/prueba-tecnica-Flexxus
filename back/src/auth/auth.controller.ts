import {
    BadRequestException,
    Body,
    Controller,
    Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginUserDto } from './dtos/signin.dto';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { ApiBody } from '@nestjs/swagger';
  
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Post('signup')
    @ApiBody({type: CreateUserDto, description: 'Datos del usuario para registrarse.'})
    async signup(@Body() user: CreateUserDto) {
      const { confirmPassword, ...newUser } = user;
  
      return this.authService.signup(newUser);
    }
  
    @Post('signin')
    @ApiBody({type: loginUserDto, description: 'Datos del usuario para iniciar sesión.'})
    async signin(@Body() loginUser: loginUserDto) {
      const { email, password } = loginUser;
      return this.authService.signin(email, password);
    }
}  