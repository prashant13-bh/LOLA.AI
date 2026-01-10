import React from 'react';

interface AvatarProps {
  state: 'idle' | 'listening' | 'speaking' | 'thinking';
}

export function Avatar({ state }: AvatarProps) {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Glow */}
      <div className={`absolute inset-0 blur-[80px] rounded-full transition-all duration-500 
        ${state === 'speaking' ? 'bg-cyan-500/30 scale-110' : 
          state === 'listening' ? 'bg-blue-500/30 scale-105' : 
          'bg-blue-900/20 scale-100'}`} 
      />
      
      {/* Face Container */}
      <div className="relative z-10 flex gap-12 items-center justify-center w-full">
        {/* Left Eye */}
        <div className={`relative w-20 h-28 bg-white rounded-[3rem] overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300
          ${state === 'listening' ? 'scale-110 h-32' : 'scale-100'}
          ${state === 'thinking' ? 'translate-x-2 -translate-y-2' : ''}
        `}>
          {/* Pupil */}
          <div className={`absolute top-1/3 right-1/4 w-10 h-14 bg-blue-900 rounded-full transition-all duration-200
             ${state === 'listening' ? 'scale-110' : ''}
          `}>
            <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full"></div>
          </div>
          {/* Eyelid (Blink Animation) */}
          <div className="absolute inset-0 bg-black animate-blink-random opacity-0"></div>
        </div>

        {/* Right Eye */}
        <div className={`relative w-20 h-28 bg-white rounded-[3rem] overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300
          ${state === 'listening' ? 'scale-110 h-32' : 'scale-100'}
          ${state === 'thinking' ? 'translate-x-2 -translate-y-2' : ''}
        `}>
          {/* Pupil */}
          <div className={`absolute top-1/3 right-1/4 w-10 h-14 bg-blue-900 rounded-full transition-all duration-200
             ${state === 'listening' ? 'scale-110' : ''}
          `}>
             <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full"></div>
          </div>
          {/* Eyelid (Blink Animation) */}
          <div className="absolute inset-0 bg-black animate-blink-random opacity-0"></div>
        </div>
      </div>

      {/* Mouth (Only visible when speaking or smiling) */}
      <div className={`absolute bottom-16 w-8 h-4 border-b-4 border-white rounded-full transition-all duration-200
        ${state === 'speaking' ? 'animate-talk h-6 w-10' : 'h-2 w-6 opacity-50'}
      `}></div>
    </div>
  );
}
