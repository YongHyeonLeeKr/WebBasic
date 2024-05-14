import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  // 클래스는 인터페이스와 달리 런타이멩서 작동하기 때문에 파이프기능을 이용할 때 더 유용함
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  writer: string;

  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  contents: string;
}
