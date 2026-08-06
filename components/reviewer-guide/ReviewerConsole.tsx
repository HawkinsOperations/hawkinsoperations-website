"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  reviewerConsole,
  type ConsoleTabId,
} from "../../src/data/reviewerGuide";

const tabs: ConsoleTabId[] = ["view", "clone", "run", "verify"];

export default function ReviewerConsole() {
  const [activeTab, setActiveTab] = useState<ConsoleTabId>("view");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tabRefs = useRef(new Map<ConsoleTabId, HTMLButtonElement>());
  const items = reviewerConsole[activeTab];
  const selected = items[Math.min(selectedIndex, items.length - 1)];

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);

  const chooseTab = (tab: ConsoleTabId) => {
    setActiveTab(tab);
    setSelectedIndex(0);
    setCopyStatus("idle");
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, tab: ConsoleTabId) => {
    const currentIndex = tabs.indexOf(tab);
    let nextIndex: number | undefined;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabs.length - 1;
    if (nextIndex === undefined) return;
    event.preventDefault();
    const nextTab = tabs[nextIndex];
    chooseTab(nextTab);
    window.requestAnimationFrame(() => tabRefs.current.get(nextTab)?.focus());
  };

  const copyValue = async () => {
    try {
      await navigator.clipboard.writeText(selected.value);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopyStatus("idle"), 2200);
  };

  return (
    <div className="rg-console" data-presentation-ignore-keys>
      <div className="rg-console__tabs" role="tablist" aria-label="Reviewer console modes">
        {tabs.map((tab) => (
          <button
            key={tab}
            ref={(element) => { if (element) tabRefs.current.set(tab, element); }}
            id={`reviewer-console-tab-${tab}`}
            type="button"
            role="tab"
            tabIndex={activeTab === tab ? 0 : -1}
            aria-selected={activeTab === tab}
            aria-controls="reviewer-console-panel"
            onClick={() => chooseTab(tab)}
            onKeyDown={(event) => onTabKeyDown(event, tab)}
          >{tab}</button>
        ))}
      </div>
      <div id="reviewer-console-panel" className="rg-console__body" role="tabpanel" aria-labelledby={`reviewer-console-tab-${activeTab}`}>
        <div className="rg-console__items" role="list" aria-label={`${activeTab} reviewer actions`}>
          {items.map((item, index) => (
            <button key={item.label} type="button" role="listitem" aria-pressed={selectedIndex === index} onClick={() => { setSelectedIndex(index); setCopyStatus("idle"); }}>
              <span>{String(index + 1).padStart(2, "0")}</span><strong>{item.label}</strong><small>{item.owner}</small>
            </button>
          ))}
        </div>
        <div className="rg-console__terminal">
          <div className="rg-console__terminal-head"><span>{activeTab.toUpperCase()} / {selected.owner}</span><i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" /></div>
          <p>{selected.description}</p>
          <div className="rg-console__command">
            <span aria-hidden="true">{selected.href ? "route" : "$"}</span>
            <code>{selected.value}</code>
            {selected.href ? (
              <a href={selected.href} target={selected.href.startsWith("http") ? "_blank" : undefined} rel={selected.href.startsWith("http") ? "noopener noreferrer" : undefined}>Open <span aria-hidden="true">↗</span></a>
            ) : (
              <button type="button" onClick={copyValue} aria-label={`Copy ${selected.label} command`}>{copyStatus === "copied" ? "Copied" : copyStatus === "failed" ? "Copy failed" : "Copy"}</button>
            )}
          </div>
          <div className="rg-console__contract">
            <dl>
              <div><dt>Scope</dt><dd>{selected.scope}</dd></div>
              <div><dt>Expected</dt><dd>{selected.expected}</dd></div>
              <div><dt>Owner</dt><dd>{selected.owner}</dd></div>
              <div><dt>Does not prove</dt><dd>{selected.doesNotProve}</dd></div>
            </dl>
          </div>
          <span className="rg-console__copy-status" role="status" aria-live="polite">{copyStatus === "copied" ? "Command copied to clipboard." : copyStatus === "failed" ? "Clipboard unavailable; the command remains selectable." : ""}</span>
        </div>
      </div>
    </div>
  );
}
