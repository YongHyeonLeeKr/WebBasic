import { Query, Resolver } from '@nestjs/graphql'
import { BoardService } from './boards.service';


@Resolver()
export class BoardResolver {
    constructor(private readonly boardService: BoardService) {}

    @Query(() => String)// GraphQL 에서 APi Docs 를 만들 기 위한 type (대문자로 시작)
    getHello() { // typescript type 지정으로 해당 타입은 지정 하지 않아도 됨(소문자로 시작) 
        return this.boardService.aaa();
    }
    
}



/**
 * 아직 DB와 상호작용할 수 있는 방법 X
 * 이를 해결 하기 위해 Resolver class 생성
 * Code First 방식에서는 r
 */