import { Link } from "react-router";
import "./DariaStory.css";
// import daria from "../../assets/daria.jpg";

export default function DariaStory() {
  return (
    <section className="daria-story">
      <div className="daria-image">
        <img
          src="https://img.magnific.com/free-photo/girl-student-kid-smiling-silly-laughing-posing-delighted-cheering-turn-camera-playful-upbeat-expression_176420-44774.jpg?semt=ais_hybrid&w=740&q=80"
          alt="Дария"
        />

        <div className="overlay">
          <h2>Дария Нуру</h2>
        </div>
      </div>

      <div className="daria-content">
        <h2>Наш фонд создан в память о Дарии.</h2>

        <div className="story">
          {/* <div className="story-item"> */}

          <p>
            В январе 2024 года Дария тяжело заболела. После длительных
            обследований ей поставили редчайший диагноз — ювенильный
            миеломоноцитарный лейкоз. Единственным шансом на спасение стала
            дорогостоящая трансплантация костного мозга. Благодаря тысячам людей
            со всего мира удалось собрать средства на лечение и отправить Дарию
            в Турцию. Она мужественно прошла тяжелейший путь, но 20 ноября 2024
            года её сердце остановилось из-за осложнений после трансплантации. В
            память о Дарии был создан общественный фонд Daria Nuru, чтобы
            помогать другим детям бороться за жизнь.
          </p>
          {/* </div> */}
        </div>

        <button>
          {" "}
          <Link to={"/about"}> Подробнее </Link>
        </button>
      </div>
    </section>
  );
}
