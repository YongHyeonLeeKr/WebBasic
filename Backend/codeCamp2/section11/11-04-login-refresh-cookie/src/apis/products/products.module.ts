import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductSaleslocationsService } from '../productsSaleslocations/productsSaleslocations.service';
import { ProductSaleslocation } from '../productsSaleslocations/entities/productSaleslocation.entity';

import { ProductTag } from '../productsTags/entities/productTag.entity';
import { ProductsTagsService } from '../productsTags/productsTags.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductSaleslocation, ProductTag]),
  ],
  providers: [
    ProductsResolver,
    ProductsService,
    ProductSaleslocationsService,
    ProductsTagsService,
  ],
})
export class ProductsModule {}
