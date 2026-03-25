import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  BarChart3,
  CheckCircle,
  Clock,
  CreditCard,
  Eye,
  EyeOff,
  IndianRupee,
  Leaf,
  MapPin,
  Megaphone,
  Package,
  Pencil,
  Phone,
  Plus,
  RefreshCw,
  Save,
  Settings,
  ShoppingBag,
  Tag,
  Trash2,
  TrendingUp,
  Truck,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { staticProducts } from "../data/staticData";
import { getAdminProducts, useAdminProducts } from "../hooks/useAdminProducts";
import { getSettings, useSiteSettings } from "../hooks/useSiteSettings";
import type { Coupon, PromoBanner } from "../hooks/useSiteSettings";

const STATUSES = ["लंबित", "प्रोसेसिंग", "डिलीवर्ड"] as const;
type Status = (typeof STATUSES)[number];

const HINDI_MONTHS = [
  "जनवरी",
  "फरवरी",
  "मार्च",
  "अप्रैल",
  "मई",
  "जून",
  "जुलाई",
  "अगस्त",
  "सितंबर",
  "अक्टूबर",
  "नवंबर",
  "दिसंबर",
];

function statusColor(s: Status) {
  if (s === "लंबित") return "bg-yellow-100 text-yellow-800 border-yellow-200";
  if (s === "प्रोसेसिंग") return "bg-blue-100 text-blue-800 border-blue-200";
  return "bg-green-100 text-green-800 border-green-200";
}

// ─── Login Gate ──────────────────────────────────────────────────────────────
function LoginGate({
  onLogin,
  onBack,
}: { onLogin: () => void; onBack: () => void }) {
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState(false);

  const submit = () => {
    if (pw === "admin123") {
      onLogin();
    } else {
      setErr(true);
      setPw("");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "oklch(0.14 0.04 152)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <Card
          className="border-0 shadow-2xl"
          style={{ background: "oklch(0.18 0.04 152)" }}
        >
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-3">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: "oklch(0.27 0.065 152)" }}
              >
                <Leaf
                  className="w-7 h-7"
                  style={{ color: "oklch(0.68 0.11 75)" }}
                />
              </div>
            </div>
            <CardTitle
              className="text-2xl font-hindi-serif"
              style={{ color: "oklch(0.96 0.01 80)" }}
            >
              एडमिन लॉगिन
            </CardTitle>
            <p
              className="text-sm mt-1"
              style={{ color: "oklch(0.65 0.03 152)" }}
            >
              PR Ayurveda प्रबंधन पैनल
            </p>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="space-y-1.5">
              <Label style={{ color: "oklch(0.75 0.03 152)" }}>पासवर्ड</Label>
              <div className="relative">
                <Input
                  data-ocid="admin.input"
                  type={showPw ? "text" : "password"}
                  value={pw}
                  onChange={(e) => {
                    setPw(e.target.value);
                    setErr(false);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && submit()}
                  placeholder="पासवर्ड दर्ज करें"
                  className="pr-10 font-hindi border-0"
                  style={{
                    background: "oklch(0.22 0.045 152)",
                    color: "oklch(0.96 0.01 80)",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "oklch(0.65 0.03 152)" }}
                >
                  {showPw ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {err && (
                <p
                  data-ocid="admin.error_state"
                  className="text-sm"
                  style={{ color: "oklch(0.65 0.22 27)" }}
                >
                  ❌ गलत पासवर्ड। कृपया पुनः प्रयास करें।
                </p>
              )}
            </div>
            <Button
              data-ocid="admin.submit_button"
              className="w-full font-hindi font-semibold border-0"
              style={{
                background: "oklch(0.27 0.065 152)",
                color: "oklch(0.96 0.01 80)",
              }}
              onClick={submit}
            >
              लॉगिन करें
            </Button>
            <div className="text-center">
              <button
                type="button"
                className="text-sm hover:underline"
                style={{ color: "oklch(0.65 0.03 152)" }}
                onClick={onBack}
              >
                ← मुख्य साइट पर जाएं
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

// ─── Local Order Type ─────────────────────────────────────────────────────────
interface LocalOrder {
  orderNo: string;
  date: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  address: string;
  phone: string;
  name: string;
  payment: string;
  status: string;
}

interface LocalConsultation {
  name: string;
  phone: string;
  message: string;
  date: string;
  timestamp: number;
}

// ─── Revenue Chart ─────────────────────────────────────────────────────────────
function RevenueChart({ orders }: { orders: LocalOrder[] }) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(currentYear, currentMonth - (5 - i), 1);
    return {
      month: d.getMonth(),
      year: d.getFullYear(),
      label: HINDI_MONTHS[d.getMonth()],
      revenue: 0,
    };
  });

  for (const order of orders) {
    if (!order.date) continue;
    try {
      let d: Date;
      if (order.date.includes("/")) {
        const parts = order.date.split("/");
        d =
          parts.length === 3
            ? new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]))
            : new Date(order.date);
      } else {
        d = new Date(order.date);
      }
      const mi = months.findIndex(
        (m) => m.month === d.getMonth() && m.year === d.getFullYear(),
      );
      if (mi !== -1) months[mi].revenue += Number(order.total) || 0;
    } catch {}
  }

  const maxRev = Math.max(...months.map((m) => m.revenue), 1);

  return (
    <Card
      className="border-0 mb-6"
      style={{ background: "oklch(0.18 0.04 152)" }}
    >
      <CardHeader className="pb-3">
        <CardTitle
          className="text-sm font-hindi flex items-center gap-2"
          style={{ color: "oklch(0.96 0.01 80)" }}
        >
          <BarChart3
            className="w-4 h-4"
            style={{ color: "oklch(0.68 0.11 75)" }}
          />
          पिछले 6 महीनों का रेवेन्यू
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-2 h-36">
          {months.map((m, i) => {
            const heightPct = maxRev > 0 ? (m.revenue / maxRev) * 100 : 0;
            const isCurrentMonth =
              m.month === currentMonth && m.year === currentYear;
            return (
              <div
                key={`${m.month}-${m.year}`}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <span
                  className="text-xs font-hindi"
                  style={{ color: "oklch(0.68 0.11 75)" }}
                >
                  {m.revenue > 0 ? `₹${(m.revenue / 1000).toFixed(1)}k` : ""}
                </span>
                <div
                  className="w-full flex items-end"
                  style={{ height: "80px" }}
                >
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{
                      height: `${Math.max(heightPct, m.revenue > 0 ? 4 : 0)}%`,
                    }}
                    transition={{ delay: i * 0.07, duration: 0.5 }}
                    className="w-full rounded-t-md"
                    style={{
                      background: isCurrentMonth
                        ? "oklch(0.68 0.11 75)"
                        : "oklch(0.30 0.07 152)",
                      minHeight: m.revenue > 0 ? "4px" : "2px",
                    }}
                  />
                </div>
                <span
                  className="text-xs font-hindi"
                  style={{
                    color: isCurrentMonth
                      ? "oklch(0.68 0.11 75)"
                      : "oklch(0.55 0.04 152)",
                  }}
                >
                  {m.label}
                </span>
              </div>
            );
          })}
        </div>
        <p
          className="text-xs font-hindi mt-2"
          style={{ color: "oklch(0.45 0.03 152)" }}
        >
          * Gold bar = चालू महीना
        </p>
      </CardContent>
    </Card>
  );
}

