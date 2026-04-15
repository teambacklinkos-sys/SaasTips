import { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const CONFIG = {
  success: {
    icon: CheckCircle,
    bar: 'bg-emerald-500',
    iconClass: 'text-emerald-500',
    border: 'border-emerald-200',
  },
  error: {
    icon: AlertCircle,
    bar: 'bg-red-500',
    iconClass: 'text-red-500',
    border: 'border-red-200',
  },
  info: {
    icon: Info,
    bar: 'bg-blue-500',
    iconClass: 'text-blue-500',
    border: 'border-blue-200',
  },
};

export default function Toast({ toast, onRemove }) {
  const [exiting, setExiting] = useState(false);

  const cfg = CONFIG[toast.type] || CONFIG.info;
  const Icon = cfg.icon;

  const handleRemove = () => {
    setExiting(true);
    setTimeout(() => onRemove(toast.id), 220);
  };

  useEffect(() => {
    const timer = setTimeout(handleRemove, toast.duration);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`relative flex items-start gap-3 bg-white border ${cfg.border} shadow-lg rounded-xl px-4 py-3 min-w-[280px] max-w-sm overflow-hidden
        ${exiting ? 'animate-toast-out' : 'animate-toast-in'}`}
    >
      <Icon size={18} className={`shrink-0 mt-0.5 ${cfg.iconClass}`} />
      <p className="text-sm font-medium text-slate-800 flex-1 pr-4">{toast.message}</p>
      <button
        onClick={handleRemove}
        className="absolute top-2.5 right-2.5 text-slate-300 hover:text-slate-500 transition"
        aria-label="Dismiss"
      >
        <X size={13} />
      </button>

      {/* Progress bar */}
      <span
        className={`absolute bottom-0 left-0 h-0.5 ${cfg.bar} animate-shrink-bar`}
        style={{ animationDuration: `${toast.duration}ms` }}
      />
    </div>
  );
}
