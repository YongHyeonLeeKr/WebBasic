import { Injectable, Scope } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { IBoardsServiceCreate } from './interfaces/boards-service.interface';

/**
 * ///
 * Scope.DEFAULT -> 싱글톤(new 한번)
 * Scope.REQEUST -> 매 요청마다 new 함
 * Scope.DEFAULT -> Transient 주입마다 new 함
 */
@Injectable({ scope: Scope.DEFAULT })
export class BoardsService {
  findAll(): Board[] {
    const result = [
      {
        number: 1,
        writer: '철수',
        title: '제목입니다~~',
        contents: '내용이에요@@@',
      },
      {
        number: 2,
        writer: '영희',
        title: '영희 제목입니다~~',
        contents: '영희 내용이에요@@@',
      },
      {
        number: 3,
        writer: '훈이',
        title: '훈이 제목입니다~~',
        contents: '훈이 내용이에요@@@',
      },
    ];
    return result;
  }

  create({ createBoardInput }: IBoardsServiceCreate) {
    // 1. 데이터를 등록하는 로직
    console.log(
      createBoardInput.writer,
      createBoardInput.title,
      createBoardInput.contents,
    );
    // 2.  저장결과를 응답하는 로직
    return '게시물 등록에 성공하였습니다.';
  }
}
