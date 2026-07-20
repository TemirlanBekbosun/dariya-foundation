import SectionReveal from "@/components/SectionReveal";
import Timeline from "@/components/Timeline";
import Slider from "@/components/Slider";
import Lightbox from "@/components/Lightbox";

const timelineEvents = [
  {
    date: "Январь 2024",
    title: "Начало тяжёлого испытания",
    desc: "Дария внезапно заболела: у неё поднялась температура, началась рвота, и врачи впервые заподозрили лейкоз.",
  },
  {
    date: "Март–апрель 2024",
    title: "Реанимация и точный диагноз",
    desc: "После тяжёлого состояния и критического падения тромбоцитов Дарии поставили редкий диагноз — ювенильный миеломоноцитарный лейкоз.",
  },
  {
    date: "Июль 2024",
    title: "Поездка в Турцию",
    desc: "Благодаря поддержке тысяч людей удалось собрать средства на экстренное лечение и подготовку к трансплантации.",
  },
  {
    date: "Сентябрь–октябрь 2024",
    title: "Сбор средств и надежда",
    desc: "Поддержка простых людей, фондов и добрых сердец стала для семьи настоящим шансом на спасение.",
  },
  {
    date: "Ноябрь 2024",
    title: "Тяжёлая утрата и память",
    desc: "После сложнейшей терапии и пересадки костного мозга Дария ушла из жизни, оставив после себя светлую память и миссию помощи другим детям.",
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
          <h1 className="h2">История Дарии</h1>
          <div className="about-content">
            <img
              src="/images/daria-main.jpg"
              alt="Дария"
              className="about-img"
            />
            <div>
              <p className="lead">
                В январе 2024 года наша приемная дочь Дария тяжело заболела: у
                неё резко поднялась температура, началась рвота, и врачи впервые
                заподозрили лейкоз. Из‑за юридических сложностей и отсутствия
                гражданства РФ лечение в российском онкологическом отделении
                оказалось недоступным, и мы экстренно вылетели в Бишкек.
              </p>
              <p>
                После пункции и уточнения состояния врачи предположили
                миелодиспластический синдром, однако для окончательной
                верификации диагноза мы были направлены обратно в Москву. В
                марте–апреле 2024 года Дария оказалась в реанимации: критическое
                падение тромбоцитов и подозрение на внутреннее кровотечение
                потребовали немедленной госпитализации.
              </p>
              <p>
                После стабилизации состояния в Морозовской клинике ей поставили
                редчайший диагноз — ювенильный миеломоноцитарный лейкоз.
                Единственным шансом на спасение стала трансплантация костного
                мозга, но биологическая мать девочки отказалась стать донором.
                Тогда на помощь пришли люди — тысячи неравнодушных по всему
                миру.
              </p>
              <p>
                Благодаря поддержке простых людей, фондов и добрых сердец нам
                удалось собрать необходимые средства и направить Дарию в Турцию
                на лечение. После сложнейшей терапии и пересадки костного мозга
                она проявила невероятную стойкость. Однако 20 ноября 2024 года
                Дария ушла из жизни. Её история стала для нас не только болью,
                но и вдохновением — в её памяти мы создали общественный фонд
                Daria Nuru, чтобы помогать другим детям и их семьям.
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

      {/* <section className="section">
        <div className="container">
          <h2 className="h2">Видео</h2>
          <div className="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/VIDEO_ID"
              allowFullScreen
            />
          </div>
        </div>
      </section> */}

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
