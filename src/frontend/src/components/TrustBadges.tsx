import { motion } from "motion/react";

const badges = [
  { icon: "🚚", title: "निःशुल्क डिलीवरी", sub: "सभी ऑर्डर पर" },
  { icon: "🔄", title: "30 दिन वापसी", sub: "पूरी वापसी गारंटी" },
  { icon: "✅", title: "100% प्राकृतिक", sub: "शुद्ध आयुर्वेदिक" },
  { icon: "💳", title: "COD उपलब्ध", sub: "कैश ऑन डिलीवरी" },
];

export default function TrustBadges() {
  return (
    <section className="py-4 bg-white border-b border-border">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-0 sm:justify-around">
          {badges.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 px-4 py-2"
            >
              <span className="text-2xl">{b.icon}</span>
              <div>
                <p className="font-hindi font-bold text-brand-green text-sm leading-tight">
                  {b.title}
                </p>
                <p className="font-hindi text-xs text-muted-foreground">
                  {b.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
