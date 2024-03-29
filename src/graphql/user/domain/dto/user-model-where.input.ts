import { Field, InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'

import {
  DateTimeFilter,
  EnumUserRolesFilter,
  EnumUserStatusFilter,
  StringFilter,
  StringNullableFilter,
  UuidFilter,
} from '@/graphql/shared/domain/dto/prisma'

@InputType()
export class UserModelWhereInput {
  @Field(() => [UserModelWhereInput], { nullable: true })
  @Type(() => UserModelWhereInput)
  AND?: Array<UserModelWhereInput>

  @Field(() => [UserModelWhereInput], { nullable: true })
  @Type(() => UserModelWhereInput)
  OR?: Array<UserModelWhereInput>

  @Field(() => [UserModelWhereInput], { nullable: true })
  @Type(() => UserModelWhereInput)
  NOT?: Array<UserModelWhereInput>

  @Field(() => UuidFilter, { nullable: true })
  id?: UuidFilter

  @Field(() => EnumUserStatusFilter, { nullable: true })
  status?: EnumUserStatusFilter

  @Field(() => EnumUserRolesFilter, { nullable: true })
  roles?: EnumUserRolesFilter

  @Field(() => StringFilter, { nullable: true })
  email?: StringFilter

  @Field(() => StringNullableFilter, { nullable: true })
  userName?: StringNullableFilter

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter

  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt?: DateTimeFilter
}
