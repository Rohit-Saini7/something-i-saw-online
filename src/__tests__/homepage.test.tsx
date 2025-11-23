import { expect, test, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

vi.mock('@components/command-menu', () => ({
  CommandMenu: () => <div>Command Menu Mock</div>,
}));

describe('Homepage', () => {
  test('renders the hero section with name', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toContain('Rohit Saini');

    expect(screen.getByText('Featured Work')).toBeDefined();
  });
});
