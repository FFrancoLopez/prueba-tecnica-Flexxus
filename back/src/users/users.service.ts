import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  private excludePassword(user: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, confirmPassword, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getAllUsers() {
    const users = await this.prisma.users.findMany();

    if (!users.length) throw new NotFoundException('Usuarios no encontrados');

    const usersWithoutPassword = users.map((user) => this.excludePassword(user));
    return usersWithoutPassword;
  }

  async getUserById(id: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) throw new NotFoundException('Usuario no encontrado');

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  

  async updateUser(id: string, updatedData: UpdateUserDto) {
    try {
      const user = await this.prisma.users.update({
        where: { id },
        data: updatedData,
      });

      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`El usuario con ID ${id} no existe`);
      }
      throw new InternalServerErrorException('Error al actualizar el usuario');
    }
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.users.findUnique({
      where: { email },
    });

    if (!user) throw new NotFoundException('Usuario no encontrado');

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

}