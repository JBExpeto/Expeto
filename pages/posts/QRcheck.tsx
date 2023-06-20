import Head from 'next/head'
import clientPromise from '../api/auth/lib/mongodb'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import React from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router';

type ConnectionStatus = {
  isConnected: boolean
}

export const getServerSideProps: GetServerSideProps<ConnectionStatus> = async () => {
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
  const router = useRouter();

  return (
    <div className="container">
      <Head>
        <title>분실 신고</title>
      </Head>
      <div className="container1">
        <header className="Header">
          <div className="logo">
            <h1>EXPETO</h1>
          </div>
          <nav className="Nav">
            <a href="/posts/login">로그인</a>
          </nav>
        </header>
        <main>
          <h1 className="mainH">분실물 획득!</h1>
          <div className="image">
            <Image src="/fake.png" alt="lostimage" width={300} height={300} />
          </div>
          <p className="mainP">분실물 습득 시 010-1111-1111로 연락주세요.</p>
          <input className="Button" type="button" value="분실 신고" onClick={() => confirm('분실물 발견 신고를 하시겠습니까?')}></input>
          <input className="Button2" type="button" value="분실물 센터" onClick={() => router.push('/posts/centerInfo')}></input>
          <div className="smallImage">
            <Image src="/lostqr.png" alt="qrimage" width={150} height={150} />
          </div>
        </main>
      </div>

      <style jsx>{`
        .container1 {
          margin: 0 auto;
          width: 1200px;
          background-color: #fff;
        }
        .Header {
          width: 100%;
          height: 100px;
          background-color: blue;
        }
        .logo {
          float: left;
          width: 260px;
          height: 100px;
          line-height: 100px;
          padding-left: 20px;
          background-color: cornflowerblue;
        }
        .logo h1 {
          font-family: Verdana, Geneva, Tahoma, sans-serif;
          font-size: 50px;
          color: #fff;
          margin: 0;
          margin-left: 5px;
        }
        .Nav {
          float: right;
          width: 900px;
          height: 100px;
          padding-top: 35px;
          padding-left: 680px;
        }
        .Nav a {
          margin-left: 90px;
          text-decoration: none;
          color: #fff;
          font-size: 20px;
          font-weight: 600;
        }
        .mainH,
        .mainP {
          text-align: center;
          margin: 40px;
        }
        .image {
          padding-left: 450px;
        }
        .Button {
          width: 110px;
          height: 50px;
          font-size: 20px;
          background-color: cornflowerblue;
          border-color: cornflowerblue;
          border-radius: 15px;
          color: white;
          margin-top: 10px;
          margin-bottom: 50px;
          margin-left: 480px;
        }
        .Button2 {
          width: 110px;
          height: 50px;
          font-size: 20px;
          background-color: cornflowerblue;
          border-color: cornflowerblue;
          border-radius: 15px;
          color: white;
          margin-top: 10px;
          margin-bottom: 50px;
          margin-left: 20px;
        }
        .smallImage {
          text-align: center;
          margin-top: 20px;
        }
        @media screen and (max-width: 1080px) {
          .container1 {
            margin: 0 auto;
            width: 800px;
            background-color: #fff;
          }
          .Button {
            width: 110px;
            height: 50px;
            font-size: 20px;
            background-color: cornflowerblue;
            border-color: cornflowerblue;
            border-radius: 15px;
            color: white;
            margin-top: 10px;
            margin-bottom: 50px;
            margin-left: 280px;
          }
          .image {
            padding-left: 240px;
          }
          .Nav a {
            margin-left: 90px;
            text-decoration: none;
            color: cornflowerblue;
            font-size: 20px;
            font-weight: 600;
          }
        }
        @media screen and (max-width: 720px) {
          .container1 {
            margin: 0 auto;
            width: 500px;
            background-color: #fff;
          }
          .Button {
            width: 110px;
            height: 50px;
            font-size: 20px;
            background-color: cornflowerblue;
            border-color: cornflowerblue;
            border-radius: 15px;
            color: white;
            margin-top: 10px;
            margin-bottom: 50px;
            margin-left: 140px;
          }
          .image {
            padding-left: 100px;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
            Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
