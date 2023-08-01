import { ProductTag } from 'src/apis/productsTags/entities/productTag.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @OneToMany(() => ProductTag, (productTags) => productTags.tag)
  productTags: ProductTag[];
}
