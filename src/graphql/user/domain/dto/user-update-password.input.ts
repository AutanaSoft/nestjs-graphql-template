import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class UserUpdatePasswordInput {
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  oldPassword!: string;

  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  newPassword!: string;

  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  confirmPassword!: string;
}
