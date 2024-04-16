import { InMemoryCache, ApolloProvider, ApolloClient} from '@apollo/client'
import '../styles/globals.css'
export default function App({ Component, pageProps }) {

  const client = new ApolloClient({
    uri: "http://backend-example.codebootcamp.co.kr/graphql" ,
    cache: new InMemoryCache() // 컴퓨터 메모리에 백엔드에서 받아온 데이터 임시 저장
  })

// Component에서 graphql의 client 쓸 수 있도록 세팅
  return (
    <div>    
      <div> ------------- 여기는 _app.js 컴포넌트 입니다. -----------</div>
      <ApolloProvider client={client}>
	  		<Component {...pageProps}/>
      </ApolloProvider>
      <div> ------------- 여기까지 _app.js 컴포넌트 입니다. -----------</div>
    </div>
  )
}
