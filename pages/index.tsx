import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import React from 'react'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import type { ReactNode } from 'react'
import packageJSON from '../package.json'
type ConnectionStatus = {
  isConnected: boolean
}

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await clientPromise
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="container">
      <Head>
        <title>index</title>
      </Head>
      <div className="container1">
        <header className="Header">
          <div className="logo">
            <h1>EXPETO</h1>
          </div>
          <nav className="Nav">
            <a href="/posts/login">로그인</a>
            <a href="/posts/register">회원가입</a>
          </nav>
        </header>
        <main>
          <p className="mainH">EXPETO 란?</p>
          <p className="mainP">
            안녕하세요, Expeto란 라틴어로 '찾다' 라는 뜻과 Ex : 타인 peto : 찾다
            라는 의미를 가져 타인이 찾아준다는 뜻으로 물품을 대행해서 찾아주고
            관리해주는 서비스를 뜻 합니다. 여러분의 소중한 물품을 저희 Expeto에
            맡겨주세요!{' '}
          </p>
        </main>
        <footer className="Footer">
          <div className="bottom">
            <a href="#">EXPETO란?</a>
            <a href="#">이용약관</a>
            <a href="#">개인정보처리방침</a>
            <a href="#">고객센터</a>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .container1 {
          margin: 0 auto; /* 화면 중앙에 배치 */
          width: 1200px; /* 너비 */
          background-color: #fff;
        }
        .Header {
          width: 100%; /*  너비 */
          height: 100px; /* 높이 */
          background-color: gray;
        }
        .logo {
          float: left; /* 왼쪽으로 플로팅 */
          width: 260px; /*  너비 */
          height: 100px; /* 높이 */
          line-height: 100px; /* 세로로 중간에 맞춤 - 줄간격을 높이 값과 같게 */
          padding-left: 20px; /* 왼쪽에 여백 */
          background-color: darkgrey;
        }
        .logo h1 {
          font-family: Verdana, Geneva, Tahoma, sans-serif;
          font-size: 50px; /* 글자 크기 */
          color: #fff; /* 글자 색*/
          margin: 0;
          margin-left: 5px;
          margin-top: 10px;
        }
        .Nav {
          float: right;
          width: 900px; /*   너비 */
          height: 100px; /* 메뉴 영역 높이 */
          padding-top: 35px; /* 메뉴를 아래로 내리기 위해 */
          padding-left: 700px;
        }
        .Nav a {
          margin-right: 20px;
          text-decoration: none;
          color: #fff;
          font-size: 20px;
          font-weight: 600; /* 글자 굵기 */
        }
        .mainH {
          text-align: center;
          margin-top: 40px;
          font-size: 50px;
          font-family: Verdana, Geneva, Tahoma, sans-serif;
        }
        .mainP {
          text-align: center;
          margin-top: 40px;
          font-size: 20px;
          font-family: Verdana, Geneva, Tahoma, sans-serif;
        }
        .Footer {
          width: 1200px; /* 너비 */
          height: 1px; /* 높이 */
          margin-top: 100px;
          background-color: black;
        }
        .bottom {
          width: 100%;
          height: 30px;
          padding-top: 20px;
          padding-left: 15px;
        }
        .bottom a {
          margin-right: 20px;
          text-decoration: none;
          color: #666;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          margin: 0; /* 마진 리셋 */
          padding: 0; /* 패딩 리셋 */
          box-sizing: border-box; /* 박스 영역은 테두리까지 */
        }
      `}</style>
    </div>
  )
}
