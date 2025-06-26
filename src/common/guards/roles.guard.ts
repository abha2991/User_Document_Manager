import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  // canActivate(context: ExecutionContext): boolean {
  //   const requiredRoles = this.reflector.getAllAndOverride<string[]>(
  //     ROLES_KEY,
  //     [context.getHandler(), context.getClass()],
  //   );
  //   if (!requiredRoles) {
  //     return true;
  //   }
  //
  //   const { user } = context.switchToHttp().getRequest();
  //   console.log({ user });
  //   if (!user || !user.roles) {
  //     throw new ForbiddenException('User roles not found');
  //   }
  //
  //   const hasRole = user.roles.some((role) => requiredRoles.includes(role));
  //   console.log(hasRole);
  //   if (!hasRole) {
  //     throw new ForbiddenException('Permission denied');
  //   }
  //
  //   return true;
  // }
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user || (!user.role && !user.roles)) {
      throw new ForbiddenException('User roles not found');
    }

    const userRoles = Array.isArray(user.roles)
      ? user.roles
      : user.role
      ? [user.role]
      : [];

    const hasRole = userRoles.some((role) => requiredRoles.includes(role));
    if (!hasRole) {
      throw new ForbiddenException('Permission denied');
    }

    return true;
  }
}
