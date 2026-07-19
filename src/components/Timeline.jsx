export default function Timeline({ events }) {
  return (
    <div className="timeline">
      {events.map((evt, i) => (
        <div key={i} className="timeline-item">
          <div className="timeline-marker" />
          <div className="timeline-content">
            <time>{evt.date}</time>
            <h4>{evt.title}</h4>
            <p>{evt.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}