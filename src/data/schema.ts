import { faqs } from '@/data/faqs';
import { site } from '@/data/site';

/**
 * Structured data for the home page only. It mirrors visible content:
 * the studio's contact details, the collection focus and the FAQ copy.
 */
export function buildStructuredData(siteUrl: string, imageUrl: string) {
  const organizationId = `${siteUrl}#organization`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'RealEstateAgent',
        '@id': organizationId,
        name: site.name,
        url: siteUrl,
        image: imageUrl,
        description: site.description,
        telephone: '+1-212-555-0148',
        email: 'hello@estatia.com',
        priceRange: '$$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '24 West 57th Street',
          addressLocality: 'New York',
          addressRegion: 'NY',
          addressCountry: 'US',
        },
        areaServed: { '@type': 'City', name: 'New York' },
        knowsAbout: [
          'Luxury real estate',
          'Waterfront estates',
          'Architectural homes',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}#website`,
        url: siteUrl,
        name: site.name,
        description: site.description,
        inLanguage: site.locale,
        publisher: { '@id': organizationId },
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}#faq`,
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };
}
