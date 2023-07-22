import { Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';

//@Controller()
@Resolver()
export class BoardsResolver {
    constructor(private readonly boardsService: BoardsService) {}

    //@Get()
    @Query(() => String, { nullable: true }) // graph ql 타입은 대문자 String
    fetchBoards(): string {
        return this.boardsService.fetchBoards();
    }
}
