import { useEffect, useMemo, useState } from 'react';

export default function IgniteCore() {
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
    <section className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
      <div className="p-6">
        <div className="text-xs font-semibold tracking-[0.3em] text-slate-300">
          Command Input
        </div>
        <p className="mt-2 text-sm text-slate-400">
          Type to charge the system. Your input fuels the launch.
        </p>
        <a
          className="mt-3 inline-flex text-xs font-medium text-slate-400/80 transition hover:text-slate-200"
          href="src/SimpleForm/IgniteCore/README.md"
        >
          Design &amp; technical documentation
        </a>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <div
              className={[
                'relative rounded-xl border transition-all duration-500',
                'bg-[#171717]',
                isActive
                  ? 'border-cyan-400/80 shadow-[0_0_30px_rgba(6,182,212,0.35)]'
                  : 'border-white/10',
                isTyping ? 'animate-pulse' : '',
                isLocked ? 'opacity-60' : '',
              ].join(' ')}
            >
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type to charge the interface..."
                disabled={isLocked}
                className={[
                  'w-full bg-transparent px-4 py-3 text-base text-white placeholder:text-slate-500',
                  'outline-none',
                  isActive ? 'caret-cyan-300' : 'caret-slate-500',
                ].join(' ')}
              />
              <span
                className={[
                  'pointer-events-none absolute inset-0 rounded-xl',
                  isActive
                    ? 'shadow-[inset_0_0_18px_rgba(6,182,212,0.35)]'
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
                  ? 'bg-cyan-500/80 text-black shadow-[0_0_35px_rgba(6,182,212,0.55)]'
                  : isSuccess
                  ? 'bg-emerald-400 text-black shadow-[0_0_35px_rgba(16,185,129,0.6)]'
                  : isActive
                  ? 'bg-cyan-400 text-black shadow-[0_0_35px_rgba(6,182,212,0.5)] hover:scale-[1.02]'
                  : 'bg-[#303030] text-slate-500 scale-95 cursor-not-allowed',
                isSuccess ? 'ignite-pop' : '',
              ].join(' ')}
            >
              <span
                className={[
                  'pointer-events-none absolute inset-0 transition-opacity duration-200',
                  isWorking && showSpinner ? 'opacity-100' : 'opacity-0',
                ].join(' ')}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-300/20 via-cyan-400/40 to-cyan-300/20" />
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
