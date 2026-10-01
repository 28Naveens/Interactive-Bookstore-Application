import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const icons = {
  success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
  error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
  info: <Info className="w-5 h-5 text-primary-500 shrink-0" />,
};

const borderClasses = {
  success: 'border-l-4 border-l-emerald-500 bg-white dark:bg-slate-900 shadow-lg',
  error: 'border-l-4 border-l-rose-500 bg-white dark:bg-slate-900 shadow-lg',
  warning: 'border-l-4 border-l-amber-500 bg-white dark:bg-slate-900 shadow-lg',
  info: 'border-l-4 border-l-primary-500 bg-white dark:bg-slate-900 shadow-lg',
};

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 ${borderClasses[t.type] || borderClasses.info} animate-slide-in-right transition-all`}
        >
          <div className="flex items-center gap-2.5">
            {icons[t.type] || icons.info}
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
              {t.message}
            </p>
          </div>
          <button
            onClick={() => removeToast(t.id)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md transition-colors"
            aria-label="Dismiss toast"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
