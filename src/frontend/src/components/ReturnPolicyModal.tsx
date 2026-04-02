import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CheckCircle,
  Package,
  RefreshCw,
  ShieldCheck,
  Truck,
  XCircle,
} from "lucide-react";

interface ReturnPolicyModalProps {
  open: boolean;
  onClose: () => void;
}

const sections = [
  {
    icon: RefreshCw,
    title: "वापसी की अवधि",
    color: "text-green-600",
    bg: "bg-green-50",
    content:
      "उत्पाद प्राप्त होने के 7 दिनों के भीतर वापसी का अनुरोध किया जा सकता है। उत्पाद अनखुला और मूल पैकेजिंग में होना चाहिए।",
  },
  {
    icon: CheckCircle,
    title: "वापसी योग्य स्थितियाँ",
    color: "text-blue-600",
    bg: "bg-blue-50",
    content:
      "• क्षतिग्रस्त या टूटा हुआ उत्पाद मिला हो\n• गलत उत्पाद डिलीवर हुआ हो\n• उत्पाद की एक्सपायरी डेट निकली हो\n• पैकेजिंग खराब हो या सील टूटी हो",
  },
  {
    icon: XCircle,
    title: "वापसी अस्वीकार्य स्थितियाँ",
    color: "text-red-600",
    bg: "bg-red-50",
    content:
      "• उत्पाद खोला या उपयोग किया गया हो\n• 7 दिन की अवधि समाप्त हो चुकी हो\n• बिना मूल पैकेजिंग के वापसी\n• व्यक्तिगत पसंद न आने पर",
  },
  {
    icon: Package,
    title: "रिफंड प्रक्रिया",
    color: "text-purple-600",
    bg: "bg-purple-50",
    content:
      "वापसी स्वीकृत होने के बाद 5-7 कार्य दिवसों में रिफंड आपके मूल भुगतान माध्यम पर वापस कर दिया जाएगा।",
  },
  {
    icon: Truck,
    title: "वापसी शिपिंग",
    color: "text-orange-600",
    bg: "bg-orange-50",
    content:
      "हमारी गलती से क्षतिग्रस्त उत्पाद के मामले में शिपिंग शुल्क हम वहन करेंगे। अन्य मामलों में ग्राहक को शिपिंग शुल्क देना होगा।",
  },
  {
    icon: ShieldCheck,
    title: "संपर्क करें",
    color: "text-teal-600",
    bg: "bg-teal-50",
    content:
      "वापसी के लिए हमसे संपर्क करें:\n📞 +91 92171 27566\n📍 ओखला फेज 3, दिल्ली\n\nकृपया ऑर्डर नंबर और कारण के साथ संपर्क करें।",
  },
];

export default function ReturnPolicyModal({
  open,
  onClose,
}: ReturnPolicyModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-hindi-serif text-2xl text-brand-green flex items-center gap-2">
            <RefreshCw className="w-6 h-6 text-brand-gold" />
            रिटर्न और रिफंड पॉलिसी
          </DialogTitle>
          <p className="font-hindi text-sm text-muted-foreground mt-1">
            UrmiWellness की वापसी नीति — हम आपकी संतुष्टि को सर्वोच्च प्राथमिकता देते हैं
          </p>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {sections.map(({ icon: Icon, title, color, bg, content }) => (
            <div key={title} className={`rounded-xl p-4 ${bg}`}>
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-5 h-5 ${color}`} />
                <h3 className={`font-hindi font-bold text-base ${color}`}>
                  {title}
                </h3>
              </div>
              <p className="font-hindi text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {content}
              </p>
            </div>
          ))}

          <div className="rounded-xl border border-brand-green/20 bg-brand-green/5 p-4 text-center">
            <p className="font-hindi text-sm text-brand-green font-semibold">
              ⚠️ नोट: एक बार उपयोग किए गए उत्पाद वापस नहीं लिए जाएंगे।
            </p>
            <p className="font-hindi text-xs text-muted-foreground mt-1">
              यह नीति बिना पूर्व सूचना के बदली जा सकती है।
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
