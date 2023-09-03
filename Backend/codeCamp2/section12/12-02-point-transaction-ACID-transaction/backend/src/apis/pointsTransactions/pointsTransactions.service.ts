import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
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
    
    private readonly dataSource: DataSource
  ) {}

  async create({ impUid, amount, user: _user }: IPointsTransactionsServiceCreate) {
    // 1.PointTransaction 테이블에 거래기록 1줄 생성(save)
    // await this.pointsTransactionsRepository.save({
    //   impUid: impUid,
    //   amount: amount,
    //   user: user,
    //   status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    // })

    const queryRunnner = this.dataSource.createQueryRunner();
    await queryRunnner.connect()
    await queryRunnner.startTransaction()
     try {
        // 1(create) DB랑 상관없이 등록을 위한 빈 객체 만들고 save 통해 저장
        const pointTransation = this.pointsTransactionsRepository.create({
        impUid,
        amount,
        user: _user,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    })
    await queryRunnner.manager.save(pointTransation); // queryRunner상에 pointTransaction을 임시 저장


    //throw new Error('예기치못한실패')
    // 2. 유저조회 
    const user = await queryRunnner.manager.findOne(User, {
      where:{ id: _user.id },
    })


 
    const updatedUser = await this.usersRepository.create({
      // id가 있으면 수정 없으면 등록
      ...user,
      point: user.point + amount,
    }) // point 컬럼 업데이트
    
    await queryRunnner.manager.save(updatedUser)
    await queryRunnner.commitTransaction(); // DB 저장 시점 
    await queryRunnner.release


    return pointTransation
    } catch (error) {
      await queryRunnner.rollbackTransaction();

    } finally {
      await queryRunnner.release()

    }


  
  }
}
