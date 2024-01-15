import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * Custom decorator to retrieve the current user from the request context.
 * @param data - Optional data passed to the decorator.
 * @param context - The execution context.
 * @returns The current user object from the request context.
 */
export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req.user;
});
