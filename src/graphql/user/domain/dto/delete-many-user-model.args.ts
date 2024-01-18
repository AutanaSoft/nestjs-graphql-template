import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

import { UserModelWhereInput } from './user-model-where.input'

@ArgsType()
export class DeleteManyUserModelArgs {
  @Field(() => UserModelWhereInput, { nullable: true })
  @Type(() => UserModelWhereInput)
  @ValidateNested()
  where?: UserModelWhereInput
}
