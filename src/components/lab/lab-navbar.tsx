'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { projects } from '@/data/projects';
import {
  MenuIcon,
  ArrowLeftIcon,
  Code2Icon,
  InfoIcon,
  ExternalLinkIcon,
} from 'lucide-react';

import { Button } from '@ui-components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui-components/dropdown-menu';
import { Badge } from '@ui-components/badge';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@ui-components/drawer';

export default function LabNavbar() {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const slug = pathname.split('/').pop();
  const project = projects.find((p) => p.slug === slug && p.type === 'lab');

  if (!project) return null;

  return (
    <div className='fixed top-6 left-6 z-50'>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              className='h-10 w-10 rounded-full border-border bg-background/70 backdrop-blur text-foreground hover:bg-accent hover:text-accent-foreground'
            >
              <MenuIcon className='h-5 w-5' />
              <span className='sr-only'>Open menu</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align='start'
            className='w-56 bg-popover text-popover-foreground border-border'
          >
            <DropdownMenuLabel>Lab Controls</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href='/lab' className='flex items-center gap-2'>
                <ArrowLeftIcon className='h-4 w-4' />
                <span>Back to Lab</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => setIsDrawerOpen(true)}
              className='flex items-center gap-2'
            >
              <InfoIcon className='h-4 w-4' />
              <span>Project Info</span>
            </DropdownMenuItem>

            {project.repoUrl && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a
                    href={project.repoUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-2'
                  >
                    <Code2Icon className='h-4 w-4' />
                    <span>View Source</span>
                    <ExternalLinkIcon className='ml-auto h-3 w-3 opacity-50' />
                  </a>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DrawerContent className='bg-background text-foreground border-border'>
          <div className='mx-auto w-full max-w-lg'>
            <DrawerHeader>
              <div className='flex items-center gap-3 mb-2'>
                <DrawerTitle className='text-2xl font-bold'>
                  {project.title}
                </DrawerTitle>
                <Badge variant='outline'>Experiment</Badge>
              </div>
              <DrawerDescription className='text-muted-foreground text-base leading-relaxed'>
                {project.description}
              </DrawerDescription>
            </DrawerHeader>

            <div className='p-4 pb-0'>
              <div className='rounded-lg border border-border bg-muted/30 p-4'>
                <h4 className='mb-2 text-sm font-medium text-muted-foreground'>
                  Tech Stack
                </h4>
                <div className='flex gap-2 text-xs text-muted-foreground font-mono'>
                  {project.tech.map((v, i) => (
                    <React.Fragment key={v}>
                      <span>{v}</span>
                      {i < project.tech.length - 1 && <span>•</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            <DrawerFooter>
              {project.repoUrl && (
                <Button asChild className='w-full'>
                  <a
                    href={project.repoUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Code2Icon className='mr-2 h-4 w-4' />
                    View Source Code
                  </a>
                </Button>
              )}
              <DrawerClose asChild>
                <Button variant='outline'>Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
