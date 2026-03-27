import { IntegrationStatus, DemandLevel } from "@/data/integrations";

const STATUS_CONFIG: Record<
  IntegrationStatus,
  { label: string; className: string }
> = {
  native: {
    label: "Native",
    className: "bg-[#d4e5ce] text-[#132f05]",
  },
  extensiv: {
    label: "Via Extensiv",
    className: "bg-[#ffe3b8] text-[#442a31]",
  },
  "zapier-make": {
    label: "Via Zapier / Make",
    className: "bg-[#cdbdff] text-[#092332]",
  },
  api: {
    label: "API Only",
    className: "bg-[#ffcecd] text-[#442a31]",
  },
  requested: {
    label: "Requested",
    className: "bg-border text-foreground opacity-70",
  },
};

const DEMAND_CONFIG: Record<DemandLevel, { label: string; className: string }> =
  {
    "very-high": {
      label: "Very High Demand",
      className: "bg-[#eeff38] text-black",
    },
    high: {
      label: "High Demand",
      className: "bg-[#ffe3b8] text-black",
    },
    medium: {
      label: "Medium Demand",
      className: "bg-border text-foreground",
    },
    low: {
      label: "Low Demand",
      className: "bg-border text-foreground opacity-70",
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
    <span className={`label-xs inline-block rounded-[6px] px-2.5 py-1 ${className}`}>
      {label}
    </span>
  );
}

export function DemandBadge({ demand }: DemandBadgeProps) {
  const { label, className } = DEMAND_CONFIG[demand];
  return (
    <span className={`label-xs inline-block rounded-[6px] px-2.5 py-1 ${className}`}>
      {label}
    </span>
  );
}
