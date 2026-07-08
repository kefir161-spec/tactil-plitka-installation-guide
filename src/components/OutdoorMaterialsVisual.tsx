import { adhesives, primers } from '../data/instruction';
import { images } from '../data/assets';

const outdoorPrimer = primers.find((p) => p.id === 'homafloor-001');
const outdoorAdhesive = adhesives.find((a) => a.id === 'homaprof-797');

const items = [
  {
    src: images.outdoorTpu,
    alt: 'Тонкая жёлтая ТПУ-плитка для уличного монтажа',
    label: 'ТПУ-плитка',
    cover: true,
    objectPosition: 'center 58%',
  },
  {
    src: outdoorPrimer?.image ?? '',
    alt: outdoorPrimer?.name ?? 'Homafloor 001 2K E',
    label: 'Грунтовка',
    cover: false,
  },
  {
    src: outdoorAdhesive?.image ?? '',
    alt: outdoorAdhesive?.name ?? 'Homaprof 797 2K PU',
    label: '2K PU-клей',
    cover: false,
  },
];

export function OutdoorMaterialsVisual() {
  return (
    <div className="outdoor-materials-visual" aria-label="Материалы для уличного монтажа">
      {items.map((item) => (
        <figure key={item.label} className="outdoor-materials-visual__item">
          <div
            className={[
              'outdoor-materials-visual__frame',
              item.cover ? 'outdoor-materials-visual__frame--cover' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
            />
          </div>
          <figcaption>{item.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}
