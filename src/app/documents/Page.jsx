const documents = [
  { title: 'Свидетельство о регистрации', file: '/docs/registr.pdf' },
  { title: 'Устав фонда', file: '/docs/ustav.pdf' },
  { title: 'ИНН / ОГРН', file: '/docs/inn.pdf' },
  { title: 'Финансовый отчёт 2025', file: '/docs/fin2025.pdf' },
  { title: 'Отчёт о деятельности', file: '/docs/activity2025.pdf' },
  { title: 'Политика конфиденциальности', file: '/docs/privacy.pdf' },
];

export default function DocumentsPage() {
  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">Документы</span>
        <h1 className="h2">Официальные документы фонда</h1>
        <div className="docs-grid">
          {documents.map((d) => (
            <a key={d.title} href={d.file} className="doc-card" target="_blank" rel="noopener noreferrer">
              <span className="doc-card__icon">📄</span>
              <div>
                <strong>{d.title}</strong>
                <small>PDF</small>
              </div>
              <span className="doc-card__arrow">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}