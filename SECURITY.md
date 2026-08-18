# Security and deployment boundaries

## Browser configuration

Only `SUPABASE_URL` and the publishable/anon key belong in `js/config.js`. The anon key is not a database bypass; Row Level Security is mandatory. A `service_role`/secret key bypasses RLS and may exist only in a trusted Supabase Edge Function or server environment.

## Database enforcement

- A trigger rejects browser changes to role, suspension, XP, level, and rank.
- `approve_quest()` creates the audited XP transaction, and its unique quest reference blocks duplicate rewards.
- Normal quests must target accepted friends; an unordered unique index prevents reverse-direction friendship duplicates.
- A quest transition trigger prevents players from changing rewards, targets, system flags, completion dates, or invalid status states.
- System quests and approval authorization are checked in PostgreSQL with `is_admin()`, not only in JavaScript.
- RLS restricts every public application table.

## Storage enforcement

`avatars` and `materials` are private. Bucket MIME and size limits are defined in the schema. Upload paths must start with the authenticated UUID. Material reads require the associated `materials` record to pass its RLS policy; signed URLs require Storage `SELECT` permission and last 60 seconds.

## Operations

- Add exact GitHub Pages paths to Supabase Auth Redirect URLs; do not use broad production wildcards.
- Enable confirmation and configure Auth password/rate-limit settings. Use custom SMTP in production.
- Promote admins in SQL—not from email address/client metadata.
- Features requiring a service key must use an Edge Function/server with the key held in Supabase secrets, never GitHub Pages.
