import { cn } from '@/lib/utils';

interface FullBleedProps {
  children: React.ReactNode;
  className?: string;
  background?: string;
}

export function FullBleed({ children, className, background }: FullBleedProps) {
  return (
    <div
      className={cn(
        'relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]',
        className,
      )}
      style={background ? { background } : undefined}
    >
      {children}
    </div>
  );
}
