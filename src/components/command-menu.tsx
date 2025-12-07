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

export default function CommandMenu() {
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
      <Button
        size='icon'
        onClick={() => setOpen(true)}
        className='fixed bottom-4 right-4 z-50 md:hidden rounded-full'
      >
        <CodeIcon className='h-5 w-5' />
      </Button>

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
                    'cursor-pointer transition-colors hover:text-foreground',
                    theme === 'light' && 'font-bold text-foreground'
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
                    'cursor-pointer transition-colors hover:text-foreground',
                    theme === 'dark' && 'font-bold text-foreground'
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
                    'cursor-pointer transition-colors hover:text-foreground',
                    theme === 'system' && 'font-bold text-foreground'
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

import { Kbd, KbdGroup } from '@ui-components/kbd';
import useOs from '@/hooks/useOs';
import { Button } from '@ui-components/button';

export function OsShortcut() {
  const os = useOs();

  return (
    <>
      <KbdGroup className='hidden gap-1 sm:inline-flex'>
        {os === 'mac' ? <Kbd className='text-base'>⌘</Kbd> : <Kbd>Ctrl</Kbd>}
        <Kbd>K</Kbd>
      </KbdGroup>

      <KbdGroup className='text-base sm:hidden'>
        <Kbd className='text-base'>
          <CodeIcon className='h-5 w-5' />
        </Kbd>
      </KbdGroup>
    </>
  );
}
