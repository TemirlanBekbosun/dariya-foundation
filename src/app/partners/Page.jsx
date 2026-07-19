const partners = [
  { name: 'Городская епархия', logo: '/images/partner1.png', url: 'https://example.org' },
  { name: 'Детская клиника', logo: '/images/partner2.png', url: 'https://example.org' },
  { name: 'Медиа-группа «Свет»', logo: '/images/partner3.png', url: 'https://example.org' },
];

export default function PartnersPage() {
  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">Партнёры</span>
        <h1 className="h2">Вместе мы можем больше</h1>
        <div className="partners-grid partners-grid--page">
          {partners.map((p) => (
            <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="partner-card partner-card--large">
              <img src={p.logo} alt={p.name} />
              <span className="partner-card__name">{p.name}</span>
              <span className="partner-card__link">Перейти на сайт →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}