import { Field, ObjectType } from '@nestjs/graphql';
import { ProductTag } from 'src/apis/productsTags/entities/productTag.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;
  @Column()
  @Field(() => String)
  name: string;
  @OneToMany(() => ProductTag, (productTags) => productTags.tag)
  @Field(() => [ProductTag])
  productTags: ProductTag[];
}
