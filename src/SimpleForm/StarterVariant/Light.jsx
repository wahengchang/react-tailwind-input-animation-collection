import { useEffect, useMemo, useState } from 'react';

export default function StarterVariant() {
  const [value, setValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [phase, setPhase] = useState('idle'); // idle | working | success
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
    <section className="w-full rounded-2xl border border-white/10 bg-[#0f0f12] shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
      <div className="p-6">
        <div className="text-xs font-semibold tracking-[0.3em] text-slate-400">
          Starter Variant
        </div>
        <p className="mt-2 text-sm text-slate-400">
          Replace copy, color, motion, and shape to create a new style.
        </p>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <div
              className={[
                'relative rounded-xl border transition-all duration-500',
                'bg-[#14141a]',
                isActive
                  ? 'border-sky-300/80 shadow-[0_0_24px_rgba(56,189,248,0.35)]'
                  : 'border-white/10',
                isTyping ? 'animate-pulse' : '',
                isLocked ? 'opacity-60' : '',
              ].join(' ')}
            >
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type here..."
                disabled={isLocked}
                className={[
                  'w-full bg-transparent px-4 py-3 text-base text-white placeholder:text-slate-500',
                  'outline-none',
                  isActive ? 'caret-sky-200' : 'caret-slate-500',
                ].join(' ')}
              />
              <span
                className={[
                  'pointer-events-none absolute inset-0 rounded-xl',
                  isActive
                    ? 'shadow-[inset_0_0_18px_rgba(56,189,248,0.25)]'
                    : '',
                ].join(' ')}
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 sm:items-center">
            <button
              type="button"
              onClick={handleIgnite}
              disabled={!isActive || isLocked}
              className={[
                'group relative inline-flex min-w-[170px] items-center justify-center gap-2 rounded-xl px-5 py-3 overflow-hidden',
                'text-sm font-semibold transition-all duration-500',
                isWorking
                  ? 'bg-sky-400/80 text-black shadow-[0_0_30px_rgba(56,189,248,0.45)]'
                  : isSuccess
                  ? 'bg-emerald-400 text-black shadow-[0_0_30px_rgba(16,185,129,0.55)]'
                  : isActive
                  ? 'bg-sky-300 text-black shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:scale-[1.02]'
                  : 'bg-[#2b2b33] text-slate-500 scale-95 cursor-not-allowed',
                isSuccess ? 'ignite-pop' : '',
              ].join(' ')}
            >
              <span
                className={[
                  'pointer-events-none absolute inset-0 transition-opacity duration-200',
                  isWorking && showSpinner ? 'opacity-100' : 'opacity-0',
                ].join(' ')}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-sky-200/20 via-sky-300/40 to-sky-200/20" />
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
    </section>
  );
}
