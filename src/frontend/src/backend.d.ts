import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface FAQ {
    question: string;
    answer: string;
}
export type Time = bigint;
export interface Cart {
    items: Array<CartItem>;
    totalPrice: bigint;
}
export interface CartItem {
    productId: bigint;
    quantity: bigint;
}
export interface Consultation {
    name: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export interface Order {
    userId: Principal;
    orderId: bigint;
    timestamp: Time;
    items: Array<CartItem>;
    totalPrice: bigint;
}
export interface Product {
    id: bigint;
    name: string;
    description: string;
    benefits: string;
    price: bigint;
    ingredients: string;
}
export interface Testimonial {
    name: string;
    reviewText: string;
    rating: bigint;
}
export interface backendInterface {
    addFAQ(question: string, answer: string): Promise<void>;
    addItemToCart(productId: bigint, quantity: bigint): Promise<void>;
    addProduct(name: string, description: string, price: bigint, benefits: string, ingredients: string): Promise<bigint>;
    addTestimonial(name: string, rating: bigint, reviewText: string): Promise<void>;
    getCart(): Promise<Cart>;
    getConsultations(): Promise<Array<Consultation>>;
    getFAQs(): Promise<Array<FAQ>>;
    getOrders(): Promise<Array<Order>>;
    getProducts(): Promise<Array<Product>>;
    getTestimonials(): Promise<Array<Testimonial>>;
    placeOrder(): Promise<bigint>;
    removeItemFromCart(productId: bigint): Promise<void>;
    submitConsultation(name: string, phone: string, message: string): Promise<void>;
}
