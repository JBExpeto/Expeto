import Head from 'next/head'
import clientPromise from '../../lib/mongodb'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { Table } from '@nextui-org/react'
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

    const handleButtonClick = () => {
      const result = window.confirm('로그아웃 하시겠습니까?');
      if(result){
        router.push('/');
      }
    };

  return (
    <div className="container">
      <Head>
        <title>마이페이지</title>
      </Head>
      <div className="container1">
        <header className="Header">
          <div className="logo">
            <h1>EXPETO</h1>
          </div>
          <nav className="Nav">
            <a href="/posts/registerModi">회원수정</a>
            <a onClick={handleButtonClick}>로그아웃</a>
          </nav>
        </header>
        <h1 className="mainP">내 물품</h1>
        <div>
          <Table>
            <Table.Header>
              <Table.Column width={150}>사진</Table.Column>
              <Table.Column width={130}>일련번호</Table.Column>
              <Table.Column width={100}>이름</Table.Column>
              <Table.Column width={100}>유형</Table.Column>
              <Table.Column width={100}>제조사</Table.Column>
              <Table.Column width={100}>가격</Table.Column>
              <Table.Column width={130}>색상</Table.Column>
              <Table.Column width={130}>QR</Table.Column>
              <Table.Column width={90}>수정</Table.Column>
              <Table.Column width={90}>삭제</Table.Column>
              <Table.Column>신고</Table.Column>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>사진</Table.Cell>
                <Table.Cell>일련번호</Table.Cell>
                <Table.Cell>이름</Table.Cell>
                <Table.Cell>유형</Table.Cell>
                <Table.Cell>제조사</Table.Cell>
                <Table.Cell>가격</Table.Cell>
                <Table.Cell>색상</Table.Cell>
                <Table.Cell>QR</Table.Cell>
                <Table.Cell><input className="Button2" type="button" value="수정" onClick={()=>router.push('/posts/itemModi')}></input></Table.Cell>
                <Table.Cell><input className="Button2" type="button" value="삭제" onClick={() => confirm('목록에서 삭제하시겠습니까?')}></input></Table.Cell>
                <Table.Cell><input className="Button2" type="button" value="신고" onClick={()=>router.push('/posts/itemSOS')}></input></Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
        <input className="Button" type="button" value="등록" onClick={()=>router.push('/posts/itemRegister')}></input>
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
        background-color: green;
      }
      .logo{
        float:left; /* 왼쪽으로 플로팅 */ 
        width:260px; /*  너비 */ 
        height:100px; /* 높이 */
        line-height:100px; /* 세로로 중간에 맞춤 - 줄간격을 높이 값과 같게 */
        padding-left:20px; /* 왼쪽에 여백 */
        background-color:limegreen;
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
        margin-right: 20px;
        text-decoration: none;
        color: #fff;
        font-size: 20px;
        font-weight:600;  /* 글자 굵기 */
      }
    
      .mainP{
        margin-top: 200px;
        font-size: 30px;
        font-family:Verdana, Geneva, Tahoma, sans-serif;
      }
      .Button{
        width:100px;
        height:50px;
        font-size:20px;
        background-color:green;
        border-color:green;
        border-radius: 15px;
        color: white;
        margin-top: 50px;
        margin-left: 550px;
    }
      .Button2{
        width:50px;
        height:30px;
        background-color:green;
        border-color:green;
        font-size:15px;
        border-radius: 15px;
        color: white;
      }
      @media screen and (max-width:1080px){
        .container1{
          margin:0 auto;  /* 화면 중앙에 배치 */
          width:800px;    /* 너비 */
          background-color: #fff;
        }
        .Nav a{
          margin-right: 20px;
          text-decoration: none;
          color: green;
          font-size: 20px;
          font-weight:600;  /* 글자 굵기 */
        }
        .Button{
          width:100px;
          height:50px;
          font-size:20px;
          background-color:green;
          border-color:green;
          border-radius: 15px;
          color: white;
          margin-top: 50px;
          margin-left: 350px;
        }
      }
      @media screen and (max-width:720px){
        .container1{
          margin:0 auto;  /* 화면 중앙에 배치 */
          width:500px;    /* 너비 */    
          background-color: #fff;
        }
        .Button{
          width:100px;
          height:50px;
          font-size:20px;
          background-color:green;
          border-color:green;
          border-radius: 15px;
          color: white;
          margin-top: 50px;
          margin-left: 200px;
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
        margin:0;   /* 마진 리셋 */
        padding:0;   /* 패딩 리셋 */
        box-sizing: border-box;   /* 박스 영역은 테두리까지 */ 
        }
      `}</style>
    </div>
  )
}
