import { motion } from "motion/react";
import { getSettings } from "../hooks/useSiteSettings";

export default function PromoBannersDisplay() {
  const settings = getSettings();
  const activeBanners = (settings.promoBanners || []).filter((b) => b.active);

  if (activeBanners.length === 0) return null;

  const colorMap: Record<string, { bg: string; text: string; badge: string }> =
    {
      "bg-red-600": { bg: "#dc2626", text: "#fff", badge: "#991b1b" },
      "bg-blue-600": { bg: "#2563eb", text: "#fff", badge: "#1d4ed8" },
      "bg-purple-600": { bg: "#9333ea", text: "#fff", badge: "#7e22ce" },
      "bg-orange-500": { bg: "#f97316", text: "#fff", badge: "#c2410c" },
      "bg-green-700": { bg: "#15803d", text: "#fff", badge: "#166534" },
    };

  return (
    <section className="py-4 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x">
          {activeBanners.map((banner, i) => {
            const colors = colorMap[banner.color] || colorMap["bg-green-700"];
            return (
              <motion.div
                key={banner.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="flex-shrink-0 snap-start rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:scale-[1.02] transition-transform"
                style={{
                  background: `linear-gradient(135deg, ${colors.bg}, ${colors.badge})`,
                  minWidth: "280px",
                  maxWidth: "320px",
                }}
              >
                <div className="p-5">
                  {banner.badge && (
                    <span
                      className="inline-block text-xs font-hindi font-bold px-2 py-0.5 rounded-full mb-2"
                      style={{
                        background: "rgba(255,255,255,0.25)",
                        color: colors.text,
                      }}
                    >
                      {banner.badge}
                    </span>
                  )}
                  <h3
                    className="font-hindi-serif font-bold text-lg leading-tight mb-1"
                    style={{ color: colors.text }}
                  >
                    {banner.title}
                  </h3>
                  {banner.subtitle && (
                    <p
                      className="font-hindi text-sm"
                      style={{ color: `${colors.text}cc` }}
                    >
                      {banner.subtitle}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
