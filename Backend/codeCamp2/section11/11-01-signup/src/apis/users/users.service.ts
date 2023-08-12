import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { IUsersServiceCreate } from './interfaces/users-service.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create({ email, password, name, age }: IUsersServiceCreate): Promise<User> {
    return this.usersRepository.save({
      email,
      password,
      name,
      age,
    });
  }
}
