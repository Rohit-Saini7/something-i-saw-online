import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center gap-1 w-fit shrink-0 whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-medium transition-colors overflow-hidden [&>svg]:h-3 [&>svg]:w-3 [&>svg]:pointer-events-none outline-none focus-visible:ring-1 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/30',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground [a&]:hover:opacity-90',

        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:opacity-90',

        destructive:
          'border-transparent bg-destructive text-destructive-foreground [a&]:hover:opacity-90',

        outline:
          'border-border text-foreground bg-transparent [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',

        warning:
          'border-transparent bg-warning text-warning-foreground [a&]:hover:opacity-90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot='badge'
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
