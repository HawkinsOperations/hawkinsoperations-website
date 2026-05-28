export default function HomeTrustBoundaryPanel() {
  return (
    <aside className="htbp" aria-label="Trust boundary">
      <div className="htbp__rail">
        <span className="htbp__seal" aria-hidden="true">
          <svg viewBox="0 0 48 48" role="presentation">
            <defs>
              <linearGradient id="htbpSteel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EEF4FA" />
                <stop offset="55%" stopColor="#8A96A7" />
                <stop offset="100%" stopColor="#2A3340" />
              </linearGradient>
              <linearGradient id="htbpEdge" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#5FBFFF" stopOpacity="0" />
                <stop offset="50%" stopColor="#8FD8FF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#5FBFFF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle
              cx="24"
              cy="24"
              r="21"
              fill="none"
              stroke="url(#htbpEdge)"
              strokeWidth="0.9"
              opacity="0.85"
            />
            <circle
              cx="24"
              cy="24"
              r="17"
              fill="none"
              stroke="url(#htbpSteel)"
              strokeWidth="0.7"
              opacity="0.55"
            />
            <path
              d="M24 10 L37 15 V25 C37 33 31 38 24 40 C17 38 11 33 11 25 V15 Z"
              fill="none"
              stroke="url(#htbpSteel)"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <rect
              x="20.5"
              y="22.5"
              width="7"
              height="7.5"
              rx="1.1"
              fill="none"
              stroke="#8FD8FF"
              strokeWidth="1.1"
            />
            <path
              d="M21.8 22.5 V20 a2.2 2.2 0 0 1 4.4 0 V22.5"
              fill="none"
              stroke="#8FD8FF"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
          </svg>
        </span>

        <div className="htbp__body">
          <p className="htbp__eyebrow">Trust boundary</p>
          <p className="htbp__copy">
            Website rendering routes reviewers to proof. It does not authorize claims.{" "}
            <strong>Evidence, validators, and human review do.</strong>
          </p>
        </div>

        <span className="htbp__edge" aria-hidden="true" />
      </div>
    </aside>
  );
}
