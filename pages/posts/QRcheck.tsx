import Head from 'next/head'
import clientPromise from '../../lib/mongodb'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import React from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router';

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
                    <h1 className="mainH">분실물을 습득하였습니다.</h1>
                    <div className="image">
                        <Image src="/path/to/your/image.jpg" alt="lostimage" width={500} height={300} />
                    </div>
                    <p className="mainP">분실물 습득 시 010-1111-1111로 연락주세요.</p>
                    <input className="Button" type="button" value="분실 신고" onClick={() => confirm('분실물 발견 신고를 하시겠습니까?')}></input>
                    <input className="Button2" type="button" value="분실물 센터" onClick={()=>router.push('/posts/centerInfo')}></input>
                </main>
            </div>  

      <style jsx>{`
       .container1{
        margin:0 auto;  /* 화면 중앙에 배치 */
        width:1200px;    /* 너비 */    
        background-color: #fff;
      }
      .Header{
        width:100%;    /*  너비 */
        height:100px;   /* 높이 */ 
        background-color:blue;
      }
      .logo{
        float:left; /* 왼쪽으로 플로팅 */ 
        width:260px; /*  너비 */ 
        height:100px; /* 높이 */
        line-height:100px; /* 세로로 중간에 맞춤 - 줄간격을 높이 값과 같게 */
        padding-left:20px; /* 왼쪽에 여백 */
        background-color:cornflowerblue;
      }
      .logo h1{
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        font-size:50px;   /* 글자 크기 */
        color:#fff;   /* 글자 색*/
        margin: 0;
        margin-top: 10px;
        margin-left: 5px;
      }
      .Nav{
        float:right;
        width:900px;   /*   너비 */  
        height:100px;   /* 메뉴 영역 높이 */  
        padding-top:35px;  /* 메뉴를 아래로 내리기 위해 */
        padding-left: 700px;
      }
      .Nav a{
        margin-left: 90px;
        text-decoration: none;
        color: #fff;
        font-size: 20px;
        font-weight:600;  /* 글자 굵기 */
      }
     .mainH, .mainP{
        text-align: center;
        margin: 40px;
     }
     .image{
        margin-left: 420px;
     }
     .Button{
        width:110px;
        height:50px;
        font-size:20px;
        background-color:cornflowerblue;
        border-color:cornflowerblue;
        border-radius: 15px;
        color: white;
        margin-top: 10px;
        margin-bottom: 50px;
        margin-left: 480px;
    }
    .Button2{
        width:110px;
        height:50px;
        font-size:20px;
        background-color:cornflowerblue;
        border-color:cornflowerblue;
        border-radius: 15px;
        color: white;
        margin-top: 10px;
        margin-bottom: 50px;
        margin-left: 20px;
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
