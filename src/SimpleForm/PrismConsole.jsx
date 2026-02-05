import { useEffect, useMemo, useState } from 'react';

export default function PrismConsole() {
  const [value, setValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [phase, setPhase] = useState('idle'); // idle | working | success
  const [showSpinner, setShowSpinner] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

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
    <section className="w-full rounded-2xl border border-white/10 bg-[#0b0b0b] shadow-[0_30px_90px_rgba(0,0,0,0.65)]">
      <div className="p-6">
        <div className="text-xs font-semibold tracking-[0.3em] text-slate-400">
          Prism Console
        </div>
        <p className="mt-2 text-sm text-slate-400">
          A dark console with a neon halo. Charge the input and fire the prism.
        </p>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <div
              className={[
                'relative rounded-full border transition-all duration-500',
                'bg-[#121218]',
                isActive
                  ? 'border-fuchsia-300/80 shadow-[0_0_22px_rgba(255,10,127,0.35)]'
                  : 'border-white/20',
                isFocused && !isWorking && !isSuccess
                  ? 'border-fuchsia-300 shadow-[0_0_28px_rgba(255,10,127,0.45)]'
                  : '',
                isTyping ? 'animate-pulse' : '',
                isLocked ? 'opacity-60' : '',
              ].join(' ')}
            >
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Enter command..."
                disabled={isLocked}
                className={[
                  'w-full bg-transparent px-5 py-3 text-base text-white placeholder:text-slate-500',
                  'outline-none',
                  isActive || isFocused ? 'caret-fuchsia-300' : 'caret-slate-500',
                ].join(' ')}
              />
              <span
                className={[
                  'pointer-events-none absolute inset-0 rounded-full',
                  isActive
                    ? 'shadow-[inset_0_0_18px_rgba(255,10,127,0.35)]'
                    : '',
                ].join(' ')}
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 sm:items-center">
            <div
              className={[
                'rainbow relative z-0 inline-flex items-center justify-center rounded-full p-[2px] transition duration-300 active:scale-100 overflow-hidden',
                'isolate',
                isActive && !isWorking && !isSuccess ? 'hover:scale-105' : '',
              ].join(' ')}
            >
              <button
                type="button"
                onClick={handleIgnite}
                disabled={!isActive || isLocked}
                className={[
                  'group relative inline-flex min-w-[170px] items-center justify-center gap-2 rounded-full px-6 py-3 overflow-hidden',
                  'text-sm font-semibold transition-all duration-500',
                isWorking
                  ? 'bg-[#2a2a34] text-white shadow-[0_0_35px_rgba(255,10,127,0.35)]'
                  : isSuccess
                  ? 'bg-[#2b2238] text-white shadow-[0_0_35px_rgba(120,14,255,0.55)]'
                  : isActive
                  ? 'bg-[#1f1f28] text-white shadow-[0_0_35px_rgba(255,10,127,0.45)]'
                  : 'bg-[#1a1a1a] text-slate-500 scale-95 cursor-not-allowed',
                  isSuccess ? 'ignite-pop' : '',
                  isActive && !isWorking && !isSuccess ? 'console-breathe' : '',
                ].join(' ')}
              >
                <span
                  className={[
                    'pointer-events-none absolute inset-0 transition-opacity duration-200',
                    isWorking && showSpinner ? 'opacity-100' : 'opacity-0',
                  ].join(' ')}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#ff0a7f]/20 via-[#780eff]/40 to-[#ff0a7f]/20" />
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="h-4 w-4 rounded-full border border-white/30 border-t-white animate-spin" />
                  </span>
                </span>
              <span
                className={[
                  'pointer-events-none absolute inset-0 transition-all duration-500',
                  isSuccess ? 'opacity-100' : 'opacity-0',
                ].join(' ')}
              >
                <span className="absolute inset-0 rounded-xl bg-white ignite-flash" />
                <span className="absolute inset-0 rounded-xl border border-emerald-200/80 ignite-ripple-1" />
                <span className="absolute inset-0 rounded-xl border border-emerald-200/60 ignite-ripple-2" />
                <span className="absolute inset-0 rounded-xl border border-emerald-200/40 ignite-ripple-3" />
                <span className="absolute inset-0 rounded-xl bg-emerald-200/25 blur-md ignite-burst" />
                <span className="absolute inset-0">
                  {[
                    ['0px', '-22px'],
                    ['16px', '-16px'],
                    ['22px', '0px'],
                    ['16px', '16px'],
                    ['0px', '22px'],
                    ['-16px', '16px'],
                    ['-22px', '0px'],
                    ['-16px', '-16px'],
                  ].map(([dx, dy], index) => (
                    <span
                      key={index}
                      className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-200/90 ignite-particle"
                      style={{ '--dx': dx, '--dy': dy }}
                    />
                  ))}
                </span>
              </span>
                <span
                  className={[
                    'relative z-10 inline-flex items-center gap-2 transition-all duration-200',
                    isWorking ? 'opacity-0 scale-95' : 'opacity-100 scale-100',
                  ].join(' ')}
                >
                  <span
                    className={
                      isSuccess
                        ? 'text-white'
                        : isActive
                        ? 'text-[#ff0a7f]'
                        : 'text-slate-400'
                    }
                  >
                    {buttonLabel}
                  </span>
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
