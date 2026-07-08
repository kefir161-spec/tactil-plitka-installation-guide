import type { OutdoorStepTiming } from '../data/instruction';

interface OutdoorCuringTimelineProps {
  steps: readonly OutdoorStepTiming[];
}

export function OutdoorCuringTimeline({ steps }: OutdoorCuringTimelineProps) {
  return (
    <div className="outdoor-curing-timeline" aria-label="Сроки прижима и высыхания">
      <div className="outdoor-curing-timeline__node outdoor-curing-timeline__node--start">
        <span className="outdoor-curing-timeline__value">Укладка</span>
      </div>
      {steps.map((item) => (
        <div key={item.label} className="outdoor-curing-timeline__segment">
          <span className="outdoor-curing-timeline__arrow" aria-hidden="true">
            →
          </span>
          <div className="outdoor-curing-timeline__node">
            <span className="outdoor-curing-timeline__value">{item.value}</span>
            <span className="outdoor-curing-timeline__label">{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
