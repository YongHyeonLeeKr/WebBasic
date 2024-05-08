import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board, BoardStatus } from './models/board.model';
import { v1 as uuid } from 'uuid';

/*
게시물에 관한 로직을 처리하는 곳 
 */
@Injectable()
export class BoardsService {
  private boards: Board[] = [];
  // constructor(
  //   @InjectRepository(Board)
  //   private boardsRepository: Repository<Board>,
  // ) {}

  getAllboards() {
    return this.boards;
  }

  createBoard(title: string, description: string) {
    /*
    게시물 ID는 유니크한 값을 넣어주어야 하는데,
    데이터베이스를 사용하지 않으므로 UUID 모듈을 이용해서 유니크한 값을 줌
     */
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  // async findAll(): Promise<Board[]> {
  //   return this.boardsRepository.find();
  // }
  //
  // async findOne(id: number): Promise<Board> {
  //   return this.boardsRepository.findOne(id);
  // }
  //
  // async create(board: Board): Promise<Board> {
  //   return this.boardsRepository.save(board);
  // }
  //
  // async update(id: number, boardData: Partial<Board>): Promise<Board> {
  //   await this.boardsRepository.update(id, boardData);
  //   return this.boardsRepository.findOne(id);
  // }
  //
  // async remove(id: number): Promise<void> {
  //   await this.boardsRepository.delete(id);
  // }
}
