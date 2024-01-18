import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'

import { RolesGuard } from '@/graphql/shared/infrastructure/guard/roles.guard'
import { UserRoles } from '@prisma/client'

export const ROLES_KEY = 'roles'

export const Roles = (...roles: UserRoles[]) => SetMetadata(ROLES_KEY, roles)

export function CheckRoles(...roles: UserRoles[]) {
  return applyDecorators(Roles(...roles), UseGuards(RolesGuard))
}
