'use client';
import { useState } from 'react';

const amounts = [500, 1000, 3000, 5000, 10000];

export default function DonateForm() {
  const [type, setType] = useState('once');
  const [amount, setAmount] = useState(1000);
  const [custom, setCustom] = useState('');

  return (
    <div className="donate-form">
      <div className="toggle">
        <button className={type === 'once' ? 'active' : ''} onClick={() => setType('once')}>Разовое</button>
        <button className={type === 'monthly' ? 'active' : ''} onClick={() => setType('monthly')}>Ежемесячное</button>
      </div>
      <div className="amount-grid">
        {amounts.map(v => (
          <button key={v} className={`chip ${amount === v && !custom ? 'active' : ''}`} onClick={() => { setAmount(v); setCustom(''); }}>
            {v} ₽
          </button>
        ))}
        <button className={`chip ${custom ? 'active' : ''}`} onClick={() => setCustom(custom || ' ')}>Своя сумма</button>
      </div>
      {custom !== '' && (
        <input className="custom-input" placeholder="Введите сумму" value={custom} onChange={e => setCustom(e.target.value)} />
      )}
      <div className="fields">
        <input placeholder="E-mail для чека" />
        <input placeholder="Комментарий" />
      </div>
      <button className="btn btn--primary btn--full">Перевести {custom || amount} ₽</button>
      <p className="note">Вы можете отключить регулярные платежи в любой момент.</p>
    </div>
  );
}