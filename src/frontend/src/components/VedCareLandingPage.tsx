import { useState } from "react";

export default function VedCareLandingPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const scrollToForm = () => {
    document
      .getElementById("vedcare-order-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const sendWhatsApp = () => {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert("कृपया सभी जानकारी भरें — नाम, मोबाइल नंबर और पता।");
      return;
    }
    const msg = `Order Details:%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AAddress: ${encodeURIComponent(address)}%0AProduct: VedCare Power+ (%E2%82%B9699)`;
    window.open(`https://wa.me/919217127566?text=${msg}`, "_blank");
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: 0,
        background: "#0b1d13",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1
          style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "10px" }}
        >
          VedCare Official
        </h1>
        <span
          style={{
            background: "#27ae60",
            padding: "8px 15px",
            borderRadius: "20px",
            display: "inline-block",
            margin: "5px",
            fontSize: "14px",
          }}
        >
          Trusted by 10,000+ Customers
        </span>
        <h2
          style={{
            fontSize: "1.5rem",
            margin: "15px 0 5px",
            fontFamily: "'Noto Sans Devanagari', Arial, sans-serif",
          }}
        >
          कमजोरी से परेशान? 😟
        </h2>
        <h3
          style={{
            fontSize: "1.2rem",
            margin: "5px 0 15px",
            color: "#2ecc71",
          }}
        >
          VedCare Power+ Ayurvedic Formula
        </h3>
        <button
          type="button"
          onClick={scrollToForm}
          style={{
            background: "#2ecc71",
            color: "#fff",
            padding: "15px 25px",
            border: "none",
            fontSize: "18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Order Now
        </button>
      </div>

      {/* PROBLEM */}
      <div
        style={{
          background: "#12261b",
          padding: "20px",
          borderRadius: "12px",
          margin: "15px",
        }}
      >
        <h2
          style={{
            fontSize: "1.3rem",
            marginBottom: "10px",
            fontFamily: "'Noto Sans Devanagari', Arial, sans-serif",
          }}
        >
          क्या आप इन समस्याओं से परेशान हैं?
        </h2>
        <p
          style={{
            fontSize: "1.1rem",
            margin: "8px 0",
            fontFamily: "'Noto Sans Devanagari', Arial, sans-serif",
          }}
        >
          ❌ थकान
        </p>
        <p
          style={{
            fontSize: "1.1rem",
            margin: "8px 0",
            fontFamily: "'Noto Sans Devanagari', Arial, sans-serif",
          }}
        >
          ❌ कमजोरी
        </p>
        <p
          style={{
            fontSize: "1.1rem",
            margin: "8px 0",
            fontFamily: "'Noto Sans Devanagari', Arial, sans-serif",
          }}
        >
          ❌ स्टैमिना की कमी
        </p>
      </div>

      {/* SOLUTION */}
      <div
        style={{
          background: "#12261b",
          padding: "20px",
          borderRadius: "12px",
          margin: "15px",
        }}
      >
        <h2 style={{ fontSize: "1.3rem", marginBottom: "10px" }}>Solution</h2>
        <p
          style={{
            fontSize: "1rem",
            lineHeight: "1.6",
            fontFamily: "'Noto Sans Devanagari', Arial, sans-serif",
          }}
        >
          <b>VedCare Power+</b> ek Ayurvedic capsule hai jo energy aur stamina
          ko support karta hai 💪
        </p>
      </div>

      {/* BENEFITS */}
      <div
        style={{
          background: "#12261b",
          padding: "20px",
          borderRadius: "12px",
          margin: "15px",
        }}
      >
        <h2 style={{ fontSize: "1.3rem", marginBottom: "10px" }}>Benefits</h2>
        <p style={{ fontSize: "1.1rem", margin: "8px 0" }}>✔ Energy Boost</p>
        <p style={{ fontSize: "1.1rem", margin: "8px 0" }}>✔ Stamina Support</p>
        <p style={{ fontSize: "1.1rem", margin: "8px 0" }}>✔ Natural Formula</p>
      </div>

      {/* TRUST */}
      <div
        style={{
          background: "#12261b",
          padding: "20px",
          borderRadius: "12px",
          margin: "15px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "1.3rem", marginBottom: "10px" }}>
          Why VedCare?
        </h2>
        {["100% Ayurvedic", "Cash on Delivery", "Free Delivery"].map(
          (badge) => (
            <span
              key={badge}
              style={{
                background: "#27ae60",
                padding: "8px 15px",
                borderRadius: "20px",
                display: "inline-block",
                margin: "5px",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              {badge}
            </span>
          ),
        )}
      </div>

      {/* REVIEWS */}
      <div
        style={{
          background: "#12261b",
          padding: "20px",
          borderRadius: "12px",
          margin: "15px",
        }}
      >
        <h2 style={{ fontSize: "1.3rem", marginBottom: "10px" }}>
          Customer Reviews
        </h2>
        <p style={{ margin: "8px 0", fontSize: "1rem" }}>
          ⭐ Ravi (Delhi): &quot;Mujhe 5 din me energy feel hui&quot;
        </p>
        <p style={{ margin: "8px 0", fontSize: "1rem" }}>
          ⭐ Aman (Mumbai): &quot;Achha result mila&quot;
        </p>
      </div>

      {/* OFFER */}
      <div
        style={{
          background: "#12261b",
          padding: "20px",
          borderRadius: "12px",
          margin: "15px",
          textAlign: "center",
        }}
      >
        <h2
          style={{ fontSize: "1.5rem", marginBottom: "10px", color: "#2ecc71" }}
        >
          🔥 Limited Time Offer
        </h2>
        <p style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#f39c12" }}>
          ₹699 Only + Free Delivery
        </p>
      </div>

      {/* ORDER FORM */}
      <div
        id="vedcare-order-form"
        style={{
          background: "#12261b",
          padding: "20px",
          borderRadius: "12px",
          margin: "15px",
        }}
      >
        <h2
          style={{
            fontSize: "1.3rem",
            marginBottom: "15px",
            textAlign: "center",
          }}
        >
          Order Now (COD)
        </h2>
        <p
          style={{
            textAlign: "center",
            fontSize: "0.9rem",
            color: "#2ecc71",
            marginBottom: "10px",
          }}
        >
          Product: <b>VedCare Power+</b> — ₹699
        </p>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "90%",
            padding: "12px",
            margin: "8px auto",
            borderRadius: "8px",
            border: "none",
            fontSize: "16px",
            display: "block",
            color: "#000",
          }}
        />
        <input
          type="text"
          placeholder="Mobile Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{
            width: "90%",
            padding: "12px",
            margin: "8px auto",
            borderRadius: "8px",
            border: "none",
            fontSize: "16px",
            display: "block",
            color: "#000",
          }}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{
            width: "90%",
            padding: "12px",
            margin: "8px auto",
            borderRadius: "8px",
            border: "none",
            fontSize: "16px",
            display: "block",
            color: "#000",
          }}
        />
        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <button
            type="button"
            onClick={sendWhatsApp}
            style={{
              background: "#2ecc71",
              color: "#fff",
              padding: "15px 30px",
              border: "none",
              fontSize: "18px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              width: "90%",
            }}
          >
            Place Order via WhatsApp
          </button>
        </div>
      </div>

      {/* BACK BUTTON */}
      <div style={{ textAlign: "center", padding: "20px" }}>
        <button
          type="button"
          onClick={() => window.history.back()}
          style={{
            background: "transparent",
            color: "#2ecc71",
            border: "1px solid #2ecc71",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          ← वापस जाएं
        </button>
      </div>
    </div>
  );
}
