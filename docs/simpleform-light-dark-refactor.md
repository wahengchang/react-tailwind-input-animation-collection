# Dev Overview — SimpleForm Light/Dark Refactor

## Role
Tech lead + architect. Provide a full refactor roadmap, governance, and samples.

## Executive Summary
We will standardize every SimpleForm variant into a 3-file structure (Light, Dark, README) while preserving behavior and timing. The refactor includes updating imports, documentation, and ensuring theme toggle works across the collection. This doc provides guidelines, samples, and cross-cutting concerns outside SimpleForm.

## Goals
- Make all SimpleForm variants follow a consistent Light/Dark/README structure.
- Keep behavior identical to current variants (state transitions, timings, labels).
- Provide clear guidance for future variants and reviews.
- Ensure global theme toggle is compatible with the new structure.

## Non-Goals
- Changing user behavior or timings.
- Introducing new state logic.
- Rewriting animation CSS unless needed for structure.

## Current State (Observed)
- Variants live directly under `src/SimpleForm/` as single files.
- Some have separate dark variants (e.g., BioFluidClay, HyperBrutalForm).
- Collection registry imports individual files.
- Theme toggle lives in `src/Collection.jsx` using `data-theme`.

## Target Structure
```
src/SimpleForm/<VariantName>/
  Light.jsx
  Dark.jsx
  README.md
```

## Variant Inventory (Expected)
- IgniteCore
- PrismConsole
- BioFluidClay
- HyperBrutalForm
- Any future variants

## README Template (per variant)
Use this structure for each `README.md`:
```
# <Variant Name>

## Intent
Short visual/motion statement.

## Palette
- Primary
- Accent
- Text
- Surface

## Motion
- Typing pulse
- Active glow
- Working spinner
- Success flash + check

## Accessibility
- Contrast notes
- Focus visibility

## Notes
- Any quirks or constraints
```

## Sample Folder (Example)
```
src/SimpleForm/CrystalLink/
  Light.jsx
  Dark.jsx
  README.md
```

## Sample Component Shell
Use this as a starting pattern inside both Light and Dark files:
```jsx
import { useEffect, useMemo, useState } from 'react';

export default function VariantLight() {
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
    <section>
      {/* visuals only; no logic changes */}
    </section>
  );
}
```

## SimpleForm Guidelines (Design + Code)
- Keep timings fixed: typing 400ms, spinner delay 180ms, success after 3s, reset after 1.6s.
- Preserve labels: `Start` and `Done`, plus arrow and checkmark affordances.
- Use Tailwind for layout; use `src/index.css` only for keyframes and complex effects.
- Prefer class arrays with `.join(' ')` for conditional styles.
- No shared state across variants.

## Collection Registry Rules
- IDs must remain stable (kebab-case).
- Each collection entry should reference the Light or Dark component explicitly.
- Mixed Grid should include one entry per variant (light + dark if both are displayed).
- Global theme toggle should only influence the global shell and CSS variables, not behavior.

## Outside SimpleForm — Cross-Cutting Concerns
- `src/index.css`: ensure global animation classes remain available and uniquely prefixed.
- `src/Collection.jsx`: update imports and keep theme toggle intact.
- `tailwind.config.js`: ensure content paths include new folders.
- Tests: update any import paths or snapshots.
- Documentation: update top-level README if it references old paths.

## Risks / Gotchas
- File moves can break imports; update all references in one pass.
- Duplicate logic between Light/Dark can drift; keep behavior identical.
- Ensure CSS custom properties for theme are defined and used consistently.

## Open Questions
- Should Light/Dark share a base component/hook to avoid duplication?
- Should Collection list Light and Dark separately or show a single variant that responds to global theme?

## Plan
1. Create variant folders and split Light/Dark components.
2. Add README per variant from template.
3. Update `src/Collection.jsx` imports and collections registry.
4. Validate theme toggle and all variants in both modes.
5. Update docs/tests if any import paths changed.

## Review Checklist
- Behavior timings unchanged.
- Light and Dark render correctly.
- No broken imports.
- Mixed Grid still works.
- Theme toggle still functional.
