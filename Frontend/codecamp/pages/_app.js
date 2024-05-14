import React, { createContext } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import axios from 'axios';
import '../styles/globals.css';

const client = new ApolloClient({
    uri: "http://backend-practice.codebootcamp.co.kr/graphql",
    cache: new InMemoryCache()
});

// axios 인스턴스 생성
const api = axios.create({
    baseURL: "http://localhost:3000", // 여기에 REST API 엔드포인트 입력
});

// 모든 컴포넌트에서 axios를 쉽게 사용할 수 있도록 Context 제공
export const AxiosContext = React.createContext(api);

export default function App({ Component, pageProps }) {
    return (
        <div>
            <div> ------------- 여기는 _app.js 컴포넌트 입니다. -----------</div>
            <ApolloProvider client={client}>
                <AxiosContext.Provider value={api}>
                    <Component {...pageProps} />
                </AxiosContext.Provider>
            </ApolloProvider>
            <div> ------------- 여기까지 _app.js 컴포넌트 입니다. -----------</div>
        </div>
    );
}