import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { staticFAQs } from "@/data/staticData";
import { useFAQs } from "@/hooks/useQueries";
import { motion } from "motion/react";

export default function FAQSection() {
  const { data: backendFAQs } = useFAQs();
  const faqs = backendFAQs && backendFAQs.length > 0 ? backendFAQs : staticFAQs;

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-brand-gold font-hindi text-sm font-semibold uppercase tracking-widest mb-2">
            सामान्य प्रश्न
          </p>
          <h2 className="font-hindi-serif text-3xl md:text-4xl font-bold text-brand-green">
            अक्सर पूछे जाने वाले प्रश्न
          </h2>
        </motion.div>

        <Accordion
          type="single"
          collapsible
          className="space-y-3"
          data-ocid="faq.list"
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <AccordionItem
                value={`faq-${i}`}
                className="bg-card border border-border rounded-lg px-4 overflow-hidden"
                data-ocid={`faq.item.${i + 1}`}
              >
                <AccordionTrigger className="font-hindi font-semibold text-brand-green text-left py-4 hover:no-underline hover:text-brand-gold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-hindi text-muted-foreground text-sm leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
