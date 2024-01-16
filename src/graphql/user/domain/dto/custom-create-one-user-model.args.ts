import { ArgsType, Field } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

import { CustomUserModelCreateInput } from './custom-user-model-create.input'

@ArgsType()
export class CustomCreateOneUserModelArgs {
  @Field(() => CustomUserModelCreateInput, { nullable: false })
  @Type(() => CustomUserModelCreateInput)
  @ValidateNested()
  data!: CustomUserModelCreateInput
}
