import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IProductServiceFindOne,
  IProductsServiceCreate,
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
    const product = await this.productsRepository.findOne({
      where: { id: productId },
    });

    const result = this.productsRepository.save({
      ...product, // 수정 후 수정되지 않은 결과 값까지 모두 객체로 리턴
      ...updateProductInput, // 수정한 키들, ...product에서 동일한 키들은 덮어씀
    });

    return result;
  }
}

interface IProductsServiceUpdate {
  productId: string;
  updateProductInput: UpdateProductInput;
}
