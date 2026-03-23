import imgAshwagandha from "/assets/generated/product-ashwagandha.dim_400x400.jpg";
import imgGokhru from "/assets/generated/product-gokhru.dim_400x400.jpg";
import imgKaunchBeej from "/assets/generated/product-kaunchbeej.dim_400x400.jpg";
import imgPurushShakti from "/assets/generated/product-purush-shakti.dim_400x400.jpg";
import imgSafedMusli from "/assets/generated/product-safedmusli.dim_400x400.jpg";
import imgShatavari from "/assets/generated/product-shatavari.dim_400x400.jpg";
import imgShilajit from "/assets/generated/product-shilajit.dim_400x400.jpg";
import imgVidarikand from "/assets/generated/product-vidarikand.dim_400x400.jpg";

export const staticProducts = [
  {
    id: BigInt(1),
    name: "PR Ayurveda शिलाजीत कैप्सूल",
    description:
      "PR Ayurveda की हिमालयी शुद्ध शिलाजीत कैप्सूल — यौन शक्ति और ऊर्जा बढ़ाने में सर्वश्रेष्ठ",
    benefits: "यौन शक्ति वृद्धि, स्टैमिना, ऊर्जा",
    price: BigInt(2598),
    ingredients: "शुद्ध शिलाजीत, अश्वगंधा, सफेद मूसली",
    image: imgShilajit,
    rating: 5,
    reviews: 1250,
  },
  {
    id: BigInt(2),
    name: "PR Ayurveda अश्वगंधा चूर्ण",
    description: "PR Ayurveda का शुद्ध अश्वगंधा जड़ चूर्ण — तनाव मुक्ति और शक्ति वर्धक",
    benefits: "तनाव मुक्ति, मानसिक स्वास्थ्य, शक्ति वर्धक",
    price: BigInt(1198),
    ingredients: "शुद्ध अश्वगंधा जड़",
    image: imgAshwagandha,
    rating: 5,
    reviews: 980,
  },
  {
    id: BigInt(3),
    name: "PR Ayurveda सफेद मूसली",
    description:
      "PR Ayurveda की प्राकृतिक सफेद मूसली — पुरुषों की यौन समस्याओं के लिए रामबाण",
    benefits: "यौन शक्ति, स्टैमिना, वीर्य वर्धक",
    price: BigInt(1998),
    ingredients: "शुद्ध सफेद मूसली",
    image: imgSafedMusli,
    rating: 4,
    reviews: 750,
  },
  {
    id: BigInt(4),
    name: "PR Ayurveda कौंच बीज चूर्ण",
    description: "PR Ayurveda का शुद्ध कौंच बीज चूर्ण — पुरुष यौन स्वास्थ्य के लिए उत्तम",
    benefits: "यौन शक्ति, हार्मोन बैलेंस, स्पर्म काउंट",
    price: BigInt(1598),
    ingredients: "शुद्ध कौंच बीज",
    image: imgKaunchBeej,
    rating: 4,
    reviews: 620,
  },
  {
    id: BigInt(5),
    name: "PR Ayurveda शतावरी कैप्सूल",
    description: "PR Ayurveda की शतावरी कैप्सूल — हार्मोनल बैलेंस और ऊर्जा के लिए",
    benefits: "हार्मोन बैलेंस, ऊर्जा, पोषण",
    price: BigInt(1398),
    ingredients: "शुद्ध शतावरी अर्क",
    image: imgShatavari,
    rating: 4,
    reviews: 540,
  },
  {
    id: BigInt(6),
    name: "PR Ayurveda विदारीकंद चूर्ण",
    description:
      "PR Ayurveda का शुद्ध विदारीकंद चूर्ण — यौन कमजोरी दूर करने में प्रभावशाली",
    benefits: "यौन कमजोरी, शक्ति, वीर्य वर्धक",
    price: BigInt(998),
    ingredients: "शुद्ध विदारीकंद",
    image: imgVidarikand,
    rating: 4,
    reviews: 410,
  },
  {
    id: BigInt(7),
    name: "PR Ayurveda पुरुष शक्ति टैबलेट",
    description:
      "PR Ayurveda की स्पेशल पुरुष शक्ति टैबलेट — 8 जड़ी-बूटियों का अनूठा मिश्रण",
    benefits: "यौन शक्ति, लंबा स्टैमिना, आत्मविश्वास",
    price: BigInt(2998),
    ingredients:
      "शिलाजीत, अश्वगंधा, सफेद मूसली, कौंच बीज, शतावरी, गोखरू, अकरकरा, जायफल",
    image: imgPurushShakti,
    rating: 5,
    reviews: 1800,
  },
  {
    id: BigInt(8),
    name: "PR Ayurveda गोखरू एक्सट्रैक्ट",
    description:
      "PR Ayurveda का शुद्ध गोखरू एक्सट्रैक्ट — टेस्टोस्टेरोन और किडनी स्वास्थ्य के लिए",
    benefits: "टेस्टोस्टेरोन बूस्ट, किडनी, यौन शक्ति",
    price: BigInt(1798),
    ingredients: "शुद्ध गोखरू अर्क",
    image: imgGokhru,
    rating: 4,
    reviews: 390,
  },
];

