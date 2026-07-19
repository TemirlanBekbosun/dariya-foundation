export default function ContactsPage() {
  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">Контакты</span>
        <h1 className="h2">Свяжитесь с нами</h1>
        <div className="contacts-layout">
          <div className="contacts-info">
            <div className="contact-item">
              <strong>Телефон:</strong>
              <a href="tel:+79001234567"> +(996) 999-999</a>
            </div>
            <div className="contact-item">
              <strong>Email:</strong>
              <a href="mailto:info@fond-darya.ru"> info@fond-darya.ru</a>
            </div>
            <div className="contact-item">
              <strong>Адрес:</strong>
              <span> г.UE, ул. Примерная, д. 1</span>
            </div>
            <form className="contact-form">
              <h3>Напишите нам</h3>
              <input type="text" placeholder="Ваше имя" />
              <input type="email" placeholder="Email" />
              <textarea placeholder="Сообщение" rows={4}></textarea>
              <button type="submit" className="btn btn--primary">Отправить</button>
            </form>
          </div>
          <div className="contacts-map">
            <iframe
              src="https://www.google.com/maps/embed?..."
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}