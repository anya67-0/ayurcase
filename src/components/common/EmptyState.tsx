import React from 'react';
import { AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-dashed border-slate-200 text-center">
      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
        {icon || <AlertCircle className="w-6 h-6" />}
      </div>
      <h3 className="text-sm font-bold text-slate-800 mb-1">{title}</h3>
      <p className="text-xs text-slate-500 max-w-sm mb-4">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-3.5 py-2 bg-[#1B4332] text-white text-xs font-medium rounded-xl hover:bg-[#143828] transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
