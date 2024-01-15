import { ArgsType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import * as Validator from 'class-validator';
import { IsOptional } from 'class-validator';

@ArgsType()
export class SignUpInput {
  @Field(() => String, { nullable: false })
  @Validator.MaxLength(60)
  @Validator.MinLength(8)
  @Validator.IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email!: string;

  @Field(() => String, { nullable: true })
  @Validator.MaxLength(20)
  @Validator.MinLength(4)
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @IsOptional()
  userName?: string;

  @Field(() => String, { nullable: false })
  @Validator.MaxLength(16)
  @Validator.MinLength(8)
  @Validator.IsNotEmpty()
  @Validator.IsString()
  password!: string;
}
