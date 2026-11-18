# Pickup Point – Check-in Board

A responsive check-in and vehicle-pickup board prototype built with React,
TypeScript, Next.js, and Apollo Client. It has a lobby-display layout and a
mobile "your check-in" view that share one GraphQL query.

> **Built with AI assistance.** I used an AI coding assistant to generate the first version
> of the UI, then reviewed, restructured, and tested it myself. See
> [What I changed after review](#what-i-changed-after-review).
> This is a front-end prototype with a mock data layer, not a production
> check-in system. All names and data are fictional.
> Independent portfolio project, not affiliated with or endorsed by any company.

## Origin

A manager at work informally asked what a modern vehicle-pickup check-in
board could look like. I built a quick AI-assisted prototype to answer that,
with the emphasis on how it looked and felt rather than on a working backend.
I then rebuilt it into this version: de-branded, split into maintainable
modules, tested, and wired to a mock GraphQL API so the data layer can be
swapped for a real service later.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Checks:

```bash
npm run typecheck
npm run lint
npm test           # uses Bun's test runner (bun.sh)
npm run build
```

## Architecture: swappable data layer

```text
components
    ↓
GET_INBOUND_DASHBOARD / SUBMIT_FEEDBACK   (typed GraphQL documents)
    ↓
Apollo Client
    ├── SchemaLink → in-memory mock schema   (default)
    └── HttpLink   → real GraphQL API        (set NEXT_PUBLIC_GRAPHQL_URL)
```

The UI never knows which transport is active, because both satisfy the same
typed contract. A backend can be built separately and dropped in with one
environment variable. Only these files change when that happens:

- `lib/apollo/client.ts` for the transport
- `features/inbound-dashboard/graphql/operations.ts` for contract changes
- `features/inbound-dashboard/graphql/mockSchema.ts` and
  `data/mockDashboard.ts` for mock-only behaviour

## Domain model

`features/inbound-dashboard/types.ts` models a guest's journey
(`CHECKING_IN → VEHICLE_IN_DETAIL → VEHICLE_ON_STANDBY → VEHICLE_READY`) and
the unhappy path (`VEHICLE_NOT_READY`), plus specialist availability
(`READY`, `WITH_GUEST`, `WRAPPING_UP`).

## What I changed after review

The first AI-generated version worked but had problems I fixed:

- **One 919-line component** held all state, helpers, and three views. It is
  now small focused modules: components, hooks (`useClock`,
  `useModalBehavior`, `useFeedbackForm`), and pure helpers in `lib/`.
- **Feedback was collected and then thrown away.** It now goes through a
  `submitFeedback` mutation with server-side validation (rating range, comment
  length, empty input) and error handling in the form.
- **Stale data:** the board now polls every 15 seconds instead of only
  advancing a local clock.
- **Duplicated modal logic** (Escape, scroll lock, focus) is one shared hook.
- **Failing typecheck** from missing ambient types, plus unrelated platform
  scaffolding and leftover auth code, were removed.
- **Tests grew from 2 to 16** and cover formatting boundaries, the profile
  helper, the query contract, and mutation validation.

## Known limitations

- No persistence: mock feedback lives in memory and resets on reload.
- No way to actually check a guest in or change a status yet (read-only apart
  from feedback).
- No authentication.
- The 3D row backgrounds (`three` / `@react-three/fiber`) are decorative and
  add weight; I'd drop or lazy-load them for a real lobby display.
- Specialist profile stats are generated from IDs for demo purposes.
