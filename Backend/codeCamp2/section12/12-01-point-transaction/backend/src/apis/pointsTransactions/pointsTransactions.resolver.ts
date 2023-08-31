import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointsTransactionsService } from './pointsTransactions.service';

@Resolver()
export class PointsTransactionsResolver {
  constructor(
    private readonly pointsTransactionsService: PointsTransactionsService,
  ) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => PointTransaction)
  createPointTransaction(
    @Args('impUid') impUid: string, //
    @Args({ name:'amount', type: () => Int }) amount: number, // graphql에서는 소수점 없는 정수임을 명기
    @Context() context: IContext, // access 가드 통화 후 user를 context에서 뽑을 수 있음
  ): Promise<PointTransaction> {
    const user = context.req.user;
    return this.pointsTransactionsService.create({ impUid, amount, user });
  }
}
