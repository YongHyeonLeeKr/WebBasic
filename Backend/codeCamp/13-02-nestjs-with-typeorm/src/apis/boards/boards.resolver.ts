import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { BoardService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { Board } from './entities/board.entity';


@Resolver()
export class BoardResolver {
    constructor(private readonly boardService: BoardService) {}

    @Query(() => String)// GraphQL 에서 APi Docs 를 만들 기 위한 type (대문자로 시작)
    getHello() { // typescript type 지정으로 해당 타입은 지정 하지 않아도 됨(소문자로 시작) 
        return this.boardService.aaa();
    }

    @Query(() => [Board])
    fetchBoards(){
        return this.boardService.findAll();
    }

    @Mutation(() => String)
    createdBoard(
        @Args('writer') writer: string,
        @Args('title') title: string,
        @Args('contents') contents: string, 
        @Args('createBoardInput') createBoardInput: CreateBoardInput,
    ){
        return this.boardService.create({writer, title, contents});
    }
    
}



/**
 * 아직 DB와 상호작용할 수 있는 방법 X
 * 이를 해결 하기 위해 Resolver class 생성
 * Code First 방식에서는 r
 */