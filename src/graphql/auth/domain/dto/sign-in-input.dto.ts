import { ArgsType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import * as Validator from 'class-validator';

@ArgsType()
export class SignInInput {
  @Field(() => String, { nullable: false })
  @Validator.MaxLength(60)
  @Validator.MinLength(8)
  @Validator.IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email!: string;

  @Field(() => String, { nullable: false })
  @Validator.MaxLength(16)
  @Validator.MinLength(8)
  @Validator.IsNotEmpty()
  @Validator.IsString()
  password!: string;
}
