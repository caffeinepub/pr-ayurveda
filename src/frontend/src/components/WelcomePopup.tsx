import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function WelcomePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("popup_shown")) {
      const t = setTimeout(() => setVisible(true), 3000);
      return () => clearTimeout(t);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("popup_shown", "1");
    setVisible(false);
  };

  const handleShop = () => {
    handleClose();
    setTimeout(() => {
      document
        .querySelector("#products")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") handleClose();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-ocid="welcome.modal"
        >
          <div
            className="absolute inset-0 bg-black/60"
            onClick={handleClose}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label="बंद करें"
          />
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl w-[340px] max-w-[90vw] overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            <div className="bg-gradient-to-br from-brand-green to-brand-green-light px-6 py-5 text-center">
              <p className="text-3xl mb-1">🎉</p>
              <h2 className="font-hindi font-bold text-white text-xl leading-snug">
                स्वागत ऑफर!
              </h2>
            </div>
            <div className="px-6 py-5 text-center">
              <p className="font-hindi font-bold text-brand-green text-lg mb-1">
                पहले ऑर्डर पर पाएं ₹100 की छूट!
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 mb-3 inline-block">
                <span className="font-hindi font-bold text-amber-700 text-base tracking-widest">
                  कोड: PRAYUR100
                </span>
              </div>
              <p className="font-hindi text-sm text-muted-foreground mb-5">
                आज ही ऑर्डर करें और प्राकृतिक आयुर्वेद का लाभ उठाएं
              </p>
              <button
                type="button"
                onClick={handleShop}
                className="w-full bg-brand-green hover:bg-brand-green-light text-white font-hindi font-bold py-3 rounded-xl text-base transition-colors mb-3"
                data-ocid="welcome.primary_button"
              >
                अभी खरीदें 🛒
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="text-muted-foreground font-hindi text-sm hover:text-foreground transition-colors"
                data-ocid="welcome.cancel_button"
              >
                बाद में
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
