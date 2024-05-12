import {EntityRepository, Repository} from "typeorm";
import {Board} from "./entities/board.entity";

// @EntityRepository() 가 Deprecicated 되었는데 어떻게..할지 ㅜ
//
@EntityRepository()
export class BoardRepository extends Repository<Board> {

}