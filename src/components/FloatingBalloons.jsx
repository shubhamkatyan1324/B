import React, { useMemo } from 'react';

export default function FloatingBalloons() {
  const balloons = useMemo(() => {
    const colors = [
      'rgba(141, 163, 148, 0.45)', // sage
      'rgba(37, 99, 235, 0.4)',    // azul
      'rgba(114, 32, 53, 0.45)',   // wine red
      'rgba(244, 114, 182, 0.45)', // light pink
      'rgba(95, 128, 110, 0.4)',   // deep sage
      'rgba(0, 102, 255, 0.35)',   // electric azul
    ];

    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: `${(i * 7.5 + 3) % 94}%`,
      size: 40 + (i % 5) * 14,
      color: colors[i % colors.length],
      duration: 16 + (i % 6) * 4,
      delay: -(i * 2.5),
      drift: (i % 2 === 0 ? 1 : -1) * (15 + (i % 20)),
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {balloons.map((b) => (
        <div
          key={b.id}
          className="absolute -bottom-24 transition-opacity duration-1000 opacity-60 hover:opacity-100"
          style={{
            left: b.left,
            width: `${b.size}px`,
            height: `${b.size * 1.25}px`,
            animation: `floatUp ${b.duration}s infinite linear`,
            animationDelay: `${b.delay}s`,
          }}
        >
          {/* Balloon Body */}
          <div
            className="w-full h-full rounded-full relative shadow-lg backdrop-blur-xs"
            style={{
              background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.6) 0%, ${b.color} 70%)`,
              boxShadow: `0 8px 24px ${b.color}`,
            }}
          >
            {/* Balloon Knot */}
            <div
              className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 rounded-xs"
              style={{ background: b.color }}
            />
            {/* String */}
            <div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[1px] h-8 bg-white/20 origin-top"
              style={{
                animation: 'swayString 3s ease-in-out infinite alternate',
              }}
            />
          </div>
        </div>
      ))}

      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(110vh) translateX(0px) rotate(0deg);
          }
          50% {
            transform: translateY(50vh) translateX(25px) rotate(4deg);
          }
          100% {
            transform: translateY(-20vh) translateX(-15px) rotate(-4deg);
          }
        }
        @keyframes swayString {
          0% { transform: rotate(-8deg); }
          100% { transform: rotate(8deg); }
        }
      `}</style>
    </div>
  );
}
