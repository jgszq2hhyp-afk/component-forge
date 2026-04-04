import { cn } from '@/lib/utils';

type HtmlTag = 'section' | 'div' | 'article' | 'aside' | 'main' | 'header' | 'footer';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  as?: HtmlTag;
  id?: string;
}

export function SectionWrapper({
  children,
  className,
  as: Tag = 'section',
  id,
}: SectionWrapperProps) {
  return (
    <Tag
      id={id}
      className={cn(
        'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
