import type { OutdoorDifference, OutdoorInstallStep } from '../data/instruction';
import { outdoorStepVisuals } from '../data/assets';
import { ImageBlock } from './ImageBlock';
import { TrowelA2Ref } from './TrowelA2Ref';
import { OutdoorMaterialsVisual } from './OutdoorMaterialsVisual';
import { OutdoorCuringTimeline } from './OutdoorCuringTimeline';

interface OutdoorInstallationGuideProps {
  differences: readonly OutdoorDifference[];
  steps: readonly OutdoorInstallStep[];
}

function OutdoorDifferenceCard({ item }: { item: OutdoorDifference }) {
  const hasTimings = 'items' in item && item.items;

  return (
    <article className="outdoor-difference">
      <span className="outdoor-difference__label">{item.label}</span>
      {hasTimings ? (
        <div className="outdoor-difference__timings">
          {item.items.map((timing) => (
            <div key={timing.label} className="outdoor-difference__timing">
              <span className="outdoor-difference__value">{timing.value}</span>
              <span className="outdoor-difference__timing-label">{timing.label}</span>
            </div>
          ))}
        </div>
      ) : (
        <>
          <span className="outdoor-difference__value">{item.value}</span>
          {item.note && <p className="outdoor-difference__note">{item.note}</p>}
        </>
      )}
    </article>
  );
}

function OutdoorStepVisual({ step }: { step: OutdoorInstallStep }) {
  const visual = outdoorStepVisuals[step.step];

  if (!visual) return null;

  if (visual.type === 'materials') {
    return (
      <div className="outdoor-step-card__visual outdoor-step-card__visual--materials">
        <OutdoorMaterialsVisual />
      </div>
    );
  }

  if (visual.type === 'pressing') {
    return (
      <div className="outdoor-step-card__visual outdoor-step-card__visual--pressing">
        <ImageBlock
          src={visual.src}
          alt={visual.alt}
          className="outdoor-step-card__image"
          objectPosition={visual.objectPosition}
        />
        {step.timings && (
          <OutdoorCuringTimeline steps={step.timings} />
        )}
      </div>
    );
  }

  return (
    <ImageBlock
      src={visual.src}
      alt={visual.alt}
      className="outdoor-step-card__image"
      objectPosition={visual.objectPosition}
    />
  );
}

export function OutdoorInstallationGuide({ differences, steps }: OutdoorInstallationGuideProps) {
  return (
    <div className="outdoor-guide">
      <div className="outdoor-differences" role="list" aria-label="Главные отличия от монтажа в помещении">
        {differences.map((item) => (
          <OutdoorDifferenceCard key={item.id} item={item} />
        ))}
      </div>

      <div className="grid grid--2 outdoor-steps">
        {steps.map((step) => (
          <article key={step.step} className="card outdoor-step-card">
            <span className="badge badge--primary">Этап {step.step}</span>
            <h3 className="outdoor-step-card__title">{step.title}</h3>
            <p className="outdoor-step-card__text">{step.text}</p>
            {step.reference && (
              <p className="outdoor-step-card__ref">{step.reference}</p>
            )}
            {step.showTrowelA2 && <TrowelA2Ref />}
            <OutdoorStepVisual step={step} />
          </article>
        ))}
      </div>
    </div>
  );
}
