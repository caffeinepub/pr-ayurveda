import { getSettings } from "@/hooks/useSiteSettings";
import { useEffect, useState } from "react";

function getInitialTime() {
  const stored = sessionStorage.getItem("flash_sale_end");
  if (stored) {
    const remaining = Math.floor((Number(stored) - Date.now()) / 1000);
    if (remaining > 0) return remaining;
  }
  const end = Date.now() + 2 * 60 * 60 * 1000;
  sessionStorage.setItem("flash_sale_end", String(end));
  return 2 * 60 * 60;
}

export default function AnnouncementBar() {
  const [seconds, setSeconds] = useState(getInitialTime);
  const settings = getSettings();

  useEffect(() => {
    if (!settings.flashSaleEnabled) return;
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          const end = Date.now() + 2 * 60 * 60 * 1000;
          sessionStorage.setItem("flash_sale_end", String(end));
          return 2 * 60 * 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [settings.flashSaleEnabled]);

  const hh = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="bg-brand-gold text-white text-center py-2 px-4 text-sm font-hindi font-bold">
      {settings.flashSaleEnabled ? (
        <span>
          ⚡ फ्लैश सेल! अभी ऑर्डर करें - ऑफर खत्म होने में:&nbsp;
          <span className="inline-block bg-white text-brand-gold font-bold px-2 py-0.5 rounded tabular-nums text-sm">
            {hh}:{mm}:{ss}
          </span>
          &nbsp;| 📞 +91 92171 27566
        </span>
      ) : (
        <span>{settings.announcementText}</span>
      )}
    </div>
  );
}