export const staticTestimonials = [
  {
    name: "राजेश कुमार",
    reviewText:
      "PR Ayurveda शिलाजीत कैप्सूल ने मेरी जिंदगी बदल दी। 3 महीने में जबरदस्त फर्क पड़ा। पूरी तरह प्राकृतिक और कोई साइड इफेक्ट नहीं।",
    rating: BigInt(5),
    location: "दिल्ली",
  },
  {
    name: "सुरेश शर्मा",
    reviewText:
      "PR Ayurveda अश्वगंधा चूर्ण लेने के बाद तनाव काफी कम हुआ और ऊर्जा में बहुत सुधार आया। PR Ayurveda का बहुत बहुत धन्यवाद।",
    rating: BigInt(5),
    location: "मुंबई",
  },
  {
    name: "अमित पटेल",
    reviewText:
      "PR Ayurveda सफेद मूसली का असर पहले महीने से ही दिखने लगा। डिलीवरी भी बहुत जल्दी हुई। 100% संतुष्ट हूँ।",
    rating: BigInt(4),
    location: "अहमदाबाद",
  },
  {
    name: "विकास सिंह",
    reviewText:
      "PR Ayurveda के सभी उत्पाद बहुत उच्च गुणवत्ता के हैं। मैंने PR Ayurveda पुरुष शक्ति टैबलेट लिया और परिणाम अद्भुत रहे।",
    rating: BigInt(5),
    location: "लखनऊ",
  },
];

export const staticFAQs = [
  {
    question: "PR Ayurveda की दवाएं कितने दिन में असर करती हैं?",
    answer:
      "PR Ayurveda के अधिकांश उत्पाद 15-30 दिनों में असर दिखाने लगते हैं। पूरा फायदा पाने के लिए 3 महीने तक नियमित सेवन करें।",
  },
  {
    question: "क्या PR Ayurveda उत्पादों का कोई दुष्प्रभाव है?",
    answer:
      "नहीं, PR Ayurveda के सभी उत्पाद 100% प्राकृतिक आयुर्वेदिक जड़ी-बूटियों से बने हैं। इनका कोई हानिकारक दुष्प्रभाव नहीं है।",
  },
  {
    question: "क्या PR Ayurveda उत्पाद 100% प्राकृतिक हैं?",
    answer:
      "हाँ, बिल्कुल। PR Ayurveda के उत्पाद शुद्ध आयुर्वेदिक जड़ी-बूटियों से बने हैं और किसी भी रासायनिक पदार्थ का उपयोग नहीं किया जाता।",
  },
  {
    question: "PR Ayurveda से कहाँ से खरीदें?",
    answer:
      "आप PR Ayurveda की वेबसाइट से सीधे ऑर्डर कर सकते हैं। हम पूरे भारत में डिलीवरी करते हैं।",
  },
  {
    question: "PR Ayurveda की डिलीवरी कितने दिन में होती है?",
    answer: "ऑर्डर करने के 3-5 कार्य दिवसों में आपके घर तक डिलीवरी हो जाती है।",
  },
  {
    question: "क्या गोपनीय पैकेजिंग में डिलीवरी होती है?",
    answer:
      "हाँ, PR Ayurveda पूरी तरह गोपनीय (Discreet) पैकेजिंग में डिलीवरी करता है। बाहर से पैकेट पर कोई उत्पाद विवरण नहीं होता।",
  },
];
