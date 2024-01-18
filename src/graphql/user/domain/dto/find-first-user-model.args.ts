import { ArgsType, Field, Int } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

import { UserModelOrderByWithRelationInput } from './user-model-order-by-with-relation.input'
import { UserModelWhereInput } from './user-model-where.input'

@ArgsType()
export class FindFirstUserModelArgs {
  @Field(() => UserModelWhereInput, { nullable: true })
  @Type(() => UserModelWhereInput)
  @ValidateNested()
  where?: UserModelWhereInput

  @Field(() => [UserModelOrderByWithRelationInput], { nullable: true })
  @Type(() => UserModelOrderByWithRelationInput)
  orderBy?: Array<UserModelOrderByWithRelationInput>

  @Field(() => Int, { nullable: true })
  take?: number

  @Field(() => Int, { nullable: true })
  skip?: number
}
