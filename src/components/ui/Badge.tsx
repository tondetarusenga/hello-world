import clsx from 'clsx';
import { LoadStatus, TruckStatus, DriverStatus } from '../../types';

type BadgeVariant = 'success' | 'warning' | 'info' | 'danger' | 'secondary' | 'orange' | 'purple';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
}

const LOAD_STATUS_VARIANTS: Record<LoadStatus, BadgeVariant> = {
  posted: 'warning',
  assigned: 'info',
  in_transit: 'orange',
  delivered: 'success',
  cancelled: 'danger',
};

const LOAD_STATUS_LABELS: Record<LoadStatus, string> = {
  posted: 'Open',
  assigned: 'Assigned',
  in_transit: 'In Transit',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

const TRUCK_STATUS_VARIANTS: Record<TruckStatus, BadgeVariant> = {
  available: 'success',
  on_job: 'orange',
  maintenance: 'warning',
  offline: 'secondary',
};

const DRIVER_STATUS_VARIANTS: Record<DriverStatus, BadgeVariant> = {
  available: 'success',
  on_job: 'orange',
  offline: 'secondary',
};

export function LoadStatusBadge({ status }: { status: LoadStatus }) {
  return (
    <Badge variant={LOAD_STATUS_VARIANTS[status]} dot>
      {LOAD_STATUS_LABELS[status]}
    </Badge>
  );
}

export function TruckStatusBadge({ status }: { status: TruckStatus }) {
  const labels: Record<TruckStatus, string> = {
    available: 'Available',
    on_job: 'On Job',
    maintenance: 'Maintenance',
    offline: 'Offline',
  };
  return (
    <Badge variant={TRUCK_STATUS_VARIANTS[status]} dot>
      {labels[status]}
    </Badge>
  );
}

export function DriverStatusBadge({ status }: { status: DriverStatus }) {
  const labels: Record<DriverStatus, string> = {
    available: 'Available',
    on_job: 'On Job',
    offline: 'Offline',
  };
  return (
    <Badge variant={DRIVER_STATUS_VARIANTS[status]} dot>
      {labels[status]}
    </Badge>
  );
}

export default function Badge({ variant = 'secondary', children, dot = false, className }: BadgeProps) {
  const variants: Record<BadgeVariant, string> = {
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    info: 'bg-blue-50 text-blue-700 border border-blue-200',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200',
    secondary: 'bg-slate-100 text-slate-600 border border-slate-200',
    orange: 'bg-orange-50 text-orange-700 border border-orange-200',
    purple: 'bg-purple-50 text-purple-700 border border-purple-200',
  };

  const dotColors: Record<BadgeVariant, string> = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    info: 'bg-blue-500',
    danger: 'bg-rose-500',
    secondary: 'bg-slate-400',
    orange: 'bg-orange-500',
    purple: 'bg-purple-500',
  };

  return (
    <span className={clsx('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium', variants[variant], className)}>
      {dot && <span className={clsx('w-1.5 h-1.5 rounded-full flex-shrink-0', dotColors[variant])} />}
      {children}
    </span>
  );
}
