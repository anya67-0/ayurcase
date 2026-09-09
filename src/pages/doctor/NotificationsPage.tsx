import React, { useState } from 'react';
import { Bell, CheckCheck, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import { storageService } from '../../services/storageService';
import { NotificationItem } from '../../types';

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(storageService.getNotifications());

  const handleMarkAllRead = () => {
    storageService.markAllNotificationsAsRead();
    setNotifications(storageService.getNotifications());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold font-serif text-slate-900">Notifications Center</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Clinical appointment updates, case draft autosaves, and system alerts
          </p>
        </div>

        <button
          onClick={handleMarkAllRead}
          className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 transition-colors"
        >
          <CheckCheck className="w-4 h-4" />
          <span>Mark All as Read</span>
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
              n.read ? 'bg-white border-slate-200 text-slate-600' : 'bg-emerald-50/40 border-emerald-200 text-slate-900 font-medium'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold">{n.title}</h3>
                <p className="text-xs text-slate-600 mt-0.5">{n.message}</p>
                <span className="text-[10px] text-slate-400 mt-1 inline-block">{n.timestamp}</span>
              </div>
            </div>

            {!n.read && (
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0 mt-1" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
