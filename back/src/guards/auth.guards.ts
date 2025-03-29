import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { ConfigService } from '@nestjs/config';
  import { JwtService } from '@nestjs/jwt';
  import { Observable } from 'rxjs';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private jwtService: JwtService,
      private configService: ConfigService,
    ) {}
  
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers.authorization;
  
      if (!authHeader) {
        throw new UnauthorizedException('No se ha proporcionado un token.');
      }
  
      const parts = authHeader.split(' ');
      if (parts.length !== 2 || parts[0] !== 'Bearer') {
        throw new UnauthorizedException('El formato del token no es válido.');
      }
  
      const token = parts[1];
  
      try {
        const secret = this.configService.get<string>('JWT_SECRET');
        if (!secret) {
          throw new Error('JWT_SECRET no está definido en las variables de entorno.');
        }
  
        const user = this.jwtService.verify(token, { secret });
  
        // Convertimos timestamps a Date
        user.exp = user.exp ? new Date(user.exp * 1000) : null;
        user.iat = user.iat ? new Date(user.iat * 1000) : null;
  
        // Aseguramos que 'roles' sea siempre un array
        user.roles = Array.isArray(user.role) ? user.role : [user.role];
  
        request.user = user;
        return true;
      } catch (error) {
        throw new UnauthorizedException('El token es inválido o ha expirado.');
      }
    }
  }
  