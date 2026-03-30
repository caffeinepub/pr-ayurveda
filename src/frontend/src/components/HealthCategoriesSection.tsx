import { motion } from "motion/react";

const categories = [
  { emoji: "💊", name: "दवाइयां", desc: "सभी प्रकार की दवाइयां" },
  { emoji: "🌿", name: "आयुर्वेदिक", desc: "प्राकृतिक जड़ी-बूटियां" },
  { emoji: "💪", name: "विटामिन & सप्लीमेंट", desc: "शक्ति और ऊर्जा के लिए" },
  { emoji: "🥗", name: "हेल्थ फूड", desc: "पोषण से भरपूर आहार" },
  { emoji: "🔬", name: "लैब टेस्ट", desc: "घर पर जांच सुविधा" },
  { emoji: "👨‍⚕️", name: "डॉक्टर परामर्श", desc: "ऑनलाइन डॉक्टर से मिलें" },
  { emoji: "✨", name: "स्किन केयर", desc: "त्वचा की देखभाल" },
  { emoji: "🏃", name: "न्यूट्रिशन", desc: "संतुलित पोषण उत्पाद" },
];

export default function HealthCategoriesSection() {
  return (
    <section id="categories" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-brand-blue font-hindi text-sm font-semibold uppercase tracking-widest mb-2">
            सभी श्रेणियां
          </p>
          <h2 className="font-hindi-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
            स्वास्थ्य श्रेणियां
          </h2>
          <p className="font-hindi text-muted-foreground max-w-xl mx-auto">
            अपनी जरूरत के अनुसार श्रेणी चुनें और सही उत्पाद पाएं
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.name}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white border border-border hover:border-brand-blue hover:shadow-card transition-all cursor-pointer text-center group"
              onClick={() =>
                document
                  .querySelector("#products")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              data-ocid={`categories.item.${i + 1}`}
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">
                {cat.emoji}
              </span>
              <span className="font-hindi text-xs font-semibold text-foreground leading-tight">
                {cat.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
