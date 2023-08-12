import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  email: string;

  // 비밀번호는 브라우저로 전달하지 않음
  // @Column()
  // @Field(() => String)
  // password: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => Int)
  age: number;
}
