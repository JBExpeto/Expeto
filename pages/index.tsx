import Head from 'next/head'
import clientPromise from './api/auth/lib/mongodb'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import React from 'react'
import Link from 'next/link'

import type { ReactNode } from 'react'
import packageJSON from '../package.json'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

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
  const { data: session } = useSession()
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
        <main className="contents">
          <h2 className="mainH">WELCOME TO EXPETO!!!</h2>
          <h5>로그인 및 회원가입을 하셔서 EXPETO의 서비스를 이용해주세요!</h5>
          <div className="photo">
            <Image src="/2.png" alt="what?" width={100} height={100} />
          </div>
          <h3>Expeto란?</h3>
          <p>
            Expeto란, 라틴어로 "Ex : 타인", "peto : 찾다"라는 의미를 가져 타인이
            찾아준다는 뜻으로,
          </p>
          <p>물품을 대행해서 찾아주고 관리해주는 서비스를 뜻합니다.</p>
        </main>
        <footer className="Footer">
          <div className="bottom">
            <a href="/">EXPETO란?</a>
            <a href="/posts/index2">소개</a>
            <a href="/posts/index3">이용 절차</a>
            <a href="/posts/index4">문의</a>
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

        .contents {
          width: 1000px;
          margin: 50px auto;
        }
        .mainH {
          text-align: center;
          margin-top: 40px;
          font-size: 50px;
          font-family: Verdana, Geneva, Tahoma, sans-serif;
        }
        h5 {
          color: #666;
          font-family: Verdana, Geneva, Tahoma, sans-serif;
          margin-top: 10px;
          font-size: 15px;
          text-align: center;
        }
        .photo {
          margin-left: 445px;
          margin-top: 80px;
        }
        h3 {
          text-align: center;
          margin-top: 10px;
          font-size: 30px;
          margin-bottom: 10px;
        }
        p {
          text-align: center;
        }

        .Footer {
          width: 1200px; /* 너비 */
          height: 1px; /* 높이 */
          margin-top: 80px;
          background-color: black;
        }
        .bottom {
          width: 100%;
          height: 30px;
          padding-top: 20px;
          padding-left: 15px;
        }
        .bottom a {
          margin-right: 50px;
          text-decoration: none;
          color: #666;
        }
        @media screen and (max-width: 1080px) {
          .container1 {
            margin: 0 auto; /* 화면 중앙에 배치 */
            width: 800px; /* 너비 */
            background-color: #fff;
          }
          .Nav a {
            margin-right: 20px;
            text-decoration: none;
            color: dimgray;
            font-size: 20px;
            font-weight: 600; /* 글자 굵기 */
          }
          .mainH {
            margin-top: 40px;
            font-size: 40px;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            margin-right: 220px;
          }
          h5 {
            color: #666;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            margin-top: 10px;
            font-size: 14px;
            margin-right: 220px;
          }
          .photo {
            margin-left: 330px;
            margin-top: 80px;
          }
          h3 {
            margin-top: 10px;
            font-size: 25px;
            margin-right: 220px;
          }
          p {
            margin-right: 220px;
            font-size: 15px;
          }
        }
        @media screen and (max-width: 720px) {
          .container1 {
            margin: 0 auto; /* 화면 중앙에 배치 */
            width: 500px; /* 너비 */
            background-color: #fff;
          }
          .mainH {
            margin-top: 40px;
            font-size: 30px;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            margin-right: 500px;
          }
          h5 {
            color: #666;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            margin-top: 10px;
            font-size: 13px;
            margin-right: 500px;
          }
          .photo {
            margin-left: 200px;
            margin-top: 80px;
          }
          h3 {
            margin-top: 10px;
            font-size: 20px;
            margin-right: 500px;
          }
          p {
            margin-right: 500px;
            font-size: 13px;
          }
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
