import { Leaf, ShieldCheck, Users } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Leaf,
    title: "शुद्ध आयुर्वेदिक",
    desc: "हिमालय की जड़ी-बूटियों से बनी 100% प्राकृतिक औषधियाँ",
  },
  {
    icon: ShieldCheck,
    title: "कोई साइड इफेक्ट नहीं",
    desc: "विशेषज्ञ वैद्यों द्वारा प्रमाणित, पूर्णतः सुरक्षित",
  },
  {
    icon: Users,
    title: "50,000+ संतुष्ट ग्राहक",
    desc: "पूरे भारत में लाखों पुरुष हमारे उत्पादों पर भरोसा करते हैं",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/3"
          >
            <p className="text-brand-gold font-hindi text-sm font-semibold uppercase tracking-widest mb-2">
              हमारा वादा
            </p>
            <h2 className="font-hindi-serif text-3xl md:text-4xl font-bold text-brand-green leading-tight">
              क्यों चुनें UrmiWellness?
            </h2>
            <p className="text-muted-foreground font-hindi mt-4 leading-relaxed">
              हम प्रकृति की शक्ति को आधुनिक विज्ञान के साथ जोड़कर सर्वोत्तम आयुर्वेदिक उत्पाद
              बनाते हैं।
            </p>
          </motion.div>

          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="bg-brand-cream-dark rounded-lg p-6 text-center"
              >
                <div className="w-14 h-14 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-7 h-7 text-brand-green" />
                </div>
                <h3 className="font-hindi-serif text-lg font-bold text-brand-green mb-2">
                  {f.title}
                </h3>
                <p className="font-hindi text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
