import Head from 'next/head'
import clientPromise from '../../lib/mongodb'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { Map, MapMarker, useMap } from 'react-kakao-maps-sdk'
import { useState } from 'react'

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
  const router = useRouter()

  const mapData = [
    {
      content: <div style={{ color: '#000' }}> Expeto </div>,
      latlng: { lat: 37.56677916106135, lng: 126.97869754787648 },
    },
    {
      content: <div style={{ color: '#000' }}> 서울종로경찰서 </div>,
      latlng: { lat: 37.57180757275303, lng: 126.97869754787648 },
    },
    {
      content: <div style={{ color: '#000' }}> 서울서대문경찰서 </div>,
      latlng: { lat: 37.56489333530958, lng: 126.9668077228793 },
    },
  ]

  const EventMarkerContainer = ({ position, content }) => {
    const map = useMap()
    const [isVisible, setIsVisible] = useState(false)

    return (
      <MapMarker
        position={position} // 마커를 표시할 위치
        // @ts-ignore
        onClick={(marker) => map.panTo(marker.getPosition())}
        onMouseOver={() => setIsVisible(true)}
        onMouseOut={() => setIsVisible(false)}
      >
        {isVisible && content}
      </MapMarker>
    )
  }

  return (
    <div className="container">
      <Head>
        <title>분실물 센터 정보</title>
      </Head>
      <div className="container1"></div>
      <header className="Header"></header>
      <div className="logo">
        <p>분실물 센터</p>
        <h3 className="logo1">익스펙토</h3>
        <h3 className="logo2">연락처: 02-123-4567</h3>
      </div>

      <div className="map">
        <Map
          center={{
            lat: 37.56677916106135,
            lng: 126.97869754787648,
          }}
          style={{
            width: '400px',
            height: '400px',
          }}
          level={6} // 지도의 확대 레벨
        >
          {mapData.map((value) => (
            <EventMarkerContainer
              key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lng}`}
              position={value.latlng}
              content={value.content}
            />
          ))}
        </Map>
      </div>
      <div className="btn">
        <input
          className="Button"
          type="button"
          value="홈으로"
          onClick={() => router.push('/posts/QRcheck')}
        ></input>
      </div>

      <style jsx>{`
        .container1 {
          margin: 0 auto; /* 화면 중앙에 배치 */
          width: 1200px; /* 너비 */
          background-color: #fff;
        }
        .Header {
          background-color: blue;
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
          font-family: Verdana, Geneva, Tahoma, sans-serif;
          margin-top: 60px;
          text-align: center;
        }
        .logo2 {
          font-family: Verdana, Geneva, Tahoma, sans-serif;
          text-align: center;
        }
        .Button {
          width: 100px;
          height: 50px;
          font-size: 20px;
          background-color: cornflowerblue;
          border-color: cornflowerblue;
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
          margin: 0; /* 마진 리셋 */
          padding: 0; /* 패딩 리셋 */
          box-sizing: border-box; /* 박스 영역은 테두리까지 */
        }
      `}</style>
    </div>
  )
}
