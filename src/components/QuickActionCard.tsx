import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarCheck, Disc, Trophy, PlusCircle } from 'lucide-react';

export const QuickActionCard: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'check-in',
      label: 'Check In',
      subtitle: 'Free Bonus',
      path: '/check-in',
      icon: CalendarCheck,
      gradient: 'from-amber-400 to-orange-500',
      badge: 'Daily'
    },
    {
      id: 'lucky-spin',
      label: 'Lucky Spin',
      subtitle: 'Win Cash',
      path: '/lucky-spin',
      icon: Disc,
      gradient: 'from-orange-500 to-red-600',
      badge: '3 Left'
    },
    {
      id: 'results',
      label: 'Result',
      subtitle: 'Live Draw',
      path: '/results',
      icon: Trophy,
      gradient: 'from-[#F36B16] to-[#C95C2D]',
      badge: 'Live'
    },
    {
      id: 'deposit',
      label: 'Deposit',
      subtitle: 'Add Cash',
      path: '/deposit',
      icon: PlusCircle,
      gradient: 'from-emerald-500 to-teal-700',
      badge: 'Instant'
    }
  ];

  return (
    <div className="my-3">
      <div className="grid grid-cols-4 gap-2.5">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={() => navigate(act.path)}
              className="group flex flex-col items-center justify-between bg-white rounded-2xl p-2.5 shadow-sm border border-slate-100 hover:shadow-md hover:border-orange-200 transition-all active:scale-95"
            >
              {/* Icon Container */}
              <div className="relative mb-1.5">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${act.gradient} text-white flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 stroke-[2.2px]" />
                </div>
                {act.badge && (
                  <span className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-full border border-white shadow-sm">
                    {act.badge}
                  </span>
                )}
              </div>

              {/* Action Label */}
              <div className="text-center">
                <p className="text-xs font-bold text-slate-800 leading-tight group-hover:text-[#F36B16] transition-colors">
                  {act.label}
                </p>
                <p className="text-[9px] text-slate-400 font-medium">
                  {act.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
