import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType() // 객체 형태의 GraphQ 타입으로 바꿈L
export class Board {
  @PrimaryGeneratedColumn('increment')
  @Field(()=> Int)
  number: number;

  @Column()
  @Field(() => String)
  writer: string;

  @Column()
  @Field(()=> String)
  title: string;

  @Column()
  @Field(() => String)
  contents: string;
}