export default function HeroIllustration({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background blobs */}
      <ellipse cx="250" cy="350" rx="200" ry="30" fill="#DBEAFE" opacity="0.5" />
      <circle cx="400" cy="100" r="60" fill="#EDE9FE" opacity="0.4" />
      <circle cx="80" cy="150" r="40" fill="#D1FAE5" opacity="0.4" />

      {/* Desk */}
      <rect x="120" y="260" rx="12" ry="12" width="260" height="15" fill="#1E3A8A" />
      <rect x="160" y="275" rx="4" ry="4" width="8" height="40" fill="#1E3A8A" />
      <rect x="332" y="275" rx="4" ry="4" width="8" height="40" fill="#1E3A8A" />

      {/* Laptop */}
      <rect x="170" y="210" rx="8" ry="8" width="160" height="50" fill="#0F172A" />
      <rect x="178" y="215" rx="4" ry="4" width="144" height="40" fill="#2563EB" />
      <rect x="155" y="258" rx="3" ry="3" width="190" height="6" fill="#334155" />
      {/* Screen content lines */}
      <rect x="188" y="225" rx="2" ry="2" width="60" height="4" fill="#FFFFFF" opacity="0.8" />
      <rect x="188" y="233" rx="2" ry="2" width="80" height="3" fill="#FFFFFF" opacity="0.5" />
      <rect x="188" y="240" rx="2" ry="2" width="50" height="3" fill="#FFFFFF" opacity="0.5" />

      {/* Character body */}
      <ellipse cx="250" cy="200" rx="35" ry="20" fill="#2563EB" /> {/* Hoodie torso */}
      <rect x="230" y="200" rx="5" ry="5" width="40" height="15" fill="#2563EB" />
      
      {/* Arms */}
      <path d="M215 205 Q195 215 195 235" stroke="#F4A460" strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M285 205 Q305 215 310 235" stroke="#F4A460" strokeWidth="10" strokeLinecap="round" fill="none" />
      {/* Hands on desk */}
      <circle cx="195" cy="238" r="7" fill="#F4A460" />
      <circle cx="310" cy="238" r="7" fill="#F4A460" />

      {/* Head */}
      <circle cx="250" cy="160" r="35" fill="#F4A460" /> {/* Face */}
      <ellipse cx="250" cy="130" rx="38" ry="18" fill="#0F172A" /> {/* Hair */}
      <path d="M212 145 Q215 130 250 125 Q285 130 288 145" fill="#0F172A" /> {/* Hair front */}
      
      {/* Eyes */}
      <ellipse cx="238" cy="162" rx="5" ry="6" fill="#FFFFFF" />
      <ellipse cx="262" cy="162" rx="5" ry="6" fill="#FFFFFF" />
      <circle cx="240" cy="163" r="3" fill="#0F172A" />
      <circle cx="264" cy="163" r="3" fill="#0F172A" />
      <circle cx="241" cy="162" r="1" fill="#FFFFFF" />
      <circle cx="265" cy="162" r="1" fill="#FFFFFF" />
      
      {/* Mouth - smile */}
      <path d="M242 175 Q250 182 258 175" stroke="#C0392B" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Hoodie collar */}
      <path d="M230 185 Q250 195 270 185" fill="#1E40AF" />

      {/* Floating job cards */}
      <g transform="translate(50, 80)">
        <rect rx="10" ry="10" width="90" height="55" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
        <rect x="10" y="10" rx="3" ry="3" width="30" height="6" fill="#2563EB" />
        <rect x="10" y="22" rx="2" ry="2" width="50" height="4" fill="#CBD5E1" />
        <rect x="10" y="30" rx="2" ry="2" width="40" height="4" fill="#CBD5E1" />
        <rect x="10" y="40" rx="8" ry="8" width="35" height="10" fill="#D1FAE5" />
        <text x="16" y="48" fontSize="6" fill="#10B981" fontWeight="bold">₹5K/mo</text>
      </g>

      <g transform="translate(370, 60)">
        <rect rx="10" ry="10" width="90" height="55" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2" />
        <rect x="10" y="10" rx="3" ry="3" width="35" height="6" fill="#7C3AED" />
        <rect x="10" y="22" rx="2" ry="2" width="55" height="4" fill="#CBD5E1" />
        <rect x="10" y="30" rx="2" ry="2" width="45" height="4" fill="#CBD5E1" />
        <rect x="10" y="40" rx="8" ry="8" width="40" height="10" fill="#EDE9FE" />
        <text x="14" y="48" fontSize="6" fill="#7C3AED" fontWeight="bold">Freelance</text>
      </g>

      <g transform="translate(380, 180)">
        <rect rx="10" ry="10" width="85" height="50" fill="#FFFFFF" stroke="#10B981" strokeWidth="2" />
        <rect x="10" y="10" rx="3" ry="3" width="40" height="6" fill="#10B981" />
        <rect x="10" y="22" rx="2" ry="2" width="50" height="4" fill="#CBD5E1" />
        <rect x="10" y="32" rx="8" ry="8" width="30" height="10" fill="#D1FAE5" />
        <text x="14" y="40" fontSize="6" fill="#10B981" fontWeight="bold">Apply</text>
      </g>

      {/* Coffee mug on desk */}
      <rect x="340" y="240" rx="4" ry="4" width="20" height="20" fill="#F59E0B" />
      <rect x="338" y="238" rx="3" ry="3" width="24" height="4" fill="#D97706" />
      <path d="M360 245 Q368 248 360 255" stroke="#D97706" strokeWidth="2" fill="none" />
      
      {/* Steam */}
      <path d="M348 232 Q345 225 348 218" stroke="#CBD5E1" strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M352 234 Q355 226 352 219" stroke="#CBD5E1" strokeWidth="1.5" fill="none" opacity="0.4" />
    </svg>
  );
}
