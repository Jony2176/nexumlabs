import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Bell, CheckCircle, AlertTriangle, PartyPopper } from 'lucide-react';

const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      icon: CheckCircle,
      iconClass: 'text-green-500',
      title: 'Plan actualizado',
      message: 'Tu plan se ha actualizado a Professional',
      time: 'Hace 5 minutos',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      icon: AlertTriangle,
      iconClass: 'text-yellow-500',
      title: 'Límite de llamadas',
      message: 'Has usado el 80% de tus minutos mensuales',
      time: 'Hace 1 hora',
      read: false,
      action: { label: 'Upgrade', link: '/app/subscription' }
    },
    {
      id: 3,
      type: 'info',
      icon: PartyPopper,
      iconClass: 'text-blue-500',
      title: 'Nueva funcionalidad',
      message: 'JurisPredict AI estará disponible en Q1 2026',
      time: 'Hace 2 días',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-black/5 dark:hover:bg-nexum-surface"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Bell className="w-5 h-5 theme-text-secondary" />
        {unreadCount > 0 && (
           <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 z-50 animate-scaleIn origin-top-right">
          <div className="p-4 border-b border-gray-700">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Notificaciones</h3>
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-400 hover:text-blue-300 disabled:opacity-50"
                disabled={unreadCount === 0}
              >
                Marcar todas como leídas
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.map(notif => (
              <div
                key={notif.id}
                className={`p-4 border-b border-gray-700 hover:bg-gray-700/50 transition-colors cursor-pointer
                  ${!notif.read ? 'bg-gray-700/30' : ''}`}
                onClick={() => markAsRead(notif.id)}
              >
                <div className="flex gap-3">
                  <notif.icon className={`w-6 h-6 mt-1 flex-shrink-0 ${notif.iconClass}`} />
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{notif.title}</h4>
                    <p className="text-sm text-gray-400 mt-1">{notif.message}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">{notif.time}</span>
                      {notif.action && (
                        <NavLink
                          to={notif.action.link}
                          className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
                        >
                          {notif.action.label} →
                        </NavLink>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-gray-700">
            <button 
              onClick={() => toast('La página de notificaciones estará disponible próximamente.')}
              className="w-full text-center text-sm text-gray-400 hover:text-white"
            >
              Ver todas las notificaciones
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;