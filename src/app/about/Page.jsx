import SectionReveal from "@/components/SectionReveal";
import Timeline from "@/components/Timeline";
import Slider from "@/components/Slider";
import Lightbox from "@/components/Lightbox";

const timelineEvents = [
  {
    date: "2010",
    title: "Рождение Дарии",
    desc: "С этого момента началась история семьи и будущего фонда.",
  },
  {
    date: "2018",
    title: "Начало помощи",
    desc: "Семья и близкие стали собирать поддержку для других детей.",
  },
  {
    date: "2020",
    title: "Открытие фонда",
    desc: "Фонд начал официально помогать семьям в тяжёлые моменты.",
  },
];

const slidesData = [
  { image: "/images/slide1.jpg", caption: "Первые шаги фонда" },
  { image: "/images/slide2.jpg", caption: "События и встречи" },
  { image: "/images/slide3.jpg", caption: "Поддержка детей и семей" },
];

const galleryImages = [
  { thumb: "/images/thumb1.jpg", full: "/images/thumb1.jpg" },
  { thumb: "/images/thumb2.jpg", full: "/images/thumb2.jpg" },
  { thumb: "/images/thumb3.jpg", full: "/images/thumb3.jpg" },
];

const friends = [
  { name: "Алексей", photo: "/images/friend1.jpg" },
  { name: "Марина", photo: "/images/friend2.jpg" },
  { name: "Илья", photo: "/images/friend3.jpg" },
];

export default function AboutPage() {
  return (
    <>
      <section className="section">
        <div className="container">
          <span className="eyebrow">О фонде</span>
          <h1 className="h2">Фонд имени Дарии</h1>
          <div className="about-content">
            <img
              src="/images/daria-main.jpg"
              alt="Дария"
              className="about-img"
            />
            <div>
              <p className="lead">
                Фонд создан в память о светлой девочке Дарии, которая боролась с
                тяжёлым заболеванием. Её сила и любовь к жизни вдохновили нас
                помогать другим детям.
              </p>
              <p>
                Дария родилась 3 марта 2010 года и оставила после себя память о
                доброте и стойкости.
              </p>
              <p>
                На её примере фонд помогает детям и семьям в моменты, когда
                каждая поддержка важна.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionReveal className="section section--alt">
        <div className="container">
          <h2 className="h2">История Дарии в событиях</h2>
          <Timeline events={timelineEvents} />
        </div>
      </SectionReveal>

      <SectionReveal className="section">
        <div className="container">
          <h2 className="h2">История в слайдах</h2>
          <Slider slides={slidesData} />
        </div>
      </SectionReveal>

      <SectionReveal className="section section--alt">
        <div className="container">
          <h2 className="h2">Фотогалерея</h2>
          <Lightbox images={galleryImages} />
        </div>
      </SectionReveal>

      <section className="section">
        <div className="container">
          <h2 className="h2">Видео</h2>
          <div className="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/VIDEO_ID"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <h2 className="h2">Наша команда</h2>
          <div className="team-grid">
            <div className="team-card">
              <strong>Президент фонда</strong> — Иванова Анна
            </div>
            <div className="team-card">
              <strong>Советник</strong> — Петров Сергей
            </div>
            <div className="team-card">
              <strong>Бухгалтер</strong> — Смирнова Ольга
            </div>
            <div className="team-card">
              <strong>Маркетолог</strong> — Кузнецов Дмитрий
            </div>
            <div className="team-card">
              <strong>Видеограф</strong> — Алексеев Павел
            </div>
            <div className="team-card">
              <strong>Дизайнер</strong> — Фёдорова Елена
            </div>
          </div>
        </div>
      </section>

      <SectionReveal className="section">
        <div className="container">
          <h2 className="h2">Друзья фонда</h2>
          <div className="friends-grid">
            {friends.map((f, i) => (
              <div key={i} className="friend-card">
                <img src={f.photo} alt={f.name} />
                <span>{f.name}</span>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>
    </>
  );
}
