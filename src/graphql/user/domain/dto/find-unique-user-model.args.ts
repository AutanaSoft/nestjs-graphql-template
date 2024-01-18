import { ArgsType, Field } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

import { UserModelWhereUniqueInput } from './user-model-where-unique.input'

@ArgsType()
export class FindUniqueUserModelArgs {
  @Field(() => UserModelWhereUniqueInput, { nullable: false })
  @Type(() => UserModelWhereUniqueInput)
  @ValidateNested()
  where!: Prisma.AtLeast<UserModelWhereUniqueInput, 'id' | 'email'>
}
