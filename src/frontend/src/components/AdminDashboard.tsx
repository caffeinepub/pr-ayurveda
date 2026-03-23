import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Eye,
  EyeOff,
  Leaf,
  Package,
  Pencil,
  Phone,
  Plus,
  Save,
  ShoppingBag,
  Truck,
  Users,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { staticProducts } from "../data/staticData";
import { useConsultations, useOrders } from "../hooks/useQueries";

const STATUSES = ["लंबित", "प्रोसेसिंग", "डिलीवर्ड"] as const;
type Status = (typeof STATUSES)[number];

function statusColor(s: Status) {
  if (s === "लंबित") return "bg-yellow-100 text-yellow-800 border-yellow-200";
  if (s === "प्रोसेसिंग") return "bg-blue-100 text-blue-800 border-blue-200";
  return "bg-green-100 text-green-800 border-green-200";
}

function formatDate(ts: bigint) {
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleDateString("hi-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─── Login Gate ──────────────────────────────────────────────────────────────
function LoginGate({ onLogin }: { onLogin: () => void }) {
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
                  गलत पासवर्ड। कृपया पुनः प्रयास करें।
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
                onClick={() => {
                  window.location.hash = "";
                }}
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

// ─── Orders Tab ───────────────────────────────────────────────────────────────
function OrdersTab() {
  const { data: orders = [], isLoading } = useOrders();
  const [statuses, setStatuses] = useState<Record<string, Status>>({});

  const getStatus = (idx: number): Status => {
    const key = String(idx);
    return statuses[key] ?? STATUSES[idx % 3];
  };

  const cycleStatus = (idx: number) => {
    const cur = getStatus(idx);
    const next = STATUSES[(STATUSES.indexOf(cur) + 1) % STATUSES.length];
    setStatuses((prev) => ({ ...prev, [String(idx)]: next }));
  };

  if (isLoading) {
    return (
      <div
        data-ocid="orders.loading_state"
        className="flex items-center justify-center py-16"
      >
        <div
          className="animate-spin w-8 h-8 rounded-full border-2 border-t-transparent"
          style={{
            borderColor: "oklch(0.68 0.11 75)",
            borderTopColor: "transparent",
          }}
        />
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div data-ocid="orders.empty_state" className="text-center py-16">
        <ShoppingBag
          className="w-12 h-12 mx-auto mb-3"
          style={{ color: "oklch(0.55 0.04 152)" }}
        />
        <p className="font-hindi" style={{ color: "oklch(0.55 0.04 152)" }}>
          अभी कोई ऑर्डर नहीं है
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order, idx) => {
        const status = getStatus(idx);
        return (
          <motion.div
            key={String(order.orderId)}
            data-ocid={`orders.item.${idx + 1}`}
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
                <div className="flex items-center gap-2 mb-1">
                  <Package
                    className="w-4 h-4"
                    style={{ color: "oklch(0.68 0.11 75)" }}
                  />
                  <span
                    className="font-semibold font-hindi"
                    style={{ color: "oklch(0.96 0.01 80)" }}
                  >
                    ऑर्डर #{String(order.orderId)}
                  </span>
                </div>
                <div
                  className="flex items-center gap-1 text-sm"
                  style={{ color: "oklch(0.65 0.03 152)" }}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatDate(order.timestamp)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
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
                  onClick={() => cycleStatus(idx)}
                >
                  स्थिति अपडेट करें
                </Button>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              <div style={{ color: "oklch(0.75 0.04 152)" }}>
                <span className="font-hindi">आइटम: </span>
                <span
                  className="font-semibold"
                  style={{ color: "oklch(0.96 0.01 80)" }}
                >
                  {order.items.length}
                </span>
              </div>
              <div style={{ color: "oklch(0.75 0.04 152)" }}>
                <span className="font-hindi">कुल: </span>
                <span
                  className="font-semibold"
                  style={{ color: "oklch(0.68 0.11 75)" }}
                >
                  ₹{Number(order.totalPrice).toLocaleString("hi-IN")}
                </span>
              </div>
            </div>
            {order.items.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {order.items.map((item) => (
                  <span
                    key={String(item.productId)}
                    className="text-xs px-2 py-0.5 rounded-md font-hindi"
                    style={{
                      background: "oklch(0.23 0.055 152)",
                      color: "oklch(0.75 0.04 152)",
                    }}
                  >
                    उत्पाद #{String(item.productId)} × {String(item.quantity)}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Consultations Tab ────────────────────────────────────────────────────────
function ConsultationsTab() {
  const { data: consultations = [], isLoading } = useConsultations();
  const [seen, setSeen] = useState<Set<number>>(new Set());

  const toggleSeen = (idx: number) => {
    setSeen((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  if (isLoading) {
    return (
      <div
        data-ocid="consultations.loading_state"
        className="flex items-center justify-center py-16"
      >
        <div
          className="animate-spin w-8 h-8 rounded-full border-2"
          style={{
            borderColor: "oklch(0.68 0.11 75)",
            borderTopColor: "transparent",
          }}
        />
      </div>
    );
  }

  if (!consultations.length) {
    return (
      <div data-ocid="consultations.empty_state" className="text-center py-16">
        <Users
          className="w-12 h-12 mx-auto mb-3"
          style={{ color: "oklch(0.55 0.04 152)" }}
        />
        <p className="font-hindi" style={{ color: "oklch(0.55 0.04 152)" }}>
          अभी कोई परामर्श अनुरोध नहीं है
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {consultations.map((c, idx) => (
        <motion.div
          key={`${c.name}-${String(c.timestamp)}`}
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
            <div className="text-xs" style={{ color: "oklch(0.55 0.04 152)" }}>
              {formatDate(c.timestamp)}
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
};

function ProductsTab() {
  const [products, setProducts] = useState<LocalProduct[]>(staticProducts);
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
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, name: editName, price: BigInt(Number(editPrice) || 0) }
          : p,
      ),
    );
    setEditing(null);
  };

  const addProduct = () => {
    if (!newName.trim() || !newPrice.trim()) return;
    const newId = BigInt(products.length + 100);
    setProducts((prev) => [
      ...prev,
      {
        id: newId,
        name: newName,
        price: BigInt(Number(newPrice) || 0),
        description: newDesc,
        benefits: "",
        ingredients: "",
      },
    ]);
    setNewName("");
    setNewPrice("");
    setNewDesc("");
    setShowAdd(false);
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

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <LoginGate onLogin={() => setLoggedIn(true)} />;
  }

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
            onClick={() => {
              window.location.hash = "";
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            मुख्य साइट पर जाएं
          </button>
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
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: ShoppingBag, label: "ऑर्डर्स", color: "oklch(0.68 0.11 75)" },
            { icon: Users, label: "परामर्श", color: "oklch(0.55 0.18 250)" },
            { icon: Package, label: "प्रोडक्ट्स", color: "oklch(0.55 0.17 160)" },
          ].map(({ icon: Icon, label, color }) => (
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
                <span
                  className="text-sm font-hindi font-semibold"
                  style={{ color: "oklch(0.75 0.04 152)" }}
                >
                  {label}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList
            data-ocid="admin.tab"
            className="w-full border-0 p-1 rounded-xl"
            style={{ background: "oklch(0.18 0.04 152)" }}
          >
            <TabsTrigger
              value="orders"
              className="flex-1 font-hindi text-sm data-[state=active]:text-white rounded-lg transition-all"
              style={{}}
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
          </TabsList>

          <TabsContent value="orders">
            <OrdersTab />
          </TabsContent>
          <TabsContent value="consultations">
            <ConsultationsTab />
          </TabsContent>
          <TabsContent value="products">
            <ProductsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
