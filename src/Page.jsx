import { useState } from "react";
import DonateForm from "./components/DonateForm";
import SectionReveal from "./components/SectionReveal";
import Modal from "./components/Modal";
import { Link } from "react-router";

const impactData = [
  {
    icon: "🩺",
    title: "Быстрая реакция",
    text: "Каждая поступившая помощь направляется на лечение в течение суток.",
  },
  {
    icon: "🤝",
    title: "Поддержка семьи",
    text: "Мы помогаем не только ребёнку, но и родителям справиться с тяжёлым периодом.",
  },
  {
    icon: "🌱",
    title: "Долгосрочная помощь",
    text: "Поддерживаем лечение, реабилитацию и важные повседневные нужды.",
  },
  {
    icon: "💛",
    title: "Открытость",
    text: "Каждый взнос проходит через прозрачную и понятную систему.",
  },
];

const stories = [
  {
    tag: "История",
    name: "Аня",
    desc: "Спасибо вашим поддержке — мы успели начать курс лечения в нужное время.",
  },
  {
    tag: "Помощь",
    name: "Максим",
    desc: "Семья получила необходимое оборудование и возможность продолжать терапию.",
  },
  {
    tag: "Событие",
    name: "Лиза",
    desc: "Вместе мы помогли собрать средства на реабилитацию и адаптацию.",
  },
];

const news = [
  {
    cat: "Новости",
    title: "Открытие новой программы поддержки",
    desc: "Мы расширяем помощь для семей в сложных жизненных ситуациях.",
    date: "18.07.2026",
  },
  {
    cat: "События",
    title: "Благотворительный вечер в поддержку детей",
    desc: "Приглашаем принять участие в крупной городской акции.",
    date: "12.07.2026",
  },
  {
    cat: "Партнёры",
    title: "Новые партнёры помогают быстрее",
    desc: "К нам присоединились организации, которые поддерживают лечение.",
    date: "08.07.2026",
  },
];

const partners = [
  {
    name: "Клиника «Здоровье»",
    logo: "/images/partner1.png",
    url: "https://example.org",
  },
  {
    name: "Сеть аптек",
    logo: "/images/partner2.png",
    url: "https://example.org",
  },
  {
    name: "Благотворительный центр",
    logo: "/images/partner3.png",
    url: "https://example.org",
  },
];

const docs = [
  { title: "Свидетельство фонда", meta: "PDF", link: "/docs/registr.pdf" },
  { title: "Отчёт за 2025", meta: "PDF", link: "/docs/fin2025.pdf" },
  {
    title: "Политика конфиденциальности",
    meta: "PDF",
    link: "/docs/privacy.pdf",
  },
];

export default function Home() {
  const [callbackOpen, setCallbackOpen] = useState(false);

  return (
    <>
      <Modal isOpen={callbackOpen} onClose={() => setCallbackOpen(false)} />
      {/* HERO */}
      <section className="hero">
        <div className="hero__bg">
          <img src="/images/hero-bg.jpg" alt="" />
          <div className="hero__overlay" />
        </div>
        <div className="container hero__content">
          <span className="eyebrow">национальный благотворительный фонд</span>
          <h1 className="hero__title">
            Жизнь — <i>сейчас</i>
          </h1>
          <p className="hero__desc">
            Мы помогаем детям с онкологическими и гематологическими
            заболеваниями получить лечение вовремя.
          </p>
          <div className="hero__actions">
            <Link to="/help" className="btn btn--primary btn--lg">
              Помочь сейчас
            </Link>
            <Link to="/about" className="btn btn--glass">
              Подробнее о фонде
            </Link>
          </div>
        </div>
      </section>

      {/* Кратко о фонде */}
      <SectionReveal className="section">
        <div className="container">
          <span className="eyebrow">О фонде</span>
          <h2 className="h2">Помощь, которая приходит вовремя</h2>
          <p className="lead">
            Фонд создан в память о Дарии, чтобы другие семьи не оставались один
            на один с бедой.
          </p>
          <div className="cards-3">
            <div className="card">
              <h4>Чем занимаемся</h4>
              <p>
                Оплачиваем лечение, лекарства и реабилитацию детям по всей
                России.
              </p>
            </div>
            <div className="card">
              <h4>Почему существуем</h4>
              <p>
                Личный опыт потери научил нас ценить каждый миг и действовать
                быстро.
              </p>
            </div>
            <div className="card">
              <h4>Кому помогаем</h4>
              <p>
                Детям с тяжёлыми диагнозами и их семьям — от момента постановки
                диагноза.
              </p>
            </div>
          </div>
        </div>
      </SectionReveal>

      {/* Пожертвования */}
      <section className="section section--alt">
        <div className="container">
          <span className="eyebrow">Как помочь</span>
          <h2 className="h2">Ваш вклад работает уже сегодня</h2>
          <DonateForm />
        </div>
      </section>

      {/* Почему важен вклад */}
      <SectionReveal className="section">
        <div className="container">
          <span className="eyebrow">почему это важно</span>
          <h2 className="h2">Почему именно ваш вклад важен</h2>
          <div className="cards-4">
            {impactData.map((item, i) => (
              <div key={i} className="impact-card">
                <span className="impact-card__icon">{item.icon}</span>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* Истории помощи */}
      <section className="section section--alt">
        <div className="container">
          <span className="eyebrow">истории</span>
          <h2 className="h2">Истории, которые продолжаются благодаря вам</h2>
          <div className="stories-grid">
            {stories.map((s, i) => (
              <article key={i} className="story-card">
                <div className="story-card__media">
                  <span className="tag">{s.tag}</span>
                </div>
                <h4>{s.name}</h4>
                <p>{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Новости */}
      <SectionReveal className="section">
        <div className="container">
          <span className="eyebrow">новости</span>
          <h2 className="h2">Что происходит в фонде</h2>
          <div className="news-grid">
            {news.map((item, i) => (
              <Link key={i} to="/news" className="news-card">
                <span className="news-card__cat">{item.cat}</span>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
                <time>{item.date}</time>
              </Link>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* Партнёры */}
      <section className="section section--alt">
        <div className="container">
          <span className="eyebrow">партнёры</span>
          <h2 className="h2">Вместе мы можем больше</h2>
          <div className="partners-grid">
            {partners.map((p, i) => (
              <a
                key={i}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="partner-card"
              >
                <img src={p.logo} alt={p.name} />
                <span>{p.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Документы */}
      <SectionReveal className="section">
        <div className="container">
          <span className="eyebrow">документы</span>
          <h2 className="h2">Прозрачность и отчётность</h2>
          <div className="docs-grid">
            {docs.map((d, i) => (
              <a key={i} href={d.link} className="doc-card">
                <span className="doc-card__icon">📄</span>
                <div>
                  <strong>{d.title}</strong>
                  <small>{d.meta}</small>
                </div>
              </a>
            ))}
          </div>
        </div>
      </SectionReveal>
    </>
  );
}
