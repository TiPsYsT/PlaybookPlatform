# Playbook Platform — demo

A browser-first demonstration of the first Playbook Platform vertical slice: an Efecte-style account-lockout incident, visual workflow designer, deterministic mock AD automations, a technician task, execution history, and incident write-back.

> **Demo only.** The Efecte and Azure DevOps/AD behaviours shown here are simulated. No production credentials, connectors, or customer data are used.

## Test it locally

### Requirements

- Node.js **20 or newer** (no package installation is required).

### Start the demo

```bash
npm run dev
```

Open **http://127.0.0.1:4173** in a browser. The terminal will keep running while the demo is available; use `Ctrl+C` to stop it.

If that port is occupied, choose another one:

```bash
PORT=4300 npm run dev
```

Then open `http://127.0.0.1:4300`.

### Suggested demo journey

1. Open **ITSM** and select the Efecte-style incident `INC-12345`.
2. Click **Start playbook** to create the deterministic AD Account Lockout run.
3. Open **Runs** to see the completed automatic steps and the pending technician task.
4. Click **Confirm user can sign in**.
5. Return to **ITSM** to see the execution summary written back into the incident activity.
6. Open **Designer** to inspect the workflow. Drag a palette step onto the canvas, select a step to inspect it, or save/publish the demo definition.

## Verify locally

```bash
npm run check
```

The check runs syntax/build validation, lint validation, model tests, and a real HTTP smoke test against the static demo server.

## Demo architecture

See [the architecture document](docs/architecture.md) for the browser demo boundaries and the production architecture work that remains.
