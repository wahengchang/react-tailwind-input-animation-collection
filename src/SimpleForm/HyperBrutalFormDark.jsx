import { useEffect, useMemo, useState } from 'react';

export default function HyperBrutalFormDark() {
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
    <section className="w-full border-[3px] border-[#FFB500] bg-[#0A0A0A] text-white shadow-[10px_10px_0_0_#000000]">
      <div className="p-6">
        <div className="text-[32px] font-black uppercase tracking-[0.08em]">
          <span className="font-serif text-[#FFB500]">TYPE.</span>{' '}
          <span className="font-mono text-white">PUSH.</span>
        </div>
        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
          Raw structure, no polish.
        </p>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <div
              className={[
                'relative border-[3px] border-[#FFB500] bg-[#141414] transition-colors',
                isActive ? 'shadow-[6px_6px_0_0_#000000]' : '',
                isTyping ? 'brutal-typing' : '',
                isLocked ? 'opacity-70' : '',
              ].join(' ')}
            >
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type raw input..."
                disabled={isLocked}
                className={[
                  'w-full bg-transparent px-4 py-3 text-base font-mono text-white',
                  'outline-none placeholder:text-white/40',
                  isActive ? 'caret-[#00F5D4]' : 'caret-white/40',
                ].join(' ')}
              />
              <span
                className={[
                  'pointer-events-none absolute inset-0 border-[3px] border-white/10',
                  isActive ? 'brutal-border-pop' : '',
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
                'group relative inline-flex min-w-[170px] items-center justify-center gap-2 border-[3px] border-[#FFB500] px-5 py-3',
                'text-sm font-black uppercase tracking-[0.18em] transition-transform',
                isWorking
                  ? 'bg-black text-white shadow-[6px_6px_0_0_#000000]'
                  : isSuccess
                  ? 'bg-[#00F5D4] text-black shadow-[6px_6px_0_0_#000000]'
                  : isActive
                  ? 'bg-[#FFB500] text-black shadow-[6px_6px_0_0_#000000] hover:-translate-y-[2px]'
                  : 'bg-transparent text-[#FFB500]/60 shadow-[3px_3px_0_0_#000000] cursor-not-allowed',
                isSuccess ? 'brutal-success' : '',
              ].join(' ')}
            >
              <span
                className={[
                  'pointer-events-none absolute inset-0',
                  isWorking && showSpinner ? 'opacity-100' : 'opacity-0',
                ].join(' ')}
              >
                <span className="absolute inset-0 bg-black" />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="h-4 w-4 rounded-full border-[3px] border-white/70 border-t-transparent animate-spin" />
                </span>
              </span>
              <span
                className={[
                  'pointer-events-none absolute inset-0',
                  isSuccess ? 'opacity-100' : 'opacity-0',
                ].join(' ')}
              >
                <span className="absolute inset-0 brutal-flash" />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="text-lg font-black text-black">✓</span>
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
                    'inline-flex transition-transform duration-300',
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
