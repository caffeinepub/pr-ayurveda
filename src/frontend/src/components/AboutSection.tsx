import { Award, CheckCircle, Leaf, Shield, Users } from "lucide-react";

const stats = [
  { value: "10,000+", label: "संतुष्ट ग्राहक" },
  { value: "8+", label: "आयुर्वेदिक उत्पाद" },
  { value: "100%", label: "प्राकृतिक सामग्री" },
  { value: "5 साल", label: "विश्वसनीय अनुभव" },
];

const values = [
  {
    icon: Leaf,
    title: "शुद्ध आयुर्वेद",
    desc: "हम केवल शुद्ध जड़ी-बूटियों का उपयोग करते हैं। कोई रसायन नहीं, कोई मिलावट नहीं।",
  },
  {
    icon: Shield,
    title: "विश्वसनीय गुणवत्ता",
    desc: "हर उत्पाद विशेषज्ञ वैद्यों द्वारा परीक्षित और अनुमोदित है।",
  },
  {
    icon: Users,
    title: "ग्राहक पहले",
    desc: "आपकी संतुष्टि हमारी पहली प्राथमिकता है। हम 30 दिन की वापसी गारंटी देते हैं।",
  },
  {
    icon: Award,
    title: "विशेषज्ञ वैद्य टीम",
    desc: "हमारे अनुभवी वैद्य आपकी हर समस्या का सही समाधान देने के लिए सदैव तत्पर हैं।",
  },
];

