/**
 * Blocked-claim firewall — expandable strip.
 *
 * Each entry is a claim that stays blocked from the public surface, paired
 * with the reason it is blocked. The firewall keeps blocked claims visible
 * and visually separate from proof-positive content; blocked claims are not
 * features. Each `term` line sits next to its `detail` so the boundary stays
 * explicit.
 */

export type BlockedFirewallEntry = { term: string; detail: string };

export const blockedClaimFirewall: BlockedFirewallEntry[] = [
  { term: "runtime-active", detail: "No public runtime evidence is linked; blocked." },
  { term: "signal-observed", detail: "No public signal-observation receipt; blocked." },
  { term: "production-ready", detail: "Production readiness is not claimed; blocked." },
  { term: "customer-deployed", detail: "No customer deployment; blocked." },
  { term: "fleet-wide", detail: "No fleet-wide coverage is claimed; blocked." },
  { term: "live AWS", detail: "Cloud validation is fixture-only; live AWS blocked." },
  { term: "live IdP", detail: "Identity validation is fixture-only; live IdP blocked." },
  { term: "live Splunk", detail: "No live Splunk firing is claimed; blocked." },
  { term: "Cribl-routed proof", detail: "No Cribl-routed telemetry proof; blocked." },
  { term: "Security Onion observed proof", detail: "Contract sample only; observed proof blocked." },
  { term: "public-safe runtime", detail: "Public-safe runtime proof is not claimed; blocked." },
  { term: "autonomous SOC", detail: "No autonomous SOC operation; blocked." },
  { term: "AI-approved disposition", detail: "AI is labor; AI-approved disposition is blocked." },
  { term: "analyst-approved disposition", detail: "No analyst-approved disposition; blocked." },
  { term: "response automation", detail: "No production response automation; blocked." },
  { term: "containment execution", detail: "Containment execution is not claimed; blocked." },
  { term: "closure execution", detail: "Case closure execution is not claimed; blocked." },
  { term: "suppression execution", detail: "Suppression execution is not claimed; blocked." },
];
