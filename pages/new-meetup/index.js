// 도메인.com/new-meetup
import Head from "next/head";
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function newMeetupPage() {
  const router = useRouter();

  //meetupData 받아서
  const addMeetupHandler = async (meetupData) => {
    //🔥 백엔드에 넘기기
    // 🔥 /api/new-meetup.js 파일로 요청 전송하고 거기에 있는 함수 트리거함
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json", //JSON 데이터 보내는 것 명확히 하기 위해 작성
      },
    });

    //응답 받으면 데이터 얻음
    const data = await response.json();
    // console.log(data);

    //폼 입력 끝나면 다른 페이지로 이동
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities."
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
}

export default newMeetupPage;
