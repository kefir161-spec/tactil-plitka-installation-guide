import './components.css';
import { Cover } from './components/Cover';
import { PrintSheet } from './components/PrintSheet';
import { Section } from './components/Section';
import { IntroSection } from './components/IntroSection';
import { SpecTable } from './components/SpecTable';
import { FloorRequirementsTable } from './components/FloorRequirementsTable';
import { PrepStepsGrid } from './components/PrepStepsGrid';
import { installStepsToCards, StepCardsGrid } from './components/StepCardsGrid';
import { ProductsCatalog } from './components/ProductsGrid';
import { ImageBlock } from './components/ImageBlock';
import { TileVisual } from './components/TileVisual';
import { PpeGrid } from './components/PpeGrid';
import { ContactsSection } from './components/ContactsSection';
import {
  finalChecklist,
  floorRequirements,
  installSteps,
  outdoor,
  primers,
  adhesives,
  prepSteps,
  productNote,
  productsIntro,
  safety,
  sections,
  specs,
  specsHeaders,
  tileVisual,
} from './data/instruction';
import { images } from './data/assets';

const prepImages: Record<number, string> = {
  1: images.prepCleaning,
  2: images.prepDegrease,
  3: images.prepPriming,
  4: images.prepTape,
};

const installVisuals: Record<number, string> = {
  1: images.installMixing,
  2: images.installDegreaseBack,
  3: images.installAdhesive,
  4: images.installLaying,
  5: images.installWeight,
};

const installImagePositions: Record<number, string> = {
  2: 'center 60%',
  4: 'center 75%',
};

export default function App() {
  return (
    <div className="app">
      <PrintSheet className="print-sheet--1">
        <Cover />
        <Section
          id="intro"
          number={sections.intro.number}
          title={sections.intro.title}
          className="section--intro"
        >
          <IntroSection />
        </Section>
      </PrintSheet>

      <PrintSheet className="print-sheet--2">
        <Section
          id="materials"
          number={sections.materials.number}
          title={sections.materials.title}
          lead={productNote}
        >
          <div className="grid grid--2 specs-layout">
            <SpecTable
              headers={specsHeaders}
              rows={specs}
              highlightParams={['ГОСТ', 'ПВХ', 'ТПУ', 'TKB', 'RAL', 'Прижим']}
            />
            <div className="diagram-wrap card specs-visual">
              <TileVisual src={images.tactileTile} alt={tileVisual.alt} />
            </div>
          </div>
        </Section>

        <Section
          id="floor-req"
          number={sections.floorReq.number}
          title={sections.floorReq.title}
          muted
        >
          <FloorRequirementsTable rows={floorRequirements} />
        </Section>
      </PrintSheet>

      <PrintSheet className="print-sheet--3">
        <Section id="prep" number={sections.prep.number} title={sections.prep.title}>
          <PrepStepsGrid steps={prepSteps} images={prepImages} />
        </Section>
      </PrintSheet>

      <PrintSheet className="print-sheet--4">
        <Section
          id="products"
          number={sections.products.number}
          title={sections.products.title}
          lead={productsIntro}
          muted
        >
          <ProductsCatalog
            groups={[
              { title: 'Грунтовки', items: primers },
              { title: 'Клеи', items: adhesives },
            ]}
          />
        </Section>
      </PrintSheet>

      <PrintSheet className="print-sheet--5">
        <Section id="install" number={sections.install.number} title={sections.install.title}>
          <StepCardsGrid
            items={installStepsToCards(installSteps)}
            visuals={installVisuals}
            imagePositions={installImagePositions}
          />
        </Section>
      </PrintSheet>

      <PrintSheet className="print-sheet--6">
        <Section
          id="outdoor"
          number={sections.outdoor.number}
          title={sections.outdoor.title}
          lead={outdoor.intro}
        >
          <div className="grid grid--2 outdoor-layout">
            <div>
              <p>{outdoor.materialNote}</p>
              <p>{outdoor.processNote}</p>
              <div className="grid grid--2 outdoor-timings">
                {outdoor.timings.map((item) => (
                  <article key={item.label} className="card">
                    <h3>{item.label}</h3>
                    <p>{item.value}</p>
                  </article>
                ))}
              </div>
            </div>
            <ImageBlock src={images.outdoorTpu} alt="Уличный монтаж тактильной плитки ТПУ" />
          </div>
        </Section>

        <Section
          id="safety"
          number={sections.safety.number}
          title={sections.safety.title}
          muted
        >
          <h3>{safety.conditionsTitle}</h3>
          <ul>
            {safety.conditions.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <h3>{safety.ppeTitle}</h3>
          <PpeGrid items={safety.ppe} />
        </Section>
      </PrintSheet>

      <PrintSheet className="print-sheet--7">
        <Section id="contacts" title={sections.contacts.title}>
          <ContactsSection checklist={finalChecklist} />
        </Section>
      </PrintSheet>
    </div>
  );
}
