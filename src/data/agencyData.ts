import { ServiceItem, ProjectItem, ArchiveItem, SocialLink, ServiceCategory } from '@/types/agency';

export const agencyConfig = {
  name: 'Luminous Digital Studio',
  brandmark: 'luminous.',
  headline: {
    line1: 'WE BUILD',
    line2: 'WEBSITES PEOPLE',
    line3: 'REMEMBER.',
  },
  kicker:
    'Luminous is a creative digital studio in India. We design and build premium websites and digital products for founders and product teams who need to stand out.',
  philosophy: {
    badge: 'Agency Positioning & Standard',
    headline: 'We design and build websites, apps, and digital media that',
    highlight: 'work as hard as they look.',
    subtext:
      "Whether you're launching a breakout brand, scaling an existing application, or producing high-impact cinematic content, our multidisciplinary team drives every engagement from raw concept to high-velocity live execution.",
  },
  contact: {
    email: 'hello@luminousdigital.studio',
    phone: '+1 (212) 555-0199',
    location: 'INDIA',
    timeWeather: 'IST (INDIA STANDARD TIME)',
    est: 'EST. 2026',
    legal: '© 2026 LUMINOUS DIGITAL STUDIO LLC. ALL RIGHTS RESERVED.',
    footerTagline:
      'Full-service digital media production studio. Engineering websites, applications, cinematic video, and analytics that build enduring brand value.',
  },
};

export const serviceCategories: ServiceCategory[] = [
  'Web Development',
  'Web/App Development',
  'Video Editing',
  'Digital Analytics',
];

export const servicesData: ServiceItem[] = [
  {
    id: 'service-web',
    index: '01',
    title: 'Web development',
    category: 'Web Development',
    description:
      'Bespoke digital platforms, high-performance marketing websites, and headless e-commerce architectures engineered to elevate brand perception and convert visitors into long-term clients.',
    capabilities: [
      'Custom React & Next.js Builds',
      'Headless CMS & E-Commerce',
      'Interactive WebGL & GSAP Motion',
      'UI/UX Design & Rapid Prototyping',
      'Core Web Vitals & SEO Optimization',
    ],
    bgColor: '#ffffff',
    rotationDeg: -1.5,
  },
  {
    id: 'service-webapp',
    index: '02',
    title: 'Web/app development',
    category: 'Web/App Development',
    description:
      'Fluid native applications for iOS and Android alongside responsive web apps built for seamless user journeys, resilient performance, and intuitive touch interactions.',
    capabilities: [
      'iOS & Android Native Mobile Apps',
      'Cross-Platform React Native',
      'Progressive Web Applications (PWA)',
      'Real-Time Cloud APIs & Database Systems',
      'Haptic & Touch Interaction Systems',
    ],
    bgColor: '#f7f8fa',
    rotationDeg: 0,
  },
  {
    id: 'service-video',
    index: '03',
    title: 'Video editing',
    category: 'Video Editing',
    description:
      'Cinematic promotional films, high-impact motion graphics, and social video suites crafted to articulate your brand story and captivate target audiences across every digital channel.',
    capabilities: [
      'Commercial & Brand Films',
      'Motion Design & 3D VFX Animation',
      'High-Impact Social Video Suites',
      'Color Grading & Audio Mastering',
      'Creative Direction & Storyboarding',
    ],
    bgColor: '#f0f2f5',
    rotationDeg: 1.2,
  },
  {
    id: 'service-analytics',
    index: '04',
    title: 'Data analyst',
    category: 'Digital Analytics',
    description:
      'Comprehensive user telemetry, conversion funnel optimization, and executive performance dashboards delivering actionable intelligence to maximize marketing return.',
    capabilities: [
      'End-to-End User Telemetry Tracking',
      'Conversion Funnel & Drop-Off Optimization',
      'Real-Time Executive KPI Dashboards',
      'Attribution Modeling & Ad Spend ROI',
      'A/B Testing & Data Experiments',
    ],
    bgColor: '#e8ebef',
    rotationDeg: -0.8,
  },
];

export const projectsData: ProjectItem[] = [
  {
    id: 'proj-aetheria',
    slug: 'aetheria-flagship',
    title: 'Aetheria Flagship',
    category: 'Web Development',
    discipline: 'Web Development',
    artType: 'web',
    stagger: false,
  },
  {
    id: 'proj-orbital',
    slug: 'orbital-mobile',
    title: 'Orbital Mobile',
    category: 'Web/App Development',
    discipline: 'Web/App Development',
    artType: 'app',
    stagger: true,
  },
  {
    id: 'proj-lumina',
    slug: 'lumina-studios',
    title: 'Lumina Studios',
    category: 'Video Editing',
    discipline: 'Video Editing',
    artType: 'video',
    stagger: false,
  },
  {
    id: 'proj-synthesis',
    slug: 'synthesis-engine',
    title: 'Synthesis Engine',
    category: 'Digital Analytics',
    discipline: 'Digital Analytics',
    artType: 'analytics',
    stagger: true,
  },
];

export const archiveData: ArchiveItem[] = [
  {
    id: 'arch-1',
    year: '2026',
    name: 'Kinetic Systems',
    category: 'Web Development',
    role: 'Platform Architecture',
  },
  {
    id: 'arch-2',
    year: '2025',
    name: 'Prism Care',
    category: 'Web/App Development',
    role: 'Patient Portal & App',
  },
  {
    id: 'arch-3',
    year: '2025',
    name: 'Chrono Luxe',
    category: 'Video Editing',
    role: 'Cinematic Campaign',
  },
  {
    id: 'arch-4',
    year: '2024',
    name: 'Vector Enterprise',
    category: 'Digital Analytics',
    role: 'Telemetry Pipeline',
  },
  {
    id: 'arch-5',
    year: '2024',
    name: 'Echo Journal',
    category: 'Web Development',
    role: 'Editorial Media CMS',
  },
];

export const navLinks: SocialLink[] = [
  { name: 'Home', url: '#' },
  { name: 'About', url: '#about' },
  { name: 'Projects', url: '#projects' },
  { name: 'Services', url: '#services' },
  { name: 'Live Clients', url: '#clients' },
  { name: 'Contact', url: '#cta' },
];

export const socialLinks: SocialLink[] = [
  { name: 'LinkedIn ↗', url: 'https://linkedin.com', external: true },
  { name: 'GitHub ↗', url: 'https://github.com', external: true },
  { name: 'X (Twitter) ↗', url: 'https://x.com', external: true },
  { name: 'Awwwards ↗', url: 'https://awwwards.com', external: true },
];
