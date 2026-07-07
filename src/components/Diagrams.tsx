export function GShapeDiagram() {
  return (
    <svg className="diagram" viewBox="0 0 280 280" role="img" aria-label="Г-образная сухая раскладка и маяк">
      <rect x="20" y="20" width="60" height="60" fill="#9e1830" stroke="#1a1a1a" />
      <rect x="20" y="80" width="60" height="60" fill="#c41e3a" stroke="#1a1a1a" />
      <rect x="80" y="20" width="60" height="60" fill="#c41e3a" stroke="#1a1a1a" />
      <rect x="140" y="20" width="60" height="60" fill="#e8eaed" stroke="#1a1a1a" opacity="0.9" />
      <rect x="200" y="20" width="60" height="60" fill="#e8eaed" stroke="#1a1a1a" opacity="0.7" />
      <rect x="140" y="80" width="60" height="60" fill="#e8eaed" stroke="#1a1a1a" opacity="0.7" />
      <rect x="80" y="140" width="60" height="60" fill="#e8eaed" stroke="#1a1a1a" opacity="0.5" />
      <text x="50" y="55" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="700">
        маяк
      </text>
      <text x="140" y="250" textAnchor="middle" fontSize="12" fill="#4a4a4a">
        «Г»-образный старт + расширение «веером»
      </text>
      <path d="M 230 50 L 250 50 L 250 70" fill="none" stroke="#c41e3a" strokeWidth="2" markerEnd="url(#arrow)" />
    </svg>
  );
}

export function FanDiagram() {
  return (
    <svg className="diagram" viewBox="0 0 280 280" role="img" aria-label="Направление укладки веером">
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={30 + col * 55}
            y={30 + row * 55}
            width="50"
            height="50"
            fill={row + col <= 2 ? '#c41e3a' : '#e8eaed'}
            stroke="#1a1a1a"
            opacity={row + col <= 2 ? 1 : 0.6}
          />
        )),
      )}
      <path d="M 55 55 L 75 45 M 55 55 L 65 75" stroke="#fff" strokeWidth="2" />
      <text x="140" y="260" textAnchor="middle" fontSize="12" fill="#4a4a4a">
        Направление замков (стрелки) — в одну сторону
      </text>
    </svg>
  );
}

export function RollingDiagram() {
  return (
    <svg className="diagram" viewBox="0 0 300 120" role="img" aria-label="Прикатка тяжёлым валиком 50–75 кг">
      <rect x="20" y="70" width="260" height="30" fill="#b0b4bb" stroke="#1a1a1a" />
      <circle cx="80" cy="55" r="28" fill="#4a4a4a" stroke="#1a1a1a" strokeWidth="2" />
      <circle cx="80" cy="55" r="18" fill="#6b7280" />
      <rect x="108" y="45" width="120" height="12" fill="#374151" rx="2" />
      <text x="168" y="40" textAnchor="middle" fontSize="11" fill="#1a1a1a" fontWeight="600">
        50–75 кг
      </text>
      <path d="M 200 55 L 240 55" stroke="#c41e3a" strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="150" y="110" textAnchor="middle" fontSize="11" fill="#4a4a4a">
        Прикаточный валик
      </text>
    </svg>
  );
}

export function FlowDiagram({ steps }: { steps: readonly string[] }) {
  return (
    <div className="flow-diagram">
      {steps.map((step, i) => (
        <div key={step} className="flow-diagram__item">
          <span className="flow-diagram__step">{step}</span>
          {i < steps.length - 1 && <span className="flow-diagram__arrow" aria-hidden="true">→</span>}
        </div>
      ))}
    </div>
  );
}

export function TempScale() {
  return (
    <div className="temp-scale" role="img" aria-label="Температурный диапазон от -15 до +50 °C">
      <div className="temp-scale__bar">
        <span className="temp-scale__cold">−15 °C</span>
        <span className="temp-scale__ok">рабочий диапазон</span>
        <span className="temp-scale__hot">+50 °C</span>
      </div>
      <p className="temp-scale__note">Температурный диапазон от −15 до +50 °C</p>
    </div>
  );
}
