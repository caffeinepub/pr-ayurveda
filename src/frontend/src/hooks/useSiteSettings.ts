export interface Coupon {
  id: string;
  code: string;
  type: "flat" | "percent";
  amount: number;
  expiry: string; // ISO date string or empty
  active: boolean;
}

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  color: string; // tailwind bg class like 'bg-red-600'
  active: boolean;
}

export interface SiteSettings {
  announcementText: string;
  flashSaleEnabled: boolean;
  whatsappNumber: string;
  discountCode: string;
  discountAmount: number;
  coupons: Coupon[];
  promoBanners: PromoBanner[];
}

const DEFAULTS: SiteSettings = {
  announcementText:
    "⚡ फ्लैश सेल! अभी ऑर्डर करें - ऑफर खत्म होने में: | 📞 +91 92171 27566",
  flashSaleEnabled: true,
  whatsappNumber: "919217127566",
  discountCode: "URMI100",
  discountAmount: 100,
  coupons: [],
  promoBanners: [],
};

const STORAGE_KEY = "pr_settings";

export function getSettings(): SiteSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return { ...DEFAULTS, ...JSON.parse(raw) };
    }
  } catch {}
  return { ...DEFAULTS };
}

export function useSiteSettings() {
  const updateSettings = (partial: Partial<SiteSettings>) => {
    const current = getSettings();
    const updated = { ...current, ...partial };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return { settings: getSettings(), updateSettings };
}
