// 도메인.com/news/:newsId

import { useRouter } from "next/router";

function NewsDetailPage() {
  const router = useRouter();
  const { newsId } = router.query;

  // 백엔드 API로 요청보내기
  // newsId로 뉴스 아이템 가져오기(fetch)

  return <h1>The News Detail Page</h1>;
}

export default NewsDetailPage;
