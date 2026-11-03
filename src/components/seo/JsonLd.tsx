import React from 'react';
import { siteConfig } from '@/lib/config';

interface ChurchJsonLdProps {
  name?: string;
  description?: string;
  url?: string;
  logo?: string;
  address?: string;
  phone?: string;
}

export function ChurchJsonLd({
  name = siteConfig.name,
  description = siteConfig.description,
  url = siteConfig.url,
  logo = `${siteConfig.url}/logo_ipb.png`,
  address = siteConfig.contact.address,
  phone = siteConfig.contact.phone,
}: ChurchJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Church',
    name,
    description,
    url,
    logo,
    image: logo,
    telephone: phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'EQ 304/307',
      addressLocality: 'Santa Maria',
      addressRegion: 'DF',
      addressCountry: 'BR',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '09:00',
        closes: '11:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '19:00',
        closes: '21:00',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  imageUrl,
  authorName = siteConfig.shortName,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  imageUrl?: string | null;
  authorName?: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    image: imageUrl ? [imageUrl] : undefined,
    author: {
      '@type': 'Organization',
      name: authorName,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo_ipb.png`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbsJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
