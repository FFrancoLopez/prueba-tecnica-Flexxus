import {
    BadRequestException,
    Body,
    Controller,
    Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginUserDto } from './dtos/signin.dto';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
  
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Post('signup')
    async signup(@Body() user: CreateUserDto) {
      const { confirmPassword, ...newUser } = user;
  
      return this.authService.signup(newUser);
    }
  
    @Post('signin')
    async signin(@Body() loginUser: loginUserDto) {
      const { email, password } = loginUser;
      return this.authService.signin(email, password);
    }
}  