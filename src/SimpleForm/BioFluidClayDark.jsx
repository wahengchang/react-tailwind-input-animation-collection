import { useEffect, useMemo, useState } from 'react';

export default function BioFluidClayDark() {
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
    <section className="w-full rounded-[36px] border border-white/10 bg-[#151312] shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
      <div className="relative overflow-hidden rounded-[36px]">
        <div className="pointer-events-none absolute -left-28 -top-28 h-72 w-72 rounded-full bg-[#2C3A33]/70 blur-3xl" />
        <div className="pointer-events-none absolute -right-28 top-10 h-60 w-60 rounded-full bg-[#1E2C26]/70 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="relative p-7 sm:p-8">
          <div className="text-xs font-semibold tracking-[0.28em] text-[#9A8F83]">
            Gentle Drop
          </div>
          <p className="mt-2 text-sm text-[#B1A79C]">
            Type to wake the clay.
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex-1">
              <div
                className={[
                  'relative rounded-[28px] border transition-all duration-500',
                  'bg-[#1D1A19] shadow-[inset_0_10px_24px_rgba(255,255,255,0.05),inset_0_-12px_24px_rgba(0,0,0,0.65)]',
                  isActive
                    ? 'border-[#5B7F6D] shadow-[inset_0_10px_24px_rgba(255,255,255,0.08),inset_0_-14px_26px_rgba(0,0,0,0.7),0_0_0_6px_rgba(91,127,109,0.25)]'
                    : 'border-white/10',
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
                    'w-full bg-transparent px-5 py-4 text-base text-[#E7DED2] placeholder:text-[#7F756B]',
                    'outline-none',
                    isActive ? 'caret-[#9FC3B0]' : 'caret-[#7F756B]',
                  ].join(' ')}
                />
                <span
                  className={[
                    'pointer-events-none absolute inset-0 rounded-[28px]',
                    'transition-opacity duration-500',
                    isActive ? 'opacity-100' : 'opacity-0',
                  ].join(' ')}
                >
                  <span className="absolute inset-0 rounded-[28px] bg-white/10" />
                  <span
                    className={[
                      'absolute inset-0 rounded-[28px] bg-white/20',
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
                  'shadow-[0_14px_30px_rgba(0,0,0,0.45)]',
                  isWorking
                    ? 'bg-[#5B7F6D] text-[#11100F]'
                    : isSuccess
                    ? 'bg-[#CFE3D5] text-[#151312]'
                    : isActive
                    ? 'bg-[#6B8F7C] text-[#11100F] hover:-translate-y-0.5'
                    : 'bg-[#2A2624] text-[#6C625B] cursor-not-allowed',
                  isSuccess ? 'clay-pop' : '',
                ].join(' ')}
              >
                <span
                  className={[
                    'pointer-events-none absolute inset-0 transition-opacity duration-200',
                    isWorking && showSpinner ? 'opacity-100' : 'opacity-0',
                  ].join(' ')}
                >
                  <span className="absolute inset-0 bg-white/20" />
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="h-4 w-4 rounded-full border border-white/20 border-t-white animate-spin" />
                  </span>
                </span>
                <span
                  className={[
                    'pointer-events-none absolute inset-0 transition-all duration-500',
                    isSuccess ? 'opacity-100' : 'opacity-0',
                  ].join(' ')}
                >
                  <span className="absolute inset-0 rounded-[26px] bg-white/25 clay-flash" />
                  <span className="absolute inset-0 rounded-[26px] border border-[#9FC3B0]/70 clay-ripple-1" />
                  <span className="absolute inset-0 rounded-[26px] border border-[#9FC3B0]/50 clay-ripple-2" />
                  <span className="absolute inset-0 rounded-[26px] border border-[#9FC3B0]/35 clay-ripple-3" />
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
