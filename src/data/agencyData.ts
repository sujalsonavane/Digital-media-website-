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
    inquiryEmail: 'inquiry@luminousdigital.studio',
    location: 'INDIA',
    timeWeather: 'IST (INDIA STANDARD TIME)',
    est: 'EST. 2026',
    legal: '© 2026 LUMINOUS DIGITAL STUDIO. ALL RIGHTS RESERVED.',
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
    title: 'Digital analytics',
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
    client: 'Aetheria Systems',
    year: '2026',
    conceptType: 'Interactive Concept Prototype',
    overview: 'A high-performance editorial flagship platform built with headless architecture, dynamic micro-interactions, and instant global cache invalidation.',
    challenge: 'Legacy CMS infrastructure resulted in 3.4s load times and disconnected content pipelines between editorial and commercial teams.',
    solution: 'Engineered an edge-rendered Next.js platform integrated with headless CMS and GSAP motion choreographies, achieving sub-second paint times.',
    results: ['0.4s Global LCP Speed', '+142% Editorial Velocity', '99.9% Core Web Vitals Score'],
    techStack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'GSAP ScrollTrigger', 'Edge Middleware'],
  },
  {
    id: 'proj-orbital',
    slug: 'orbital-mobile',
    title: 'Orbital Mobile',
    category: 'Web/App Development',
    discipline: 'Web/App Development',
    artType: 'app',
    stagger: true,
    client: 'Orbital Health',
    year: '2025',
    conceptType: 'Interactive Mobile Prototype',
    overview: 'A cross-platform biometric health tracking interface with fluid haptic touch cues and real-time medical telemetry synchronization.',
    challenge: 'Complex biometric data was difficult for patients to interpret on smaller mobile devices without cognitive overload.',
    solution: 'Crafted a zero-latency card system with tactile feedback and encrypted background WebSockets sync across iOS and Android.',
    results: ['4.9★ App Store Rating', '68% Increase in Daily Active Users', '0 Lag 60fps Telemetry'],
    techStack: ['React Native', 'Expo SDK', 'WebSockets', 'Swift Native Modules', 'Tailwind'],
  },
  {
    id: 'proj-lumina',
    slug: 'lumina-studios',
    title: 'Lumina Studios',
    category: 'Video Editing',
    discipline: 'Video Editing',
    artType: 'video',
    stagger: false,
    client: 'Lumina Media Group',
    year: '2025',
    conceptType: 'Cinematic Production Suite',
    overview: 'A commercial film production pipeline and 3D visual reel articulating premier brand narratives for global fashion and luxury labels.',
    challenge: 'Translating high-bitrate commercial masters to dynamic web playback without visible compression artifacts or streaming stalls.',
    solution: 'Custom adaptive HLS streaming engine with WebGL color grade emulation and sound-reactive micro-animations.',
    results: ['3.2M+ Organic Campaign Impressions', '92% Average Video Completion Rate', 'Awwwards Site of the Day Nominee'],
    techStack: ['DaVinci Resolve Studio', 'Blender 3D VFX', 'HLS.js', 'Web Audio API'],
  },
  {
    id: 'proj-synthesis',
    slug: 'synthesis-engine',
    title: 'Synthesis Engine',
    category: 'Digital Analytics',
    discipline: 'Digital Analytics',
    artType: 'analytics',
    stagger: true,
    client: 'Synthesis Cloud',
    year: '2024–2026',
    conceptType: 'Enterprise Telemetry Architecture',
    overview: 'Executive telemetry dashboard mapping real-time funnel drop-offs, user session replays, and attribution revenue modeling.',
    challenge: 'Marketing leaders had disparate analytics silos with 12-hour batch delays, making immediate campaign re-allocation impossible.',
    solution: 'Engineered an end-to-end streaming analytics interface capable of ingesting 50,000 events/second with sub-second dashboard refreshes.',
    results: ['99.98% Attribution Accuracy', '-40% Ad Spend Wastage', 'Real-Time Sub-Second Ingestion'],
    techStack: ['ClickHouse', 'Apache Kafka', 'Next.js', 'D3.js Charts', 'Server-Sent Events'],
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
