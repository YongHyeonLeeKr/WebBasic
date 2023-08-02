import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productsCategories/entities/productCategory.entity';
import { ProductSaleslocation } from 'src/apis/productsSaleslocations/entities/productSaleslocation.entity';
import { ProductTag } from 'src/apis/productsTags/entities/productTag.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;
  @Column()
  @Field(() => String)
  name: string;
  @Column()
  @Field(() => String)
  description: string;
  @Column()
  @Field(() => Int)
  price: number;
  @Column({ default: false })
  @Field(() => Boolean)
  isSoldout: boolean;
  @JoinColumn()
  @OneToOne(() => ProductSaleslocation)
  @Field(() => ProductSaleslocation)
  productSaleslocation: ProductSaleslocation;
  @ManyToOne(() => ProductCategory)
  @Field(() => ProductCategory)
  productCategory: ProductCategory;
  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
  @OneToMany(() => ProductTag, (productTag) => productTag.product)
  @Field(() => [ProductTag])
  productTags: ProductTag[];
  // @CreateDateColumn() // 데이터 등록시 시간 기록용
  // createdAt: Date;
  // @UpdateDateColumn() // 데이터 수정시 시간 기록용
  // updatedAt: Date;
  @DeleteDateColumn() // 소프트 삭제 시간 기록용
  deletedAt: Date;
}
