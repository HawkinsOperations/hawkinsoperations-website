# Governance

Repository: `hawkinsoperations-website`

## Rules

1. Public-facing claims must be evidence-backed.
2. Internal host/control-plane detail is not allowed in site content.
3. No host-local paths, credentials, or secret material in tracked files.
4. Narrative updates must preserve clear private/public boundary language.

## Evidence Contract

- Evidence ledger files:
  - `evidence/EVIDENCE_LEDGER_SCHEMA.json`
  - `evidence/evidence-ledger.json`
- Entries track claim references and source-proof linkage.

## Promotion Gate

- Required governance files must exist.
- CI gate must pass before merge.
- Public-safe output only; internal control-plane data stays out.

