import React from 'react';

export default function BlueprintPhoto() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden group">
      {/* 1. THE TECHNICAL BACKGROUND GRID */}
      <div className="absolute inset-0 bg-[size:20px_20px] bg-grid-pattern opacity-[0.3] pointer-events-none" />

      {/* 2. THE PHOTO CONTAINER */}
      {/* We use mix-blend-mode to make the photo look like part of the blueprint */}
      <div className="relative z-10 w-full h-full grayscale contrast-125 brightness-90 mix-blend-hard-light transition-all duration-500 group-hover:grayscale-0 group-hover:mix-blend-normal group-hover:contrast-100">
        <img 
          src="/me.jpg" // MAKE SURE THIS MATCHES YOUR FILENAME
          alt="Sree Profile Scan" 
          className="w-full h-full object-cover object-top"
        />
        
        {/* 3. THE SCANLINE OVERLAY */}
        {/* Adds a subtle retro-tech scan line effect */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[size:100%_4px] pointer-events-none opacity-50"></div>
      </div>

      {/* 4. TECHNICAL MARKINGS (Corner brackets & text) */}
      <div className="absolute inset-0 p-4 pointer-events-none z-50">
        <div className="w-full h-full border-2 border-paper/20 relative">
          {/* Top Left Bracket */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-paper"></div>
          {/* Bottom Right Bracket */}
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-paper"></div>
          
          {/* Scan Text */}
          <div className="absolute bottom-2 right-4 font-mono text-[10px] font-bold tracking-widest text-paper/60">
            NAME: SREERAJ 
          </div>
        </div>
      </div>
    </div>
  );
}