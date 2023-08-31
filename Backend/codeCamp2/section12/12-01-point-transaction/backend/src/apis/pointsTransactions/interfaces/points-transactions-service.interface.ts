import { IAuthUser } from 'src/commons/interfaces/context';

export interface IPointsTransactionsServiceCreate {
  impUid: string;
  amount: number;
  user: IAuthUser['user'] // User 타입은 DB에서 꺼내온 유저이니 필요한 것은 IAuthUser
}
