// /api/new-meetup
// POST  /api/new-meetup
//이 라우트에서는 포스트 요청일 때맏 코드 트리거 하면 되므로..

import { MongoClient } from "mongodb";
//몽고디비 드라이버는 이 클러스터에 접속하여 데이터를 삽입하거나 가져올 수 있게 해준다.
//이 API 라우트 파일에, 클러스터와 연결하게 해주는 MongoClient 오브젝트를 몽고디비로 부터 가져온다.

//함수에 요청 받고, 객체에 응답 => node.js와 express.js에서 받음
async function handler(req, res) {
  //요청이 POST인 경우만 실행
  if (req.method === "POST") {
    //✅ 요청이 들어오면 디비에 데이터 저장

    const data = req.body;

    //몽고db로 연결된 client
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.NEXT_PUBLIC_DB_USER}:${process.env.NEXT_PUBLIC_DB_PASS}@cluster0.sdgjvq0.mongodb.net/meetups?retryWrites=true&w=majority`
    );
    //이 코드는 클라이언트 측에 절대 노출되면 안된다. 하지만 API 경로 파일은 서버에서만 돌아가기 때문에 문제 없음
    //연결은 promise로 되돌아오기 때문에 handler함수를 await으로 입력하여 async function으로 전환한다.

    const db = client.db();
    //이제 client 오브젝트에서 모든 db method를 통해 meetups 데이터베이스에 연결중인 데이터베이스 확보 가능

    //이제 이 데이터베이스에서 meetupsCollection에 접근할 수 있음
    const meetupsCollection = db.collection("meetups");

    //컬렉션에 새 문서 삽입하기 휘애 query 명령어 호출: inserOne()
    //몽고디비의 문서는 결국 자바스크립트의 오브젝트 같으므로 데이터는 객체여야 함
    const result = await meetupsCollection.insertOne(data);
    //데이터 객체 데이터베이스에 삽입하기: insertOne()은 promise를 되돌리므로 여기도 async 작업
    //result는 자동으로 생성된 id를 가진 객체가 된다. =>  몽고 디비에 저장된 데이터 확인

    //✅ 작업 마쳤으므로 데이터 베이스 연결 차단
    client.close();

    //✅ 응답객체 사용하여 응답 다시 보내기: 요청이 들어오면 디비에 데이터 저장하고(위), 다시 응답 보내야 하기 때문
    //응답의 http status 코드 설정하기 위해 응답 호출: 201 성공적으로 삽입됨을 나타냄
    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
