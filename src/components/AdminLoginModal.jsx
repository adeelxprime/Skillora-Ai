import React, { useState } from 'react';
import { Lock, X, ShieldCheck, Key, ArrowRight, AlertCircle } from 'lucide-react';

export function AdminLoginModal({ isOpen, onClose, onLoginSuccess, correctPin = '569646' }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const entered = pin.trim();
    const expected = String(correctPin || '569646').trim();
    if (entered === expected) {
      setError(false);
      setPin('');
      onLoginSuccess();
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="fixed inset-0" onClick={onClose}></div>

      <div className="relative w-full max-w-sm bg-[#070e1f] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl z-10 space-y-5">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-400 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-white">Staff Admin Access</h3>
          <p className="text-xs text-slate-400">
            Enter your secret master PIN to unlock the Skillora AI control panel.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
              <input
                type="password"
                required
                autoFocus
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                placeholder="Enter Security PIN"
                className="w-full bg-[#040814] border border-cyan-500/30 pl-10 pr-4 py-3 rounded-xl text-sm text-center text-white font-mono tracking-widest placeholder:tracking-normal placeholder:text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
            {error && (
              <p className="text-rose-400 text-xs mt-2 text-center flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Incorrect PIN. Please try again.</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white font-black text-xs uppercase tracking-wider hover:brightness-110 transition shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Unlock Admin Panel</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-[11px] text-slate-500 border-t border-slate-800 pt-3">
          Authorized staff only. Security protected.
        </div>

      </div>
    </div>
  );
}
