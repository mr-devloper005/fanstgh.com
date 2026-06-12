import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Local business directory',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Local business directory',
    primaryLinks: [
      { label: 'Listings', href: '/listing' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Browse listings', href: '/listing' },
      secondary: { label: 'List your business', href: '/create' },
    },
  },
  footer: {
    tagline: 'Find and list trusted local businesses',
    description: `${slot4BrandConfig.siteName} is a listing-first directory that helps customers discover trusted local businesses and helps owners get found, compared, and contacted.`,
    columns: [
      {
        title: 'Directory',
        links: [
          { label: 'Browse listings', href: '/listing' },
          { label: 'Search', href: '/search' },
          { label: 'List your business', href: '/create' },
        ],
      },
      {
        title: 'Site',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Built for clean discovery and trusted local listings.',
  },
  commonLabels: {
    readMore: 'View listing',
    viewAll: 'View all',
    explore: 'Browse',
    latest: 'Latest',
    related: 'Similar',
    published: 'Listed',
  },
} as const
