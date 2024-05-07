import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
  ) {}

  async findAll(): Promise<Board[]> {
    return this.boardsRepository.find();
  }

  // async findOne(id: number): Promise<Board> {
  //   return this.boardsRepository.findOne(id);
  // }

  async create(board: Board): Promise<Board> {
    return this.boardsRepository.save(board);
  }

  // async update(id: number, boardData: Partial<Board>): Promise<Board> {
  //   await this.boardsRepository.update(id, boardData);
  //   return this.boardsRepository.findOne(id);
  // }

  async remove(id: number): Promise<void> {
    await this.boardsRepository.delete(id);
  }
}
