import { useMemo, useState } from 'react';
import IgniteCore from './SimpleForm/IgniteCore';
import PrismConsole from './SimpleForm/PrismConsole';
import BioFluidClay from './SimpleForm/BioFluidClay';
import BioFluidClayDark from './SimpleForm/BioFluidClayDark';
import HyperBrutalForm from './SimpleForm/HyperBrutalForm';
import HyperBrutalFormDark from './SimpleForm/HyperBrutalFormDark';

const collections = [
  {
    id: 'ignite-core',
    name: 'Ignite Core',
    items: [{ id: 'ignite-1', component: IgniteCore }],
  },
  {
    id: 'neon-signal',
    name: 'Neon Signal',
    items: [{ id: 'ignite-2', component: PrismConsole }],
  },
  {
    id: 'bio-fluid-clay',
    name: 'Bio-Fluid & Clay',
    items: [{ id: 'clay-1', component: BioFluidClay }],
  },
  {
    id: 'bio-fluid-clay-dark',
    name: 'Bio-Fluid & Clay (Dark)',
    items: [{ id: 'clay-2', component: BioFluidClayDark }],
  },
  {
    id: 'hyper-brutal',
    name: 'Hyper Brutalism',
    items: [{ id: 'brutal-1', component: HyperBrutalForm }],
  },
  {
    id: 'hyper-brutal-dark',
    name: 'Hyper Brutalism (Dark)',
    items: [{ id: 'brutal-2', component: HyperBrutalFormDark }],
  },
  {
    id: 'mixed-grid',
    name: 'Mixed Grid',
    items: [
      { id: 'ignite-1a', component: IgniteCore },
      { id: 'ignite-2a', component: PrismConsole },
      { id: 'clay-1a', component: BioFluidClay },
      { id: 'clay-2a', component: BioFluidClayDark },
      { id: 'brutal-1a', component: HyperBrutalForm },
      { id: 'brutal-2a', component: HyperBrutalFormDark },
    ],
  },
];

export default function Collection() {
  const [activeId, setActiveId] = useState(collections[0].id);
  const activeCollection = useMemo(
    () => collections.find((entry) => entry.id === activeId) || collections[0],
    [activeId]
  );

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-slate-100">
      <div className="flex min-h-screen">
        <aside className="w-64 border-r border-white/10">
          <div className="sticky top-0 h-screen overflow-auto px-6 py-8">
            <div className="text-sm font-semibold tracking-[0.3em] text-slate-400">
              Collection
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
                        ? 'font-semibold text-white'
                        : 'font-normal text-slate-500 hover:text-slate-200 hover:bg-white/5',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full',
                        isActive ? 'bg-cyan-400' : 'bg-transparent',
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
            <h1 className="text-3xl font-semibold text-white">
              {activeCollection.name}
            </h1>
            <div className="mt-10 flex flex-col gap-8">
              {activeCollection.items.map((item) => {
                const RowComponent = item.component;
                return <RowComponent key={item.id} />;
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
