import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

import { UserModelCreateInput } from '../../../../core/generated/prisma/graphql/user-model'

@InputType()
export class CustomUserModelCreateInput extends UserModelCreateInput {
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  confirmPassword!: string
}
