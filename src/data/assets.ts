import { assetUrl } from '../utils/assetUrl';

const local = (name: string) => assetUrl(`images/local/${name}`);

export const images = {
  logo: assetUrl('images/plastfactor/logo.png'),
  cover: local('cover-tactile.png'),
  tactileTile: assetUrl('images/products/tactile-tile-konus-v-ryad.png'),
  outdoorTpu: local('outdoor-tpu-installation.png'),
  prepCleaning: local('step-cleaning.png'),
  prepDegrease: local('step-degrease.png'),
  prepPriming: local('step-priming.png'),
  prepTape: local('step-tape-marking.png'),
  installMixing: local('step-mixing-adhesive.png'),
  installDegreaseBack: local('step-degrease.png'),
  installAdhesive: local('step-adhesive-apply.png'),
  installLaying: local('step-laying.png'),
  installWeight: local('step-weight-pressing.png'),
  outdoorSurfacePriming: local('outdoor-surface-priming.png'),
  outdoorAdhesiveLaying: local('outdoor-adhesive-laying.png'),
  outdoorWeightPressing: local('outdoor-weight-pressing.png'),
} as const;

export type OutdoorStepVisual =
  | { type: 'materials' }
  | { type: 'image'; src: string; alt: string; objectPosition?: string }
  | { type: 'pressing'; src: string; alt: string; objectPosition?: string };

export const outdoorStepVisuals: Record<number, OutdoorStepVisual> = {
  1: { type: 'materials' },
  2: {
    type: 'image',
    src: images.outdoorSurfacePriming,
    alt: 'Грунтование уличного основания валиком перед укладкой ТПУ-плитки',
    objectPosition: 'center 45%',
  },
  3: {
    type: 'image',
    src: images.outdoorAdhesiveLaying,
    alt: 'Нанесение PU-клея шпателем A2 и укладка тонкой ТПУ-плитки 12 мм у входа в магазин',
    objectPosition: 'center 42%',
  },
  4: {
    type: 'pressing',
    src: images.outdoorWeightPressing,
    alt: 'Прижим уличной тактильной плитки грузом под плёнкой',
    objectPosition: 'center 40%',
  },
};

export const contacts = {
  site: 'https://plastfactor.com/',
  phone: '8 (800) 775-84-09',
  address: 'с. Крым, ул. 5-я Линия, 1',
  hours: 'Режим работы: 8:00–17:00, сб, вс — выходные',
  electronicGuide: 'https://kefir161-spec.github.io/tactil-plitka-installation-guide/',
} as const;
