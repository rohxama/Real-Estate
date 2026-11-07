import type { ImageMetadata } from 'astro';

import westmereHouse from '@/assets/images/properties/westmere-house.jpg';
import exeterHouse from '@/assets/images/properties/exeter-house.jpg';
import alderHouse from '@/assets/images/properties/alder-house.jpg';
import marlowEstate from '@/assets/images/properties/marlow-estate.jpg';

export interface Property {
  name: string;
  price: string;
  image: ImageMetadata;
  alt: string;
}

/**
 * Featured listings. `Westmere House` and `Exeter House` (with their prices)
 * are legible in the reference; the remaining two are placeholder listings
 * documented in README.md because the capture crops them.
 */
export const featuredProperties: Property[] = [
  {
    name: 'Westmere House',
    price: '$1,500,000',
    image: westmereHouse,
    alt: 'White shingle-style house with a deep veranda and a broad green lawn under a clear sky.',
  },
  {
    name: 'Exeter House',
    price: '$1,200,000',
    image: exeterHouse,
    alt: 'Warm stone manor house with steep gables and a lit entrance at dusk.',
  },
  {
    name: 'Alder House',
    price: '$2,450,000',
    image: alderHouse,
    alt: 'Modern white villa with a glass facade and a still turquoise pool in the foreground.',
  },
  {
    name: 'Marlow Estate',
    price: '$1,850,000',
    image: marlowEstate,
    alt: 'Contemporary house in white render and warm timber, edged by clipped lawn and young trees.',
  },
];
