export default function PostJobIllustration({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 250" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="150" cy="230" rx="120" ry="15" fill="#DBEAFE" opacity="0.4" />
      {/* Character */}
      <circle cx="130" cy="130" r="28" fill="#7C3AED" />
      <circle cx="130" cy="98" r="24" fill="#F4A460" />
      <ellipse cx="130" cy="80" rx="26" ry="11" fill="#0F172A" />
      <path d="M104 90 Q110 78 130 75 Q150 78 156 90" fill="#0F172A" />
      <ellipse cx="122" cy="100" rx="4" ry="4.5" fill="#FFF" />
      <ellipse cx="138" cy="100" rx="4" ry="4.5" fill="#FFF" />
      <circle cx="123" cy="101" r="2.5" fill="#0F172A" />
      <circle cx="139" cy="101" r="2.5" fill="#0F172A" />
      <path d="M123 112 Q130 117 137 112" stroke="#C0392B" strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="115" y="158" rx="5" ry="5" width="30" height="55" fill="#1E3A8A" />
      <ellipse cx="122" cy="213" rx="10" ry="5" fill="#334155" />
      <ellipse cx="138" cy="213" rx="10" ry="5" fill="#334155" />

      {/* Megaphone arm */}
      <path d="M158 125 Q175 118 190 112" stroke="#F4A460" strokeWidth="9" strokeLinecap="round" fill="none" />

      {/* Megaphone */}
      <g transform="translate(185, 90)">
        <path d="M0 22 L15 10 L55 0 L55 44 L15 34 Z" fill="#F59E0B" />
        <rect x="55" y="0" rx="4" ry="4" width="8" height="44" fill="#D97706" />
        <ellipse cx="0" cy="22" rx="5" ry="12" fill="#EAB308" />
      </g>

      {/* Speech bubbles with HIRING */}
      <g transform="translate(210, 50)">
        <rect rx="12" ry="12" width="70" height="30" fill="#2563EB" />
        <text x="10" y="20" fontSize="11" fill="#FFF" fontWeight="bold" style={{ fontFamily: 'var(--font-space)' }}>HIRING!</text>
        <polygon points="20,30 30,30 25,38" fill="#2563EB" />
      </g>
      <g transform="translate(180, 30)">
        <rect rx="10" ry="10" width="55" height="24" fill="#10B981" />
        <text x="8" y="16" fontSize="9" fill="#FFF" fontWeight="bold">OPEN</text>
        <polygon points="15,24 22,24 18,30" fill="#10B981" />
      </g>
      <g transform="translate(240, 85)">
        <rect rx="10" ry="10" width="50" height="22" fill="#7C3AED" />
        <text x="8" y="15" fontSize="8" fill="#FFF" fontWeight="bold">JOIN!</text>
      </g>

      {/* Other arm */}
      <path d="M102 125 Q85 140 80 155" stroke="#F4A460" strokeWidth="8" strokeLinecap="round" fill="none" />
    </svg>
  );
}
