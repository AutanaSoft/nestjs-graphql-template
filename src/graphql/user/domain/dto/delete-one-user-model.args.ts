import { ArgsType, Field } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

import { UserModelWhereInput } from './user-model-where.input'

@ArgsType()
export class DeleteOneUserModelArgs {
  @Field(() => UserModelWhereInput, { nullable: false })
  @Type(() => UserModelWhereInput)
  @ValidateNested()
  where!: Prisma.AtLeast<UserModelWhereInput, 'id' | 'email'>
}
