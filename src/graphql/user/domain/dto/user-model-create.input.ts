import { Field, InputType } from '@nestjs/graphql'
import { UserRoles, UserStatus } from '@prisma/client'
import { Transform } from 'class-transformer'
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

@InputType()
export class UserModelCreateInput {
  @Field(() => UserStatus, { nullable: true })
  @IsEnum(UserStatus)
  @IsOptional()
  status?: keyof typeof UserStatus

  @Field(() => [UserRoles], { nullable: true })
  @IsEnum(UserRoles, { each: true })
  @IsOptional()
  roles?: Array<keyof typeof UserRoles>

  @Field(() => String, { nullable: false })
  @IsEmail()
  @MinLength(8)
  @MaxLength(60)
  @Transform(({ value }) => value.trim().toLowerCase())
  email!: string

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsOptional()
  userName?: string

  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password!: string

  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  confirmPassword!: string
}
