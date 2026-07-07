import { intro } from '../data/instruction';
import { InfoCard } from './InfoCard';
import { FlowStepper } from './FlowStepper';
import { MaterialCompareTable } from './MaterialCompareTable';

export function IntroSection() {
  return (
    <div className="intro">
      <p className="intro__summary">{intro.summary}</p>

      <div className="intro__meta">
        <span className="intro__meta-label">Для кого</span>
        <ul className="intro__audience">
          {intro.audience.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="intro__panel intro__panel--flow">
        <h3 className="intro__panel-title">{intro.flowTitle}</h3>
        <FlowStepper steps={intro.flowSteps} />
      </div>

      <div className="intro__bottom">
        <div className="intro__thickness">
          <h3 className="intro__thickness-title">{intro.materialGuide.title}</h3>
          <MaterialCompareTable
            headers={intro.materialGuide.headers}
            rows={intro.materialGuide.rows}
          />
        </div>

        <aside className="intro__panel intro__panel--specs">
          <h3 className="intro__panel-title">{intro.specsTitle}</h3>
          <div className="intro__specs">
            {intro.keyParams.map((param) => (
              <InfoCard key={param.label} label={param.label} value={param.value} highlight />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
