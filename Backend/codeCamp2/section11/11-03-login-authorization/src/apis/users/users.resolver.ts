import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from '../auth/guards/gql-auth.guard';
import { IContext } from 'src/commons/interfaces/context';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  /**
   *  컨트롤러에서  fetchUser를 호출하려면 가드를 뚫어야 호출 가능
   *  AuthGard의 '나만의인가'를 통해 검증
   */
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String)
  fetchUser(
    @Context() constext: IContext, //
  ): string {
    console.log('-------------');
    console.log(constext.req.user);
    console.log('-------------');
    return '인가에 성공하였습니다.';
  }
  @Mutation(() => User)
  createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args({ name: 'age', type: () => Int }) age: number,
  ): Promise<User> {
    return this.usersService.create({ email, password, name, age });
  }
}
