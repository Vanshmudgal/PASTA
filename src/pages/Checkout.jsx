import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const sendToGoogleSheetsMock = ({ name, phone, address }) => {
  console.log("📤 Sending data to Google Sheets (SIMULATED)");

  console.table({
    Name: name,
    Phone: phone,
    Address: address,
    Timestamp: new Date().toLocaleString(),
  });

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        message: "Data added to Google Sheets (mock)",
      });
    }, 1200);
  });
};

export default function Checkout({ setCart }) {
  const navigate = useNavigate();

  // ✅ READ CART FROM LOCAL STORAGE ALWAYS
  const [cart, setLocalCart] = useState(() => {
    const saved = localStorage.getItem("food_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [deliveryError, setDeliveryError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    district: "",
    pincode: "",
  });

  // Indian States
  const states = [
    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Delhi","Goa",
    "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
    "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
    "Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
    "Uttar Pradesh","Uttarakhand","West Bengal"
  ];

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => {
        const price = Number(item.price) || 0;
        const qty = Number(item.quantity) || 0;
        return total + price * qty;
      }, 0)
      .toFixed(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setDeliveryError("");
  };

  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!phoneRegex.test(formData.phone)) newErrors.phone = "Enter a valid 10-digit mobile number";
    if (!formData.address.trim()) newErrors.address = "Delivery address is required";
    if (!formData.state) newErrors.state = "Please select a state";
    if (!formData.district.trim()) newErrors.district = "District is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDeliveryError("");

    if (!validateForm()) return;

    const districtInput = formData.district.trim().toLowerCase();

    if (districtInput !== "meerut") {
      setDeliveryError("We currently only deliver in Meerut. Please try a different address.");
      window.alert("Sorry! We don't deliver in your area. Service is currently limited to Meerut.");
      return;
    }

    setIsSubmitting(true);

    try {
      await sendToGoogleSheetsMock({
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      });

      setShowSuccess(true);

      // CLEAR CART FROM BOTH LOCAL AND STATE
      localStorage.removeItem("food_cart");
      setLocalCart([]);
      if (setCart) setCart([]);

      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      console.error("❌ Google Sheets Error (Mock)", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FDF8F3] min-h-screen font-sans">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-[#8B5A2B] mb-3">
            Secure Checkout
          </h1>
          <p className="text-gray-500">Complete your order to receive your treats</p>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm max-w-2xl mx-auto border border-[#f3e6d5]">
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="text-2xl font-serif text-[#8B5A2B] mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added any sweets yet.</p>
            <button
              onClick={() => navigate("/shop")}
              className="bg-[#F9D71C] text-[#8B5A2B] px-8 py-3 rounded-full font-medium hover:bg-[#E8C220] transition-colors shadow-md"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="grid lg:grid-cols-12 gap-8 md:gap-12">

              {/* LEFT SIDE FORM */}
              <div className="lg:col-span-7">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#f3e6d5]">
                  <h2 className="text-2xl font-serif text-[#8B5A2B] mb-6 flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F9D71C] text-sm text-[#8B5A2B]">1</span>
                    Shipping Details
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {deliveryError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-3">
                        <span className="text-xl">⚠️</span>
                        <div>
                          <p className="font-bold">Delivery Unavailable</p>
                          <p className="text-sm">{deliveryError}</p>
                        </div>
                      </div>
                    )}

                    {/* Name + Phone */}
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full bg-gray-50 border ${errors.name ? "border-red-500" : "border-gray-200"} rounded-xl px-4 py-3`}
                          placeholder="e.g. Vansh Mudgal"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          maxLength={10}
                          className={`w-full bg-gray-50 border ${errors.phone ? "border-red-500" : "border-gray-200"} rounded-xl px-4 py-3`}
                          placeholder="10-digit number"
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                      <textarea
                        name="address"
                        rows={3}
                        value={formData.address}
                        onChange={handleChange}
                        className={`w-full bg-gray-50 border ${errors.address ? "border-red-500" : "border-gray-200"} rounded-xl px-4 py-3`}
                        placeholder="House number, street, landmark..."
                      />
                      {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                    </div>

                    {/* State + District + Pincode */}
                    <div className="grid md:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className={`w-full bg-gray-50 border ${errors.state ? "border-red-500" : "border-gray-200"} rounded-xl px-4 py-3`}
                        >
                          <option value="">Select State</option>
                          {states.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                        <input
                          name="district"
                          value={formData.district}
                          onChange={handleChange}
                          className={`w-full bg-gray-50 border ${errors.district ? "border-red-500" : "border-gray-200"} rounded-xl px-4 py-3`}
                          placeholder="e.g. Meerut"
                        />
                        {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                        <input
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          maxLength={6}
                          className={`w-full bg-gray-50 border ${errors.pincode ? "border-red-500" : "border-gray-200"} rounded-xl px-4 py-3`}
                          placeholder="250001"
                        />
                        {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* RIGHT COLUMN - ORDER SUMMARY */}
              <div className="lg:col-span-5">
                <div className="sticky top-8 space-y-6">
                  <div className="bg-white p-8 rounded-3xl shadow-lg border border-[#f3e6d5]">
                    <h2 className="text-2xl font-serif text-[#8B5A2B] mb-6 flex items-center gap-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F9D71C] text-sm text-[#8B5A2B]">2</span>
                      Your Order
                    </h2>

                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-start gap-4 pb-4 border-b border-gray-100">
                          <div
                            className="w-16 h-16 bg-gray-100 rounded-lg bg-cover bg-center"
                            style={{ backgroundImage: item.image ? `url(${item.image})` : "none" }}
                          >
                            {!item.image && <span className="flex items-center justify-center h-full text-xl">🍰</span>}
                          </div>

                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800 line-clamp-1">{item.name}</h4>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>

                          <span className="font-bold text-[#8B5A2B]">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-dashed border-gray-300 space-y-2">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>₹{calculateTotal()}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className="text-green-600 font-medium">Free</span>
                      </div>
                      <div className="flex justify-between text-xl font-bold text-[#8B5A2B] pt-2">
                        <span>Total</span>
                        <span>₹{calculateTotal()}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full mt-8 bg-[#8B5A2B] text-white py-4 rounded-xl font-medium text-lg hover:bg-[#6d4621] disabled:bg-gray-400 flex justify-center items-center gap-2"
                    >
                      {isSubmitting ? "Processing..." : "Place Order →"}
                    </button>

                    <p className="text-xs text-center text-gray-400 mt-4">
                      🔒 Secure SSL Encryption
                    </p>
                  </div>

                  <button
                    onClick={() => navigate(-1)}
                    className="w-full text-gray-500 hover:text-[#8B5A2B] text-sm font-medium"
                  >
                    ← Return to Cart
                  </button>
                </div>
              </div>

            </div>
          </>
        )}
      </main>

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-10 rounded-3xl text-center max-w-md w-full shadow-2xl animate-fade-in-up">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🎉</span>
            </div>
            <h2 className="text-3xl font-serif text-[#8B5A2B] mb-2">
              Order Confirmed!
            </h2>
            <p className="text-gray-600 mb-8">
              Thank you for choosing us. Your treats will be delivered to <strong>{formData.district}</strong> soon.
            </p>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 animate-progress w-full"></div>
            </div>
            <p className="text-xs text-gray-400 mt-4">Redirecting to home...</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
