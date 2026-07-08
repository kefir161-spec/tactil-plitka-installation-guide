import { adhesives, primers } from '../data/instruction';
import { images } from '../data/assets';

const outdoorPrimer = primers.find((p) => p.id === 'homafloor-001');
const outdoorAdhesive = adhesives.find((a) => a.id === 'homaprof-797');

const items = [
  {
    src: images.tactileTile,
    alt: 'Тактильная плитка из ТПУ для уличного монтажа',
    label: 'ТПУ-плитка',
  },
  {
    src: outdoorPrimer?.image ?? '',
    alt: outdoorPrimer?.name ?? 'Homafloor 001 2K E',
    label: 'Грунтовка',
  },
  {
    src: outdoorAdhesive?.image ?? '',
    alt: outdoorAdhesive?.name ?? 'Homaprof 797 2K PU',
    label: '2K PU-клей',
  },
];

export function OutdoorMaterialsVisual() {
  return (
    <div className="outdoor-materials-visual" aria-label="Материалы для уличного монтажа">
      {items.map((item) => (
        <figure key={item.label} className="outdoor-materials-visual__item">
          <div className="outdoor-materials-visual__frame">
            <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
          </div>
          <figcaption>{item.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}
