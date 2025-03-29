import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserRole, Users } from '@prisma/client';

  
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup( user: Omit<Users, 'id' | 'createdAt' | 'updatedAt' | 'role'>, ) {
    
    user.email = user.email.toLowerCase();

    const existingUser = await this.prisma.users.findUnique({ where: { email: user.email } });

    if (existingUser) {
        throw new BadRequestException('El email ya está registrado');
    }

    // Hasheamos la contraseña y creamos el nuevo usuario.
    const hashPassword = await bcrypt.hash(user.password, 10);

    const saveUser = await this.prisma.users.create({
      data: {
        ...user,
        password: hashPassword,
      },
      select: {
        id: true,
        nameAndLastName: true,
        email: true,
        role: true,
      },
    });

    // Generamos el token de autenticación.
    const payload = {
        id: saveUser.id,
        email: saveUser.email,
        role: saveUser.role,
    };
    const token = this.jwtService.sign(payload);

    return {
        user: saveUser,
        token,
    };
  }

  async signin(email: string, passwordLoggin: string) {
    const user = await this.prisma.users.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordMatch = await bcrypt.compare(passwordLoggin, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    const { password, role, ...withoutPasswordAndRole } = user;

    return {
      message: 'Inicio de sesión con éxito',
      withoutPasswordAndRole,
      token,
    };
  }
}