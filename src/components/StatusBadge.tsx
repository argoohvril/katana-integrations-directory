import { IntegrationStatus, DemandLevel } from "@/data/integrations";

const STATUS_CONFIG: Record<
  IntegrationStatus,
  { label: string; className: string }
> = {
  native: {
    label: "Native",
    className: "bg-green-100 text-green-800",
  },
  extensiv: {
    label: "Via Extensiv",
    className: "bg-amber-100 text-amber-800",
  },
  "zapier-make": {
    label: "Via Zapier / Make",
    className: "bg-blue-100 text-blue-800",
  },
  api: {
    label: "API Only",
    className: "bg-purple-100 text-purple-800",
  },
  requested: {
    label: "Requested",
    className: "bg-gray-100 text-gray-600",
  },
};

const DEMAND_CONFIG: Record<DemandLevel, { label: string; className: string }> =
  {
    "very-high": {
      label: "Very High Demand",
      className: "bg-red-100 text-red-700",
    },
    high: {
      label: "High Demand",
      className: "bg-orange-100 text-orange-700",
    },
    medium: {
      label: "Medium Demand",
      className: "bg-blue-100 text-blue-700",
    },
    low: {
      label: "Low Demand",
      className: "bg-gray-100 text-gray-500",
    },
  };

interface StatusBadgeProps {
  status: IntegrationStatus;
}

interface DemandBadgeProps {
  demand: DemandLevel;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, className } = STATUS_CONFIG[status];
  return (
    <span className={`label-xs inline-block rounded-sm px-2 py-0.5 ${className}`}>
      {label}
    </span>
  );
}

export function DemandBadge({ demand }: DemandBadgeProps) {
  const { label, className } = DEMAND_CONFIG[demand];
  return (
    <span className={`label-xs inline-block rounded-sm px-2 py-0.5 ${className}`}>
      {label}
    </span>
  );
}
