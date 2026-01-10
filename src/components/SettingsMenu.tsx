import React from 'react';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onClearMemory: () => void;
  safeMode: boolean;
  setSafeMode: (enabled: boolean) => void;
}

export function SettingsMenu({ isOpen, onClose, onClearMemory, safeMode, setSafeMode }: SettingsProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-80 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Settings</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">✕</button>
        </div>

        <div className="space-y-6">
          {/* Safe Mode Toggle */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white font-medium">Safe Mode</p>
              <p className="text-xs text-zinc-500">Strict content filtering</p>
            </div>
            <button 
              onClick={() => setSafeMode(!safeMode)}
              className={`w-12 h-6 rounded-full transition-colors relative ${safeMode ? 'bg-green-500' : 'bg-zinc-700'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${safeMode ? 'left-7' : 'left-1'}`}></div>
            </button>
          </div>

          {/* Clear Memory */}
          <div>
            <button 
              onClick={() => {
                if(confirm("Are you sure you want to clear conversation memory?")) {
                  onClearMemory();
                  onClose();
                }
              }}
              className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl font-medium transition-colors border border-red-500/20"
            >
              Clear Memory
            </button>
            <p className="text-xs text-zinc-500 mt-2 text-center">Deletes local conversation history</p>
          </div>
          
          <div className="pt-4 border-t border-zinc-800 text-center">
             <p className="text-xs text-zinc-600">LOLA v1.0 • ID: 8X-29</p>
          </div>
        </div>
      </div>
    </div>
  );
}
