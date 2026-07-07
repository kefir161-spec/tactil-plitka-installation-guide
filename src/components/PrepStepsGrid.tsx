import type { PrepStep } from '../data/instruction';
import { prepStepsToCards, StepCardsGrid } from './StepCardsGrid';

interface PrepStepsGridProps {
  steps: PrepStep[];
  images?: Record<number, string>;
}

export function PrepStepsGrid({ steps, images = {} }: PrepStepsGridProps) {
  return (
    <StepCardsGrid
      items={prepStepsToCards(steps)}
      visuals={images}
      imagePositions={{ 1: 'center 78%', 2: 'center 28%' }}
    />
  );
}
