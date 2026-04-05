export default function ProfileIllustration({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 250" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="150" cy="230" rx="120" ry="15" fill="#DBEAFE" opacity="0.4" />
      {/* Character */}
      <circle cx="150" cy="130" r="28" fill="#2563EB" />
      <circle cx="150" cy="98" r="24" fill="#D2691E" />
      <ellipse cx="150" cy="80" rx="26" ry="11" fill="#0F172A" />
      <path d="M124 90 Q130 78 150 75 Q170 78 176 90" fill="#0F172A" />
      <ellipse cx="142" cy="100" rx="4.5" ry="5" fill="#FFF" />
      <ellipse cx="158" cy="100" rx="4.5" ry="5" fill="#FFF" />
      <circle cx="143" cy="101" r="2.5" fill="#0F172A" />
      <circle cx="159" cy="101" r="2.5" fill="#0F172A" />
      <path d="M143 112 Q150 117 157 112" stroke="#C0392B" strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="135" y="158" rx="5" ry="5" width="30" height="55" fill="#1E3A8A" />
      <ellipse cx="142" cy="213" rx="10" ry="5" fill="#334155" />
      <ellipse cx="158" cy="213" rx="10" ry="5" fill="#334155" />

      {/* Arms */}
      <path d="M122 125 Q105 135 100 150" stroke="#D2691E" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M178 125 Q195 135 200 150" stroke="#D2691E" strokeWidth="8" strokeLinecap="round" fill="none" />

      {/* Floating ID Badge */}
      <g transform="translate(175, 35)">
        <rect rx="12" ry="12" width="80" height="55" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
        {/* Photo circle */}
        <circle cx="25" cy="22" r="12" fill="#DBEAFE" />
        <circle cx="25" cy="19" r="6" fill="#2563EB" opacity="0.5" />
        <ellipse cx="25" cy="28" rx="9" ry="5" fill="#2563EB" opacity="0.3" />
        {/* Badge lines */}
        <rect x="44" y="16" rx="2" ry="2" width="28" height="4" fill="#2563EB" />
        <rect x="44" y="24" rx="2" ry="2" width="22" height="3" fill="#CBD5E1" />
        {/* Verified tick */}
        <circle cx="65" cy="42" r="7" fill="#10B981" />
        <path d="M61 42 L64 45 L69 39" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
      {/* Badge glow effect */}
      <circle cx="215" cy="62" r="45" fill="#2563EB" opacity="0.04" />

      {/* Small floating elements */}
      <g fill="#F59E0B" opacity="0.5">
        <path d="M60 70 L62 65 L64 70 L69 72 L64 74 L62 79 L60 74 L55 72 Z" />
      </g>
      <circle cx="80" cy="170" r="3" fill="#7C3AED" opacity="0.3" />
      <circle cx="240" cy="150" r="4" fill="#10B981" opacity="0.3" />
    </svg>
  );
}
