import { motion } from "motion/react";

const badges = [
  {
    icon: "🏛️",
    title: "FSSAI प्रमाणित",
    sub: "खाद्य सुरक्षा मानक प्राधिकरण",
    highlight: true,
  },
  {
    icon: "🌍",
    title: "WHO GMP प्रमाणित",
    sub: "विश्व स्वास्थ्य संगठन मानक",
    highlight: true,
  },
  {
    icon: "✅",
    title: "ISO 9001:2015",
    sub: "अंतर्राष्ट्रीय गुणवत्ता प्रमाणपत्र",
    highlight: false,
  },
  {
    icon: "🌿",
    title: "100% आयुर्वेदिक",
    sub: "प्राकृतिक सामग्री",
    highlight: false,
  },
  {
    icon: "🔒",
    title: "सुरक्षित भुगतान",
    sub: "एन्क्रिप्टेड ट्रांजेक्शन",
    highlight: false,
  },
  { icon: "🚚", title: "निःशुल्क डिलीवरी", sub: "सभी ऑर्डर पर", highlight: false },
  {
    icon: "🔄",
    title: "30 दिन वापसी",
    sub: "पूरी वापसी गारंटी",
    highlight: false,
  },
  { icon: "💳", title: "COD उपलब्ध", sub: "कैश ऑन डिलीवरी", highlight: false },
];

export default function TrustBadges() {
  return (
    <section className="py-6 bg-white border-b border-border">
      <div className="max-w-6xl mx-auto px-4">
        {/* Certification highlight strip */}
        <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
          <span className="font-hindi text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            प्रमाणित एवं मान्यता प्राप्त
          </span>
          {badges
            .filter((b) => b.highlight)
            .map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 bg-brand-green text-white rounded-full px-4 py-1.5 shadow-sm"
              >
                <span className="text-base">{b.icon}</span>
                <div>
                  <p className="font-hindi font-bold text-xs leading-tight">
                    {b.title}
                  </p>
                  <p className="font-hindi text-[10px] text-white/80 leading-tight">
                    {b.sub}
                  </p>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Full badge strip */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-0 sm:justify-around">
          {badges.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg border ${
                b.highlight
                  ? "border-brand-gold bg-amber-50"
                  : "border-transparent bg-transparent"
              }`}
            >
              <span className="text-2xl">{b.icon}</span>
              <div>
                <p
                  className={`font-hindi font-bold text-sm leading-tight ${
                    b.highlight ? "text-brand-green" : "text-brand-green"
                  }`}
                >
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
