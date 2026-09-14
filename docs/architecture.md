# Playbook Platform — first vertical slice

This repository currently delivers a browser-first **demo** vertical slice. The browser client owns a normalized incident view, a versioned playbook definition, deterministic in-browser execution state, and a mock automation provider. Demo integration boundaries are deliberately visible in the UI: the incident is an Efecte-style record and the AD operations are simulated.

## Boundaries

- **Designer**: edits a portable node/edge graph and maintains draft/published version state.
- **Runtime**: walks the graph deterministically, records status and outputs, and pauses for a technician task.
- **ITSM write-back**: appends an execution summary to the mock incident only after the task is confirmed.
- **Production path**: a server-side API, tenant-scoped persistence, RBAC, real connectors, and an `AutomationProvider` implementation must replace these demo adapters before production use. Credentials are intentionally absent.

The slice is structured to make the user journey testable without misrepresenting a mock connector as a production integration.
