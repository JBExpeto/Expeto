import Head from 'next/head'
import clientPromise from '../../lib/mongodb'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { signIn } from 'next-auth/react'

type ConnectionStatus = {
  isConnected: boolean
}

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await clientPromise

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

export default function Home() {
  // Add this function to handle form submission
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Get the form data
    const target = event.target as HTMLFormElement
    const formData = new FormData(target)
    const data = Object.fromEntries(formData)

    // Send a login request
    const result = await signIn('credentials', {
      redirect: false,
      ...data,
    })

    // Handle the response
    if (result?.ok) {
      // Login successful
      alert('Login successful')
      router.push('/posts/main')
    } else {
      // Login failed
      alert('Login failed')
    }
  }

  const router = useRouter()

  return (
    <div className="container">
      <Head>
        <title>로그인</title>
      </Head>
      <div className="container">
        <header className="Header"></header>
        <div className="logo">
          <p>LOGIN</p>
          <h4 className="logo1">EXPETO에 오신 것을 환영합니다.</h4>
          <h4 className="logo2">
            서비스를 이용하시고 싶으시면 로그인을 해주세요.
          </h4>
        </div>
        <form onSubmit={handleSubmit}>
          <p className="idP">
            <strong>아이디</strong>
          </p>
          <div className="inputBox">
            <input
              className="id"
              type="text"
              placeholder="ID"
              name="id"
              required
            ></input>
          </div>
          <p className="pwdP">
            <strong>비밀번호</strong>
          </p>
          <div className="inputBox">
            <input
              className="pwd"
              type="password"
              placeholder="비밀번호"
              name="password"
              required
            ></input>
          </div>
          <p className="make">
            <strong>계정이 없으신가요? </strong>
            <a href="/posts/register">회원가입</a>
          </p>
          <input className="Button" type="submit" value="Login"></input>
          <input
            className="Button2"
            type="button"
            value="홈으로"
            onClick={() => router.push('/')}
          ></input>
        </form>
      </div>

      <style jsx>{`
        .container1 {
          margin: 0 auto; /* 화면 중앙에 배치 */
          width: 1200px; /* 너비 */
          background-color: #fff;
        }
        .Header {
          background-color: gray;
          height: 50px; /* 높이 */
        }
        .logo {
          margin-top: 70px;
        }
        .logo p {
          font-size: 45px;
          text-align: center;
          font-family: Verdana, Geneva, Tahoma, sans-serif;
        }
        .logo1 {
          font-size: 14px;
          font-family: Verdana, Geneva, Tahoma, sans-serif;
          margin-top: 20px;
          color: #666;
          text-align: center;
          margin-left: 10px;
        }
        .logo2 {
          font-size: 14px;
          font-family: Verdana, Geneva, Tahoma, sans-serif;
          text-align: center;
          color: #666;
        }
        .inputBox {
          margin-top: 10px;
          text-align: center;
        }
        .idP,
        .pwdP {
          font-size: 15px;
          margin-top: 30px;
          color: #666;
          font-weight: 30px;
          margin-left: 600px;
        }
        .id,
        .pwd {
          border-radius: 10px;
          font-size: 15px;
          padding: 15px;
          width: 350px;
          height: 40px;
          border: 3px black solid;
        }
        .id:focus,
        .pwd:focus {
          border-color: blue;
          outline: none;
        }
        .make {
          color: #666;
          margin-top: 30px;
          text-align: center;
        }
        .make a {
          text-decoration: underline;
          color: #666;
        }
        .Button {
          width: 100px;
          height: 50px;
          font-size: 20px;
          background-color: dimgray;
          border-color: dimgray;
          border-radius: 15px;
          color: white;
          margin-top: 40px;
          margin-bottom: 50px;
          margin-left: 665px;
        }
        .Button2 {
          width: 100px;
          height: 50px;
          font-size: 20px;
          background-color: dimgray;
          border-color: dimgray;
          border-radius: 15px;
          color: white;
          margin-top: 40px;
          margin-bottom: 50px;
          margin-left: 10px;
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
