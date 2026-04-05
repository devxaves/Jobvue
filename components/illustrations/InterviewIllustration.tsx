export default function InterviewIllustration({ className = '', light = false }: { className?: string; light?: boolean }) {
  const textColor = light ? '#FFFFFF' : '#0F172A';
  return (
    <svg className={className} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background blobs */}
      <circle cx="200" cy="150" r="130" fill={light ? 'rgba(255,255,255,0.05)' : '#DBEAFE'} opacity="0.3" />

      {/* Giant AI Screen */}
      <rect x="180" y="30" rx="16" ry="16" width="200" height="150" fill="#0F172A" />
      <rect x="188" y="38" rx="10" ry="10" width="184" height="126" fill="#1E3A8A" />
      {/* Screen glow */}
      <rect x="188" y="38" rx="10" ry="10" width="184" height="126" fill="url(#screenGlow)" opacity="0.3" />
      {/* Robot face on screen */}
      <circle cx="280" cy="85" r="25" fill="#2563EB" />
      <circle cx="270" cy="80" r="5" fill="#FFF" />
      <circle cx="290" cy="80" r="5" fill="#FFF" />
      <circle cx="270" cy="80" r="2.5" fill="#0F172A" />
      <circle cx="290" cy="80" r="2.5" fill="#0F172A" />
      <rect x="272" y="92" rx="3" ry="3" width="16" height="4" fill="#FFF" />
      {/* Antenna */}
      <line x1="280" y1="60" x2="280" y2="48" stroke="#2563EB" strokeWidth="3" />
      <circle cx="280" cy="45" r="4" fill="#F59E0B" />
      {/* Chat bubbles */}
      <rect x="200" y="115" rx="8" ry="8" width="100" height="20" fill="rgba(255,255,255,0.15)" />
      <rect x="208" y="121" rx="2" ry="2" width="60" height="3" fill="rgba(255,255,255,0.5)" />
      <rect x="208" y="127" rx="2" ry="2" width="40" height="3" fill="rgba(255,255,255,0.5)" />
      <rect x="320" y="118" rx="8" ry="8" width="50" height="16" fill="#10B981" opacity="0.6" />
      {/* Stand */}
      <rect x="270" y="180" rx="2" ry="2" width="20" height="20" fill="#334155" />
      <rect x="255" y="198" rx="4" ry="4" width="50" height="6" fill="#334155" />

      {/* Character sitting nervously */}
      {/* Chair */}
      <rect x="85" y="200" rx="8" ry="8" width="70" height="60" fill="#7C3AED" opacity="0.3" />
      <rect x="80" y="195" rx="6" ry="6" width="80" height="10" fill="#7C3AED" />
      <rect x="86" y="260" rx="2" ry="2" width="6" height="25" fill="#5B21B6" />
      <rect x="148" y="260" rx="2" ry="2" width="6" height="25" fill="#5B21B6" />

      {/* Character */}
      <circle cx="120" cy="160" r="22" fill="#2563EB" /> {/* torso */}
      <circle cx="120" cy="135" r="22" fill="#D2691E" /> {/* head */}
      <ellipse cx="120" cy="118" rx="24" ry="10" fill="#0F172A" /> {/* hair */}
      <path d="M98 128 Q102 115 120 112 Q138 115 142 128" fill="#0F172A" />
      {/* Worried eyes - wider */}
      <ellipse cx="112" cy="137" rx="4.5" ry="5.5" fill="#FFF" />
      <ellipse cx="128" cy="137" rx="4.5" ry="5.5" fill="#FFF" />
      <circle cx="113" cy="137" r="2.5" fill="#0F172A" />
      <circle cx="129" cy="137" r="2.5" fill="#0F172A" />
      {/* Worried mouth */}
      <path d="M113 149 Q120 146 127 149" stroke="#C0392B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Sweat drop */}
      <path d="M145 130 Q148 125 145 120" fill="#60A5FA" opacity="0.6" />

      {/* Hands fidgeting */}
      <path d="M100 175 Q90 190 95 205" stroke="#D2691E" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M140 175 Q150 190 145 205" stroke="#D2691E" strokeWidth="8" strokeLinecap="round" fill="none" />

      {/* Question marks floating */}
      <text x="320" y="55" fontSize="18" fill="#F59E0B" fontWeight="bold" opacity="0.6">?</text>
      <text x="350" y="80" fontSize="14" fill="#7C3AED" fontWeight="bold" opacity="0.5">?</text>
      <text x="160" y="60" fontSize="16" fill="#2563EB" fontWeight="bold" opacity="0.4">?</text>

      <defs>
        <radialGradient id="screenGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
    </svg>
  );
}
