import type { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
};

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl bg-[#D3EFFA] px-8 py-16">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#e8f6fd]">
        <Icon className="h-12 w-12 text-gray-600" />
      </div>
      <h3 className="mb-3 text-2xl font-bold text-gray-900">{title}</h3>
      <p className="mb-6 max-w-md text-center text-lg text-gray-600">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
}
