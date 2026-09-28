import React from 'react';

export const GECTicker = () => {
  const updates = [
    "🟢 ✅ IoT Hardware Make-a-thon 2026 — Registrations Open across all branches",
    "🟢 🏆 SIH Hardware Edition — GEC Khagaria Team Awarded National 1st Runner Up",
    "🟢 ⚡ Hands-on ESP32 & FreeRTOS Workshop — Scheduled for October 20, 2026",
    "🟢 📡 Campus IoT Gateway & LoRaWAN Server Live at Electronics Block"
  ];

  return (
    <div className="w-full bg-black/95 text-white/90 border-b border-white/10 overflow-hidden py-2 select-none z-50 relative">
      <div className="flex items-center space-x-12 whitespace-nowrap animate-marquee">
        {/* Double array for seamless loop */}
        {[...updates, ...updates].map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-xs font-mono tracking-wide">
            <span>{item}</span>
          </div>
        ))}
      </div>

      <style jsx="true">{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
