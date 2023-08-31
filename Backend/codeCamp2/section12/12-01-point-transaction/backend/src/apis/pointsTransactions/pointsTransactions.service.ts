import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { PointTransaction, POINT_TRANSACTION_STATUS_ENUM } from './entities/pointTransaction.entity';
import { IPointsTransactionsServiceCreate } from './interfaces/points-transactions-service.interface';

@Injectable()
export class PointsTransactionsService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointsTransactionsRepository: Repository<PointTransaction>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create({ impUid, amount, user: _user }: IPointsTransactionsServiceCreate): Promise<PointTransaction> {
    // 1.PointTransaction 테이블에 거래기록 1줄 생성(save)
    // await this.pointsTransactionsRepository.save({
    //   impUid: impUid,
    //   amount: amount,
    //   user: user,
    //   status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    // })
    // 1.1 (create) DB랑 상관없이 등록을 위한 빈 객체 만들고 save 통해 저장
    const pointTransation = this.pointsTransactionsRepository.create({
      impUid,
      amount,
      user: _user,
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    })
    await this.pointsTransactionsRepository.save(pointTransation)
    // 2.User의 point도 추가
    const user = await this.usersRepository.findOne({
      where:{ id: _user.id },
    })
    //  2.1 현재 User Point Update
    this.usersRepository.update({id:_user.id}, {point: user.point + amount }) // point 컬럼 업데이트
    // 3. 결과값 브라우저에 리턴
    return pointTransation
  }
}
