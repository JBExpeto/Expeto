import Head from 'next/head'
import clientPromise from '../../lib/mongodb'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import React from 'react'
import {useRouter} from 'next/router'

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

    const router = useRouter();

  return (
    <div className="container">
      <Head>
        <title>분실물 센터 정보</title>
      </Head>
      <div className="container1"></div>
            <header className="Header"></header>
            <div className="logo">
                <p>분실물 센터</p>
                <h3 className="logo1">주소: 중부대학교</h3>
                <h3 className="logo2">연락처: 02-XXX-XXXX</h3>
             </div>
             <input className="Button" type="button" value="이전" onClick={()=>router.push('/posts/QRcheck')}></input>

      <style jsx>{`
       .container1{
        margin:0 auto;  /* 화면 중앙에 배치 */
        width:1200px;    /* 너비 */    
        background-color: #fff;
    }
    .Header{
        background-color: blue;
        height:50px;   /* 높이 */ 
    }
    .logo{
        margin-top:70px;
    }
    .logo p{
        font-size: 45px;
        text-align: center;
        font-family:Verdana, Geneva, Tahoma, sans-serif;
    }
    .logo1{
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        margin-top: 60px;
        text-align: center;
    }
    .logo2{
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        text-align: center;
    }
    .Button{
        width:100px;
        height:50px;
        font-size:20px;
        background-color:cornflowerblue;
        border-color:cornflowerblue;
        border-radius: 15px;
        color: white;
        margin-top: 40px;
        margin-bottom: 50px;
        margin-left: 720px;
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
        margin:0;   /* 마진 리셋 */
        padding:0;   /* 패딩 리셋 */
        box-sizing: border-box;   /* 박스 영역은 테두리까지 */ 
        }
      `}</style>
    </div>
  )
}
