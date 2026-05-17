export interface BoundaryNoticeProps {
  title?: string;
  text?: string;
}

export default function BoundaryNotice({
  title = "Boundary notice",
  text = "Website rendering is not proof.",
}: BoundaryNoticeProps) {
  return (
    <aside className="border-l-2 border-blue-100/50 bg-blue-100/[0.045] px-5 py-4">
      <p className="mono text-xs uppercase text-blue-100">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-200">{text}</p>
    </aside>
  );
}
