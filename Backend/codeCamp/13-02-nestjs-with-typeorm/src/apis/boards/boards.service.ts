import { Injectable } from '@nestjs/common';
import { Board } from './entities/board.entity'

@Injectable()
export class BoardService {
  aaa() {
    return 'Hello World!';

  }

  findAll(){
    // 1. 데이터 로직을 조회 하는 로직	
    const result = [
      {
        number: 1,
				writer: '철수',
        title: '제목입니다~~',
        contents: '내용입니다!!!',
      },
      {
        number: 2,
				writer: '철수',
        title: '제목입니다~~',
        contents: '내용입니다!!!',
      },
      {
        number: 3,
				writer: '철수',
        title: '제목입니다~~',
        contents: '내용입니다!!!',
      },
    ];
    // 2. 꺼내온 결과 응답 주기
    return result
  }

  create(args) {
    console.log(args)
    // 1. 데이터를 등록하는 로직 => DB 에 접속해서 데이터 저장
    // 2. 저장 결과 응답
    return '등록에 성공하였습니다. '
  }
}
// 핵심 비즈니스 로직 
