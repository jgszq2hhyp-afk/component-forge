export interface ComponentMeta {
  name: string;
  description: string;
  category: string;
  tags: string[];
  bestFor: string[];
  version: string;
  score: number | null;
  status: 'not-started' | 'in-progress' | 'production' | 'award-worthy' | 'needs-improvement';
  csvRefs: Record<string, number[]>;
}

export const registry: Record<string, ComponentMeta> = {
  // -------------------------------------------------------------------------
  // Features
  // -------------------------------------------------------------------------
  'feature-bento-grid': {
    name: 'feature-bento-grid',
    description: 'Asymmetric bento grid layout for features with optional images and icons',
    category: 'features',
    tags: ['bento', 'grid', 'asymmetric', 'features', 'cards'],
    bestFor: ['SaaS feature overview', 'product highlights', 'capabilities showcase'],
    version: '1.0.0',
    score: null,
    status: 'production',
    csvRefs: {},
  },
  'feature-alternating-rows': {
    name: 'feature-alternating-rows',
    description: 'Image and text in alternating left-right rows with optional bullet lists',
    category: 'features',
    tags: ['alternating', 'zigzag', 'image-text', 'rows'],
    bestFor: ['detailed feature explanations', 'product walkthroughs', 'service descriptions'],
    version: '1.0.0',
    score: null,
    status: 'production',
    csvRefs: {},
  },
  'feature-cards-grid': {
    name: 'feature-cards-grid',
    description: 'Clean 2-4 column card grid with icons, descriptions, and optional links',
    category: 'features',
    tags: ['cards', 'grid', 'icons', 'services'],
    bestFor: ['services overview', 'feature list', 'benefits grid'],
    version: '1.0.0',
    score: null,
    status: 'production',
    csvRefs: {},
  },
  'feature-icon-list': {
    name: 'feature-icon-list',
    description: 'Vertical or horizontal list of features with icons and descriptions',
    category: 'features',
    tags: ['list', 'icons', 'features', 'vertical', 'horizontal'],
    bestFor: ['simple feature lists', 'benefits overview', 'quick scan content'],
    version: '1.0.0',
    score: null,
    status: 'production',
    csvRefs: {},
  },
  'feature-tabs': {
    name: 'feature-tabs',
    description: 'Tabbed interface showcasing features with text, images, and bullet points',
    category: 'features',
    tags: ['tabs', 'interactive', 'features', 'showcase'],
    bestFor: ['complex product features', 'multi-category services', 'detailed comparisons'],
    version: '1.0.0',
    score: null,
    status: 'production',
    csvRefs: {},
  },
  'feature-timeline': {
    name: 'feature-timeline',
    description: 'Vertical timeline with alternating content blocks and animated line',
    category: 'features',
    tags: ['timeline', 'process', 'steps', 'vertical'],
    bestFor: ['process steps', 'how it works', 'project timeline', 'history'],
    version: '1.0.0',
    score: null,
    status: 'production',
    csvRefs: {},
  },
  'feature-comparison': {
    name: 'feature-comparison',
    description: 'Two-column comparison table with check/x icons and text values',
    category: 'features',
    tags: ['comparison', 'table', 'versus', 'competitor'],
    bestFor: ['competitor comparison', 'plan comparison', 'before/after'],
    version: '1.0.0',
    score: null,
    status: 'production',
    csvRefs: {},
  },
  'feature-accordion': {
    name: 'feature-accordion',
    description: 'Expandable accordion sections with icons and smooth open/close animation',
    category: 'features',
    tags: ['accordion', 'expandable', 'faq', 'collapsible'],
    bestFor: ['FAQ sections', 'detailed feature explanations', 'service details'],
    version: '1.0.0',
    score: null,
    status: 'production',
    csvRefs: {},
  },

  // -------------------------------------------------------------------------
  // Testimonials
  // -------------------------------------------------------------------------
  'testimonial-carousel': {
    name: 'testimonial-carousel',
    description: 'Sliding testimonial carousel with navigation dots, arrows, and optional autoplay',
    category: 'testimonials',
    tags: ['carousel', 'slider', 'testimonials', 'reviews'],
    bestFor: ['hero testimonials', 'single featured review', 'rotating quotes'],
    version: '1.0.0',
    score: null,
    status: 'production',
    csvRefs: {},
  },
  'testimonial-grid': {
    name: 'testimonial-grid',
    description: 'Masonry-style grid of testimonial cards with optional featured highlight',
    category: 'testimonials',
    tags: ['grid', 'masonry', 'testimonials', 'cards'],
    bestFor: ['social proof wall', 'multiple reviews', 'trust building'],
    version: '1.0.0',
    score: null,
    status: 'production',
    csvRefs: {},
  },
  'testimonial-single-large': {
    name: 'testimonial-single-large',
    description: 'Single large testimonial with optional side image and company logo',
    category: 'testimonials',
    tags: ['single', 'large', 'featured', 'hero-testimonial'],
    bestFor: ['hero section testimonial', 'key client quote', 'case study highlight'],
    version: '1.0.0',
    score: null,
    status: 'production',
    csvRefs: {},
  },
  'testimonial-with-stars': {
    name: 'testimonial-with-stars',
    description: 'Testimonial cards with 1-5 star ratings and optional overall average',
    category: 'testimonials',
    tags: ['stars', 'ratings', 'reviews', 'testimonials'],
    bestFor: ['Google reviews style', 'product reviews', 'service ratings'],
    version: '1.0.0',
    score: null,
    status: 'production',
    csvRefs: {},
  },
  'testimonial-video-cards': {
    name: 'testimonial-video-cards',
    description: 'Video testimonial cards with thumbnail, play button, and modal player',
    category: 'testimonials',
    tags: ['video', 'testimonials', 'modal', 'play'],
    bestFor: ['video reviews', 'client stories', 'case study videos'],
    version: '1.0.0',
    score: null,
    status: 'production',
    csvRefs: {},
  },
  'testimonial-minimal': {
    name: 'testimonial-minimal',
    description: 'Minimalist quote-style testimonials in centered or stacked grid layout',
    category: 'testimonials',
    tags: ['minimal', 'quotes', 'simple', 'clean'],
    bestFor: ['elegant pages', 'minimal design', 'typography-focused sites'],
    version: '1.0.0',
    score: null,
    status: 'production',
    csvRefs: {},
  },
};
