import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export const GqlAuthGuard = (name) => {
  return class GqlAuthGuard extends AuthGuard(name) {
    getRequest<T = any>(context: ExecutionContext): T {
      const gqlContext = GqlExecutionContext.create(context);
      return gqlContext.getContext().req;
    }
  };
};
