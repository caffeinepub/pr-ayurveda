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
      className="relative min-h-[85vh] flex items-center overflow-hidden"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-ayurveda.dim_1400x700.jpg"
          alt="PR Ayurveda Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-green/90 via-brand-green/70 to-brand-green/20" />
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
            className="inline-flex items-center gap-2 bg-brand-gold/20 border border-brand-gold/40 rounded-full px-4 py-2 mb-6"
          >
            <span className="text-brand-gold text-sm font-hindi font-medium">
              🌿 100% प्राकृतिक आयुर्वेद
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="font-hindi-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
          >
            पुरुषों की यौन शक्ति के लिए
            <span className="text-brand-gold block mt-1">आयुर्वेदिक समाधान</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-white/90 text-lg md:text-xl font-hindi mb-8 leading-relaxed"
          >
            100% प्राकृतिक &nbsp;|&nbsp; कोई दुष्प्रभाव नहीं &nbsp;|&nbsp; विशेषज्ञ
            द्वारा प्रमाणित
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-brand-gold hover:bg-brand-gold-light text-white font-hindi font-semibold px-8 py-6 text-lg rounded-sm"
              onClick={onShopClick}
              data-ocid="hero.primary_button"
            >
              अभी खरीदें →
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-brand-green font-hindi font-semibold px-8 py-6 text-lg rounded-sm bg-transparent"
              onClick={onConsultClick}
              data-ocid="hero.secondary_button"
            >
              निःशुल्क परामर्श
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
              { value: "50,000+", label: "संतुष्ट ग्राहक" },
              { value: "15+", label: "वर्षों का अनुभव" },
              { value: "100%", label: "प्राकृतिक" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-brand-gold text-2xl font-bold font-hindi-serif">
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
