import { Link } from "react-router";
import logo from "../app/svg/dariya nuru (2).svg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <div className="logo"></div>
          <p>Благотворительный фонд помощи детям с тяжёлыми заболеваниями.</p>
        </div>
        <div>
          <h5>Информация</h5>
          <ul>
            <li>
              <Link to="/about">О фонде</Link>
            </li>
            <li>
              <Link to="/news">Новости</Link>
            </li>
            <li>
              <Link to="/reports">Отчёты</Link>
            </li>
          </ul>
        </div>
        <div>
          <h5>Помощь</h5>
          <ul>
            <li>
              <Link to="/help">Пожертвовать</Link>
            </li>
            <li>
              <Link to="/documents">Документы</Link>
            </li>
            <li>
              <Link to="/contacts">Контакты</Link>
            </li>
          </ul>
        </div>
        <div>
          <h5>Соцсети</h5>
          <div className="social_links">
            <a href="#">VKontakte</a>
            <a href="#">Telegram</a>
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© 2026 Фонд «Дарья». Все права защищены.</span>
        <span>Сделано с любовью</span>
      </div>
    </footer>
  );
}
