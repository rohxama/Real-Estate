import type { ImageMetadata } from 'astro';

import residentialDesigns from '@/assets/images/services/residential-designs.jpg';
import commercialInteriors from '@/assets/images/services/commercial-interiors.jpg';
import hospitalitySpaces from '@/assets/images/services/hospitality-spaces.jpg';
import retailEnvironments from '@/assets/images/services/retail-environments.jpg';

export interface Service {
  index: string;
  title: string;
  description: string;
  image: ImageMetadata;
  alt: string;
}

/**
 * Row titles come from the reference. Descriptions and the three additional
 * expanded-state photographs are placeholders noted in README.md.
 */
export const services: Service[] = [
  {
    index: '01',
    title: 'Residential Designs',
    description:
      'Bespoke residences shaped around the way you live — from the first sketch to the final material detail, composed with light, proportion and quiet permanence.',
    image: residentialDesigns,
    alt: 'Warm living room with a gallery wall, natural timber and soft afternoon light.',
  },
  {
    index: '02',
    title: 'Commercial Interiors',
    description:
      'Workplaces and commercial spaces carrying the same warmth and clarity as our homes, balancing focus, flexibility and a strong sense of identity.',
    image: commercialInteriors,
    alt: 'Open-plan interior with a pale sofa, timber wall and full-height garden glazing.',
  },
  {
    index: '03',
    title: 'Hospitality Spaces',
    description:
      'Hotels, restaurants and private clubs designed to feel generous yet quietly familiar, with rooms that unfold at an unhurried pace.',
    image: hospitalitySpaces,
    alt: 'Dining room with a dark table, sculptural chairs and a pale stone staircase.',
  },
  {
    index: '04',
    title: 'Retail Environments',
    description:
      'Immersive retail settings that give products room to breathe, using tactile materials and considered light to lend a brand lasting presence.',
    image: retailEnvironments,
    alt: 'Concrete retail interior with track lighting, timber joinery and a polished floor.',
  },
];
