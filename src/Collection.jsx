import { useEffect, useMemo, useState } from 'react';
import IgniteCoreLight from './SimpleForm/IgniteCore/Light';
import PrismConsoleLight from './SimpleForm/PrismConsole/Light';
import BioFluidClayLight from './SimpleForm/BioFluidClay/Light';
import BioFluidClayDark from './SimpleForm/BioFluidClay/Dark';
import HyperBrutalFormLight from './SimpleForm/HyperBrutalForm/Light';
import HyperBrutalFormDark from './SimpleForm/HyperBrutalForm/Dark';
import CrystalLinkLight from './SimpleForm/CrystalLink/Light';

const collections = [
  {
    id: 'ignite-core',
    name: 'Ignite Core',
    items: [{ id: 'ignite-1', componentLight: IgniteCoreLight }],
  },
  {
    id: 'neon-signal',
    name: 'Neon Signal',
    items: [{ id: 'ignite-2', componentLight: PrismConsoleLight }],
  },
  {
    id: 'bio-fluid-clay',
    name: 'Bio-Fluid & Clay',
    items: [
      {
        id: 'clay-1',
        componentLight: BioFluidClayLight,
        componentDark: BioFluidClayDark,
      },
    ],
  },
  {
    id: 'hyper-brutal',
    name: 'Hyper Brutalism',
    items: [
      {
        id: 'brutal-1',
        componentLight: HyperBrutalFormLight,
        componentDark: HyperBrutalFormDark,
      },
    ],
  },
  {
    id: 'crystal-link',
    name: 'Crystal Link',
    items: [{ id: 'crystal-1', componentLight: CrystalLinkLight }],
  },
  {
    id: 'mixed-grid',
    name: 'Mixed Grid',
    items: [
      { id: 'ignite-1a', componentLight: IgniteCoreLight },
      { id: 'ignite-2a', componentLight: PrismConsoleLight },
      {
        id: 'clay-1a',
        componentLight: BioFluidClayLight,
        componentDark: BioFluidClayDark,
      },
      {
        id: 'brutal-1a',
        componentLight: HyperBrutalFormLight,
        componentDark: HyperBrutalFormDark,
      },
      { id: 'crystal-1a', componentLight: CrystalLinkLight },
    ],
  },
];

export default function Collection() {
  const [activeId, setActiveId] = useState(collections[0].id);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'dark';
    }

    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });
  const activeCollection = useMemo(
    () => collections.find((entry) => entry.id === activeId) || collections[0],
    [activeId]
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-[color:var(--app-bg)] text-[color:var(--app-text)]">
      <div className="flex min-h-screen">
        <aside className="w-64 border-r border-[color:var(--app-border)] bg-[color:var(--app-surface)]">
          <div className="sticky top-0 h-screen overflow-auto px-6 py-8">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold uppercase tracking-[0.3em] text-[color:var(--app-text-muted)]">
                Collection
              </div>
              <button
                type="button"
                onClick={() =>
                  setTheme((currentTheme) =>
                    currentTheme === 'dark' ? 'light' : 'dark'
                  )
                }
                aria-label={`Switch to ${
                  theme === 'dark' ? 'light' : 'dark'
                } mode`}
                aria-pressed={theme === 'dark'}
                className={[
                  'flex h-10 w-10 items-center justify-center rounded-full border transition',
                  'border-[color:var(--app-border)] text-[color:var(--app-text-muted)]',
                  'hover:border-[color:var(--app-accent-strong)] hover:text-[color:var(--app-text)]',
                ].join(' ')}
              >
                <span aria-hidden="true" className="text-lg">
                  {theme === 'dark' ? '🌙' : '☀️'}
                </span>
              </button>
            </div>
            <div className="mt-8 space-y-2">
              {collections.map((collection) => {
                const isActive = collection.id === activeId;
                return (
                  <button
                    key={collection.id}
                    type="button"
                    onClick={() => setActiveId(collection.id)}
                    className={[
                      'relative w-full truncate rounded-md px-3 py-2 text-left text-sm transition-colors',
                      isActive
                        ? 'font-semibold text-[color:var(--app-text)]'
                        : [
                            'font-normal text-[color:var(--app-text-muted)]',
                            'hover:text-[color:var(--app-text)]',
                            'hover:bg-[color:var(--app-surface-muted)]',
                          ].join(' '),
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full',
                        isActive ? 'bg-[color:var(--app-accent)]' : 'bg-transparent',
                      ].join(' ')}
                    />
                    <span className="pl-2">{collection.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="px-10 py-12">
            <h1 className="text-3xl font-semibold text-[color:var(--app-text)]">
              {activeCollection.name}
            </h1>
            <div className="mt-10 flex flex-col gap-8">
              {activeCollection.items.map((item) => {
                const RowComponent =
                  theme === 'dark' && item.componentDark
                    ? item.componentDark
                    : item.componentLight;
                return <RowComponent key={item.id} />;
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
