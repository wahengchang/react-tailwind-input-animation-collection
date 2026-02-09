import { useEffect, useMemo, useState } from 'react';

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const formatInline = (value) =>
  value
    .replace(/`([^`]+)`/g, '<code class="rounded bg-white/10 px-1 py-0.5 font-mono text-xs">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-sky-300 hover:text-sky-200 underline underline-offset-4">$1</a>',
    );

const markdownToHtml = (markdown) => {
  const chunks = markdown.split('```');

  return chunks
    .map((chunk, index) => {
      if (index % 2 === 1) {
        const [firstLine, ...rest] = chunk.split('\n');
        const code = escapeHtml(rest.join('\n').trimEnd());
        const language = firstLine.trim();
        return `
          <pre class="overflow-x-auto rounded-lg bg-black/30 p-4 text-xs">
            <code data-language="${escapeHtml(language)}">${code}</code>
          </pre>
        `;
      }

      const lines = chunk.split('\n');
      let html = '';
      let inList = null;

      const closeList = () => {
        if (inList) {
          html += `</${inList}>`;
          inList = null;
        }
      };

      lines.forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed) {
          closeList();
          return;
        }

        const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
        if (headingMatch) {
          closeList();
          const level = headingMatch[1].length;
          const headingText = formatInline(escapeHtml(headingMatch[2]));
          const sizeClass = level === 1 ? 'text-base' : level === 2 ? 'text-sm' : 'text-xs';
          html += `<h${level} class="${sizeClass} font-semibold tracking-wide">${headingText}</h${level}>`;
          return;
        }

        const listMatch = trimmed.match(/^([*-]|\d+\.)\s+(.*)$/);
        if (listMatch) {
          const ordered = /^\d+\./.test(listMatch[1]);
          const listTag = ordered ? 'ol' : 'ul';
          if (inList !== listTag) {
            closeList();
            inList = listTag;
            html += `<${listTag} class="space-y-2 pl-5 ${ordered ? 'list-decimal' : 'list-disc'}">`;
          }
          html += `<li>${formatInline(escapeHtml(listMatch[2]))}</li>`;
          return;
        }

        closeList();
        html += `<p>${formatInline(escapeHtml(trimmed))}</p>`;
      });

      closeList();
      return html;
    })
    .join('');
};

export default function DocLink({
  docUrl,
  label,
  title = 'Documentation',
  linkClassName,
  panelClassName,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const formattedContent = useMemo(
    () => (content ? markdownToHtml(content) : ''),
    [content],
  );

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
            <div className="max-h-[70vh] overflow-y-auto px-5 py-4 text-sm leading-relaxed space-y-3">
              {formattedContent ? (
                <div
                  className="space-y-3"
                  dangerouslySetInnerHTML={{ __html: formattedContent }}
                />
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
