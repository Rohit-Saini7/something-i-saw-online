'use client';

import { useRouter } from 'next/navigation';
import {
  UserIcon,
  CodeIcon,
  FlaskConicalIcon,
  HomeIcon,
  LaptopIcon,
  FileUserIcon,
  SunIcon,
  MoonIcon,
} from 'lucide-react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@ui-components/command';
import { useCallback, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Separator } from '@ui-components/separator';

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

    if (search) {
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
        <Command>
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
                Home
              </CommandItem>

              <CommandItem
                onSelect={() => runCommand(() => router.push('/lab'))}
              >
                <FlaskConicalIcon className='mr-2 h-4 w-4' />
                The Lab
              </CommandItem>

              <CommandItem
                onSelect={() =>
                  runCommand(() =>
                    window.open(
                      'https://drive.google.com/' +
                        process.env.NEXT_PUBLIC_RESUME_DRIVE_LINK,
                      '_blank'
                    )
                  )
                }
              >
                <FileUserIcon className='mr-2 h-4 w-4' />
                Download Resume
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading='Appearance'>
              <CommandItem onSelect={runThemeCommand}>
                {theme === 'light' ? (
                  <SunIcon className='mr-2 h-4 w-4' />
                ) : theme === 'dark' ? (
                  <MoonIcon className='mr-2 h-4 w-4' />
                ) : (
                  <LaptopIcon className='mr-2 h-4 w-4' />
                )}
                Switch Theme
                <CommandShortcut>
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

                    <Separator orientation='vertical' />

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

                    <Separator orientation='vertical' />

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
                </CommandShortcut>
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading='Social'>
              <CommandItem
                onSelect={() =>
                  runCommand(() =>
                    window.open(
                      'https://github.com/' +
                        process.env.NEXT_PUBLIC_GITHUB_USERNAME,
                      '_blank'
                    )
                  )
                }
              >
                <CodeIcon className='mr-2 h-4 w-4' />
                <span>GitHub</span>
              </CommandItem>

              <CommandItem
                onSelect={() =>
                  runCommand(() =>
                    window.open(
                      'https://linkedin.com/in/' +
                        process.env.NEXT_PUBLIC_LINKEDIN_USERNAME,
                      '_blank'
                    )
                  )
                }
              >
                <UserIcon className='mr-2 h-4 w-4' />
                <span>LinkedIn</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
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
