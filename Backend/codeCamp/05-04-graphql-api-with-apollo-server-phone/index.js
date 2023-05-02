// index.js

// const { ApolloServer, gql } = require('apollo-server');
import { ApolloServer, gql } from 'apollo-server'
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js';
// The GraphQL schema
const typeDefs = gql`
  type BoardReturn {
    number: Int
    writer: String
    title: String
    contents: String
  }

  type Query {
    # fetchBoards: BoardReturn => 객체 1개를 의미
    fetchBoards: [BoardReturn] # => 배열 안의 객체가 1개 이상일 경우 
  }

  # 인풋을 사용하여 
  input CreateBoardInput {
    writer: String
    title: String
    contents: String
  }

  type Mutation {
    createBoard(createBoardInput: CreateBoardInput!): String # 입력값을 낱개로 받아옴
    createTokenOfPhone(myphone: String): String
  }


`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    fetchBoards: () => {
      const result = [
       {
          number: 1,
          writer: '철수',
          title: '제목입니다~~',
          contents: '내용이에요@@@',
        },
        {
          number: 2,
          writer: '영희',
          title: '영희 제목입니다~~',
          contents: '영희 내용이에요@@@',
        },
        {
          number: 3,
          writer: '훈이',
          title: '훈이 제목입니다~~',
          contents: '훈이 내용이에요@@@',
        },
      ];
      return result;
    },
  },


  Mutation:  {
    createBoard : (_,args) => {
      // 1. 데이터를 등록하는 로직
      console.log(args);
      // 2.  저장결과를 응답하는 로직 
      return '게시물 등록에 성공하였습니다.';

    },

    createTokenOfPhone: (_, args) => {
      // 1. 휴대폰번호 자릿수 맞는지 확인하기
      const isValid = checkValidationPhone(args.myphone);
      if (isValid) {
        // 2. 핸드폰 토큰 6자리 만들기
        const mytoken = getToken();

        // 3. 핸드폰번호에 토큰 전송하기
        sendTokenToSMS(args.myphone, mytoken);
        return '인증완료!!!';
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(3001).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

