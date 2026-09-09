import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'amber' | 'blue' | 'purple' | 'red' | 'gray' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'green',
  size = 'md',
  className = '',
  icon
}) => {
  const variantStyles = {
    green: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    amber: 'bg-amber-50 text-amber-800 border-amber-200',
    blue: 'bg-sky-50 text-sky-800 border-sky-200',
    purple: 'bg-purple-50 text-purple-800 border-purple-200',
    red: 'bg-rose-50 text-rose-800 border-rose-200',
    gray: 'bg-slate-100 text-slate-700 border-slate-200',
    gold: 'bg-yellow-50 text-yellow-900 border-yellow-200'
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5'
  };

  return (
    <span className={`inline-flex items-center gap-1 font-medium border rounded-full transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {icon && <span className="inline-block">{icon}</span>}
      {children}
    </span>
  );
};
