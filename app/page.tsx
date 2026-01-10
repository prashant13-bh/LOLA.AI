"use client";

import { useState, useEffect } from "react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useCamera } from "@/hooks/useCamera";
import { generateResponse } from "@/lib/llm";
import { Avatar } from "@/components/Avatar";
import { checkSafety } from "@/lib/safety";
import { SettingsMenu } from "@/components/SettingsMenu";

export default function Home() {
  const [isAwake, setIsAwake] = useState(false);
  const { text, isListening, startListening, stopListening, hasSupport } = useSpeechRecognition();
  const { speak, isSpeaking } = useTextToSpeech();
  const { videoRef, startCamera, stopCamera, captureFrame, isCameraActive } = useCamera();
  const [lastUserText, setLastUserText] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  
  // Settings State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [safeMode, setSafeMode] = useState(true);

  const handleConversation = async (input: string) => {
    // Safety Check
    if (safeMode) {
      const safetyCheck = checkSafety(input);
      if (!safetyCheck.isSafe) {
        speak(safetyCheck.reason || "I cannot discuss that.");
        return;
      }
    }

    setIsThinking(true);
    const response = await generateResponse(input);
    setIsThinking(false);
    speak(response);
  };

  // Conversation logic
  useEffect(() => {
    if (text && !isListening) {
      setLastUserText(text);
      handleConversation(text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, isListening]);

  const startLola = async () => {
    try {
      if ("wakeLock" in navigator) {
        try {
          await (navigator as any).wakeLock.request("screen");
        } catch (err) {
          console.error("Wake Lock failed:", err);
        }
      }
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch (e) {
      console.error(e);
    }
    setIsAwake(true);
    speak("Hello! I am Lola. Hold the button to talk to me.");
  };

  const handleVision = async () => {
    await startCamera();
    speak("Let me take a look.");
    // Wait for camera to warm up and user to point
    setTimeout(() => {
      const image = captureFrame();
      stopCamera();
      if (image) {
        console.log("Captured image length:", image.length);
        speak("I see something interesting!");
      } else {
        speak("I couldn't see anything.");
      }
    }, 4000);
  };

  const avatarState = isSpeaking ? 'speaking' : isListening ? 'listening' : isThinking ? 'thinking' : 'idle';

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white overflow-hidden select-none touch-none relative">
      <SettingsMenu 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        onClearMemory={() => setLastUserText("")}
        safeMode={safeMode}
        setSafeMode={setSafeMode}
      />

      {!isAwake ? (
        <div className="flex flex-col items-center gap-6">
          <div className="w-32 h-32 relative">
             <img src="/icon.png" alt="LOLA" className="w-full h-full object-contain opacity-80" />
          </div>
          <button 
            onClick={startLola}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-lg font-medium transition-all backdrop-blur-sm"
          >
            Wake LOLA
          </button>
          <p className="text-xs text-zinc-600">Tap to start</p>
        </div>
      ) : (
        <div className="relative flex flex-col items-center w-full h-full justify-center gap-8">
          {/* Settings Button */}
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-white transition-colors z-40"
          >
            ⚙️
          </button>

          {/* Avatar / Camera Area */}
          <div className="relative w-full flex items-center justify-center h-80">
            {isCameraActive ? (
               <div className="w-64 h-64 rounded-[2rem] overflow-hidden border-4 border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.5)] relative">
                 <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                 <div className="absolute inset-0 border-4 border-white/20 rounded-[2rem] pointer-events-none"></div>
                 <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
               </div>
            ) : (
              <Avatar state={avatarState} />
            )}
          </div>
          
          {/* Status Text */}
          <div className="h-8 text-center">
            {isCameraActive ? (
              <p className="text-cyan-400 font-mono animate-pulse">LOOKING...</p>
            ) : isListening ? (
              <p className="text-blue-400 font-mono animate-pulse">LISTENING...</p>
            ) : isSpeaking ? (
              <p className="text-cyan-400 font-mono">SPEAKING...</p>
            ) : isThinking ? (
              <p className="text-purple-400 font-mono animate-pulse">THINKING...</p>
            ) : (
              <p className="text-zinc-600 font-mono text-xs">IDLE</p>
            )}
          </div>

          {/* Transcript */}
          <div className="h-12 text-center px-4">
             <p className="text-zinc-400 text-sm italic">{lastUserText}</p>
          </div>

          {/* Controls */}
          <div className="flex gap-8 items-center">
            {/* Vision Button */}
            <button
              onClick={handleVision}
              disabled={isCameraActive}
              className={`w-12 h-12 rounded-full flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 transition-all ${isCameraActive ? 'opacity-50' : ''}`}
            >
              <div className="w-4 h-4 border-2 border-white rounded-full"></div>
            </button>

            {/* Talk Button */}
            <button
              onMouseDown={startListening}
              onMouseUp={stopListening}
              onTouchStart={(e) => { e.preventDefault(); startListening(); }}
              onTouchEnd={(e) => { e.preventDefault(); stopListening(); }}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 ${isListening ? 'bg-red-500 scale-110 shadow-[0_0_30px_rgba(239,68,68,0.5)]' : 'bg-white/10 border border-white/20'}`}
            >
              <div className={`w-8 h-8 bg-white rounded-full ${isListening ? 'animate-ping' : ''}`}></div>
            </button>
            
            {/* Placeholder for Menu */}
            <div className="w-12 h-12"></div>
          </div>
          
          <p className="text-xs text-zinc-600">Hold to Talk • Tap circle to See</p>
        </div>
      )}
    </main>
  );
}

