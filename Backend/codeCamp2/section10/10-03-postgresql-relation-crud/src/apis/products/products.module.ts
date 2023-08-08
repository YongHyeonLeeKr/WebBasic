import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Tag } from '../tags/entities/tag.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([
            Product, Tag
        ])
    ],
    providers: [
        ProductsResolver,
        ProductsService,
    ]
})
export class ProductsModule{

}