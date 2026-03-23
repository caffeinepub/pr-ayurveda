import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Cart,
  Consultation,
  FAQ,
  Order,
  Product,
  Testimonial,
} from "../backend.d";
import { useActor } from "./useActor";

export function useProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProducts();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTestimonials();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useFAQs() {
  const { actor, isFetching } = useActor();
  return useQuery<FAQ[]>({
    queryKey: ["faqs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFAQs();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCart() {
  const { actor, isFetching } = useActor();
  return useQuery<Cart>({
    queryKey: ["cart"],
    queryFn: async () => {
      if (!actor) return { items: [], totalPrice: BigInt(0) };
      return actor.getCart();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddToCart() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: { productId: bigint; quantity: bigint }) => {
      if (!actor) throw new Error("No actor");
      return actor.addItemToCart(productId, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useRemoveFromCart() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.removeItemFromCart(productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function usePlaceOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.placeOrder();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useSubmitConsultation() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      phone,
      message,
    }: { name: string; phone: string; message: string }) => {
      if (!actor) throw new Error("No actor");
      return actor.submitConsultation(name, phone, message);
    },
  });
}

// Admin queries — only require actor to be present (not isFetching)
// This prevents indefinite loading when actor is already available
export function useOrders() {
  const { actor } = useActor();
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getOrders();
    },
    enabled: !!actor,
    staleTime: 0,
    retry: 2,
  });
}

export function useConsultations() {
  const { actor } = useActor();
  return useQuery<Consultation[]>({
    queryKey: ["consultations"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getConsultations();
    },
    enabled: !!actor,
    staleTime: 0,
    retry: 2,
  });
}
