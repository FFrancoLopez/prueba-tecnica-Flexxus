import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { ROLES_KEY } from 'src/decorators/roles.decorators';
  
  
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user || !Array.isArray(user.roles) || user.roles.length === 0) {
        throw new ForbiddenException('Acceso denegado: rol no asignado.');
        }

        // Si el usuario es ADMIN, siempre tiene acceso.
        if (user.roles.includes(UserRole.ADMIN)) {
        return true;
        }

        // Obtiene los roles requeridos de la metadata.
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
        ]);

        // Si no se requieren roles específicos, acceso permitido.
        if (!requiredRoles || requiredRoles.length === 0) {
        return true; 
        }

        // Verifica si el usuario tiene al menos uno de los roles requeridos.
        const hasRole = requiredRoles.some((role) => user.roles.includes(role));
        if (!hasRole) {
        throw new ForbiddenException('Acceso denegado: permisos insuficientes.');
        }

        return true;
    }
}
  