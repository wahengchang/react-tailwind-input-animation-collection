import { useEffect, useMemo, useState } from 'react';
import DocLink from '../DocLink';
import docUrl from './README.md';

export default function BioFluidClay() {
  const [value, setValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [phase, setPhase] = useState('idle');
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    if (!value) return;
    setIsTyping(true);
    const id = setTimeout(() => setIsTyping(false), 400);
    return () => clearTimeout(id);
  }, [value]);

  const isActive = value.trim().length > 0;
  const isWorking = phase === 'working';
  const isSuccess = phase === 'success';
  const isLocked = isWorking || isSuccess;

  useEffect(() => {
    if (!isSuccess) return;
    const id = setTimeout(() => setPhase('idle'), 1600);
    return () => clearTimeout(id);
  }, [isSuccess]);

  const buttonLabel = useMemo(() => {
    if (isSuccess) return 'Done';
    return 'Start';
  }, [isSuccess]);

  const handleIgnite = () => {
    if (!isActive || isWorking) return;
    setPhase('working');
    setShowSpinner(false);
    setTimeout(() => setShowSpinner(true), 180);
    setTimeout(() => setPhase('success'), 3000);
  };

  return (
    <section className="w-full rounded-[36px] border border-white/70 bg-[#F6F1EA] shadow-[0_30px_80px_rgba(58,51,45,0.12)]">
      <div className="relative overflow-hidden rounded-[36px]">
        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#DCE6D8]/60 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-12 h-56 w-56 rounded-full bg-[#B8D6C5]/50 blur-3xl" />
        <div className="relative p-7 sm:p-8">
          <div className="text-xs font-semibold tracking-[0.28em] text-[#6C625B]">
            Gentle Drop
          </div>
          <p className="mt-2 text-sm text-[#6C625B]">
            Type to wake the clay.
          </p>
          <DocLink
            docUrl={docUrl}
            label="Design &amp; technical documentation"
            title="Gentle Drop documentation"
            linkClassName="mt-3 inline-flex text-xs font-medium text-[#6C625B]/80 transition hover:text-[#3A332D]"
            panelClassName="bg-[#F6F1EA] text-[#3A332D]"
          />

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex-1">
              <div
                className={[
                  'relative rounded-[28px] border transition-all duration-500',
                  'bg-[#E9E2D7] shadow-[inset_0_10px_20px_rgba(255,255,255,0.6),inset_0_-12px_24px_rgba(154,144,133,0.25)]',
                  isActive
                    ? 'border-[#B8D6C5] shadow-[inset_0_12px_24px_rgba(255,255,255,0.75),inset_0_-14px_26px_rgba(154,144,133,0.3),0_0_0_6px_rgba(184,214,197,0.3)]'
                    : 'border-white/70',
                  isTyping ? 'clay-typing' : '',
                  isLocked ? 'opacity-70' : '',
                ].join(' ')}
              >
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Type here..."
                  disabled={isLocked}
                  className={[
                    'w-full bg-transparent px-5 py-4 text-base text-[#3A332D] placeholder:text-[#9A8F83]',
                    'outline-none',
                    isActive ? 'caret-[#6E8F80]' : 'caret-[#9A8F83]',
                  ].join(' ')}
                />
                <span
                  className={[
                    'pointer-events-none absolute inset-0 rounded-[28px]',
                    'transition-opacity duration-500',
                    isActive ? 'opacity-100' : 'opacity-0',
                  ].join(' ')}
                >
                  <span className="absolute inset-0 rounded-[28px] bg-white/30" />
                  <span
                    className={[
                      'absolute inset-0 rounded-[28px] bg-white/40',
                      isTyping ? 'clay-ripple' : 'opacity-0',
                    ].join(' ')}
                  />
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start gap-2 sm:items-center">
              <button
                type="button"
                onClick={handleIgnite}
                disabled={!isActive || isLocked}
                className={[
                  'group relative inline-flex min-w-[170px] items-center justify-center gap-2 rounded-[26px] px-5 py-3 overflow-hidden',
                  'text-sm font-semibold transition-all duration-500',
                  'shadow-[0_14px_30px_rgba(58,51,45,0.18)]',
                  isWorking
                    ? 'bg-[#B8D6C5] text-[#2E2823]'
                    : isSuccess
                    ? 'bg-[#DCE6D8] text-[#2E2823]'
                    : isActive
                    ? 'bg-[#CFE3D5] text-[#2E2823] hover:-translate-y-0.5'
                    : 'bg-[#E5DDD2] text-[#9A8F83] cursor-not-allowed',
                  isSuccess ? 'clay-pop' : '',
                ].join(' ')}
              >
                <span
                  className={[
                    'pointer-events-none absolute inset-0 transition-opacity duration-200',
                    isWorking && showSpinner ? 'opacity-100' : 'opacity-0',
                  ].join(' ')}
                >
                  <span className="absolute inset-0 bg-white/40" />
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="h-4 w-4 rounded-full border border-[#3A332D]/30 border-t-[#3A332D] animate-spin" />
                  </span>
                </span>
                <span
                  className={[
                    'pointer-events-none absolute inset-0 transition-all duration-500',
                    isSuccess ? 'opacity-100' : 'opacity-0',
                  ].join(' ')}
                >
                  <span className="absolute inset-0 rounded-[26px] bg-white/60 clay-flash" />
                  <span className="absolute inset-0 rounded-[26px] border border-[#B8D6C5]/80 clay-ripple-1" />
                  <span className="absolute inset-0 rounded-[26px] border border-[#B8D6C5]/60 clay-ripple-2" />
                  <span className="absolute inset-0 rounded-[26px] border border-[#B8D6C5]/40 clay-ripple-3" />
                </span>
                <span
                  className={[
                    'relative z-10 inline-flex items-center gap-2 transition-all duration-200',
                    isWorking ? 'opacity-0 scale-95' : 'opacity-100 scale-100',
                  ].join(' ')}
                >
                  <span>{buttonLabel}</span>
                  <span
                    className={[
                      'inline-flex transition-transform duration-500',
                      isActive && !isWorking && !isSuccess ? 'translate-x-1' : '',
                    ].join(' ')}
                  >
                    {isSuccess ? '✓' : '→'}
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
