import { Product } from 'src/apis/products/entities/product.entity';
import { Tag } from 'src/apis/tags/entities/tag.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductTag {
  @PrimaryGeneratedColumn()
  id: string;
  @ManyToOne(() => Product, (product) => product.productTags)
  product: Product;
  @ManyToOne(() => Tag, (tag) => tag.productTags)
  tag: Tag;
}
