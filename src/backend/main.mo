import Text "mo:core/Text";
import List "mo:core/List";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

actor {
  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    benefits : Text;
    ingredients : Text;
  };

  type Testimonial = {
    name : Text;
    rating : Nat;
    reviewText : Text;
  };

  type FAQ = {
    question : Text;
    answer : Text;
  };

  type Consultation = {
    name : Text;
    phone : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type CartItem = {
    productId : Nat;
    quantity : Nat;
  };

  type Cart = {
    items : [CartItem];
    totalPrice : Nat;
  };

  type Order = {
    orderId : Nat;
    userId : Principal;
    items : [CartItem];
    totalPrice : Nat;
    timestamp : Time.Time;
  };

  module Product {
    public func compare(product1 : Product, product2 : Product) : { #less; #equal; #greater } {
      Nat.compare(product1.id, product2.id);
    };
  };

  module CartItem {
    public func compare(cartItem1 : CartItem, cartItem2 : CartItem) : { #less; #equal; #greater } {
      Nat.compare(cartItem1.productId, cartItem2.productId);
    };
  };

  var nextProductId = 1;
  var nextOrderId = 1;

  let products = Map.empty<Nat, Product>();
  let testimonials = List.empty<Testimonial>();
  let faqs = List.empty<FAQ>();
  let consultations = List.empty<Consultation>();
  let orders = Map.empty<Nat, Order>();
  let carts = Map.empty<Principal, [CartItem]>();

  public shared ({ caller }) func addProduct(name : Text, description : Text, price : Nat, benefits : Text, ingredients : Text) : async Nat {
    let productId = nextProductId;
    let product : Product = {
      id = productId;
      name;
      description;
      price;
      benefits;
      ingredients;
    };
    products.add(productId, product);
    nextProductId += 1;
    productId;
  };

  public query ({ caller }) func getProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public shared ({ caller }) func addTestimonial(name : Text, rating : Nat, reviewText : Text) : async () {
    let testimonial : Testimonial = {
      name;
      rating;
      reviewText;
    };
    testimonials.add(testimonial);
  };

  public query ({ caller }) func getTestimonials() : async [Testimonial] {
    testimonials.toArray();
  };

  public shared ({ caller }) func addFAQ(question : Text, answer : Text) : async () {
    let faq : FAQ = {
      question;
      answer;
    };
    faqs.add(faq);
  };

  public query ({ caller }) func getFAQs() : async [FAQ] {
    faqs.toArray();
  };

  public shared ({ caller }) func submitConsultation(name : Text, phone : Text, message : Text) : async () {
    let consultation : Consultation = {
      name;
      phone;
      message;
      timestamp = Time.now();
    };
    consultations.add(consultation);
  };

  public query ({ caller }) func getConsultations() : async [Consultation] {
    consultations.toArray();
  };

  public shared ({ caller }) func addItemToCart(productId : Nat, quantity : Nat) : async () {
    let currentCart = switch (carts.get(caller)) {
      case (null) { [] };
      case (?cart) { cart };
    };

    let updatedCart = List.fromArray<CartItem>(currentCart);
    let existingIndex = updatedCart.findIndex(func(item) { item.productId == productId });

    switch (existingIndex) {
      case (?index) {
        updatedCart.put(index, { productId; quantity });
      };
      case (null) {
        updatedCart.add({ productId; quantity });
      };
    };

    carts.add(caller, updatedCart.toArray().sort());
  };

  public shared ({ caller }) func removeItemFromCart(productId : Nat) : async () {
    let currentCart = switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart is already empty") };
      case (?cart) { cart };
    };

    let updatedCart = List.fromArray<CartItem>(currentCart);
    let itemIndex = updatedCart.findIndex(func(item) { item.productId == productId });

    let emptyItem : CartItem = { productId = 0; quantity = 0 };

    switch (itemIndex) {
      case (?index) {
        updatedCart.put(index, emptyItem);
        carts.add(caller, updatedCart.toArray().sort());
      };
      case (null) { Runtime.trap("Item not found in cart") };
    };
  };

  public query ({ caller }) func getCart() : async Cart {
    let items = switch (carts.get(caller)) {
      case (null) { [] };
      case (?cart) { cart };
    };

    var total = 0;
    for (item in items.values()) {
      switch (products.get(item.productId)) {
        case (null) {};
        case (?product) {
          total += product.price * item.quantity;
        };
      };
    };

    {
      items;
      totalPrice = total;
    };
  };

  public shared ({ caller }) func placeOrder() : async Nat {
    let cart = getCartInternal(caller);
    if (cart.items.size() == 0) { Runtime.trap("Cart is empty") };

    let orderId = nextOrderId;
    let order : Order = {
      orderId;
      userId = caller;
      items = cart.items.toArray().sort();
      totalPrice = cart.totalPrice;
      timestamp = Time.now();
    };

    orders.add(orderId, order);
    carts.remove(caller);
    nextOrderId += 1;
    orderId;
  };

  func getCartInternal(userId : Principal) : { items : List.List<CartItem>; totalPrice : Nat } {
    let items = List.empty<CartItem>();
    var total = 0;
    switch (carts.get(userId)) {
      case (null) { Runtime.trap("Cart is empty") };
      case (?cartItems) {
        for (item in cartItems.values()) {
          items.add(item);
          switch (products.get(item.productId)) {
            case (null) {};
            case (?product) {
              total += product.price * item.quantity;
            };
          };
        };
      };
    };
    { items; totalPrice = total };
  };

  public query ({ caller }) func getOrders() : async [Order] {
    orders.values().toArray();
  };
};
