import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Plus, ShieldCheck, Check, Calendar, FileText } from 'lucide-react';
import { authService } from '../../services/authService';
import { storageService } from '../../services/storageService';

interface TopbarProps {
  onSearch?: (query: string) => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  const notifications = storageService.getNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery);
      } else {
        navigate(`/doctor/patients?q=${encodeURIComponent(searchQuery)}`);
      }
    }
  };

  const handleMarkAllRead = () => {
    storageService.markAllNotificationsAsRead();
    setShowNotifications(false);
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 sticky top-0 z-30 px-6 flex items-center justify-between shadow-soft">
      {/* Global Patient Search */}
      <form onSubmit={handleSearchSubmit} className="relative w-96 max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Patient Name, ID, Phone or ABHA..."
          className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all text-slate-800 placeholder-slate-400"
        />
      </form>

      {/* Action Controls & Profile */}
      <div className="flex items-center gap-3">
        {user.role === 'doctor' && (
          <button
            onClick={() => navigate('/doctor/case/new')}
            className="flex items-center gap-1.5 bg-[#1B4332] text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-[#143828] transition-all shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Case</span>
          </button>
        )}

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 relative transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900">Clinical Notifications</span>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-[11px] text-emerald-700 hover:underline font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4">No notifications</p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        storageService.markNotificationAsRead(n.id);
                        if (n.link) navigate(n.link);
                        setShowNotifications(false);
                      }}
                      className={`p-2 rounded-xl text-xs cursor-pointer transition-colors ${
                        n.read ? 'bg-slate-50 hover:bg-slate-100 text-slate-600' : 'bg-emerald-50/50 hover:bg-emerald-50 text-slate-900 font-medium'
                      }`}
                    >
                      <p className="text-xs font-semibold">{n.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{n.message}</p>
                      <p className="text-[9px] text-slate-400 mt-1">{n.timestamp}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Card */}
        <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=256'}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover border border-slate-200"
          />
          <div className="text-left hidden sm:block">
            <p className="text-xs font-semibold text-slate-900 leading-tight">{user.name}</p>
            <p className="text-[10px] text-slate-500 capitalize">{user.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
