import {EntityRepository, Repository} from "typeorm";
import {Board} from "./entities/board.entity";


@EntityRepository()
export class BoardRepository extends Repository<Board> {

}