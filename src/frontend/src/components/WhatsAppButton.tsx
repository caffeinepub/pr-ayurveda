import { useState } from "react";

const WA_LINK =
  "https://wa.me/919217127566?text=नमस्ते%20PR%20Ayurveda%2C%20मुझे%20आपके%20उत्पादों%20के%20बारे%20में%20जानकारी%20चाहिए";

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2"
      data-ocid="whatsapp.button"
      aria-label="WhatsApp पर बात करें"
    >
      {hovered && (
        <span className="bg-white text-brand-green font-hindi font-semibold text-sm px-3 py-1.5 rounded-full shadow-lg border border-green-200 whitespace-nowrap">
          हमसे बात करें
        </span>
      )}
      <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg whatsapp-pulse">
        <svg
          viewBox="0 0 32 32"
          className="w-7 h-7 fill-white"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="WhatsApp"
        >
          <title>WhatsApp</title>
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.737 5.474 2.027 7.775L0 32l8.434-2.007A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.07 22.215c-.334.938-1.96 1.79-2.7 1.89-.69.093-1.56.132-2.518-.16-.58-.18-1.325-.42-2.274-.823-4.003-1.728-6.616-5.74-6.816-6.008-.2-.268-1.623-2.158-1.623-4.117s1.027-2.923 1.39-3.318c.362-.395.79-.494 1.054-.494.264 0 .527.002.76.013.243.012.57-.092.891.68.334.8 1.136 2.76 1.235 2.96.1.2.166.436.033.702-.133.266-.2.432-.395.665-.197.233-.413.52-.591.697-.197.197-.403.41-.173.804.23.395 1.022 1.685 2.194 2.728 1.508 1.342 2.78 1.757 3.174 1.957.396.2.626.167.857-.1.23-.268.988-1.153 1.252-1.55.265-.396.527-.33.89-.2.363.132 2.31 1.09 2.706 1.287.396.2.66.3.76.466.1.165.1.95-.234 1.89z" />
        </svg>
      </div>
    </a>
  );
}
