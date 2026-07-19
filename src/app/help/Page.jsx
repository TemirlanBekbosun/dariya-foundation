import DonateForm from '@/components/DonateForm';

export default function HelpPage() {
  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">Помочь фонду</span>
        <h1 className="h2">Выберите удобный способ</h1>
        <DonateForm />
        <div className="bank-details">
          <h3>Реквизиты для перевода</h3>
          <p>Получатель: БФ «Дарья»</p>
          <p>ИНН: 3328000000</p>
          <p>Расчётный счёт: 40703810000000000001</p>
          <p>Банк: ПАО Сбербанк</p>
          <p>БИК: 044525225</p>
        </div>
      </div>
    </section>
  );
}