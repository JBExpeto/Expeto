import Head from 'next/head'
import clientPromise from '../../lib/mongodb'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import React from 'react'
import { useRouter } from 'next/router'

type ConnectionStatus = {
  isConnected: boolean
}
interface User {
  _id: string
  name: string
  password: string
  contact: string
}

interface RegisterModiProps {
  user: User
}
export const getServerSideProps: GetServerSideProps<RegisterModiProps> = async (
  context
) => {
  // Get the user ID from the query string
  const userId = context.query.userId

  // Connect to the database
  const client = await clientPromise
  const db = client.db()

  // Find the user in the database
  const user: User = (await db
    .collection('users')
    .findOne({ _id: userId })) as unknown as User

  // Pass the user data to the page

  return {
    props: {
      user,
    },
  }
}

export default function RegisterModi({ user }: RegisterModiProps) {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Get the form data
    const target = event.target as HTMLFormElement
    const formData = new FormData(target)
    const data = Object.fromEntries(formData)
    // Send a POST request to the API route
    const response = await fetch('/api/registerModi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    // Handle the response
    if (response.ok) {
      // Update successful
      alert('Update successful')
      router.push('/posts/main')
    } else {
      // Update failed
      alert('Update failed')
    }
  }

  const router = useRouter()

  return (
    <div className="container">
      <Head>
        <title>회원정보 수정</title>
      </Head>
      <div className="container1">
        <header className="Header"></header>
        <div className="logo">
          <p>회원정보 수정</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="_id" value={user._id} />
          <p className="nameP">
            <strong>이름</strong>
          </p>
          <div className="inputBox">
            <input
              className="name"
              type="text"
              placeholder="이름"
              name="name"
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
          <p className="telP">
            <strong>연락처</strong>
          </p>
          <div className="inputBox">
            <input
              className="tel"
              type="tel"
              placeholder="010-0000-0000"
              name="contact"
              pattern='(010)-\d{3,4}-\d{4}'
              title="형식 010-0000-0000"
              required
            ></input>
          </div>
          <input
            className="Button"
            type="submit"
            value="수정"
            onClick={() => confirm('회원수정 하시겠습니까?')}
          ></input>
          <input
            className="Button2"
            type="button"
            value="홈으로"
            onClick={() => router.push('/posts/main')}
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
          background-color: green;
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
        .inputBox {
          margin-top: 10px;
          text-align: center;
        }
        .nameP,
        .pwdP,
        .telP {
          font-size: 15px;
          margin-top: 30px;
          color: #666;
          font-weight: 30px;
          padding-left: 430px;
        }
        .name,
        .pwd,
        .tel {
          border-radius: 10px;
          font-size: 15px;
          padding: 15px;
          width: 350px;
          height: 40px;
          border: 3px black solid;
        }
        .name:focus,
        .pwd:focus,
        .tel:focus {
          border-color: blue;
          outline: none;
        }
        .Button {
          width: 100px;
          height: 50px;
          font-size: 20px;
          background-color: green;
          border-color: green;
          border-radius: 15px;
          color: white;
          margin-top: 40px;
          margin-bottom: 50px;
          margin-left: 495px;
        }
        .Button2 {
          width: 100px;
          height: 50px;
          font-size: 20px;
          background-color: green;
          border-color: green;
          border-radius: 15px;
          color: white;
          margin-top: 40px;
          margin-bottom: 50px;
          margin-left: 10px;
        }
        @media screen and (max-width: 1080px) {
          .container1 {
            margin: 0 auto; /* 화면 중앙에 배치 */
            width: 600px; /* 너비 */
            background-color: #fff;
          }
          .Button {
            width: 100px;
            height: 50px;
            font-size: 20px;
            background-color: green;
            border-color: green;
            border-radius: 15px;
            color: white;
            margin-top: 40px;
            margin-bottom: 50px;
            margin-left: 190px;
          }
          .nameP,
          .idP,
          .pwdP,
          .telP,
          .typeP {
            font-size: 15px;
            margin-top: 30px;
            color: #666;
            font-weight: 30px;
            padding-left: 130px;
          }
        }
        @media screen and (max-width: 720px) {
          .container1 {
            margin: 0 auto; /* 화면 중앙에 배치 */
            width: 500px; /* 너비 */
            background-color: #fff;
          }
          .Button {
            width: 100px;
            height: 50px;
            font-size: 20px;
            background-color: green;
            border-color: green;
            border-radius: 15px;
            color: white;
            margin-top: 40px;
            margin-bottom: 50px;
            margin-left: 140px;
          }
          .nameP,
          .idP,
          .pwdP,
          .telP,
          .typeP {
            font-size: 15px;
            margin-top: 30px;
            color: #666;
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
          margin: 0; /* 마진 리셋 */
          padding: 0; /* 패딩 리셋 */
          box-sizing: border-box; /* 박스 영역은 테두리까지 */
        }
      `}</style>
    </div>
  )
}