// ─── Orders Tab ───────────────────────────────────────────────────────────────
function OrdersTab({
  orders,
  onOrderDelete,
}: {
  orders: LocalOrder[];
  onOrderDelete: (orderNo: string) => void;
}) {
  const [statuses, setStatuses] = useState<Record<string, Status>>({});

  const getStatus = (orderNo: string, defaultStatus: string): Status => {
    return (statuses[orderNo] as Status) ?? (defaultStatus as Status) ?? "लंबित";
  };

  const cycleStatus = (orderNo: string, current: Status) => {
    const next = STATUSES[(STATUSES.indexOf(current) + 1) % STATUSES.length];
    setStatuses((prev) => ({ ...prev, [orderNo]: next }));
    try {
      const raw = localStorage.getItem("pr_orders");
      if (raw) {
        const parsed = JSON.parse(raw) as LocalOrder[];
        const updated = parsed.map((o) =>
          o.orderNo === orderNo ? { ...o, status: next } : o,
        );
        localStorage.setItem("pr_orders", JSON.stringify(updated));
      }
    } catch {}
  };

  const handleDelete = (orderNo: string) => {
    const confirmed = window.confirm("क्या आप यह ऑर्डर हटाना चाहते हैं?");
    if (!confirmed) return;
    onOrderDelete(orderNo);
  };

  if (!orders.length) {
    return (
      <div data-ocid="orders.empty_state" className="text-center py-16">
        <ShoppingBag
          className="w-12 h-12 mx-auto mb-3"
          style={{ color: "oklch(0.55 0.04 152)" }}
        />
        <p
          className="font-hindi text-lg font-semibold mb-1"
          style={{ color: "oklch(0.75 0.04 152)" }}
        >
          कोई ऑर्डर नहीं मिला
        </p>
        <p
          className="font-hindi text-sm"
          style={{ color: "oklch(0.55 0.04 152)" }}
        >
          जब ग्राहक ऑर्डर करेंगे, वे यहाँ दिखाई देंगे
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {orders.map((order, idx) => {
          const status = getStatus(order.orderNo, order.status);
          return (
            <motion.div
              key={order.orderNo}
              data-ocid={`orders.item.${idx + 1}`}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40, scale: 0.96 }}
              transition={{ delay: idx * 0.03, duration: 0.25 }}
              className="rounded-xl border p-4"
              style={{
                background: "oklch(0.18 0.04 152)",
                borderColor: "oklch(0.28 0.05 152)",
              }}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Package
                      className="w-4 h-4"
                      style={{ color: "oklch(0.68 0.11 75)" }}
                    />
                    <span
                      className="font-semibold font-hindi"
                      style={{ color: "oklch(0.96 0.01 80)" }}
                    >
                      ऑर्डर #{order.orderNo}
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-1 text-sm"
                    style={{ color: "oklch(0.65 0.03 152)" }}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{order.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-xs font-semibold font-hindi px-2.5 py-1 rounded-full border ${statusColor(status)}`}
                  >
                    {status === "लंबित" && (
                      <>
                        <Clock className="inline w-3 h-3 mr-1" />
                        {status}
                      </>
                    )}
                    {status === "प्रोसेसिंग" && (
                      <>
                        <Truck className="inline w-3 h-3 mr-1" />
                        {status}
                      </>
                    )}
                    {status === "डिलीवर्ड" && (
                      <>
                        <CheckCircle className="inline w-3 h-3 mr-1" />
                        {status}
                      </>
                    )}
                  </span>
                  <Button
                    data-ocid={`orders.edit_button.${idx + 1}`}
                    size="sm"
                    variant="outline"
                    className="text-xs font-hindi border"
                    style={{
                      borderColor: "oklch(0.35 0.06 152)",
                      color: "oklch(0.75 0.04 152)",
                      background: "oklch(0.22 0.045 152)",
                    }}
                    onClick={() => cycleStatus(order.orderNo, status)}
                  >
                    स्थिति अपडेट करें
                  </Button>
                  <Button
                    data-ocid={`orders.delete_button.${idx + 1}`}
                    size="sm"
                    variant="outline"
                    className="text-xs font-hindi border hover:bg-red-950 transition-colors"
                    style={{
                      borderColor: "oklch(0.42 0.18 27)",
                      color: "oklch(0.65 0.22 27)",
                      background: "oklch(0.20 0.06 27)",
                    }}
                    onClick={() => handleDelete(order.orderNo)}
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1" />
                    हटाएं
                  </Button>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "oklch(0.75 0.04 152)" }}
                >
                  <Users
                    className="w-3.5 h-3.5 shrink-0"
                    style={{ color: "oklch(0.68 0.11 75)" }}
                  />
                  <span
                    className="font-hindi font-semibold"
                    style={{ color: "oklch(0.96 0.01 80)" }}
                  >
                    {order.name}
                  </span>
                </div>
                <div
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "oklch(0.75 0.04 152)" }}
                >
                  <Phone
                    className="w-3.5 h-3.5 shrink-0"
                    style={{ color: "oklch(0.68 0.11 75)" }}
                  />
                  <span className="font-hindi">{order.phone}</span>
                </div>
                <div
                  className="flex items-start gap-2 text-sm sm:col-span-2"
                  style={{ color: "oklch(0.75 0.04 152)" }}
                >
                  <MapPin
                    className="w-3.5 h-3.5 shrink-0 mt-0.5"
                    style={{ color: "oklch(0.68 0.11 75)" }}
                  />
                  <span className="font-hindi">{order.address}</span>
                </div>
                <div
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "oklch(0.75 0.04 152)" }}
                >
                  <CreditCard
                    className="w-3.5 h-3.5 shrink-0"
                    style={{ color: "oklch(0.68 0.11 75)" }}
                  />
                  <span className="font-hindi">{order.payment}</span>
                </div>
                <div
                  style={{ color: "oklch(0.75 0.04 152)" }}
                  className="flex items-center gap-2 text-sm"
                >
                  <span className="font-hindi">कुल: </span>
                  <span
                    className="font-semibold"
                    style={{ color: "oklch(0.68 0.11 75)" }}
                  >
                    ₹{order.total.toLocaleString("hi-IN")}
                  </span>
                </div>
              </div>

              {order.items.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {order.items.map((item, i) => (
                    <span
                      key={`${item.name}-${i}`}
                      className="text-xs px-2 py-0.5 rounded-md font-hindi"
                      style={{
                        background: "oklch(0.23 0.055 152)",
                        color: "oklch(0.75 0.04 152)",
                      }}
                    >
                      {item.name} × {item.qty}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

// ─── Consultations Tab ────────────────────────────────────────────────────────
function ConsultationsTab() {
  const [consultations, setConsultations] = useState<LocalConsultation[]>([]);
  const [seen, setSeen] = useState<Set<number>>(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem("pr_consultations");
      if (raw) {
        const parsed = JSON.parse(raw) as LocalConsultation[];
        setConsultations([...parsed].reverse());
      }
    } catch {
      setConsultations([]);
    }
  }, []);

  const toggleSeen = (idx: number) => {
    setSeen((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const deleteConsultation = (idx: number) => {
    const confirmed = window.confirm("क्या आप यह परामर्श हटाना चाहते हैं?");
    if (!confirmed) return;
    const updated = [...consultations];
    updated.splice(idx, 1);
    setConsultations(updated);
    try {
      // Save in original (non-reversed) order back to localStorage
      const raw = localStorage.getItem("pr_consultations");
      if (raw) {
        const original = JSON.parse(raw) as LocalConsultation[];
        const toDelete = consultations[idx];
        const newOriginal = original.filter(
          (c) =>
            !(c.name === toDelete.name && c.timestamp === toDelete.timestamp),
        );
        localStorage.setItem("pr_consultations", JSON.stringify(newOriginal));
      }
    } catch {}
  };

  if (!consultations.length) {
    return (
      <div data-ocid="consultations.empty_state" className="text-center py-16">
        <Users
          className="w-12 h-12 mx-auto mb-3"
          style={{ color: "oklch(0.55 0.04 152)" }}
        />
        <p
          className="font-hindi text-lg font-semibold mb-1"
          style={{ color: "oklch(0.75 0.04 152)" }}
        >
          कोई परामर्श अनुरोध नहीं मिला
        </p>
        <p
          className="font-hindi text-sm"
          style={{ color: "oklch(0.55 0.04 152)" }}
        >
          जब ग्राहक परामर्श फॉर्म भरेंगे, वे यहाँ दिखाई देंगे
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {consultations.map((c, idx) => (
        <motion.div
          key={`${c.name}-${c.timestamp}`}
          data-ocid={`consultations.item.${idx + 1}`}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="rounded-xl border p-4"
          style={{
            background: "oklch(0.18 0.04 152)",
            borderColor: "oklch(0.28 0.05 152)",
          }}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span
                  className="font-semibold font-hindi"
                  style={{ color: "oklch(0.96 0.01 80)" }}
                >
                  {c.name}
                </span>
                <button
                  type="button"
                  data-ocid={`consultations.toggle.${idx + 1}`}
                  className={`text-xs px-2 py-0.5 rounded-full font-hindi cursor-pointer border select-none transition-all ${
                    seen.has(idx)
                      ? "bg-green-950 text-green-400 border-green-800"
                      : "bg-blue-950 text-blue-400 border-blue-800"
                  }`}
                  onClick={() => toggleSeen(idx)}
                  onKeyDown={(e) => e.key === "Enter" && toggleSeen(idx)}
                >
                  {seen.has(idx) ? "देखा गया" : "नया"}
                </button>
              </div>
              <div
                className="flex items-center gap-1 text-sm"
                style={{ color: "oklch(0.65 0.03 152)" }}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{c.phone}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="text-xs"
                style={{ color: "oklch(0.55 0.04 152)" }}
              >
                {c.date}
              </div>
              <button
                type="button"
                data-ocid={`consultations.delete_button.${idx + 1}`}
                className="text-xs px-2 py-0.5 rounded font-hindi bg-red-950 text-red-400 border border-red-900 hover:bg-red-900 transition-colors"
                onClick={() => deleteConsultation(idx)}
              >
                <Trash2 className="inline w-3 h-3 mr-1" />
                हटाएं
              </button>
            </div>
          </div>
          <p
            className="mt-2 text-sm font-hindi leading-relaxed"
            style={{ color: "oklch(0.75 0.04 152)" }}
          >
            {c.message}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Products Tab ─────────────────────────────────────────────────────────────
type LocalProduct = {
  id: bigint;
  name: string;
  price: bigint;
  description: string;
  benefits: string;
  ingredients: string;
  image?: string;
  rating?: number;
  reviews?: number;
};

function ProductsTab() {
  const { products: initialProducts, saveProducts } = useAdminProducts();
  const [products, setProducts] = useState<LocalProduct[]>(initialProducts);
  const [editing, setEditing] = useState<bigint | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const startEdit = (p: LocalProduct) => {
    setEditing(p.id);
    setEditName(p.name);
    setEditPrice(String(Number(p.price)));
  };

  const saveEdit = (id: bigint) => {
    const updated = products.map((p) =>
      p.id === id
        ? { ...p, name: editName, price: BigInt(Number(editPrice) || 0) }
        : p,
    );
    setProducts(updated);
    saveProducts(updated as never[]);
    setEditing(null);
    toast.success("प्रोडक्ट सहेजा गया!");
  };

  const deleteProduct = (id: bigint) => {
    const confirmed = window.confirm("क्या आप यह प्रोडक्ट हटाना चाहते हैं?");
    if (!confirmed) return;
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveProducts(updated as never[]);
    toast.success("प्रोडक्ट हटा दिया गया!");
  };

  const addProduct = () => {
    if (!newName.trim() || !newPrice.trim()) return;
    const newId = BigInt(products.length + 100);
    const updated = [
      ...products,
      {
        id: newId,
        name: newName,
        price: BigInt(Number(newPrice) || 0),
        description: newDesc,
        benefits: "",
        ingredients: "",
        image: "",
        rating: 4,
        reviews: 0,
      },
    ];
    setProducts(updated);
    saveProducts(updated as never[]);
    setNewName("");
    setNewPrice("");
    setNewDesc("");
    setShowAdd(false);
    toast.success("नया प्रोडक्ट जोड़ा गया!");
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <Button
          data-ocid="products.open_modal_button"
          className="font-hindi gap-2"
          style={{
            background: "oklch(0.27 0.065 152)",
            color: "oklch(0.96 0.01 80)",
          }}
          onClick={() => setShowAdd((v) => !v)}
        >
          <Plus className="w-4 h-4" />
          नया प्रोडक्ट जोड़ें
        </Button>
      </div>

      {showAdd && (
        <motion.div
          data-ocid="products.modal"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border p-4 space-y-3"
          style={{
            background: "oklch(0.18 0.04 152)",
            borderColor: "oklch(0.35 0.08 152)",
          }}
        >
          <h3
            className="font-semibold font-hindi"
            style={{ color: "oklch(0.96 0.01 80)" }}
          >
            नया प्रोडक्ट
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label
                className="font-hindi"
                style={{ color: "oklch(0.75 0.04 152)" }}
              >
                नाम
              </Label>
              <Input
                data-ocid="products.input"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="प्रोडक्ट का नाम"
                className="font-hindi border-0 mt-1"
                style={{
                  background: "oklch(0.22 0.045 152)",
                  color: "oklch(0.96 0.01 80)",
                }}
              />
            </div>
            <div>
              <Label
                className="font-hindi"
                style={{ color: "oklch(0.75 0.04 152)" }}
              >
                कीमत (₹)
              </Label>
              <Input
                data-ocid="products.input"
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="कीमत"
                className="font-hindi border-0 mt-1"
                style={{
                  background: "oklch(0.22 0.045 152)",
                  color: "oklch(0.96 0.01 80)",
                }}
              />
            </div>
            <div className="sm:col-span-2">
              <Label
                className="font-hindi"
                style={{ color: "oklch(0.75 0.04 152)" }}
              >
                विवरण
              </Label>
              <Input
                data-ocid="products.textarea"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="संक्षिप्त विवरण"
                className="font-hindi border-0 mt-1"
                style={{
                  background: "oklch(0.22 0.045 152)",
                  color: "oklch(0.96 0.01 80)",
                }}
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              data-ocid="products.cancel_button"
              variant="ghost"
              className="font-hindi"
              style={{ color: "oklch(0.65 0.03 152)" }}
              onClick={() => setShowAdd(false)}
            >
              <X className="w-4 h-4 mr-1" /> रद्द करें
            </Button>
            <Button
              data-ocid="products.save_button"
              className="font-hindi"
              style={{
                background: "oklch(0.27 0.065 152)",
                color: "oklch(0.96 0.01 80)",
              }}
              onClick={addProduct}
            >
              <Save className="w-4 h-4 mr-1" /> सहेजें
            </Button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {products.map((p, idx) => (
          <motion.div
            key={String(p.id)}
            data-ocid={`products.item.${idx + 1}`}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.04 }}
            className="rounded-xl border p-4"
            style={{
              background: "oklch(0.18 0.04 152)",
              borderColor: "oklch(0.28 0.05 152)",
            }}
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex-1 min-w-0">
                {editing === p.id ? (
                  <Input
                    data-ocid="products.input"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="font-hindi text-sm border-0 px-2 h-8"
                    style={{
                      background: "oklch(0.22 0.045 152)",
                      color: "oklch(0.96 0.01 80)",
                    }}
                  />
                ) : (
                  <p
                    className="font-semibold font-hindi text-sm truncate"
                    style={{ color: "oklch(0.96 0.01 80)" }}
                  >
                    {p.name}
                  </p>
                )}
              </div>
              {editing === p.id ? (
                <Button
                  data-ocid={`products.save_button.${idx + 1}`}
                  size="sm"
                  className="shrink-0 h-7 text-xs font-hindi"
                  style={{
                    background: "oklch(0.27 0.065 152)",
                    color: "oklch(0.96 0.01 80)",
                  }}
                  onClick={() => saveEdit(p.id)}
                >
                  <Save className="w-3 h-3 mr-1" /> सहेजें
                </Button>
              ) : (
                <div className="flex gap-1">
                  <Button
                    data-ocid={`products.edit_button.${idx + 1}`}
                    size="sm"
                    variant="ghost"
                    className="shrink-0 h-7"
                    style={{ color: "oklch(0.65 0.05 152)" }}
                    onClick={() => startEdit(p)}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    data-ocid={`products.delete_button.${idx + 1}`}
                    size="sm"
                    variant="ghost"
                    className="shrink-0 h-7"
                    style={{ color: "oklch(0.55 0.15 25)" }}
                    onClick={() => deleteProduct(p.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {editing === p.id ? (
                <div className="flex items-center gap-1">
                  <span style={{ color: "oklch(0.68 0.11 75)" }}>₹</span>
                  <Input
                    data-ocid="products.input"
                    type="number"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    className="font-hindi text-sm border-0 px-2 h-8 w-28"
                    style={{
                      background: "oklch(0.22 0.045 152)",
                      color: "oklch(0.96 0.01 80)",
                    }}
                  />
                </div>
              ) : (
                <span
                  className="font-bold"
                  style={{ color: "oklch(0.68 0.11 75)" }}
                >
                  ₹{Number(p.price).toLocaleString("hi-IN")}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Settings Tab ─────────────────────────────────────────────────────────────
function SettingsTab() {
  const { settings, updateSettings } = useSiteSettings();
  const [announcementText, setAnnouncementText] = useState(
    settings.announcementText,
  );
  const [flashSaleEnabled, setFlashSaleEnabled] = useState(
    settings.flashSaleEnabled,
  );
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [discountCode, setDiscountCode] = useState(settings.discountCode);
  const [discountAmount, setDiscountAmount] = useState(
    String(settings.discountAmount),
  );

  const handleSave = () => {
    updateSettings({
      announcementText,
      flashSaleEnabled,
      whatsappNumber,
      discountCode,
      discountAmount: Number(discountAmount) || 0,
    });
    toast.success("सेटिंग्स सहेजी गई! अगली बार पेज लोड होने पर लागू होंगी।");
  };

  const inputStyle = {
    background: "oklch(0.22 0.045 152)",
    color: "oklch(0.96 0.01 80)",
    borderColor: "oklch(0.30 0.06 152)",
  };

  const labelStyle = { color: "oklch(0.75 0.04 152)" };

  return (
    <div className="space-y-4 max-w-xl">
      <Card className="border-0" style={{ background: "oklch(0.18 0.04 152)" }}>
        <CardHeader className="pb-3">
          <CardTitle
            className="text-sm font-hindi"
            style={{ color: "oklch(0.96 0.01 80)" }}
          >
            <Settings
              className="inline w-4 h-4 mr-2"
              style={{ color: "oklch(0.68 0.11 75)" }}
            />
            साइट सेटिंग्स
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Announcement Text */}
          <div>
            <Label className="font-hindi text-sm mb-1 block" style={labelStyle}>
              घोषणा बार का टेक्स्ट
            </Label>
            <Textarea
              data-ocid="settings.textarea"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              className="font-hindi text-sm border resize-none"
              style={inputStyle}
              rows={2}
            />
          </div>

          {/* Flash Sale Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-hindi text-sm" style={labelStyle}>
                फ्लैश सेल चालू/बंद
              </Label>
              <p
                className="text-xs font-hindi mt-0.5"
                style={{ color: "oklch(0.55 0.04 152)" }}
              >
                चालू रहने पर टाइमर दिखेगा
              </p>
            </div>
            <button
              type="button"
              data-ocid="settings.toggle"
              onClick={() => setFlashSaleEnabled((v) => !v)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                flashSaleEnabled ? "bg-green-600" : "bg-gray-600"
              }`}
              aria-label="फ्लैश सेल"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  flashSaleEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* WhatsApp Number */}
          <div>
            <Label className="font-hindi text-sm mb-1 block" style={labelStyle}>
              WhatsApp नंबर (केवल अंक)
            </Label>
            <Input
              data-ocid="settings.input"
              value={whatsappNumber}
              onChange={(e) =>
                setWhatsappNumber(e.target.value.replace(/\D/g, ""))
              }
              placeholder="919217127566"
              className="font-hindi text-sm border"
              style={inputStyle}
            />
            <p
              className="text-xs font-hindi mt-1"
              style={{ color: "oklch(0.55 0.04 152)" }}
            >
              उदाहरण: 919217127566 (91 + 10 अंक)
            </p>
          </div>

          {/* Discount Code */}
          <div>
            <Label className="font-hindi text-sm mb-1 block" style={labelStyle}>
              डिस्काउंट कोड
            </Label>
            <Input
              data-ocid="settings.input"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
              placeholder="PRAYUR100"
              className="font-hindi text-sm border"
              style={inputStyle}
            />
          </div>

          {/* Discount Amount */}
          <div>
            <Label className="font-hindi text-sm mb-1 block" style={labelStyle}>
              डिस्काउंट राशि (₹)
            </Label>
            <Input
              data-ocid="settings.input"
              type="number"
              value={discountAmount}
              onChange={(e) => setDiscountAmount(e.target.value)}
              placeholder="100"
              className="font-hindi text-sm border"
              style={inputStyle}
            />
          </div>

          {/* Save Button */}
          <Button
            data-ocid="settings.save_button"
            className="w-full font-hindi"
            style={{
              background: "oklch(0.27 0.065 152)",
              color: "oklch(0.96 0.01 80)",
            }}
            onClick={handleSave}
          >
            <Save className="w-4 h-4 mr-2" />
            सेटिंग्स सहेजें
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
interface AdminDashboardProps {
  onExit?: () => void;
}

// ─── Promotions Tab ───────────────────────────────────────────────────────────
function PromotionsTab() {
  const { updateSettings } = useSiteSettings();
  const [coupons, setCoupons] = React.useState<Coupon[]>(
    () => getSettings().coupons || [],
  );
  const [banners, setBanners] = React.useState<PromoBanner[]>(
    () => getSettings().promoBanners || [],
  );

  // Coupon form
  const [couponCode, setCouponCode] = React.useState("");
  const [couponType, setCouponType] = React.useState<"flat" | "percent">(
    "flat",
  );
  const [couponAmount, setCouponAmount] = React.useState("");
  const [couponExpiry, setCouponExpiry] = React.useState("");

  // Banner form
  const [bannerTitle, setBannerTitle] = React.useState("");
  const [bannerSubtitle, setBannerSubtitle] = React.useState("");
  const [bannerBadge, setBannerBadge] = React.useState("");
  const [bannerColor, setBannerColor] = React.useState("bg-red-600");

  const saveCoupons = (updated: Coupon[]) => {
    setCoupons(updated);
    updateSettings({ coupons: updated });
  };

  const saveBanners = (updated: PromoBanner[]) => {
    setBanners(updated);
    updateSettings({ promoBanners: updated });
  };

  const addCoupon = () => {
    if (!couponCode.trim() || !couponAmount) {
      toast.error("कोड और राशि अनिवार्य है");
      return;
    }
    const newCoupon: Coupon = {
      id: Date.now().toString(),
      code: couponCode.trim().toUpperCase(),
      type: couponType,
      amount: Number(couponAmount),
      expiry: couponExpiry,
      active: true,
    };
    saveCoupons([...coupons, newCoupon]);
    setCouponCode("");
    setCouponAmount("");
    setCouponExpiry("");
    toast.success("कूपन जोड़ा गया!");
  };

  const toggleCoupon = (id: string) => {
    saveCoupons(
      coupons.map((c) => (c.id === id ? { ...c, active: !c.active } : c)),
    );
  };

  const deleteCoupon = (id: string) => {
    if (confirm("यह कूपन हटाएं?"))
      saveCoupons(coupons.filter((c) => c.id !== id));
  };

  const addBanner = () => {
    if (!bannerTitle.trim()) {
      toast.error("शीर्षक अनिवार्य है");
      return;
    }
    const newBanner: PromoBanner = {
      id: Date.now().toString(),
      title: bannerTitle.trim(),
      subtitle: bannerSubtitle.trim(),
      badge: bannerBadge.trim(),
      color: bannerColor,
      active: true,
    };
    saveBanners([...banners, newBanner]);
    setBannerTitle("");
    setBannerSubtitle("");
    setBannerBadge("");
    toast.success("बैनर जोड़ा गया!");
  };

  const toggleBanner = (id: string) => {
    saveBanners(
      banners.map((b) => (b.id === id ? { ...b, active: !b.active } : b)),
    );
  };

  const deleteBanner = (id: string) => {
    if (confirm("यह बैनर हटाएं?"))
      saveBanners(banners.filter((b) => b.id !== id));
  };

  const cardStyle = { background: "oklch(0.18 0.04 152)" };
  const inputStyle = {
    background: "oklch(0.22 0.045 152)",
    color: "oklch(0.96 0.01 80)",
    borderColor: "oklch(0.30 0.06 152)",
  };
  const labelStyle = { color: "oklch(0.75 0.04 152)" };
  const textStyle = { color: "oklch(0.96 0.01 80)" };
  const mutedStyle = { color: "oklch(0.55 0.04 152)" };

  const colorOptions = [
    { value: "bg-red-600", label: "लाल" },
    { value: "bg-blue-600", label: "नीला" },
    { value: "bg-purple-600", label: "बैंगनी" },
    { value: "bg-orange-500", label: "नारंगी" },
    { value: "bg-green-700", label: "हरा" },
  ];

  return (
    <div className="space-y-6">
      {/* Coupon Codes */}
      <Card className="border-0" style={cardStyle}>
        <CardHeader className="pb-3">
          <CardTitle
            className="text-sm font-hindi flex items-center gap-2"
            style={textStyle}
          >
            <Tag className="w-4 h-4" style={{ color: "oklch(0.68 0.11 75)" }} />
            कूपन कोड
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add coupon form */}
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-2 sm:col-span-1">
              <Label
                className="font-hindi text-xs mb-1 block"
                style={labelStyle}
              >
                कोड (uppercase)
              </Label>
              <Input
                data-ocid="promotions.input"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="जैसे: SAVE50"
                className="font-hindi text-sm border"
                style={inputStyle}
              />
            </div>
            <div>
              <Label
                className="font-hindi text-xs mb-1 block"
                style={labelStyle}
              >
                प्रकार
              </Label>
              <select
                value={couponType}
                onChange={(e) =>
                  setCouponType(e.target.value as "flat" | "percent")
                }
                className="w-full rounded-md px-3 py-2 text-sm font-hindi border"
                style={inputStyle}
              >
                <option value="flat">फ्लैट (₹)</option>
                <option value="percent">प्रतिशत (%)</option>
              </select>
            </div>
            <div>
              <Label
                className="font-hindi text-xs mb-1 block"
                style={labelStyle}
              >
                राशि
              </Label>
              <Input
                value={couponAmount}
                onChange={(e) => setCouponAmount(e.target.value)}
                placeholder="100"
                type="number"
                className="font-hindi text-sm border"
                style={inputStyle}
              />
            </div>
            <div>
              <Label
                className="font-hindi text-xs mb-1 block"
                style={labelStyle}
              >
                समाप्ति (वैकल्पिक)
              </Label>
              <Input
                value={couponExpiry}
                onChange={(e) => setCouponExpiry(e.target.value)}
                type="date"
                className="font-hindi text-sm border"
                style={inputStyle}
              />
            </div>
          </div>
          <Button
            data-ocid="promotions.submit_button"
            onClick={addCoupon}
            className="font-hindi font-semibold border-0"
            style={{
              background: "oklch(0.27 0.065 152)",
              color: "oklch(0.96 0.01 80)",
            }}
          >
            <Plus className="w-4 h-4 mr-1" />
            कूपन जोड़ें
          </Button>

          {/* Coupons table */}
          {coupons.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={mutedStyle}>
                    <th className="text-left pb-2 font-hindi font-medium">
                      कोड
                    </th>
                    <th className="text-left pb-2 font-hindi font-medium">
                      छूट
                    </th>
                    <th className="text-left pb-2 font-hindi font-medium">
                      समाप्ति
                    </th>
                    <th className="text-left pb-2 font-hindi font-medium">
                      स्थिति
                    </th>
                    <th className="pb-2" />
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((c, idx) => (
                    <tr
                      key={c.id}
                      className="border-t"
                      style={{ borderColor: "oklch(0.25 0.05 152)" }}
                    >
                      <td
                        className="py-2 font-mono font-bold"
                        style={{ color: "oklch(0.68 0.11 75)" }}
                      >
                        {c.code}
                      </td>
                      <td className="py-2 font-hindi" style={textStyle}>
                        {c.type === "flat" ? `₹${c.amount}` : `${c.amount}%`}
                      </td>
                      <td
                        className="py-2 font-hindi text-xs"
                        style={mutedStyle}
                      >
                        {c.expiry || "—"}
                      </td>
                      <td className="py-2">
                        <button
                          type="button"
                          data-ocid={`promotions.toggle.${idx + 1}`}
                          onClick={() => toggleCoupon(c.id)}
                          className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors"
                          style={{
                            background: c.active
                              ? "oklch(0.55 0.15 152)"
                              : "oklch(0.30 0.05 152)",
                          }}
                        >
                          <span
                            className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${c.active ? "translate-x-4" : "translate-x-1"}`}
                          />
                        </button>
                      </td>
                      <td className="py-2 pl-2">
                        <button
                          type="button"
                          data-ocid={`promotions.delete_button.${idx + 1}`}
                          onClick={() => deleteCoupon(c.id)}
                          className="p-1 rounded hover:bg-red-900/30"
                          style={{ color: "oklch(0.65 0.22 27)" }}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {coupons.length === 0 && (
            <p
              className="font-hindi text-sm text-center py-4"
              style={mutedStyle}
            >
              कोई कूपन नहीं
            </p>
          )}
        </CardContent>
      </Card>

      {/* Promo Banners */}
      <Card className="border-0" style={cardStyle}>
        <CardHeader className="pb-3">
          <CardTitle
            className="text-sm font-hindi flex items-center gap-2"
            style={textStyle}
          >
            <Megaphone
              className="w-4 h-4"
              style={{ color: "oklch(0.68 0.11 75)" }}
            />
            प्रोमो बैनर
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add banner form */}
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-2">
              <Label
                className="font-hindi text-xs mb-1 block"
                style={labelStyle}
              >
                शीर्षक *
              </Label>
              <Input
                value={bannerTitle}
                onChange={(e) => setBannerTitle(e.target.value)}
                placeholder="जैसे: गर्मी की सेल!"
                className="font-hindi text-sm border"
                style={inputStyle}
              />
            </div>
            <div className="col-span-2">
              <Label
                className="font-hindi text-xs mb-1 block"
                style={labelStyle}
              >
                उप-शीर्षक
              </Label>
              <Input
                value={bannerSubtitle}
                onChange={(e) => setBannerSubtitle(e.target.value)}
                placeholder="50% तक की छूट"
                className="font-hindi text-sm border"
                style={inputStyle}
              />
            </div>
            <div>
              <Label
                className="font-hindi text-xs mb-1 block"
                style={labelStyle}
              >
                बैज टेक्स्ट
              </Label>
              <Input
                value={bannerBadge}
                onChange={(e) => setBannerBadge(e.target.value)}
                placeholder="HOT DEAL"
                className="font-hindi text-sm border"
                style={inputStyle}
              />
            </div>
            <div>
              <Label
                className="font-hindi text-xs mb-1 block"
                style={labelStyle}
              >
                रंग
              </Label>
              <select
                value={bannerColor}
                onChange={(e) => setBannerColor(e.target.value)}
                className="w-full rounded-md px-3 py-2 text-sm font-hindi border"
                style={inputStyle}
              >
                {colorOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Button
            data-ocid="promotions.secondary_button"
            onClick={addBanner}
            className="font-hindi font-semibold border-0"
            style={{
              background: "oklch(0.27 0.065 152)",
              color: "oklch(0.96 0.01 80)",
            }}
          >
            <Plus className="w-4 h-4 mr-1" />
            बैनर जोड़ें
          </Button>

          {/* Banners list */}
          {banners.length > 0 && (
            <div className="space-y-2">
              {banners.map((b, idx) => (
                <div
                  key={b.id}
                  className="flex items-center gap-3 p-3 rounded-lg"
                  style={{ background: "oklch(0.22 0.045 152)" }}
                >
                  <div
                    className="w-3 h-8 rounded shrink-0"
                    style={{
                      background: b.color.includes("red")
                        ? "#dc2626"
                        : b.color.includes("blue")
                          ? "#2563eb"
                          : b.color.includes("purple")
                            ? "#9333ea"
                            : b.color.includes("orange")
                              ? "#f97316"
                              : "#15803d",
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-hindi font-semibold text-sm truncate"
                      style={textStyle}
                    >
                      {b.title}
                    </p>
                    {b.subtitle && (
                      <p
                        className="font-hindi text-xs truncate"
                        style={mutedStyle}
                      >
                        {b.subtitle}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    data-ocid={`promotions.toggle.${idx + 1}`}
                    onClick={() => toggleBanner(b.id)}
                    className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors shrink-0"
                    style={{
                      background: b.active
                        ? "oklch(0.55 0.15 152)"
                        : "oklch(0.30 0.05 152)",
                    }}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${b.active ? "translate-x-4" : "translate-x-1"}`}
                    />
                  </button>
                  <button
                    type="button"
                    data-ocid={`promotions.delete_button.${idx + 1}`}
                    onClick={() => deleteBanner(b.id)}
                    className="p-1 rounded hover:bg-red-900/30 shrink-0"
                    style={{ color: "oklch(0.65 0.22 27)" }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
          {banners.length === 0 && (
            <p
              className="font-hindi text-sm text-center py-4"
              style={mutedStyle}
            >
              कोई बैनर नहीं
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminDashboard({ onExit }: AdminDashboardProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [orders, setOrders] = useState<LocalOrder[]>([]);
  const [consultCount, setConsultCount] = useState(0);

  const loadData = useCallback(() => {
    try {
      const parsed = JSON.parse(
        localStorage.getItem("pr_orders") || "[]",
      ) as LocalOrder[];
      setOrders([...parsed].reverse());
    } catch {
      setOrders([]);
    }
    try {
      const consults = JSON.parse(
        localStorage.getItem("pr_consultations") || "[]",
      ) as unknown[];
      setConsultCount(consults.length);
    } catch {}
  }, []);

  useEffect(() => {
    if (loggedIn) {
      loadData();
      const interval = setInterval(loadData, 15000);
      return () => clearInterval(interval);
    }
  }, [loggedIn, loadData]);

  const handleOrderDelete = (orderNo: string) => {
    try {
      const raw = localStorage.getItem("pr_orders");
      if (raw) {
        const parsed = JSON.parse(raw) as LocalOrder[];
        const updated = parsed.filter((o) => o.orderNo !== orderNo);
        localStorage.setItem("pr_orders", JSON.stringify(updated));
      }
    } catch {}
    setOrders((prev) => prev.filter((o) => o.orderNo !== orderNo));
  };

  const handleBack = () => {
    if (onExit) {
      onExit();
    } else {
      window.location.hash = "";
      window.location.reload();
    }
  };

  if (!loggedIn) {
    return <LoginGate onLogin={() => setLoggedIn(true)} onBack={handleBack} />;
  }

  const currentMonthName = HINDI_MONTHS[new Date().getMonth()];
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const totalRevenue = orders.reduce(
    (sum, o) => sum + (Number(o.total) || 0),
    0,
  );
  const monthRevenue = orders
    .filter((o) => {
      if (!o.date) return false;
      try {
        let d: Date;
        if (o.date.includes("/")) {
          const parts = o.date.split("/");
          d =
            parts.length === 3
              ? new Date(
                  Number(parts[2]),
                  Number(parts[1]) - 1,
                  Number(parts[0]),
                )
              : new Date(o.date);
        } else {
          d = new Date(o.date);
        }
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      } catch {
        return false;
      }
    })
    .reduce((sum, o) => sum + (Number(o.total) || 0), 0);

  return (
    <div
      className="min-h-screen font-hindi"
      style={{ background: "oklch(0.14 0.04 152)" }}
    >
      {/* Top Bar */}
      <header
        className="sticky top-0 z-50 border-b px-4 py-3 flex items-center justify-between"
        style={{
          background: "oklch(0.17 0.045 152)",
          borderColor: "oklch(0.25 0.05 152)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "oklch(0.27 0.065 152)" }}
          >
            <Leaf
              className="w-5 h-5"
              style={{ color: "oklch(0.68 0.11 75)" }}
            />
          </div>
          <div>
            <h1
              className="text-base font-bold font-hindi-serif"
              style={{ color: "oklch(0.96 0.01 80)" }}
            >
              PR Ayurveda
            </h1>
            <p className="text-xs" style={{ color: "oklch(0.55 0.04 152)" }}>
              एडमिन पैनल
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            data-ocid="admin.link"
            type="button"
            className="flex items-center gap-1.5 text-sm hover:underline"
            style={{ color: "oklch(0.65 0.05 152)" }}
            onClick={handleBack}
          >
            <ArrowLeft className="w-4 h-4" />
            मुख्य साइट
          </button>
          <Button
            size="sm"
            variant="ghost"
            className="text-xs font-hindi flex items-center gap-1"
            style={{ color: "oklch(0.68 0.11 75)" }}
            onClick={loadData}
            title="नए ऑर्डर चेक करें"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            रिफ्रेश
          </Button>
          <Button
            data-ocid="admin.secondary_button"
            size="sm"
            variant="ghost"
            className="text-xs font-hindi"
            style={{ color: "oklch(0.65 0.04 152)" }}
            onClick={() => setLoggedIn(false)}
          >
            लॉगआउट
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto p-4 md:p-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {[
            {
              icon: ShoppingBag,
              label: "ऑर्डर्स",
              value: String(orders.length),
              color: "oklch(0.68 0.11 75)",
            },
            {
              icon: Users,
              label: "परामर्श",
              value: String(consultCount),
              color: "oklch(0.55 0.18 250)",
            },
            {
              icon: Package,
              label: "प्रोडक्ट्स",
              value: String(getAdminProducts().length),
              color: "oklch(0.55 0.17 160)",
            },
            {
              icon: IndianRupee,
              label: "कुल रेवेन्यू",
              value: `₹${totalRevenue.toLocaleString("hi-IN")}`,
              color: "oklch(0.72 0.18 145)",
            },
            {
              icon: TrendingUp,
              label: `${currentMonthName} रेवेन्यू`,
              value: `₹${monthRevenue.toLocaleString("hi-IN")}`,
              color: "oklch(0.68 0.18 55)",
            },
          ].map(({ icon: Icon, label, value, color }) => (
            <Card
              key={label}
              className="border-0"
              style={{ background: "oklch(0.18 0.04 152)" }}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "oklch(0.22 0.045 152)" }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div className="min-w-0">
                  <p
                    className="text-base font-bold font-hindi truncate"
                    style={{ color: "oklch(0.96 0.01 80)" }}
                  >
                    {value}
                  </p>
                  <p
                    className="text-xs font-hindi truncate"
                    style={{ color: "oklch(0.65 0.04 152)" }}
                  >
                    {label}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Monthly Revenue Chart */}
        <RevenueChart orders={orders} />

        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList
            data-ocid="admin.tab"
            className="w-full border-0 p-1 rounded-xl"
            style={{ background: "oklch(0.18 0.04 152)" }}
          >
            <TabsTrigger
              value="orders"
              className="flex-1 font-hindi text-sm data-[state=active]:text-white rounded-lg transition-all"
            >
              <ShoppingBag className="w-4 h-4 mr-1.5" />
              ऑर्डर्स
            </TabsTrigger>
            <TabsTrigger
              value="consultations"
              className="flex-1 font-hindi text-sm data-[state=active]:text-white rounded-lg"
            >
              <Users className="w-4 h-4 mr-1.5" />
              परामर्श
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className="flex-1 font-hindi text-sm data-[state=active]:text-white rounded-lg"
            >
              <Package className="w-4 h-4 mr-1.5" />
              प्रोडक्ट्स
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex-1 font-hindi text-sm data-[state=active]:text-white rounded-lg"
            >
              <Settings className="w-4 h-4 mr-1.5" />
              सेटिंग्स
            </TabsTrigger>
            <TabsTrigger
              value="promotions"
              className="flex-1 font-hindi text-sm data-[state=active]:text-white rounded-lg"
            >
              <Megaphone className="w-4 h-4 mr-1.5" />
              प्रमोशन
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <OrdersTab orders={orders} onOrderDelete={handleOrderDelete} />
          </TabsContent>
          <TabsContent value="consultations">
            <ConsultationsTab />
          </TabsContent>
          <TabsContent value="products">
            <ProductsTab />
          </TabsContent>
          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
          <TabsContent value="promotions">
            <PromotionsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
