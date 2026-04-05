export default function FreelanceIllustration({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <circle cx="200" cy="280" r="160" fill="#DBEAFE" opacity="0.3" />
      <circle cx="320" cy="60" r="40" fill="#EDE9FE" opacity="0.3" />
      
      {/* City skyline background */}
      <rect x="40" y="150" width="30" height="100" rx="4" fill="#1E3A8A" opacity="0.15" />
      <rect x="80" y="120" width="25" height="130" rx="4" fill="#1E3A8A" opacity="0.12" />
      <rect x="115" y="140" width="20" height="110" rx="4" fill="#1E3A8A" opacity="0.1" />
      <rect x="260" y="130" width="28" height="120" rx="4" fill="#1E3A8A" opacity="0.12" />
      <rect x="300" y="110" width="22" height="140" rx="4" fill="#1E3A8A" opacity="0.1" />
      <rect x="335" y="145" width="30" height="105" rx="4" fill="#1E3A8A" opacity="0.15" />

      {/* Ground */}
      <ellipse cx="200" cy="265" rx="150" ry="15" fill="#DBEAFE" opacity="0.5" />

      {/* Character 1 - Left (purple hoodie) */}
      <circle cx="160" cy="170" r="28" fill="#8B5CF6" /> {/* torso */}
      <circle cx="160" cy="140" r="25" fill="#D2691E" /> {/* head */}
      <ellipse cx="160" cy="120" rx="27" ry="12" fill="#0F172A" /> {/* hair */}
      <path d="M133 132 Q138 118 160 115 Q182 118 187 132" fill="#0F172A" />
      <ellipse cx="152" cy="142" rx="4" ry="4.5" fill="#FFF" />
      <ellipse cx="168" cy="142" rx="4" ry="4.5" fill="#FFF" />
      <circle cx="153" cy="143" r="2.5" fill="#0F172A" />
      <circle cx="169" cy="143" r="2.5" fill="#0F172A" />
      <path d="M153 153 Q160 158 167 153" stroke="#C0392B" strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="145" y="195" rx="5" ry="5" width="30" height="70" fill="#1E3A8A" /> {/* legs */}
      <ellipse cx="152" cy="265" rx="12" ry="5" fill="#334155" /> {/* shoe left */}
      <ellipse cx="170" cy="265" rx="12" ry="5" fill="#334155" /> {/* shoe right */}

      {/* Character 2 - Right (blue hoodie) */}
      <circle cx="240" cy="170" r="28" fill="#2563EB" />
      <circle cx="240" cy="140" r="25" fill="#C68642" />
      <ellipse cx="240" cy="120" rx="27" ry="12" fill="#2C1810" />
      <path d="M213 132 Q218 118 240 115 Q262 118 267 132" fill="#2C1810" />
      <ellipse cx="232" cy="142" rx="4" ry="4.5" fill="#FFF" />
      <ellipse cx="248" cy="142" rx="4" ry="4.5" fill="#FFF" />
      <circle cx="233" cy="143" r="2.5" fill="#0F172A" />
      <circle cx="249" cy="143" r="2.5" fill="#0F172A" />
      <path d="M233 153 Q240 158 247 153" stroke="#C0392B" strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="225" y="195" rx="5" ry="5" width="30" height="70" fill="#1E3A8A" />
      <ellipse cx="232" cy="265" rx="12" ry="5" fill="#334155" />
      <ellipse cx="250" cy="265" rx="12" ry="5" fill="#334155" />

      {/* Handshake / fist bump */}
      <path d="M188 185 Q200 178 212 185" stroke="#D2691E" strokeWidth="9" strokeLinecap="round" fill="none" />
      
      {/* Sparkle effects */}
      <g fill="#F59E0B">
        <path d="M200 165 L202 160 L204 165 L209 167 L204 169 L202 174 L200 169 L195 167 Z" />
        <path d="M175 120 L176 117 L177 120 L180 121 L177 122 L176 125 L175 122 L172 121 Z" opacity="0.7" />
        <path d="M230 110 L231 107 L232 110 L235 111 L232 112 L231 115 L230 112 L227 111 Z" opacity="0.7" />
      </g>
    </svg>
  );
}
