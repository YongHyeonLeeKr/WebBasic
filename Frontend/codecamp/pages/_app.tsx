import React, { createContext } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import axios from 'axios';
import '../styles/globals.css';
import { AppProps } from 'next/app';
import ApolloSetting from '../src/components/commons/apollo';
import { Global } from '@emotion/react';
import Layout from '../src/commons/layout';



export default function App({ Component, pageProps } : AppProps) {


// axios 인스턴스 생성
const api = axios.create({
    baseURL: "http://localhost:3000", // 여기에 REST API 엔드포인트 입력
});

// 모든 컴포넌트에서 axios를 쉽게 사용할 수 있도록 Context 제공
const AxiosContext = React.createContext(api);
    return (
        <div>
            <div> ------------- 여기는 _app.js 컴포넌트 입니다. -----------</div>
            <ApolloSetting>
                <>
                    <Global styles={undefined} / >
                    <AxiosContext.Provider value={api}>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </AxiosContext.Provider>

                </>
            </ApolloSetting>
            <div> ------------- 여기까지 _app.js 컴포넌트 입니다. -----------</div>
        </div>
    );
}