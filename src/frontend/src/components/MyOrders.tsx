import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, Package, Search, Truck } from "lucide-react";
import { useState } from "react";

interface StoredOrder {
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

interface MyOrdersProps {
  open: boolean;
  onClose: () => void;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<
    string,
    { icon: React.ElementType; color: string; bg: string }
  > = {
    लंबित: {
      icon: Clock,
      color: "text-yellow-700",
      bg: "bg-yellow-50 border-yellow-200",
    },
    प्रोसेसिंग: {
      icon: Package,
      color: "text-blue-700",
      bg: "bg-blue-50 border-blue-200",
    },
    डिलीवर्ड: {
      icon: CheckCircle,
      color: "text-green-700",
      bg: "bg-green-50 border-green-200",
    },
    "शिप किया": {
      icon: Truck,
      color: "text-purple-700",
      bg: "bg-purple-50 border-purple-200",
    },
  };
  const s = map[status] || map.लंबित;
  const Icon = s.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-hindi font-semibold ${s.bg} ${s.color}`}
    >
      <Icon className="w-3 h-3" />
      {status}
    </span>
  );
}

export default function MyOrders({ open, onClose }: MyOrdersProps) {
  const [phone, setPhone] = useState("");
  const [searched, setSearched] = useState(false);
  const [orders, setOrders] = useState<StoredOrder[]>([]);

  const search = () => {
    const all: StoredOrder[] = JSON.parse(
      localStorage.getItem("pr_orders") || "[]",
    );
    const found = all.filter((o) => o.phone === phone.trim());
    setOrders(found);
    setSearched(true);
  };

  const handleClose = () => {
    setPhone("");
    setSearched(false);
    setOrders([]);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-hindi-serif text-xl text-brand-green flex items-center gap-2">
            <Package className="w-5 h-5 text-brand-gold" />
            मेरे ऑर्डर
          </DialogTitle>
        </DialogHeader>

        <div className="mt-3">
          <p className="font-hindi text-sm text-muted-foreground mb-3">
            अपना मोबाइल नंबर दर्ज करें जिससे ऑर्डर देते समय दिया था
          </p>
          <div className="flex gap-2">
            <Input
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setSearched(false);
              }}
              placeholder="आपका मोबाइल नंबर"
              type="tel"
              className="font-hindi"
              onKeyDown={(e) => e.key === "Enter" && search()}
            />
            <Button
              className="bg-brand-green text-white font-hindi gap-1"
              onClick={search}
            >
              <Search className="w-4 h-4" /> खोजें
            </Button>
          </div>
        </div>

        {searched && (
          <div className="mt-4">
            {orders.length === 0 ? (
              <div className="text-center py-10">
                <Package className="w-12 h-12 text-muted mx-auto mb-3" />
                <p className="font-hindi text-muted-foreground">
                  इस नंबर से कोई ऑर्डर नहीं मिला
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="font-hindi text-sm text-brand-green font-semibold">
                  {orders.length} ऑर्डर मिले
                </p>
                {orders.map((order) => (
                  <div
                    key={order.orderNo}
                    className="border border-border rounded-xl p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-hindi font-bold text-brand-green">
                          #{order.orderNo}
                        </span>
                        <span className="font-hindi text-xs text-muted-foreground ml-2">
                          {order.date}
                        </span>
                      </div>
                      <StatusBadge status={order.status} />
                    </div>
                    <Separator />
                    {order.items.map((item, i) => (
                      <div
                        key={`${item.name}-${i}`}
                        className="flex justify-between text-sm font-hindi"
                      >
                        <span className="text-muted-foreground">
                          {item.name} ×{item.qty}
                        </span>
                        <span>₹{item.price * item.qty}</span>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between font-hindi font-bold text-brand-green">
                      <span>कुल राशि</span>
                      <span>₹{order.total}</span>
                    </div>
                    <div className="bg-secondary rounded-lg p-3 space-y-1">
                      <p className="font-hindi text-xs font-semibold text-foreground">
                        डिलीवरी पता
                      </p>
                      <p className="font-hindi text-xs text-muted-foreground">
                        {order.name}
                      </p>
                      <p className="font-hindi text-xs text-muted-foreground">
                        {order.address}
                      </p>
                      <p className="font-hindi text-xs text-muted-foreground">
                        भुगतान: {order.payment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
