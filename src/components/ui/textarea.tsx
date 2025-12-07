import * as React from 'react';
import { cn } from '@/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot='textarea'
      className={cn(
        'min-h-16 w-full resize-y overflow-hidden rounded-md px-3 py-2 text-base md:text-sm bg-background text-foreground border border-input placeholder:text-muted-foreground outline-none focus-visible:border-ring/50 focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 disabled:cursor-not-allowed disabled:opacity-50 shadow-xs transition-[color,box-shadow]',
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
