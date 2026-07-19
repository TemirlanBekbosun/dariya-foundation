const reports = [
  { year: 2025, title: 'Годовой отчёт 2025', file: '/reports/2025.pdf' },
  { year: 2024, title: 'Годовой отчёт 2024', file: '/reports/2024.pdf' },
  { year: 2023, title: 'Финансовый отчёт 2023', file: '/reports/2023-fin.pdf' },
];

export default function ReportsPage() {
  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">Отчёты</span>
        <h1 className="h2">Финансовая прозрачность</h1>
        <div className="reports-grid">
          {reports.map((r) => (
            <a key={r.year} href={r.file} className="report-card" target="_blank" rel="noopener noreferrer">
              <span className="report-card__year">{r.year}</span>
              <span>{r.title}</span>
              <span className="report-card__icon">PDF</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}