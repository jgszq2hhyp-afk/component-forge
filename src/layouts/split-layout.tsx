import { cn } from '@/lib/utils';

interface SplitLayoutProps {
  children: [React.ReactNode, React.ReactNode];
  reversed?: boolean;
  className?: string;
}

export function SplitLayout({ children, reversed = false, className }: SplitLayoutProps) {
  const [first, second] = children;

  return (
    <div
      className={cn(
        'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center',
        className,
      )}
    >
      <div className={cn(reversed && 'lg:order-2')}>{first}</div>
      <div className={cn(reversed && 'lg:order-1')}>{second}</div>
    </div>
  );
}
