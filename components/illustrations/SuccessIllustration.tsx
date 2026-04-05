export default function SuccessIllustration({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 250" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="150" cy="230" rx="120" ry="15" fill="#D1FAE5" opacity="0.5" />
      {/* Confetti */}
      <rect x="60" y="30" width="8" height="8" rx="1" fill="#F59E0B" transform="rotate(30 64 34)" />
      <rect x="100" y="15" width="6" height="6" rx="1" fill="#7C3AED" transform="rotate(45 103 18)" />
      <rect x="200" y="20" width="7" height="7" rx="1" fill="#2563EB" transform="rotate(15 203 23)" />
      <rect x="240" y="40" width="8" height="8" rx="1" fill="#EF4444" transform="rotate(60 244 44)" />
      <rect x="80" y="50" width="5" height="5" rx="1" fill="#10B981" transform="rotate(20 82 52)" />
      <rect x="220" y="55" width="6" height="6" rx="1" fill="#F59E0B" transform="rotate(40 223 58)" />
      <circle cx="130" cy="25" r="3" fill="#7C3AED" />
      <circle cx="180" cy="30" r="4" fill="#10B981" />
      <circle cx="250" cy="25" r="3" fill="#2563EB" />
      <circle cx="70" cy="45" r="3" fill="#EF4444" />

      {/* Character jumping */}
      <circle cx="150" cy="110" r="28" fill="#2563EB" /> {/* torso */}
      <circle cx="150" cy="78" r="24" fill="#C68642" /> {/* head */}
      <ellipse cx="150" cy="60" rx="26" ry="11" fill="#2C1810" />
      <path d="M124 70 Q130 58 150 55 Q170 58 176 70" fill="#2C1810" />
      <ellipse cx="142" cy="80" rx="4.5" ry="5" fill="#FFF" />
      <ellipse cx="158" cy="80" rx="4.5" ry="5" fill="#FFF" />
      <circle cx="143" cy="80" r="2.5" fill="#0F172A" />
      <circle cx="159" cy="80" r="2.5" fill="#0F172A" />
      {/* Big smile */}
      <path d="M140 92 Q150 100 160 92" stroke="#C0392B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      
      {/* Arms up celebrating */}
      <path d="M122 105 Q105 85 95 65" stroke="#C68642" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M178 105 Q195 85 205 65" stroke="#C68642" strokeWidth="9" strokeLinecap="round" fill="none" />
      {/* Hands */}
      <circle cx="93" cy="63" r="7" fill="#C68642" />
      <circle cx="207" cy="63" r="7" fill="#C68642" />

      {/* Legs spread (jumping pose) */}
      <path d="M140 135 Q125 170 115 200" stroke="#1E3A8A" strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M160 135 Q175 170 185 200" stroke="#1E3A8A" strokeWidth="10" strokeLinecap="round" fill="none" />
      {/* Shoes */}
      <ellipse cx="112" cy="203" rx="12" ry="6" fill="#334155" />
      <ellipse cx="188" cy="203" rx="12" ry="6" fill="#334155" />

      {/* Stars */}
      <g fill="#F59E0B">
        <path d="M80 80 L82 74 L84 80 L90 82 L84 84 L82 90 L80 84 L74 82 Z" />
        <path d="M220 90 L222 84 L224 90 L230 92 L224 94 L222 100 L220 94 L214 92 Z" />
      </g>
    </svg>
  );
}
