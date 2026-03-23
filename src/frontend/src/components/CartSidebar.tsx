import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { staticProducts } from "@/data/staticData";
import { useActor } from "@/hooks/useActor";
import type { useLocalCart } from "@/hooks/useLocalCart";
import {
  ArrowLeft,
  CheckCircle,
  CreditCard,
  MapPin,
  Minus,
  Package,
  Plus,
  ShoppingBag,
  Smartphone,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
  cart: ReturnType<typeof useLocalCart>;
}

interface Address {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

type PaymentMethod = "cod" | "upi" | "card";
type Step = "cart" | "address" | "payment" | "success";

const INDIAN_STATES = [
  "आंध्र प्रदेश",
  "अरुणाचल प्रदेश",
  "असम",
  "बिहार",
  "छत्तीसगढ़",
  "गोवा",
  "गुजरात",
  "हरियाणा",
  "हिमाचल प्रदेश",
  "झारखंड",
  "कर्नाटक",
  "केरल",
  "मध्य प्रदेश",
  "महाराष्ट्र",
  "मणिपुर",
  "मेघालय",
  "मिजोरम",
  "नागालैंड",
  "ओड़िशा",
  "पंजाब",
  "राजस्थान",
  "सिक्किम",
  "तमिलनाडु",
  "तेलंगाना",
  "त्रिपुरा",
  "उत्तर प्रदेश",
  "उत्तराखंड",
  "पश्चिम बंगाल",
  "दिल्ली",
];

const STEPS = [
  { id: "cart", label: "कार्ट", icon: ShoppingBag },
  { id: "address", label: "पता", icon: MapPin },
  { id: "payment", label: "भुगतान", icon: CreditCard },
  { id: "success", label: "पुष्टि", icon: CheckCircle },
];

export default function CartSidebar({ open, onClose, cart }: CartSidebarProps) {
  const { actor } = useActor();
  const { items, total, removeFromCart, updateQuantity, clearCart } = cart;

  const [step, setStep] = useState<Step>("cart");
  const [confirmedTotal, setConfirmedTotal] = useState(0);
  const [addr, setAddr] = useState<Address>({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [addrErrors, setAddrErrors] = useState<Partial<Address>>({});
  const [payMethod, setPayMethod] = useState<PaymentMethod>("cod");
  const [upiId, setUpiId] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [orderNo, setOrderNo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getProductName = (productId: bigint) =>
    staticProducts.find((sp) => sp.id === productId)?.name ||
    `उत्पाद #${productId}`;
  const getProductPrice = (productId: bigint) =>
    Number(staticProducts.find((sp) => sp.id === productId)?.price || 0);

  const validateAddr = () => {
    const e: Partial<Address> = {};
    if (!addr.name.trim()) e.name = "नाम अनिवार्य है";
    if (!addr.phone.trim() || !/^[6-9]\d{9}$/.test(addr.phone))
      e.phone = "सही 10 अंक का मोबाइल नंबर दर्ज करें";
    if (!addr.address.trim()) e.address = "पता अनिवार्य है";
    if (!addr.city.trim()) e.city = "शहर अनिवार्य है";
    if (!addr.state.trim()) e.state = "राज्य चुनें";
    if (!addr.pincode.trim() || !/^\d{6}$/.test(addr.pincode))
      e.pincode = "सही 6 अंक का पिन कोड दर्ज करें";
    setAddrErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateAddr()) return;
    setIsSubmitting(true);
    try {
      // Try to submit to backend but don't block on failure
      const no = `PR${Date.now().toString().slice(-6)}`;

      if (actor) {
        try {
          await actor.placeOrder();
        } catch (backendErr) {
          console.warn(
            "Backend order submission failed, saving locally:",
            backendErr,
          );
        }
      }

      setOrderNo(no);
      // Save to localStorage for order tracking
      const existing = JSON.parse(localStorage.getItem("pr_orders") || "[]");
      existing.push({
        orderNo: no,
        date: new Date().toLocaleDateString("hi-IN"),
        items: items.map((item) => ({
          name: getProductName(item.productId),
          qty: item.quantity,
          price: getProductPrice(item.productId),
        })),
        total,
        address: `${addr.address}, ${addr.city}, ${addr.state} - ${addr.pincode}`,
        phone: addr.phone,
        name: addr.name,
        payment:
          payMethod === "cod"
            ? "कैश ऑन डिलीवरी"
            : payMethod === "upi"
              ? `UPI (${upiId})`
              : "कार्ड",
        status: "लंबित",
      });
      localStorage.setItem("pr_orders", JSON.stringify(existing));
      setConfirmedTotal(total);
      clearCart();
      setStep("success");
    } catch (err) {
      console.error("Order error:", err);
      toast.error("ऑर्डर देने में त्रुटि हुई। कृपया पुनः प्रयास करें।");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (step === "success") {
      setStep("cart");
      setAddr({
        name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
      });
      setUpiId("");
      setCardNo("");
      setCardExpiry("");
      setCardCvv("");
    }
    onClose();
  };

  const stepIndex = STEPS.findIndex((s) => s.id === step);

  const addrField = (
    key: keyof Address,
    label: string,
    placeholder: string,
    type = "text",
  ) => (
    <div className="space-y-1">
      <Label className="font-hindi text-sm">{label}</Label>
      <Input
        type={type}
        value={addr[key]}
        onChange={(e) => {
          setAddr((p) => ({ ...p, [key]: e.target.value }));
          setAddrErrors((p) => ({ ...p, [key]: undefined }));
        }}
        placeholder={placeholder}
        className="font-hindi border-border focus-visible:ring-brand-green"
      />
      {addrErrors[key] && (
        <p className="text-xs text-destructive font-hindi">{addrErrors[key]}</p>
      )}
    </div>
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={handleClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background shadow-2xl z-50 flex flex-col"
            data-ocid="cart.sheet"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-2">
                {step !== "cart" && step !== "success" && (
                  <button
                    type="button"
                    onClick={() =>
                      setStep(step === "payment" ? "address" : "cart")
                    }
                    className="p-1 hover:bg-secondary rounded-full"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <h2 className="font-hindi-serif font-bold text-xl text-brand-green">
                  {step === "cart" && "आपका कार्ट"}
                  {step === "address" && "डिलीवरी पता"}
                  {step === "payment" && "भुगतान विधि"}
                  {step === "success" && "ऑर्डर सफल"}
                </h2>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="p-2 hover:bg-secondary rounded-full"
                data-ocid="cart.close_button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step Indicator */}
            {step !== "success" && (
              <div className="flex border-b border-border">
                {STEPS.slice(0, 3).map((s, i) => (
                  <div
                    key={s.id}
                    className={`flex-1 flex items-center justify-center gap-1 py-2 text-xs font-hindi ${
                      i <= stepIndex
                        ? "text-brand-green border-b-2 border-brand-green font-semibold"
                        : "text-muted-foreground"
                    }`}
                  >
                    <s.icon className="w-3.5 h-3.5" />
                    {s.label}
                  </div>
                ))}
              </div>
            )}

            {/* CART STEP */}
            {step === "cart" && (
              <>
                <div className="flex-1 overflow-y-auto p-5">
                  {items.length === 0 ? (
                    <div
                      className="text-center py-16"
                      data-ocid="cart.empty_state"
                    >
                      <ShoppingBag className="w-16 h-16 text-muted mx-auto mb-4" />
                      <p className="font-hindi text-muted-foreground text-lg">
                        आपका कार्ट खाली है
                      </p>
                      <Button
                        onClick={handleClose}
                        className="mt-6 bg-brand-green text-white font-hindi"
                        data-ocid="cart.secondary_button"
                      >
                        उत्पाद देखें
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {items.map((item, i) => (
                        <div
                          key={item.productId.toString()}
                          className="flex items-center gap-4 bg-card rounded-lg p-4"
                          data-ocid={`cart.item.${i + 1}`}
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-hindi font-semibold text-brand-green text-sm truncate">
                              {getProductName(item.productId)}
                            </p>
                            <p className="font-hindi-serif font-bold text-brand-gold mt-1">
                              ₹{getProductPrice(item.productId)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                if (item.quantity <= 1) {
                                  removeFromCart(item.productId);
                                } else {
                                  updateQuantity(
                                    item.productId,
                                    item.quantity - 1,
                                  );
                                }
                              }}
                              className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-secondary"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-hindi font-medium w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity + 1,
                                )
                              }
                              className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-secondary"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.productId)}
                            className="p-1.5 text-destructive hover:bg-destructive/10 rounded"
                            data-ocid={`cart.item.${i + 1}.delete_button`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {items.length > 0 && (
                  <div className="p-5 border-t border-border">
                    <div className="flex justify-between mb-1">
                      <span className="font-hindi text-muted-foreground">
                        उप-योग
                      </span>
                      <span className="font-hindi-serif font-bold text-xl text-brand-green">
                        ₹{total}
                      </span>
                    </div>
                    <p className="font-hindi text-xs text-muted-foreground mb-3">
                      🚚 निःशुल्क डिलीवरी ₹999 से अधिक पर
                    </p>
                    <Separator className="mb-3" />
                    <Button
                      className="w-full bg-brand-gold hover:bg-brand-gold-light text-white font-hindi font-semibold py-6 text-base"
                      onClick={() => setStep("address")}
                      data-ocid="cart.confirm_button"
                    >
                      आगे बढ़ें →
                    </Button>
                  </div>
                )}
              </>
            )}

            {/* ADDRESS STEP */}
            {step === "address" && (
              <>
                <div className="flex-1 overflow-y-auto p-5 space-y-3">
                  <div className="bg-brand-green/5 border border-brand-green/20 rounded-lg p-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-green shrink-0" />
                    <p className="font-hindi text-sm text-brand-green">
                      कृपया अपना डिलीवरी पता सही से भरें
                    </p>
                  </div>
                  {addrField("name", "पूरा नाम *", "आपका पूरा नाम")}
                  {addrField(
                    "phone",
                    "मोबाइल नंबर *",
                    "10 अंक का मोबाइल नंबर",
                    "tel",
                  )}
                  <div className="space-y-1">
                    <Label className="font-hindi text-sm">
                      गली / कोलोनी / मकान नंं *
                    </Label>
                    <textarea
                      value={addr.address}
                      onChange={(e) => {
                        setAddr((p) => ({ ...p, address: e.target.value }));
                        setAddrErrors((p) => ({ ...p, address: undefined }));
                      }}
                      placeholder="गली नंं, कोलोनी, लैंडमार्क..."
                      rows={3}
                      className="w-full px-3 py-2 text-sm font-hindi border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-brand-green resize-none"
                    />
                    {addrErrors.address && (
                      <p className="text-xs text-destructive font-hindi">
                        {addrErrors.address}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {addrField("city", "शहर *", "आपका शहर")}
                    {addrField("pincode", "पिन कोड *", "6 अंक का पिन", "tel")}
                  </div>
                  <div className="space-y-1">
                    <Label className="font-hindi text-sm">राज्य *</Label>
                    <select
                      value={addr.state}
                      onChange={(e) => {
                        setAddr((p) => ({ ...p, state: e.target.value }));
                        setAddrErrors((p) => ({ ...p, state: undefined }));
                      }}
                      className="w-full px-3 py-2 text-sm font-hindi border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-brand-green"
                    >
                      <option value="">— राज्य चुनें —</option>
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {addrErrors.state && (
                      <p className="text-xs text-destructive font-hindi">
                        {addrErrors.state}
                      </p>
                    )}
                  </div>
                </div>
                <div className="p-5 border-t border-border">
                  <Button
                    className="w-full bg-brand-gold hover:bg-brand-gold-light text-white font-hindi font-semibold py-6 text-base"
                    onClick={() => {
                      if (validateAddr()) setStep("payment");
                    }}
                  >
                    भुगतान विधि चुनें →
                  </Button>
                </div>
              </>
            )}

            {/* PAYMENT STEP */}
            {step === "payment" && (
              <>
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  <div className="space-y-3">
                    {(
                      [
                        {
                          id: "cod",
                          icon: Truck,
                          label: "कैश ऑन डिलीवरी (COD)",
                          desc: "डिलीवरी पर नगद भुगतान करें",
                        },
                        {
                          id: "upi",
                          icon: Smartphone,
                          label: "UPI / गूगल पे / PhonePe",
                          desc: "अपने UPI से तुरंत भुगतान करें",
                        },
                        {
                          id: "card",
                          icon: CreditCard,
                          label: "डेबिट / क्रेडिट कार्ड",
                          desc: "सभी बैंक कार्ड स्वीकार",
                        },
                      ] as {
                        id: PaymentMethod;
                        icon: React.ElementType;
                        label: string;
                        desc: string;
                      }[]
                    ).map(({ id, icon: Icon, label, desc }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setPayMethod(id)}
                        className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                          payMethod === id
                            ? "border-brand-green bg-brand-green/5"
                            : "border-border hover:border-brand-green/40"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                            payMethod === id
                              ? "bg-brand-green text-white"
                              : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p
                            className={`font-hindi font-semibold text-sm ${payMethod === id ? "text-brand-green" : "text-foreground"}`}
                          >
                            {label}
                          </p>
                          <p className="font-hindi text-xs text-muted-foreground">
                            {desc}
                          </p>
                        </div>
                        {payMethod === id && (
                          <CheckCircle className="w-5 h-5 text-brand-green ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>

                  {payMethod === "upi" && (
                    <div className="space-y-1">
                      <Label className="font-hindi text-sm">UPI ID *</Label>
                      <Input
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="example@upi"
                        className="font-hindi"
                      />
                      <p className="text-xs text-muted-foreground font-hindi">
                        उदा.: 9999999999@ybl, name@okaxis
                      </p>
                    </div>
                  )}

                  {payMethod === "card" && (
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Label className="font-hindi text-sm">कार्ड नंबर</Label>
                        <Input
                          value={cardNo}
                          onChange={(e) =>
                            setCardNo(
                              e.target.value.replace(/\D/g, "").slice(0, 16),
                            )
                          }
                          placeholder="1234 5678 9012 3456"
                          className="font-hindi tracking-widest"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="font-hindi text-sm">एक्सपायरी</Label>
                          <Input
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM/YY"
                            className="font-hindi"
                            maxLength={5}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="font-hindi text-sm">CVV</Label>
                          <Input
                            value={cardCvv}
                            onChange={(e) =>
                              setCardCvv(
                                e.target.value.replace(/\D/g, "").slice(0, 3),
                              )
                            }
                            placeholder="123"
                            className="font-hindi"
                            type="password"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-card rounded-xl border border-border p-4">
                    <h4 className="font-hindi font-semibold text-sm text-brand-green mb-2">
                      ऑर्डर सारांश
                    </h4>
                    {items.map((item) => (
                      <div
                        key={item.productId.toString()}
                        className="flex justify-between text-xs font-hindi text-muted-foreground mb-1"
                      >
                        <span className="truncate max-w-[180px]">
                          {getProductName(item.productId)} ×{item.quantity}
                        </span>
                        <span>
                          ₹{getProductPrice(item.productId) * item.quantity}
                        </span>
                      </div>
                    ))}
                    <Separator className="my-2" />
                    <div className="flex justify-between font-hindi font-bold text-brand-green text-sm">
                      <span>कुल</span>
                      <span>₹{total}</span>
                    </div>
                    <div className="mt-2 text-xs font-hindi text-muted-foreground">
                      <MapPin className="inline w-3 h-3 mr-1" />
                      {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
                    </div>
                  </div>
                </div>
                <div className="p-5 border-t border-border">
                  <Button
                    className="w-full bg-brand-gold hover:bg-brand-gold-light text-white font-hindi font-semibold py-6 text-base"
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                    data-ocid="cart.confirm_button"
                  >
                    {isSubmitting
                      ? "ऑर्डर दिया जा रहा है..."
                      : `ऑर्डर कनफर्म करें · ₹${total}`}
                  </Button>
                </div>
              </>
            )}

            {/* SUCCESS STEP */}
            {step === "success" && (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                </motion.div>
                <h3 className="font-hindi-serif text-2xl font-bold text-brand-green mb-2">
                  ऑर्डर सफल हुआ!
                </h3>
                <p className="font-hindi text-muted-foreground mb-4">
                  आपका ऑर्डर प्राप्त हो गया है
                </p>

                <div className="w-full bg-card rounded-xl border border-border p-4 text-left space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="font-hindi text-sm text-muted-foreground">
                      ऑर्डर नंं
                    </span>
                    <span className="font-hindi font-bold text-brand-green">
                      #{orderNo}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-hindi text-sm text-muted-foreground">
                      कुल राशि
                    </span>
                    <span className="font-hindi font-bold">
                      ₹{confirmedTotal}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-hindi text-sm text-muted-foreground">
                      भुगतान
                    </span>
                    <span className="font-hindi text-sm">
                      {payMethod === "cod"
                        ? "COD"
                        : payMethod === "upi"
                          ? "UPI"
                          : "कार्ड"}
                    </span>
                  </div>
                  <Separator />
                  <div>
                    <span className="font-hindi text-sm text-muted-foreground">
                      डिलीवरी पता
                    </span>
                    <p className="font-hindi text-sm mt-0.5">{addr.name}</p>
                    <p className="font-hindi text-xs text-muted-foreground">
                      {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                    <p className="font-hindi text-xs text-muted-foreground">
                      📞 {addr.phone}
                    </p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-2 text-center">
                    <p className="font-hindi text-xs text-orange-700">
                      🚚 डिलीवरी: 3-5 कार्य दिवसों में
                    </p>
                  </div>
                </div>

                <Button
                  className="w-full bg-brand-green text-white font-hindi"
                  onClick={handleClose}
                >
                  ठीक है, धन्यवाद!
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
