import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import { Tag } from 'src/apis/tags/entities/tag.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductTag {
  @PrimaryGeneratedColumn()
  @Field(() => String)
  id: string;
  @ManyToOne(() => Product, (product) => product.productTags)
  @Field(() => Product)
  product: Product;
  @ManyToOne(() => Tag, (tag) => tag.productTags)
  @Field(() => Tag)
  tag: Tag;
}
