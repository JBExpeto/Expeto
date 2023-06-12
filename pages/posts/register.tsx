import Head from 'next/head'
import clientPromise from '../../lib/mongodb'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
import React from 'react'

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
        <title>회원가입</title>
      </Head>
      <div className="container1">
                <header className="Header"></header>
                <div className="logo">
                    <p>회원가입</p>
                </div>
                <form>
                    <p className="nameP"><strong>이름</strong></p>
                    <div className="inputBox">
                        <input className="name" type="text" placeholder="이름" required></input>
                    </div>
                    <p className="idP"><strong>아이디</strong></p>
                    <div className="inputBox">
                        <input className="id" type="text" placeholder="ID" required></input>
                    </div>
                    <p className="pwdP"><strong>비밀번호</strong></p>
                    <div className="inputBox">
                        <input className="pwd" type="password" placeholder="비밀번호" required></input>
                    </div>
                    <p className="telP"><strong>연락처</strong></p>
                    <div className="inputBox">
                        <input className="tel" type="tel" placeholder="010-0000-0000" required></input>
                    </div>
                    <p className="typeP"><strong>사용자 구분</strong></p>
                    <div className="SelectBox">
                        <select className="SelectList">
                            <option>---------</option>
                            <option>고객</option>
                            <option>관리자</option>
                            <option>게스트</option>
                        </select>
                    </div>
                    <input className="Button" type="submit" value="회원가입" onClick={() => confirm('회원가입 하시겠습니까?')}></input>
                    <input className="Button2" type="button" value="홈으로" onClick={()=>router.push('/')}></input>
                </form>
            </div>

      <style jsx>{`
      .container1{
        margin:0 auto;  /* 화면 중앙에 배치 */
        width:1200px;    /* 너비 */    
        background-color: #fff;
    }
    .Header{
        background-color: gray;  
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
    .nameP, .idP, .pwdP, .telP, .typeP{
        font-size: 15px;
        margin-top: 30px;
        color:#666;
        font-weight: 30px;
        padding-left: 430px;
    }
    .name, .id, .pwd, .tel{
        border-radius: 10px;
        font-size: 15px;
        padding: 15px;
        width: 350px;
        height: 40px;
        border: 3px black solid;
    }
    .name:focus, .id:focus, .pwd:focus, .tel:focus{
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
      background-color:dimgray;
      border-color:dimgray;
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
    background-color:dimgray;
    border-color:dimgray;
    border-radius: 15px;
    color: white;
    margin-top: 40px;
    margin-bottom: 50px;
    margin-left: 10px;
}
@media screen and (max-width:1080px){
  .container1{
    margin:0 auto;  /* 화면 중앙에 배치 */
    width:600px;    /* 너비 */    
    background-color: #fff;
  }
  .Button{
    width:100px;
    height:50px;
    font-size:20px;
    background-color:dimgray;
    border-color:dimgray;
    border-radius: 15px;
    color: white;
    margin-top: 40px;
    margin-bottom: 50px;
    margin-left: 190px;
  }
  .nameP, .idP, .pwdP, .telP, .typeP{
    font-size: 15px;
        margin-top: 30px;
        color:#666;
        font-weight: 30px;
        padding-left: 130px;
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
    background-color:dimgray;
    border-color:dimgray;
    border-radius: 15px;
    color: white;
    margin-top: 40px;
    margin-bottom: 50px;
    margin-left: 140px;
  }
  .nameP, .idP, .pwdP, .telP, .typeP{
    font-size: 15px;
      margin-top: 30px;
      color:#666;
      font-weight: 30px;
      padding-left: 80px;
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
