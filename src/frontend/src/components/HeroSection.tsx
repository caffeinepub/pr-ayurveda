import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

interface HeroSectionProps {
  onShopClick: () => void;
  onConsultClick: () => void;
}

export default function HeroSection({
  onShopClick,
  onConsultClick,
}: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative min-h-[80vh] flex items-center overflow-hidden"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-urmiwellness.dim_1400x700.jpg"
          alt="UrmiWellness Hero"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-dark/90 via-brand-blue/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/15 border border-white/30 rounded-full px-4 py-2 mb-6"
          >
            <span className="text-white text-sm font-hindi font-medium">
              🏥 भारत का विश्वसनीय स्वास्थ्य मंच
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="font-hindi-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
          >
            आपके स्वास्थ्य का
            <span className="text-brand-orange block mt-1">विश्वस्त साथी</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-white/90 text-lg md:text-xl font-hindi mb-8 leading-relaxed"
          >
            दवाइयां, विटामिन, आयुर्वेदिक उत्पाद &nbsp;|&nbsp; घर तक डिलीवरी
            &nbsp;|&nbsp; विशेषज्ञ परामर्श
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-brand-orange hover:bg-brand-orange-light text-white font-hindi font-semibold px-8 py-6 text-lg rounded-sm"
              onClick={onShopClick}
              data-ocid="hero.primary_button"
            >
              अभी खरीदें →
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-brand-blue font-hindi font-semibold px-8 py-6 text-lg rounded-sm bg-transparent"
              onClick={onConsultClick}
              data-ocid="hero.secondary_button"
            >
              डॉक्टर से परामर्श
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex gap-8 mt-12"
          >
            {[
              { value: "1,00,000+", label: "संतुष्ट ग्राहक" },
              { value: "500+", label: "दवाइयां उपलब्ध" },
              { value: "24x7", label: "डॉक्टर परामर्श" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-brand-orange text-2xl font-bold font-hindi-serif">
                  {stat.value}
                </div>
                <div className="text-white/80 text-sm font-hindi">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
