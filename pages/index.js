// 도메인.com/
import { MongoClient } from "mongodb";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>Practice NextJS: React Meetups App</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.NEXT_PUBLIC_DB_USER}:${process.env.NEXT_PUBLIC_DB_PASS}@cluster0.sdgjvq0.mongodb.net/meetups?retryWrites=true&w=majority`
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  //디비에서 find()메서드로 문서 가져오기: promise를 반환하는 async 작업임
  //toArray()로 문서의 배열 받을 수 있음
  const meetupsData = await meetupsCollection.find().toArray();

  //가져온 후 연결 차단
  client.close();

  return {
    props: {
      //데이터 컨버티드
      meetups: meetupsData.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        //description: meetup.description,
      })),
    }, //디비에서 받아온 데이터 props으로 보내기
    revalidate: 1,
  };
}

export default HomePage;
