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
        <title>물품 수정</title>
      </Head>
      <div className="container1">
                <header className="Header"></header>
                <div className="logo">
                    <p>물품 수정</p>
                </div>
                <form>
                    <p className="photoP"><strong>사진</strong></p>
                    <div className="image">
                        <Image src="/path/to/your/image.jpg" alt="lostimage" width={500} height={300} />
                    </div>
                    <div>
                    <input className="photoButton" type="button" value="사진"></input>
                    </div>
                    <p className="nameP"><strong>물품명</strong></p>
                    <div className="inputBox">
                        <input className="name" type="text" placeholder="물품명" required></input>
                    </div>
                    <p className="typeP"><strong>유형</strong></p>
                    <div className="SelectBox">
                        <select className="SelectList">
                            <option>---------</option>
                            <option>전자기기</option>
                            <option>신분증</option>
                            <option>액세서리</option>
                            <option>의류</option>
                            <option>지갑</option>
                            <option>열쇠</option>
                        </select>
                    </div>
                    <p className="sizeP"><strong>규격</strong></p>
                    <div className="SelectBox">
                        <select className="SelectList">
                            <option>---------</option>
                            <option>대</option>
                            <option>중</option>
                            <option>소</option>
                        </select>
                    </div>
                    <p className="moneyP"><strong>가격</strong></p>
                    <div className="inputBox">
                        <input className="money" type="text" placeholder="가격" required></input>
                    </div>
                    <p className="colorP"><strong>색상</strong></p>
                    <div className="inputBox">
                        <input className="color" type="text" placeholder="색상" required></input>
                    </div>
                    <p className="makerP"><strong>제조사</strong></p>
                    <div className="inputBox">
                        <input className="maker" type="text" placeholder="제조사" required></input>
                    </div>
                    <p className="dateP"><strong>등록 일자</strong></p>
                    <div className="inputBox">
                        <input className="date" type="text" placeholder="등록 일자" required></input>
                    </div>
                    <p className="etcP"><strong>전달사항</strong></p>
                    <div className="inputBox">
                        <textarea className="etc" cols={32} rows={8} placeholder="ex) 010-0000-0000로 연락해주세요."></textarea>
                    </div>
                    <input className="Button" type="submit" value="등록" onClick={() => confirm('등록 하시겠습니까?')}></input>
                    <input className="Button2" type="button" value="홈으로" onClick={()=>router.push('/posts/main')}></input>
                </form>
            </div>

      <style jsx>{`
       .container1{
        margin:0 auto;  /* 화면 중앙에 배치 */
        width:1200px;    /* 너비 */    
        background-color: #fff;
    }
    .Header{
        background-color: green;
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
    .inputBox, .SelectBox{
        margin-top: 10px;
        text-align: center;
    }
    .nameP, .typeP, .sizeP, .moneyP, .colorP, .makerP, .dateP, .etcP, .photoP{
        font-size: 15px;
        margin-top: 30px;
        color:#666;
        font-weight: 30px;
        padding-left: 430px;
    }
    .name, .money, .color, .maker, .date, .etc{
        border-radius: 10px;
        font-size: 15px;
        padding: 15px;
        width: 350px;
        height: 40px;
        border: 3px black solid;
    }
    .name:focus, .money:focus, .color:focus, .maker:focus, .date:focus, .etc:focus{
        border-color: blue;
        outline: none;
    }
    .SelectList{
        border-radius: 10px;
        font-size: 15px;
        padding: 5px;
        width: 350px;
        height: 35px;
    }
    .Button{
      width:100px;
      height:50px;
      font-size:20px;
      background-color:green;
      border-color:green;
      border-radius: 15px;
      color: white;
      margin-top: 40px;
      margin-bottom: 50px;
      margin-left: 495px;
  }
  .Button2{
    width:100px;
    height:50px;
    font-size:20px;
    background-color:green;
    border-color:green;
    border-radius: 15px;
    color: white;
    margin-top: 40px;
    margin-bottom: 50px;
    margin-left: 10px;
}
.photoButton{
  width:100px;
  height:50px;
  font-size:20px;
  background-color:green;
  border-color:green;
  border-radius: 15px;
  color: white;
  margin-top: 40px;
  margin-bottom: 50px;
  margin-left: 550px;
}
    .image{
        margin-left: 430px;
        margin-top: 20px;
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
