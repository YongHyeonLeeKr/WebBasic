import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './models/board.model';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoards(): Board[] {
    return this.boardsService.getAllboards();
  }
  @Post()
  @UsePipes(ValidationPipe) // 핸들러 레벨에서 유효성 체크
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    this.boardsService.deleteBoard(id);
  }

  // 게시글의 상태를 업데이트
  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status') status: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }

  // @Get(':id')
  // getBoardById(@Param('id') id: number) {
  //   return this.boardsService.findOne(id);
  // }
  //
  // @Post()
  // createBoard(@Body() board: Board) {
  //   return this.boardsService.create(board);
  // }
  //
  // @Put(':id')
  // updateBoard(@Param('id') id: number, @Body() boardData: Partial<Board>) {
  //   return this.boardsService.update(id, boardData);
  // }
  //
  // @Delete(':id')
  // deleteBoard(@Param('id') id: number) {
  //   return this.boardsService.remove(id);
  // }
}
