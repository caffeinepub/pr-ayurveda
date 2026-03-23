import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const contactInfo = [
  { text: "📞 +91 92171 27566" },
  { text: "🕐 सोम-रवि: सुबह 9 बजे से रात 9 बजे" },
  { text: "📍 ओखला फेज 3, दिल्ली" },
];

export default function ConsultationForm() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "नाम आवश्यक है";
    if (!form.phone.trim()) e.phone = "फोन नंबर आवश्यक है";
    else if (!/^[0-9]{10}$/.test(form.phone.trim()))
      e.phone = "10 अंकों का फोन नंबर दर्ज करें";
    if (!form.message.trim()) e.message = "समस्या विवरण आवश्यक है";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      // Save to localStorage only — no backend calls
      const existing = JSON.parse(
        localStorage.getItem("pr_consultations") || "[]",
      );
      existing.push({
        ...form,
        date: new Date().toLocaleDateString("hi-IN"),
        timestamp: Date.now(),
      });
      localStorage.setItem("pr_consultations", JSON.stringify(existing));

      toast.success("आपकी परामर्श अनुरोध सफलतापूर्वक भेज दिया गया!");
      setForm({ name: "", phone: "", message: "" });
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    } catch {
      toast.error("कुछ त्रुटि हुई। कृपया पुनः प्रयास करें।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-brand-gold font-hindi text-sm font-semibold uppercase tracking-widest mb-2">
              परामर्श
            </p>
            <h2 className="font-hindi-serif text-3xl md:text-4xl font-bold text-brand-green mb-4">
              निःशुल्क परामर्श लें
            </h2>
            <p className="font-hindi text-muted-foreground leading-relaxed mb-8">
              हमारे विशेषज्ञ वैद्य आपकी समस्या का समाधान करने में मदद करेंगे। सभी जानकारी
              पूरी तरह गोपनीय रखी जाती है।
            </p>
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 text-muted-foreground font-hindi"
                >
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl p-8 shadow-card"
            data-ocid="consultation.modal"
          >
            <h3 className="font-hindi-serif text-xl font-bold text-brand-green mb-6">
              परामर्श अनुरोध भेजें
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label className="font-hindi text-sm font-medium text-foreground mb-1.5 block">
                  आपका नाम *
                </Label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="राम कुमार"
                  className="font-hindi"
                  data-ocid="consultation.name.input"
                />
                {errors.name && (
                  <p
                    className="text-destructive text-xs font-hindi mt-1"
                    data-ocid="consultation.name.error_state"
                  >
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <Label className="font-hindi text-sm font-medium text-foreground mb-1.5 block">
                  फोन नंबर *
                </Label>
                <Input
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  placeholder="9XXXXXXXXX"
                  type="tel"
                  className="font-hindi"
                  data-ocid="consultation.phone.input"
                />
                {errors.phone && (
                  <p
                    className="text-destructive text-xs font-hindi mt-1"
                    data-ocid="consultation.phone.error_state"
                  >
                    {errors.phone}
                  </p>
                )}
              </div>
              <div>
                <Label className="font-hindi text-sm font-medium text-foreground mb-1.5 block">
                  समस्या का विवरण *
                </Label>
                <Textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  placeholder="अपनी स्वास्थ्य समस्या यहाँ लिखें..."
                  rows={4}
                  className="font-hindi"
                  data-ocid="consultation.message.textarea"
                />
                {errors.message && (
                  <p
                    className="text-destructive text-xs font-hindi mt-1"
                    data-ocid="consultation.message.error_state"
                  >
                    {errors.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-green hover:bg-brand-green-light text-white font-hindi font-semibold py-6 text-base"
                data-ocid="consultation.submit_button"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    भेजा जा रहा है...
                  </>
                ) : (
                  "परामर्श अनुरोध भेजें"
                )}
              </Button>
              {isSuccess && (
                <p
                  className="text-center text-sm font-hindi text-brand-green"
                  data-ocid="consultation.success_state"
                >
                  ✅ आपका अनुरोध सफलतापूर्वक प्राप्त हो गया!
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
