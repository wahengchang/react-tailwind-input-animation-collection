import { useEffect, useState } from 'react';

export default function DocLink({
  docUrl,
  label,
  title = 'Documentation',
  linkClassName,
  panelClassName,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!isOpen || !docUrl) return;
    let isActive = true;

    fetch(docUrl)
      .then((response) => response.text())
      .then((text) => {
        if (isActive) setContent(text);
      });

    return () => {
      isActive = false;
    };
  }, [docUrl, isOpen]);

  return (
    <>
      <button
        type="button"
        className={linkClassName}
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        {label}
      </button>
      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close documentation"
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsOpen(false)}
          />
          <div
            className={[
              'relative z-10 max-h-[80vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10',
              panelClassName,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h3 className="text-sm font-semibold">{title}</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold transition hover:border-white/30"
              >
                Close
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto px-5 py-4 text-sm leading-relaxed">
              {content ? (
                <pre className="whitespace-pre-wrap text-xs leading-relaxed">
                  {content}
                </pre>
              ) : (
                <p className="text-xs text-slate-400">Loading documentation…</p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
