import { Link } from "react-router";

const news = [
  {
    id: 1,
    date: "18.07.2026",
    category: "События",
    title: "Благотворительный забег «От сердца к сердцу»",
    excerpt: "Приглашаем стать частью большого доброго дела в эти выходные.",
  },
  {
    id: 2,
    date: "12.07.2026",
    category: "Помощь",
    title: "Визит в детскую областную больницу",
    excerpt:
      "Передали необходимое маленьким пациентам вместе с партнёрами фонда.",
  },
  {
    id: 3,
    date: "09.07.2026",
    category: "Донорство",
    title: "Ещё один донор костного мозга",
    excerpt:
      "Друг фонда вступил в федеральный регистр — спасибо за неравнодушие.",
  },
  {
    id: 4,
    date: "05.07.2026",
    category: "Акции",
    title: "Акция «Тележки добра»",
    excerpt: "Собрали всё необходимое для детей, проходящих лечение.",
  },
];

export default function NewsPage() {
  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">Новости</span>
        <h1 className="h2">События фонда</h1>
        <div className="news-grid">
          {news.map((item) => (
            <Link key={item.id} to="/news" className="news-card">
              <span className="news-card__cat">{item.category}</span>
              <h4>{item.title}</h4>
              <p>{item.excerpt}</p>
              <time>{item.date}</time>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
