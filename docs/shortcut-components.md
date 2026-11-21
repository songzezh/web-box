# Unified shortcut presentation

All entries in the Keyboard Shortcuts tool use `ShortcutItem`, imported from
`src/components/shortcuts`. General Windows/Linux and macOS shortcuts and all
105 Vim / Vi entries share the same keycaps, description column, trailing
chevron, inline details, sequence rendering and expansion animation.

`ShortcutItem` takes `title`, `keys`, parsed `steps`, optional `metadata` and
`details` content, and controlled `expanded` / `onToggle` props. The page owns
the active ID, filtering, application and platform; the component owns no
shortcut data, clipboard, favorites or physical keyboard listeners.

```tsx
<ShortcutItem
  title="Copy"
  keys="Ctrl+c"
  steps={shortcutSteps({ keys: 'Ctrl+c', kind: 'chord' })}
  expanded={expandedId === 'copy'}
  onToggle={() => setExpandedId(id => id === 'copy' ? null : 'copy')}
  details={<p>Application-specific information.</p>}
/>
```

Use the existing `shortcutSteps` parser to prepare steps. `ShortcutSequence`
renders the same steps as compact summary keycaps or numbered expanded steps.
Simultaneous keys use `+`; consecutive steps use arrows. Repeated keys and
command terminators remain separate steps. Platform selection changes only
general shortcuts' Ctrl/Command modifier; Vim Ctrl combinations retain their
original meaning on macOS.

Expansion preserves trigger focus, uses native button activation, and hides
collapsed content with `inert` and `aria-hidden`. Styles reuse Carbon theme
tokens and respect reduced motion. No full virtual keyboard is introduced.
