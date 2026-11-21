# Reusable keyboard

Import `Keyboard`, `ansiKeyboardLayout`, and the exported types from
`src/components/keyboard`. The default layout preserves the 78 keys and six rows
of the user-supplied Uiverse.io reference, attributed in that source to dexter-st.
Rounded keycaps and dimensional shadows are local exceptions to the Carbon
surface treatment requested for this keyboard. All colors come from existing
Carbon theme tokens; no additional theme or language store is introduced.

| Prop | Default | Meaning |
| --- | --- | --- |
| `platform` | `windows` | `mac` uses Command, Option, Return and Delete labels. |
| `layout` | `ansiKeyboardLayout` | Readonly rows of keys: unique `code`, `label`, proportional `units`, optional `macLabel`, `detectable`. |
| `activeKeys` | `[]` | Persistent highlighted codes, independent of physical state. |
| `interactive` | `true` | Use semantic buttons; false renders non-interactive spans. |
| `listenToKeyboard` | `false` | Observe physical presses without cancelling or generating native events. Independent of mouse interactivity. |
| `onKeyClick` | — | Virtual activation callback with stable code. |
| `onKeyDown`, `onKeyUp` | — | Observed physical transitions; repeated keydown is ignored. |
| `className` | empty | Additional wrapper class. |

The Keyboard Shortcuts tool is registered in Development & Test at
`#/tools/keyboard-shortcuts`. Its parent owns platform, persistent selection and
listening state. Example combinations are code arrays; virtual clicks toggle
selection. Physical state is scoped to the component and cleared on blur,
document hiding, listener changes and unmount. Loss-of-focus resets do not
synthesize `onKeyUp` callbacks. Command release clears temporary presses because
macOS can swallow other keyup events. Custom layouts must supply unique codes.

The existing theme hook still defaults to the system preference. After an explicit
light/dark selection, the header now offers a monitor button to restore system
following. Existing i18next resources supply English and Chinese help and labels.

## Validation

- Automated component tests cover all 78 keys, unique IDs, platform labels,
  persistent highlights, multiple presses, repeat filtering, release, blur,
  native-event preservation, special-key fallback, listener toggling, custom
  layout, display mode, Chinese labels, click callbacks and unmount cleanup.
- Full project tests, TypeScript/build and ESLint pass. Vite reports its existing
  large-chunk advisory; test workers may report an HMR port collision without
  test failures.
- The board has a readable minimum width inside a constrained horizontal scroll
  region, and reduced-motion disables transitions. Real-browser visual, mobile
  overflow and physical hardware acceptance could not be completed: access to
  the local preview origin was denied by the browser permission gate.

## Browser limits

Fn and Eject retain virtual IDs with `detectable: false`: clicks and external
highlights work but standard physical events are not reliable. OS-reserved keys,
browser commands, IME and some Command combinations may withhold events. The
component observes only events delivered while the page is focused and never
executes shortcuts. ANSI labels describe physical positions (`event.code`), not
the active OS character map. This compact source layout has a number row rather
than a separate numeric keypad.
