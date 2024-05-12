import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../enums/board-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PUBLIC, BoardStatus.PRIVATE];
  transform(value: any, metadata: ArgumentMetadata): any {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(
        `${value}는 게시글 상태 목록에 포함되어 있지 않습니다. `,
      );
    }

    return value;
  }

  private isStatusValid(status: any): boolean {
    /*
    StateOptions 배열에 없는 status라면 index의 값은 -1
     */
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
