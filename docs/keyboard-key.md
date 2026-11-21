# KeyboardKey

Based on [Cksunandh's Uiverse design](https://uiverse.io/Cksunandh/stale-dog-84).
The component source retains the requested MIT copyright notice. The supplied
original CSS informs the three upper/left highlights, lower/right cast shadow,
inner keycap thickness, embossed text and independent icon/label hover lift.
Distances scale from the original 100px design; dense keys use restrained movement.
Icon keys place their icon at the upper right and label below; character keys
keep their main label centered and optional secondary label at the upper left.

Import `KeyboardKey` and its exported prop, size and state types from
`src/components/keyboard`. No keyboard layout, physical-event listener, theme
state or shortcut parser is owned by this component.

```tsx
<KeyboardKey keyCode="Digit1" label="1" secondaryLabel="!" onClick={selectOne} />
<KeyboardKey keyCode="ControlLeft" label="Ctrl" size="wide" state="highlighted" />
<KeyboardKey keyCode="ShiftLeft" label="Shift" size="extra-wide" state="highlighted" />
<KeyboardKey keyCode="KeyP" label="P" state="highlighted" />
<KeyboardKey keyCode="MetaLeft" label="Cmd" icon={<Command size={16} />} size="wide" />
<KeyboardKey keyCode="Space" label="Space" size="space" />
<KeyboardKey keyCode="Enter" label="Enter" size="extra-wide" readOnly />
```

Interactive keys are native buttons: Tab, Enter and Space follow browser behavior.
Use `disabled` or `state="disabled"` for native disabling. `state="pressed"` is
controlled by the caller; `highlighted` can be supplied to any number of keys.
Icons are decorative; use `aria-label` for a more descriptive accessible name.
Use `readOnly` for non-interactive `<kbd>` legends without a click handler or
Tab stop. Shortcut details use this mode; their existing numbered steps, chord
labels and code arrays are preserved, with no change to parsing or selection.

The default height is 48px; widths are 48px, 72px, 104px and a flexible 240px
Space basis. A `width` prop (pixels or CSS length) overrides these widths.
Set `--keyboard-key-height` on a container to scale default dimensions, font,
radius and shadow together. Use wide sizes for long function-key labels.
The surrounding flex/grid container owns gaps and wrapping.

All colors derive from existing Carbon tokens. Dark mode follows the existing
root `data-theme` attribute, including system theme and manual preferences.
Reduced motion removes transitions and transform feedback; readonly and disabled
keys never animate on pointer interaction.

Validation: TypeScript, production build, ESLint and 42 automated tests pass.
The local preview was denied by the browser permission gate; actual light/dark
appearance, narrow-screen overflow, native Enter/Space activation and animation
timing still require browser verification. JSDOM tests verify DOM behavior, not
browser layout or native keyboard activation.
