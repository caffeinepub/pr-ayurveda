import { staticTestimonials } from "@/data/staticData";
import { useTestimonials } from "@/hooks/useQueries";
import { Star } from "lucide-react";
import { motion } from "motion/react";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= rating ? "fill-brand-gold text-brand-gold" : "text-muted"
          }`}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const { data: backendTestimonials } = useTestimonials();
  const testimonials =
    backendTestimonials && backendTestimonials.length > 0
      ? backendTestimonials.map((t, i) => ({
          ...t,
          location:
            staticTestimonials[i % staticTestimonials.length]?.location ||
            "भारत",
        }))
      : staticTestimonials;

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-brand-gold font-hindi text-sm font-semibold uppercase tracking-widest mb-2">
            ग्राहक समीक्षाएं
          </p>
          <h2 className="font-hindi-serif text-3xl md:text-4xl font-bold text-brand-green">
            हमारे ग्राहक क्या कहते हैं?
          </h2>
          <p className="text-muted-foreground font-hindi mt-3">
            50,000+ संतुष्ट ग्राहकों के अनुभव
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          data-ocid="testimonials.list"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-lg p-6 shadow-card hover:shadow-card-hover transition-shadow"
              data-ocid={`testimonials.item.${i + 1}`}
            >
              <StarRating rating={Number(t.rating)} />
              <p className="font-hindi text-sm text-foreground mt-3 mb-4 leading-relaxed">
                "{t.reviewText}"
              </p>
              <div className="flex items-center gap-3 border-t border-border pt-4">
                <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-hindi font-semibold text-brand-green text-sm">
                    {t.name}
                  </div>
                  <div className="font-hindi text-xs text-muted-foreground">
                    {(t as (typeof staticTestimonials)[0]).location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
