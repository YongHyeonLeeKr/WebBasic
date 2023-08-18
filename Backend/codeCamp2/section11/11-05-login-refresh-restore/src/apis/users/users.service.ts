import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  IUsersServiceCreate,
  IUsersServiceFindOneByEmail,
} from './interfaces/users-service.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * 
   * @param param0 ->  { email }
   * @returns -> Promise< User > DB에서 찾아온 이메일
   */
  findOneByEmail({ email }: IUsersServiceFindOneByEmail): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create({
    email,
    password,
    name,
    age,
  }: IUsersServiceCreate): Promise<User> {
    // 중복가입확인
    const user = await this.findOneByEmail({ email });
    if (user) throw new ConflictException('이미 등록된 이메일 입니다. ');
    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersRepository.save({
      email,
      password: hashedPassword,
      name,
      age,
    });
  }
}
