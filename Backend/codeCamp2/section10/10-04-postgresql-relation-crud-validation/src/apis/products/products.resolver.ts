import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from './entities/product.entity';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver()
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {
    //
  }
  @Query(() => [Product])
  fetchProducts(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Query(() => Product)
  fetchProduct(@Args('productId') productId: string): Promise<Product> {
    return this.productsService.findOne({ productId });
  }
  //
  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    // 브라우저에 결과를 보내주는 2가지 방법
    // 1. 등록된 내용이 담긴 객체를 그대로 브라우저에 돌려보내주기
    return this.productsService.create({ createProductInput });
    // 2. 결과메세지만 간단힌 보내주기(ex. '등록이 완료되었습니다.')
    // return '등록이 완료되었습니다.;
  }

  @Mutation(() => Product)
  updateProduct(
    // `@Args`를 사용해 productId 를 받아서 해당 productId 를 가진 product 를 수정 할 것입니다.
    // 따라서 productid는 수정 조건이 됩니다.
    @Args('productId') productId: string,
    // `@Args`를 사용해 updateProductInput 를 받아서 수정하고 싶은 값 들을 수정 해 줄것입니다.
    // 따라서 updateProductInput은 수정 대상이 됩니다
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    return this.productsService.update({ productId, updateProductInput });
  }
}
