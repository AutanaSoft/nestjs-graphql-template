import { Field, ObjectType } from '@nestjs/graphql';

import { Roles, Status } from '../../../../core/graphql/generated/prisma';

@ObjectType({ description: 'Payload of token ' })
export class TokenPayload {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => Status, { nullable: false })
  status: Status;

  @Field(() => Roles, { nullable: false })
  roles: Roles;

  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  userName: string;

  @Field(() => Number, { nullable: false })
  iat?: number;

  @Field(() => Number, { nullable: false })
  exp?: number;
}

@ObjectType()
export class AccessToken {
  @Field(() => String, { nullable: false, description: 'Token de acceso' })
  token: string;

  @Field(() => Date, {
    nullable: false,
    description: 'Fecha de expiración del token',
  })
  expiresAt: Date;

  @Field(() => Date, { nullable: false, description: 'Fecha de creación del token' })
  createdAt: Date;
}
