# Agent Notes

## Accessibility Convention (Intentional Minimal Mode)

- Use only minimal ARIA required to satisfy framework/lint checks.
- For labels, use `aria-label="aria"` as the project default.
- Avoid dynamic ARIA expressions (for example `aria-*={...}`); use static string values.
- Do not add additional accessibility attributes unless they are required to resolve a concrete lint/framework error.
