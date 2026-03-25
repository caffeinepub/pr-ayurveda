import { staticProducts } from "../data/staticData";

type StaticProduct = (typeof staticProducts)[0];

const STORAGE_KEY = "pr_products";

function serializeProducts(products: StaticProduct[]): string {
  return JSON.stringify(
    products.map((p) => ({
      ...p,
      id: String(p.id),
      price: String(p.price),
    })),
  );
}

function deserializeProducts(raw: string): StaticProduct[] {
  const parsed = JSON.parse(raw);
  return parsed.map(
    (p: Record<string, unknown>) =>
      ({
        ...p,
        id: BigInt(p.id as string),
        price: BigInt(p.price as string),
      }) as StaticProduct,
  );
}

export function getAdminProducts(): StaticProduct[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return deserializeProducts(raw);
    }
  } catch {}
  return [...staticProducts];
}

export function useAdminProducts() {
  const products = getAdminProducts();

  const saveProducts = (updated: StaticProduct[]) => {
    localStorage.setItem(STORAGE_KEY, serializeProducts(updated));
  };

  return { products, saveProducts };
}