const certifications = [
  {
    icon: "🏛️",
    title: "FSSAI प्रमाणित",
    license: "FSSAI लाइसेंस नं. 10024022000154",
    desc: "भारत सरकार के खाद्य सुरक्षा एवं मानक प्राधिकरण द्वारा प्रमाणित। हमारे उत्पाद खाद्य गुणवत्ता के उच्चतम मानकों को पूरा करते हैं।",
    color: "bg-blue-50 border-blue-200",
    iconBg: "bg-blue-100",
    labelColor: "text-blue-700",
  },
  {
    icon: "🌍",
    title: "WHO-GMP प्रमाणित",
    license: "विश्व स्वास्थ्य संगठन अनुमोदित",
    desc: "WHO के Good Manufacturing Practices के अनुसार निर्मित। अंतर्राष्ट्रीय उत्पादन गुणवत्ता मानकों का पालन।",
    color: "bg-green-50 border-green-200",
    iconBg: "bg-green-100",
    labelColor: "text-green-700",
  },
  {
    icon: "🏥",
    title: "Ayush मंत्रालय अनुमोदित",
    license: "भारत सरकार — आयुष मंत्रालय",
    desc: "भारत सरकार के आयुष मंत्रालय द्वारा मान्यता प्राप्त। पारंपरिक आयुर्वेदिक चिकित्सा के सर्वोच्च मानकों के अनुरूप।",
    color: "bg-amber-50 border-amber-200",
    iconBg: "bg-amber-100",
    labelColor: "text-amber-700",
  },
  {
    icon: "✅",
    title: "ISO 9001:2015 प्रमाणित",
    license: "अंतर्राष्ट्रीय मानक संगठन",
    desc: "ISO 9001:2015 के अनुसार प्रमाणित गुणवत्ता प्रबंधन प्रणाली। हर उत्पाद कठोर गुणवत्ता परीक्षण से गुजरता है।",
    color: "bg-purple-50 border-purple-200",
    iconBg: "bg-purple-100",
    labelColor: "text-purple-700",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-brand-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-brand-gold font-hindi text-sm font-semibold uppercase tracking-widest mb-2">
            हमारे बारे में
          </p>
          <h2 className="font-hindi-serif text-3xl md:text-4xl font-bold text-white mb-4">
            PR Ayurveda क्या है?
          </h2>
          <p className="text-white/80 font-hindi max-w-2xl mx-auto leading-relaxed">
            PR Ayurveda दिल्ली की एक विश्वसनीय आयुर्वेदिक कंपनी है जो पुरुषों की यौन
            स्वास्थ्य समस्याओं का समाधान शुद्ध आयुर्वेदिक जड़ी-बूटियों से करती है। हमारा लक्ष्य
            हर भारतीय पुरुष को प्राकृतिक तरीके से स्वस्थ और आत्मविश्वासी बनाना है।
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center bg-white/10 rounded-xl p-6 border border-white/20"
            >
              <p className="font-hindi-serif text-3xl font-bold text-brand-gold mb-1">
                {stat.value}
              </p>
              <p className="font-hindi text-white/80 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="font-hindi-serif text-2xl font-bold text-white mb-4">
              हमारी कहानी
            </h3>
            <p className="font-hindi text-white/80 leading-relaxed mb-4">
              PR Ayurveda की शुरुआत ओखला फेज 3, दिल्ली से हुई। हमारे संस्थापक ने देखा कि
              बाजार में बहुत सी नकली दवाईयां हैं जो लोगों को नुकसान पहुंचा रही हैं।
            </p>
            <p className="font-hindi text-white/80 leading-relaxed mb-4">
              इसीलिए हमने विशेषज्ञ वैद्यों के साथ मिलकर शुद्ध आयुर्वेदिक उत्पाद बनाने शुरू किए
              जो सस्ते, सुरक्षित और उपयोगी हों। आज हमारे हजारों ग्राहक हम पर विश्वास करते
              हैं।
            </p>
            <p className="font-hindi text-white/80 leading-relaxed">
              हमारा वादा है — कोई समझौता नहीं, कोई नकल नहीं, केवल शुद्ध आयुर्वेद।
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white/10 rounded-xl p-5 border border-white/20"
              >
                <div className="w-10 h-10 bg-brand-gold/20 rounded-full flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-brand-gold" />
                </div>
                <h4 className="font-hindi font-bold text-white text-sm mb-1">
                  {title}
                </h4>
                <p className="font-hindi text-white/70 text-xs leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <p className="text-brand-gold font-hindi text-sm font-semibold uppercase tracking-widest mb-2">
              प्रमाणपत्र एवं मान्यताएं
            </p>
            <h3 className="font-hindi-serif text-2xl font-bold text-white mb-3">
              सरकारी मान्यता प्राप्त उत्पाद
            </h3>
            <p className="font-hindi text-white/80 text-sm max-w-xl mx-auto">
              हमारे सभी उत्पाद FSSAI और WHO-GMP मानकों के अनुसार निर्मित हैं
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.title}
                className={`rounded-2xl p-5 border-2 ${cert.color} relative overflow-hidden`}
              >
                {/* Verified checkmark */}
                <div className="absolute top-3 right-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>

                {/* Icon */}
                <div
                  className={`w-12 h-12 ${cert.iconBg} rounded-xl flex items-center justify-center mb-4 text-2xl`}
                >
                  {cert.icon}
                </div>

                <h4
                  className={`font-hindi font-bold text-sm mb-1 ${cert.labelColor}`}
                >
                  {cert.title}
                </h4>
                <p className="font-hindi text-xs text-muted-foreground mb-2 font-medium">
                  {cert.license}
                </p>
                <p className="font-hindi text-xs text-gray-600 leading-relaxed">
                  {cert.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Trust note */}
          <div className="mt-6 bg-white/10 border border-brand-gold/30 rounded-xl p-4 text-center">
            <p className="font-hindi text-white font-semibold text-sm flex items-center justify-center gap-2">
              <span>🏆</span>
              हमारे सभी उत्पाद FSSAI, WHO-GMP और Ayush मंत्रालय द्वारा प्रमाणित हैं —
              आपकी सुरक्षा हमारी जिम्मेदारी
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="bg-white/10 rounded-2xl p-8 border border-white/20 text-center">
          <p className="text-brand-gold font-hindi text-sm font-semibold uppercase tracking-widest mb-3">
            हमारा मिशन
          </p>
          <h3 className="font-hindi-serif text-2xl font-bold text-white mb-4">
            "स्वस्थ भारत, सुखी भारत"
          </h3>
          <p className="font-hindi text-white/80 max-w-xl mx-auto leading-relaxed">
            हमारा सपना है कि भारत का हर पुरुष आयुर्वेद की शक्ति से अपना जीवन बेहतर बना
            सके। हम अखिल भारतीय पुरुषों को सस्ती और प्रभावी आयुर्वेदिक दवाईयां उपलब्ध कराना
            चाहते हैं।
          </p>
        </div>
      </div>
    </section>
  );
}
