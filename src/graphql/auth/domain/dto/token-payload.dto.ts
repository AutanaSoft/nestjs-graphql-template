import { Field, ObjectType } from '@nestjs/graphql'

import { Roles, Status } from '../../../../core/generated/prisma/graphql/prisma'

@ObjectType({ description: 'Payload of token' })
export class TokenPayload {
  @Field(() => String, { nullable: false })
  id: string

  @Field(() => Status, { nullable: false })
  status: Status

  @Field(() => Roles, { nullable: false })
  roles: Roles

  @Field(() => String, { nullable: false })
  email: string

  @Field(() => String, { nullable: false })
  userName: string

  @Field(() => Number, { nullable: false })
  iat?: number

  @Field(() => Number, { nullable: false })
  exp?: number
}
