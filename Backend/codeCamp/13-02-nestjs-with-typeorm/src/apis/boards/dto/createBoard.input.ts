import { Field, InputType } from '@nestjs/graphql';


@InputType()
export class CreateBoardInput{
    @Field(()=> String)
    wirter: string;
    @Field(() => String)
    title: string;
    @Field(() => String)
    contents: string;
}