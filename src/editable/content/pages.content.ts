import { slot4BrandConfig } from '@/editable/theme/brand.config'

const brand = slot4BrandConfig.siteName

export const pagesContent = {
  home: {
    metadata: {
      title: 'Find & list trusted local businesses',
      description: `Discover verified businesses, services, and local spots on ${brand}. Browse by category, compare options, and connect directly — or list your own business in minutes.`,
      openGraphTitle: `${brand} — The local business directory`,
      openGraphDescription: 'Browse verified businesses and services, compare by category and location, and reach owners directly.',
      keywords: ['business directory', 'local business listings', 'find businesses', 'business services', 'company directory', 'list your business'],
    },
    hero: {
      badge: 'Trusted local business directory',
      title: ['Find trusted businesses,', 'services, and places near you.'],
      description: `Browse a clean, verified directory of local businesses and services. Search by category or location, compare options side by side, and connect with owners directly — all in one place.`,
      primaryCta: { label: 'Browse listings', href: '/listing' },
      secondaryCta: { label: 'List your business', href: '/create' },
      searchPlaceholder: 'Search businesses, services, or categories…',
      focusLabel: 'Browse',
      featureCardBadge: 'featured this week',
      featureCardTitle: 'Verified businesses and services, all in one trusted directory.',
      featureCardDescription: 'New and updated listings stay front and center so visitors always discover the most relevant local businesses first.',
    },
    intro: {
      badge: 'Why list with us',
      title: 'Built to help businesses get found and customers decide faster.',
      paragraphs: [
        'Every listing brings together the details that matter — location, contact, hours, services, and a clear description — so customers can evaluate a business at a glance.',
        'Instead of scattering information across the web, the directory keeps each business profile complete, consistent, and easy to act on.',
        'Whether someone is comparing service providers or looking for a nearby shop, they can move from discovery to contact without friction.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Category and location filters that make discovery effortless.',
        'Complete business profiles with contact, map, and service details.',
        'Direct call, email, and website actions on every listing.',
        'A fast, clean browsing experience built for decisions.',
      ],
      primaryLink: { label: 'Browse the directory', href: '/listing' },
      secondaryLink: { label: 'Add your business', href: '/create' },
    },
    cta: {
      badge: 'Grow your presence',
      title: 'Put your business in front of customers searching right now.',
      description: 'Create a complete, verified listing and let nearby customers find, compare, and contact you in just a few clicks.',
      primaryCta: { label: 'List your business', href: '/create' },
      secondaryCta: { label: 'Talk to our team', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest businesses added to the directory.',
    },
  },
  about: {
    badge: 'About the directory',
    title: 'A cleaner way to discover and list local businesses.',
    description: `${brand} is a listing-first directory built to make finding trusted businesses and getting your own business discovered simple, fast, and reliable.`,
    paragraphs: [
      'We bring local businesses and the people looking for them together on one organized, easy-to-browse platform — no clutter, no noise, just the details that help people decide.',
      'Every listing is structured the same way, so visitors always know where to find location, contact, hours, and services. Owners get a professional profile that works hard for them around the clock.',
      'From the corner shop to growing service providers, our goal is the same: make quality businesses easy to find, compare, and contact.',
    ],
    values: [
      {
        title: 'Discovery-first directory',
        description: 'Smart category and location filters surface the right businesses quickly, so customers find what they need without endless scrolling.',
      },
      {
        title: 'Complete, trustworthy listings',
        description: 'Each profile carries verified details — address, contact, map, hours, and services — so visitors can act with confidence.',
      },
      {
        title: 'Simple for business owners',
        description: 'List a business in minutes and keep it current. A clear, professional presence that brings in calls, visits, and enquiries.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${brand}`,
    title: 'Talk to the team behind the directory.',
    description: 'Listing a business, updating details, or exploring a partnership? Tell us what you need and we will route it to the right place — no generic support queue.',
    formTitle: 'Send us a message',
  },

  search: {
    metadata: {
      title: 'Search businesses & services',
      description: 'Search the directory for businesses, services, and categories across every location.',
    },
    hero: {
      badge: 'Search the directory',
      title: 'Find the right business, faster.',
      description: 'Search by name, service, category, or location to discover businesses from every part of the directory.',
      placeholder: 'Search by business name, service, category, or location',
    },
    resultsTitle: 'Latest businesses in the directory',
  },
  create: {
    metadata: {
      title: 'List your business',
      description: 'Add your business to the directory and start reaching nearby customers.',
    },
    locked: {
      badge: 'Owner access',
      title: 'Sign in to list your business.',
      description: 'Log in to open the listing workspace, where you can add your business details, contact info, location, and services.',
    },
    hero: {
      badge: 'Listing workspace',
      title: 'Add your business to the directory.',
      description: 'Fill in your business details — name, category, location, contact, and a clear description — to publish a complete, professional listing.',
    },
    formTitle: 'Business details',
    submitLabel: 'Publish listing',
    successTitle: 'Your listing has been submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: `Sign in to ${brand} to manage your business listings.`,
      badge: 'Owner access',
      title: 'Welcome back to your listing dashboard.',
      description: 'Sign in to manage your business profiles, update details, and add new listings to the directory.',
      formTitle: 'Sign in',
      submitLabel: 'Sign in',
      noAccount: 'No account matched these details. Create an account first, then sign in.',
      success: 'Signed in successfully. Redirecting…',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: `Create a ${brand} account to list your business.`,
      badge: 'Join the directory',
      title: 'Create your account and list your business.',
      description: 'Set up a free account to publish business listings, manage your details, and reach customers searching nearby.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting…',
      loginCta: 'Sign in',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Similar businesses',
      fallbackTitle: 'Business details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested businesses',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
