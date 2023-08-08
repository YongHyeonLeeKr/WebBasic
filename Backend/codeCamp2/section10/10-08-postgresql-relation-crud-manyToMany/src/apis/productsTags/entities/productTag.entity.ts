import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import { Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductTag {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @ManyToMany(() => Product, (products) => products.productTags)
  @Field(() => Product)
  products: Product[];
}
