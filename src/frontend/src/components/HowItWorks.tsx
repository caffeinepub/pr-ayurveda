import { CheckCircle, Package, Search } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "उत्पाद चुनें",
    desc: "अपनी समस्या के अनुसार सही आयुर्वेदिक उत्पाद चुनें। निःशुल्क परामर्श भी उपलब्ध है।",
  },
  {
    icon: Package,
    step: "02",
    title: "ऑर्डर करें",
    desc: "आसान और सुरक्षित भुगतान प्रक्रिया। गोपनीय पैकेजिंग में 3-5 दिन में डिलीवरी।",
  },
  {
    icon: CheckCircle,
    step: "03",
    title: "परिणाम पाएं",
    desc: "नियमित सेवन से 30 दिनों में ही अद्भुत परिणाम अनुभव करें।",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-brand-gold font-hindi text-sm font-semibold uppercase tracking-widest mb-2">
            कैसे काम करें
          </p>
          <h2 className="font-hindi-serif text-3xl md:text-4xl font-bold text-brand-green">
            तीन आसान कदम
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-brand-gold/30" />

          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="text-center relative"
            >
              <div className="relative inline-flex">
                <div className="w-20 h-20 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <s.icon className="w-9 h-9 text-white" />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 bg-brand-gold rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {s.step}
                </span>
              </div>
              <h3 className="font-hindi-serif text-xl font-bold text-brand-green mb-3">
                {s.title}
              </h3>
              <p className="font-hindi text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
