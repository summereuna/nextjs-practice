// 도메인.com/news
import Link from "next/link";

const NEWSLIST = [
  {
    title: "news 1",
    id: 1,
    content: "test test test test test test test test test test test test",
  },
  {
    title: "news 2",
    id: 2,
    content: "test test test test test test test test test test test test",
  },
  {
    title: "news 3",
    id: 3,
    content: "test test test test test test test test test test test test",
  },
];

function NewsPage() {
  return (
    <>
      <h1>The News Page</h1>
      <ul>
        {NEWSLIST.map((news) => (
          <li key={news.id}>
            <Link href={`/news/${news.id}`}>{news.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default NewsPage;
