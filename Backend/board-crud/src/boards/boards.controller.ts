import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './models/board.model';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoards(): Board[] {
    return this.boardsService.getAllboards();
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
