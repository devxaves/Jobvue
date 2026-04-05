export default function ApplyJobIllustration({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 250" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="150" cy="230" rx="120" ry="15" fill="#DBEAFE" opacity="0.4" />
      {/* Character */}
      <circle cx="120" cy="130" r="26" fill="#10B981" />
      <circle cx="120" cy="100" r="22" fill="#C68642" />
      <ellipse cx="120" cy="84" rx="24" ry="10" fill="#2C1810" />
      <path d="M96 93 Q102 82 120 79 Q138 82 144 93" fill="#2C1810" />
      <ellipse cx="113" cy="102" rx="4" ry="4.5" fill="#FFF" />
      <ellipse cx="127" cy="102" rx="4" ry="4.5" fill="#FFF" />
      <circle cx="114" cy="103" r="2.5" fill="#0F172A" />
      <circle cx="128" cy="103" r="2.5" fill="#0F172A" />
      <path d="M114 113 Q120 118 126 113" stroke="#C0392B" strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="105" y="156" rx="5" ry="5" width="30" height="55" fill="#1E3A8A" />
      <ellipse cx="112" cy="211" rx="10" ry="5" fill="#334155" />
      <ellipse cx="128" cy="211" rx="10" ry="5" fill="#334155" />

      {/* Arms holding up resume */}
      <path d="M146 125 Q165 110 175 100" stroke="#C68642" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M94 125 Q80 115 75 105" stroke="#C68642" strokeWidth="8" strokeLinecap="round" fill="none" />

      {/* Resume document (glowing) */}
      <g transform="translate(160, 40)">
        {/* Glow */}
        <rect x="-5" y="-5" rx="12" ry="12" width="80" height="85" fill="#2563EB" opacity="0.1" />
        <rect rx="8" ry="8" width="70" height="75" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
        {/* Photo placeholder */}
        <circle cx="22" cy="18" r="10" fill="#DBEAFE" />
        <circle cx="22" cy="15" r="5" fill="#2563EB" opacity="0.5" />
        <ellipse cx="22" cy="24" rx="8" ry="4" fill="#2563EB" opacity="0.3" />
        {/* Text lines */}
        <rect x="38" y="12" rx="2" ry="2" width="25" height="4" fill="#2563EB" />
        <rect x="38" y="20" rx="2" ry="2" width="20" height="3" fill="#CBD5E1" />
        <rect x="10" y="35" rx="2" ry="2" width="50" height="3" fill="#CBD5E1" />
        <rect x="10" y="42" rx="2" ry="2" width="45" height="3" fill="#CBD5E1" />
        <rect x="10" y="49" rx="2" ry="2" width="50" height="3" fill="#CBD5E1" />
        <rect x="10" y="56" rx="2" ry="2" width="30" height="3" fill="#CBD5E1" />
        {/* Checkmark */}
        <circle cx="55" cy="60" r="8" fill="#10B981" />
        <path d="M50 60 L54 64 L60 56" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* Sparkles */}
      <circle cx="245" cy="45" r="3" fill="#F59E0B" opacity="0.6" />
      <circle cx="155" cy="30" r="2" fill="#7C3AED" opacity="0.5" />
      <path d="M250 80 L252 75 L254 80 L259 82 L254 84 L252 89 L250 84 L245 82 Z" fill="#F59E0B" opacity="0.5" />
    </svg>
  );
}
