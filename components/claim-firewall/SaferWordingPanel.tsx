export default function SaferWordingPanel({
  original,
  safer,
  decision,
}: {
  original: string;
  safer: string;
  decision: string;
}) {
  return (
    <section className="cf-wording" aria-label="Safer wording output">
      <div className="cf-wording__lane cf-wording__lane--bad">
        <span>AI Draft</span>
        <p>{original}</p>
      </div>
      <div className="cf-wording__arrow" aria-hidden="true">-&gt;</div>
      <div className="cf-wording__lane cf-wording__lane--safe">
        <span>{decision}</span>
        <p>{safer}</p>
      </div>
    </section>
  );
}
