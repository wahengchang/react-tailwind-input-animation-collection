## SimpleForm Variant Guidelines (Instructions)

Use this document when designing a new SimpleForm variant. The goal is to keep identical user behavior across variants while exploring a distinct visual and interaction style.

**Scope**
- Create a new variant folder in `src/SimpleForm/` with the same behavior as existing variants.
- Change only styling, micro-interactions, and motion language.
- Keep code structure readable and consistent with the existing components.

**How to start**
- Copy `src/SimpleForm/StarterVariant/Light.jsx` into your new variant folder as `Light.jsx`.
- Duplicate the same structure for `Dark.jsx`, keeping logic identical.
- Update the title and helper text to match your theme.
- Replace colors, shapes, and motion classes while keeping all state logic intact.

**Required user behavior (must match exactly)**
- Single text input with placeholder text.
- Typing triggers a brief “typing pulse” (≈400ms) and activates the form once non-empty.
- Primary button is disabled when input is empty.
- Clicking the button while active starts `working`.
- Show a delayed spinner (≈180ms after click).
- Transition to `success` after ≈3s.
- Success state shows confirmation (`Done` + checkmark) and resets to `idle` after ≈1.6s.
- Input and button are locked during `working` and `success`.

**Required states**
- `idle` (default).
- `working` (spinner visible after delay).
- `success` (confirmation visuals).

**Element map**
| Element | Sub-elements | Behavior |
| --- | --- | --- |
| Container | Title, helper text, input area, action area | Static shell that frames the variant’s theme and mood. |
| Title | Short label | No state changes; sets tone for the variant. |
| Helper text | One-line description | No state changes; clarifies intent and theme. |
| Input field | Placeholder text, caret, focus ring/glow | Activates on non-empty value; typing triggers a brief pulse; locked during `working` and `success`. |
| Input wrapper | Border, background, inner glow | Visual response to active/typing/focus states; no logic changes. |
| Primary button | Label, arrow icon, base chrome | Disabled when input empty; starts `working` on click; locked during `working` and `success`. |
| Spinner layer | Spinner + optional gradient wash | Appears after ≈180ms in `working`; hides otherwise. |
| Success layer | Flash, ripples, particles, checkmark | Shows during `success`; resets to `idle` after ≈1.6s. |
| Motion accents | Hover lift, breathe, pulse, glow | Optional; must not alter timings or state transitions. |

**Design freedom (what you can change)**
- Color palette, glow style, gradients, and borders.
- Input shape (rounded rectangle, pill, beveled, etc.).
- Button chrome (ring, outline, shadow, glass, etc.).
- Micro-interactions (hover lift, breathe, ripple, lens flare).
- Background treatment inside the component container.
- Copy tone (headline + helper text) as long as intent remains clear.

**Consistency rules**
- Do not add extra inputs or steps.
- Do not change timings, labels, or state transitions.
- Do not introduce new actions beyond the single submit button.
- Keep labels: `Start` during idle/active, `Done` during success.
- Keep the checkmark and arrow affordance.

**Accessibility & UX quality**
- Maintain readable text contrast against backgrounds.
- Ensure focus styles are visible when the input is focused.
- Avoid motion that obscures the label or input value.

**Deliverable checklist**
- New variant folder in `src/SimpleForm/<VariantName>/`.
- `Light.jsx`, `Dark.jsx`, and `README.md` added for the variant.
- Visual identity clearly different from IgniteCore and PrismConsole.
- Behavior matches the list above.
- Uses functional component + hooks only.
