import React from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#1f1f26] border border-[#ffcc00]/40 text-white px-4 py-3 rounded-lg shadow-2xl backdrop-blur-md transition-all animate-bounce-subtle">
      <div className="text-[#ffcc00]">
        <CheckCircle2 className="w-5 h-5" />
      </div>
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="ml-2 text-zinc-400 hover:text-white p-1 rounded transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
