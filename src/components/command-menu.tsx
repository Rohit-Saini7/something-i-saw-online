'use client';

import { useRouter } from 'next/navigation';
import {
  UserIcon,
  CodeIcon,
  FlaskConicalIcon,
  HomeIcon,
  LaptopIcon,
  CreditCardIcon,
} from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@ui-components/command';
import { useCallback, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  const runThemeCommand = useCallback(() => {
    const search = query.toLowerCase().trim();

    if ('light'.startsWith(search)) {
      setTheme('light');
      setOpen(false);
      return;
    }
    if ('dark'.startsWith(search)) {
      setTheme('dark');
      setOpen(false);
      return;
    }
    if ('system'.startsWith(search)) {
      setTheme('system');
      setOpen(false);
      return;
    }

    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');

    setOpen(false);
  }, [query, theme, setTheme]);

  return (
    <>
      <div className='fixed bottom-4 right-4 z-50 md:hidden'>
        <button
          onClick={() => setOpen(true)}
          className='bg-primary text-primary-foreground h-10 w-10 rounded-full flex items-center justify-center shadow-lg'
        >
          <CodeIcon className='h-5 w-5' />
        </button>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder='Type a command or search...'
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading='General'>
            <CommandItem onSelect={() => runCommand(() => router.push('/'))}>
              <HomeIcon className='mr-2 h-4 w-4' />
              <span>Home</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/lab'))}>
              <FlaskConicalIcon className='mr-2 h-4 w-4' />
              <span>The Lab</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => window.open('/resume.pdf', '_blank'))
              }
            >
              <CreditCardIcon className='mr-2 h-4 w-4' />
              <span>Download Resume</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading='Appearance'>
            <CommandItem onSelect={runThemeCommand}>
              <LaptopIcon className='mr-2 h-4 w-4' />
              <span>Switch Theme</span>
              <div className='ml-auto flex items-center gap-2 text-xs text-muted-foreground'>
                <span
                  role='button'
                  onClick={(e) => {
                    e.stopPropagation();
                    setTheme('light');
                    setOpen(false);
                  }}
                  className={cn(
                    'hover:text-foreground cursor-pointer transition-colors',
                    theme === 'light' && 'text-foreground font-bold'
                  )}
                >
                  Light
                </span>
                <span>/</span>
                <span
                  role='button'
                  onClick={(e) => {
                    e.stopPropagation();
                    setTheme('dark');
                    setOpen(false);
                  }}
                  className={cn(
                    'hover:text-foreground cursor-pointer transition-colors',
                    theme === 'dark' && 'text-foreground font-bold'
                  )}
                >
                  Dark
                </span>
                <span>/</span>
                <span
                  role='button'
                  onClick={(e) => {
                    e.stopPropagation();
                    setTheme('system');
                    setOpen(false);
                  }}
                  className={cn(
                    'hover:text-foreground cursor-pointer transition-colors',
                    theme === 'system' && 'text-foreground font-bold'
                  )}
                >
                  System
                </span>
              </div>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading='Social'>
            <CommandItem
              onSelect={() =>
                runCommand(() =>
                  window.open('https://github.com/Rohit-Saini7', '_blank')
                )
              }
            >
              <CodeIcon className='mr-2 h-4 w-4' />
              <span>GitHub</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() =>
                  window.open('https://linkedin.com/in/rohit-saini7', '_blank')
                )
              }
            >
              <UserIcon className='mr-2 h-4 w-4' />
              <span>LinkedIn</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
