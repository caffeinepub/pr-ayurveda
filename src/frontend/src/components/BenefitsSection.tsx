import { Brain, Flame, Heart, Moon, Shield, Zap } from "lucide-react";
import { motion } from "motion/react";

const benefits = [
  {
    icon: Flame,
    title: "यौन शक्ति में वृद्धि",
    desc: "प्राकृतिक जड़ी-बूटियों से यौन शक्ति और प्रदर्शन में उल्लेखनीय सुधार होता है।",
  },
  {
    icon: Zap,
    title: "स्टैमिना और ऊर्जा",
    desc: "दिनभर ऊर्जावान रहें। शारीरिक और मानसिक थकान से छुटकारा पाएं।",
  },
  {
    icon: Brain,
    title: "तनाव मुक्ति",
    desc: "अश्वगंधा और ब्राह्मी से मानसिक तनाव और चिंता कम होती है।",
  },
  {
    icon: Heart,
    title: "हृदय स्वास्थ्य",
    desc: "रक्त संचार सुधरता है, जिससे यौन स्वास्थ्य में स्वाभाविक सुधार होता है।",
  },
  {
    icon: Moon,
    title: "गहरी नींद",
    desc: "अच्छी नींद से हार्मोन का स्तर संतुलित रहता है और ऊर्जा बढ़ती है।",
  },
  {
    icon: Shield,
    title: "रोग प्रतिरोधक क्षमता",
    desc: "शुद्ध आयुर्वेदिक औषधियाँ शरीर की रोग प्रतिरोधक क्षमता को बढ़ाती हैं।",
  },
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-20 bg-brand-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-brand-gold font-hindi text-sm font-semibold uppercase tracking-widest mb-2">
            फायदे
          </p>
          <h2 className="font-hindi-serif text-3xl md:text-4xl font-bold text-white">
            हमारे उत्पादों के लाभ
          </h2>
          <p className="text-white/70 font-hindi mt-3 max-w-xl mx-auto">
            प्रकृति की शक्ति से पाएं संपूर्ण स्वास्थ्य और जीवन में नई ऊर्जा
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/15 transition-colors"
            >
              <div className="w-12 h-12 bg-brand-gold/20 rounded-lg flex items-center justify-center mb-4">
                <b.icon className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="font-hindi-serif text-lg font-bold text-white mb-2">
                {b.title}
              </h3>
              <p className="font-hindi text-sm text-white/70 leading-relaxed">
                {b.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
