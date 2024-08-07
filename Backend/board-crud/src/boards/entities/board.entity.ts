import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardStatus } from '../enums/board-status.enum';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  writer: string;

  @Column()
  password: string;

  @Column()
  title: string;

  @Column()
  contents: string;

  @Column()
  status: BoardStatus;

  @CreateDateColumn()
  createdAt: Date;
}
