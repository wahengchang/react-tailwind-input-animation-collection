import { useEffect, useMemo, useState } from 'react';

export default function CrystalLink() {
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
    <section className="relative w-full overflow-hidden rounded-[28px] border border-[color:var(--crystal-shell-border)] bg-[color:var(--crystal-shell-bg)] text-[color:var(--crystal-shell-text)] shadow-[0_24px_80px_rgba(40,60,120,0.35)] backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-0">
        <span className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-[#9ED7FF]/30 blur-2xl" />
        <span className="absolute right-6 top-8 h-40 w-40 rounded-full bg-[#C9B8FF]/30 blur-2xl" />
        <span className="absolute bottom-6 left-1/3 h-32 w-32 rounded-full bg-[#FFB3E6]/30 blur-2xl" />
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(158,215,255,0.2),transparent_45%),radial-gradient(circle_at_30%_90%,rgba(255,179,230,0.2),transparent_55%)]" />
      </div>

      <div className="relative p-6">
        <div className="text-xs font-semibold uppercase tracking-[0.4em] text-[color:var(--crystal-shell-muted)]">
          Crystal Link
        </div>
        <p className="mt-2 text-sm text-[color:var(--crystal-shell-muted)]">
          Float the signal through glass.
        </p>

        <div className="mt-7 flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex-1">
            <div
              className={[
                'relative translate-y-[-6px] rounded-2xl border border-[color:var(--crystal-input-border)] bg-[color:var(--crystal-input-bg)] shadow-[0_18px_50px_rgba(120,160,255,0.25)] backdrop-blur-xl',
                'transition-all duration-500',
                isActive
                  ? 'ring-2 ring-[#9ED7FF]/70 shadow-[0_18px_50px_rgba(158,215,255,0.45)]'
                  : '',
                isTyping ? 'crystal-typing' : '',
                isLocked ? 'opacity-70' : '',
              ].join(' ')}
            >
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type through the glass..."
                disabled={isLocked}
                className={[
                  'w-full bg-transparent px-4 py-3 text-base text-[color:var(--crystal-input-text)] placeholder:text-[color:var(--crystal-input-placeholder)]',
                  'outline-none',
                  isActive
                    ? 'caret-[color:var(--crystal-caret)]'
                    : 'caret-[color:var(--crystal-input-placeholder)]',
                ].join(' ')}
              />
              <span
                className={[
                  'pointer-events-none absolute inset-0 rounded-2xl',
                  isActive ? 'crystal-edge' : '',
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
                'group relative inline-flex min-w-[180px] items-center justify-center gap-2 rounded-2xl border border-[color:var(--crystal-button-border)] px-5 py-3',
                'text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-500',
                isWorking
                  ? 'bg-[color:var(--crystal-button-working-bg)] text-[color:var(--crystal-button-text)] shadow-[0_16px_40px_rgba(120,160,255,0.4)]'
                  : isSuccess
                  ? 'bg-[color:var(--crystal-button-success-bg)] text-[color:var(--crystal-button-success-text)] shadow-[0_16px_45px_rgba(201,184,255,0.5)]'
                  : isActive
                  ? 'bg-[color:var(--crystal-button-active-bg)] text-[color:var(--crystal-button-text)] shadow-[0_16px_45px_rgba(158,215,255,0.45)] hover:-translate-y-[2px]'
                  : 'bg-[color:var(--crystal-button-idle-bg)] text-[color:var(--crystal-button-muted-text)] shadow-[0_10px_30px_rgba(80,100,160,0.3)] cursor-not-allowed',
                isSuccess ? 'crystal-success' : '',
              ].join(' ')}
            >
              <span
                className={[
                  'pointer-events-none absolute inset-0 transition-opacity duration-200',
                  isWorking && showSpinner ? 'opacity-100' : 'opacity-0',
                ].join(' ')}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/40 to-white/10" />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="h-4 w-4 rounded-full border border-white/60 border-t-transparent animate-spin" />
                </span>
              </span>
              <span
                className={[
                  'pointer-events-none absolute inset-0 transition-all duration-500',
                  isSuccess ? 'opacity-100' : 'opacity-0',
                ].join(' ')}
              >
                <span className="absolute inset-0 crystal-flash" />
                <span className="absolute inset-0 rounded-2xl border border-white/70 crystal-ring-1" />
                <span className="absolute inset-0 rounded-2xl border border-[#C9B8FF]/70 crystal-ring-2" />
                <span className="absolute inset-0 rounded-2xl border border-[#FFB3E6]/70 crystal-ring-3" />
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
