import type { ImageMetadata } from 'astro';

import marbleHouse from '@/assets/images/collection/marble-house.jpg';
import waterfrontEstate from '@/assets/images/collection/waterfront-estate.jpg';
import royalVilla from '@/assets/images/collection/royal-villa.jpg';
import casaBelle from '@/assets/images/collection/casa-belle.jpg';
import lakeviewManor from '@/assets/images/collection/lakeview-manor.jpg';
import seasideVilla from '@/assets/images/collection/seaside-villa.jpg';
import villaSerenity from '@/assets/images/collection/villa-serenity.jpg';
import ivyCourt from '@/assets/images/collection/ivy-court.jpg';

export interface CollectionItem {
  name: string;
  location: string;
  area: string;
  beds: string;
  baths: string;
  image: ImageMetadata;
  alt: string;
}

/**
 * Collection names are legible in the reference. Locations and specifications
 * are placeholders, recorded in README.md, because the capture cannot resolve
 * that metadata.
 */
export const collectionItems: CollectionItem[] = [
  {
    name: 'Marble House',
    location: 'New York, USA',
    area: '5,000',
    beds: '5',
    baths: '4',
    image: marbleHouse,
    alt: 'Modern villa with a projecting timber canopy above a mirrored lap pool.',
  },
  {
    name: 'The Waterfront Estate',
    location: 'Miami, USA',
    area: '7,200',
    beds: '6',
    baths: '5',
    image: waterfrontEstate,
    alt: 'White modernist villa with deep terraces and a long turquoise pool.',
  },
  {
    name: 'The Royal Villa',
    location: 'Lake Como, Italy',
    area: '6,400',
    beds: '5',
    baths: '4',
    image: royalVilla,
    alt: 'Craftsman-style villa with a dark roof and warm porch lights at sunset.',
  },
  {
    name: 'Casa Belle',
    location: 'Saint-Tropez, France',
    area: '4,800',
    beds: '4',
    baths: '4',
    image: casaBelle,
    alt: 'White veranda house with palms and a pool glowing in the afternoon light.',
  },
  {
    name: 'Lakeview Manor',
    location: 'Aspen, USA',
    area: '8,100',
    beds: '7',
    baths: '6',
    image: lakeviewManor,
    alt: 'Single-storey glass pavilion opening onto a terrace and a still pool.',
  },
  {
    name: 'Seaside Villa',
    location: 'Malibu, USA',
    area: '4,200',
    beds: '4',
    baths: '3',
    image: seasideVilla,
    alt: 'Dark timber and glass house sheltering a courtyard beneath a mature tree.',
  },
  {
    name: 'Villa Serenity',
    location: 'Santorini, Greece',
    area: '3,600',
    beds: '3',
    baths: '3',
    image: villaSerenity,
    alt: 'Warm timber courtyard screened by a pale perforated wall.',
  },
  {
    name: 'Ivy Court',
    location: 'London, UK',
    area: '5,400',
    beds: '5',
    baths: '4',
    image: ivyCourt,
    alt: 'Dark contemporary townhouse facade with warm interior light at dusk.',
  },
];
