export default function EmptyStateIllustration({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 250" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="150" cy="220" r="100" fill="#DBEAFE" opacity="0.3" />
      {/* Character */}
      <circle cx="150" cy="120" r="25" fill="#2563EB" /> {/* torso */}
      <circle cx="150" cy="92" r="22" fill="#D2691E" /> {/* head */}
      <ellipse cx="150" cy="76" rx="24" ry="10" fill="#0F172A" />
      <path d="M128 85 Q132 73 150 70 Q168 73 172 85" fill="#0F172A" />
      <ellipse cx="143" cy="94" rx="4" ry="4.5" fill="#FFF" />
      <ellipse cx="157" cy="94" rx="4" ry="4.5" fill="#FFF" />
      <circle cx="144" cy="95" r="2.5" fill="#0F172A" />
      <circle cx="158" cy="95" r="2.5" fill="#0F172A" />
      <path d="M145 105 Q150 102 155 105" stroke="#C0392B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <rect x="135" y="145" rx="5" ry="5" width="30" height="50" fill="#1E3A8A" />
      <ellipse cx="142" cy="195" rx="10" ry="5" fill="#334155" />
      <ellipse cx="158" cy="195" rx="10" ry="5" fill="#334155" />
      
      {/* Magnifying glass */}
      <circle cx="195" cy="115" r="22" stroke="#7C3AED" strokeWidth="4" fill="rgba(124,58,237,0.1)" />
      <line x1="212" y1="132" x2="228" y2="148" stroke="#7C3AED" strokeWidth="5" strokeLinecap="round" />
      {/* Arm holding magnifying glass */}
      <path d="M170 130 Q180 120 190 118" stroke="#D2691E" strokeWidth="8" strokeLinecap="round" fill="none" />
      
      {/* Other arm */}
      <path d="M130 130 Q115 140 110 155" stroke="#D2691E" strokeWidth="8" strokeLinecap="round" fill="none" />

      {/* Floating dots */}
      <circle cx="80" cy="80" r="3" fill="#2563EB" opacity="0.3" />
      <circle cx="230" cy="60" r="4" fill="#7C3AED" opacity="0.3" />
      <circle cx="60" cy="150" r="3" fill="#10B981" opacity="0.3" />
      <circle cx="250" cy="170" r="3" fill="#F59E0B" opacity="0.3" />
    </svg>
  );
}
