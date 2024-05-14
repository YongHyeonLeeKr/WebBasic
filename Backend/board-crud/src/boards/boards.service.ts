import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';
import { BoardStatus } from './enums/board-status.enum';

/*
게시물에 관한 로직을 처리하는 곳 
 */
@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, writer, password, contents } = createBoardDto;
    const board = this.boardRepository.create({
      title,
      writer,
      password,
      contents,
      status: BoardStatus.PUBLIC, // Default status
    });

    await this.boardRepository.save(board);
    return board;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Can't find Board with ${id}`);
    }
    return found;
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board With id(${id})`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }

  async updateBoardContents(
    id: number,
    title: string,
    contents: string,
    password: string,
  ): Promise<Board> {
    const board = await this.getBoardById(id);

    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found.`);
    }

    // 패스워드 검증
    if (board.password !== password) {
      throw new UnauthorizedException('Incorrect password.');
    }

    // 패스워드가 맞을 경우, 내용 업데이트
    board.title = title;
    board.contents = contents;
    await this.boardRepository.save(board);
    return board;
  }

  async getAllboards(): Promise<Board[]> {
    return this.boardRepository.find();
  }
}
