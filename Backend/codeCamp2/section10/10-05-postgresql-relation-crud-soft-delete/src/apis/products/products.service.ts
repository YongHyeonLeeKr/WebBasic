import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IProductServiceCheckSoldOut,
  IProductServiceFindOne,
  IProductsServiceCreate,
  IProductsServiceUpdate,
} from './interfaces/products-service.interface';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }
  findOne({ productId }: IProductServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({ where: { id: productId } });
  }

  create({ createProductInput }: IProductsServiceCreate): Promise<Product> {
    const result = this.productsRepository.save({
      // DB에 저장
      ...createProductInput,
      // 하나 하나 직접 나열하는 방식
      // name: 'mouse',
      // description: 'good mouse',
      // price: 3000,
    });
    // result 안에는 무엇이 있을까?
    return result;
  }
  // this.productsRepository.create() // DB 접속이랑 관련 없음. 등록을 위해서 빈 껍데기 객체 만들기 위함
  // this.productsRepository.insert() // 결과를 객체로 못 돌려받는 등록 방법
  // this.productsRepository.update() // 결과를 객체로 못 돌려받는 수정 방법
  async update({
    productId,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<Product> {
    // 검증 관련된 코드는 서비스에서 진행할 것
    const product = await this.findOne({ productId });
    // 검증은 서비스에서 진행
    this.checkSoldout({ product });

    const result = this.productsRepository.save({
      ...product, // 수정 후 수정되지 않은 결과 값까지 모두 객체로 리턴
      ...updateProductInput, // 수정한 키들, ...product에서 동일한 키들은 덮어씀
    });

    return result;
  }

  // checkSoldout를 재사용 하기위해 함수로 따로 만듬
  checkSoldout({ product }: IProductServiceCheckSoldOut) {
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
    }
  }

  async delete({ productId }: IProductsServiceDelete): Promise<boolean> {
    // 1. 실제로 삭제하는 방법
    // const result = await this.productsRepository.delete({ id: productId });
    // 영향이 갔는지 안갔는지 확인
    // return result.affected ? true : false;

    // 2. 소프트 삭제 - isDeleted
    // this.productsRepository.update({id: productId}, { isDeleted: true})

    // 3. 소프트 삭제 - DeleteAt
    // 초기값이 없으면 삭제 안된 것, 들어가 있으면 삭제
    // this.productsRepository.update({ id: productId }, { isDeletedAt : new Date() })

    // 4. 소프트 삭제(Type ORM 제공) - softRemove
    // id로만 삭제 가능 / 배열을 사용하여 여러 id를 한번에 지우기 가능
    // .softRemove([{id: aaa}, {id: bbb}, {id: ccc}])
    // this.productsRepository.softRemove({ id: productId })

    // 5. 소프트 삭제(TypeORM 제공) - softDelete
    // 여러 ID 한번에 지우기 불가능하지만, 다른 컬럼으로도 삭제 가능
    const result = await this.productsRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}

interface IProductsServiceDelete {
  productId: string;
}
