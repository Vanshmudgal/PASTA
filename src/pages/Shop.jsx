import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Plus, Minus, Trash2, Check, ArrowRight } from "lucide-react";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Fallback image component
const ImageWithFallback = ({ src, alt, className, fallbackSrc = "/placeholder-food.jpg" }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={`relative ${className} overflow-hidden bg-[#F0EBE0]`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#F0EBE0] animate-pulse">
           <span className="text-[#D4A373]">Loading...</span>
        </div>
      )}
      <img
        src={error ? fallbackSrc : imgSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-700 hover:scale-110 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
          setImgSrc(fallbackSrc);
        }}
      />
    </div>
  );
};

const products = [
  {
    id: 1,
    name: "Penne Alcolcio",
    price: 320.99,
    description: "Penne pasta in a rich bacon and cream sauce with Parmesan cheese.",
    image: "https://images.unsplash.com/photo-1598866594230-a7c12756260f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Penne Alfredo",
    price: 350.99,
    description: "Classic creamy Alfredo sauce with garlic, butter, and Parmesan over penne.",
    image: "https://grilledcheesesocial.com/wp-content/uploads/2024/04/penne-alfredo-pasta-recipe-18.jpg",
  },
  {
    id: 3,
    name: "Penne in Tomato Basil",
    price: 290.2,
    description: "Fresh penne pasta with sun-dried tomatoes and aromatic basil pesto.",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Spaghetti Italiano",
    price: 380.2,
    description: "Traditional Italian spaghetti with homemade marinara sauce and herbs.",
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Pappardelle Sorrentina",
    price: 420.3,
    description: "Wide ribbon pasta with fresh tomatoes, mozzarella, and basil.",
    image: "https://media-cdn2.greatbritishchefs.com/media/cvhbb04y/img77087.whqc_1426x713q80.jpg",
  },
  {
    id: 6,
    name: "Pappardelle in Creamy White Saffron Sauce",
    price: 440.5,
    description: "Elegant pappardelle in a luxurious saffron-infused cream sauce.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXWGWLcW3K8_kTLPG-wM1KsdssF2kWDV69FA&s",
  },
    {
    id: 7,
    name: "Lasagna",
    price: 489.3,
    description: "Layered pasta with Bolognese sauce, béchamel, and melted cheese.",
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "Mac and Cheese",
    price: 340.5,
    description: "Creamy cheddar cheese sauce with elbow macaroni, baked to perfection.",
    image: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    name: "Ravioli",
    price: 460.8,
    description: "Handmade pasta pockets filled with ricotta and spinach in butter sage sauce.",
    image: "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];
export default function Shop({ cart, setCart }) {
  const [quantities, setQuantities] = useState({});
  const [addedItem, setAddedItem] = useState(null);
  const navigate = useNavigate();

  // Updated: Defaults to 0, minimum is 0
  const updateQuantity = (productId, delta) => {
    setQuantities((prev) => {
      const current = prev[productId] || 0; // Default is 0
      const newValue = Math.max(0, current + delta); // Allow going down to 0
      return { ...prev, [productId]: newValue };
    });
  };

  const addToCart = (product) => {
    const quantity = quantities[product.id] || 0; // Default to 0
    
    // Safety check: Prevent adding 0 items
    if (quantity === 0) return;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prevCart,
        {
          ...product,
          quantity,
          image: product.image,
        },
      ];
    });

    setAddedItem(product.id);
    
    // Optional: Reset counter to 0 after adding? 
    // Uncomment next line if you want the counter to reset after adding
    // setQuantities(prev => ({...prev, [product.id]: 0}));

    setTimeout(() => setAddedItem(null), 1500);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const goToCheckout = () => {
    navigate("/checkout", {
      state: {
        cartItems: cart.map((item) => ({
          ...item,
          image: item.image,
        })),
      },
    });
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="bg-[#FFFDF5] min-h-screen font-sans selection:bg-[#D4A373] selection:text-white">
      <Header />
      
      {/* Page Title */}
      <div className="pt-16 pb-12 text-center px-4">
         <span className="text-[#D4A373] font-bold tracking-widest uppercase text-xs mb-3 block">
            Fresh from the Oven
         </span>
         <h1 className="font-serif text-5xl text-[#2F241F]">Curated Menu</h1>
      </div>

      <main className="container mx-auto px-6 pb-32">
        
        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="mb-16 bg-white p-8 rounded-3xl shadow-xl border border-[#E5DCC5] max-w-4xl mx-auto animate-fade-in-up">
            <div className="flex justify-between items-end mb-6 border-b border-[#E5DCC5] pb-4">
              <div>
                  <h2 className="font-serif text-2xl text-[#2F241F] mb-1">Your Selection</h2>
                  <p className="text-sm text-[#5A4D44]">{cart.reduce((total, item) => total + item.quantity, 0)} items selected</p>
              </div>
              <span className="text-2xl font-serif text-[#D4A373]">
                Total: ₹{calculateTotal()}
              </span>
            </div>

            <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 hover:bg-[#FFFDF5] rounded-xl transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-[#E5DCC5]">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-serif font-medium text-[#2F241F]">{item.name}</h3>
                      <p className="text-[#D4A373] text-sm">
                        ₹{item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#5A4D44] hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((product) => {
            const currentQty = quantities[product.id] || 0;
            const isAddDisabled = currentQty === 0;

            return (
              <div
                key={product.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full"
                  />
                  {addedItem === product.id && (
                    <div className="absolute inset-0 bg-[#2F241F]/80 flex flex-col items-center justify-center text-white animate-fade-in">
                      <div className="bg-[#D4A373] p-3 rounded-full mb-2">
                          <Check size={24} />
                      </div>
                      <span className="font-serif text-lg tracking-wide">Added</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                      <h3 className="font-serif text-xl text-[#2F241F] leading-tight group-hover:text-[#D4A373] transition-colors">
                      {product.name}
                      </h3>
                      <span className="font-bold text-[#D4A373] text-lg whitespace-nowrap ml-2">
                      ₹{product.price.toFixed(0)}
                      </span>
                  </div>
                  
                  <p className="text-[#5A4D44]/70 text-sm mb-6 line-clamp-2">
                      {product.description}
                  </p>

                  {/* Controls - Pushed to bottom */}
                  <div className="mt-auto pt-4 border-t border-[#F0EBE0] flex items-center justify-between gap-4">
                    {/* Quantity Stepper */}
                    <div className="flex items-center bg-[#FFFDF5] rounded-full border border-[#E5DCC5]">
                      <button 
                          onClick={() => updateQuantity(product.id, -1)}
                          className="w-8 h-8 flex items-center justify-center text-[#2F241F] hover:bg-[#E5DCC5] rounded-full transition-colors"
                      >
                          <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-medium text-sm text-[#2F241F]">
                          {currentQty}
                      </span>
                      <button 
                          onClick={() => updateQuantity(product.id, 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#2F241F] hover:bg-[#E5DCC5] rounded-full transition-colors"
                      >
                          <Plus size={14} />
                      </button>
                    </div>

                    {/* Add Button - Disabled if Quantity is 0 */}
                    <button
                      onClick={() => addToCart(product)}
                      disabled={isAddDisabled}
                      className={`flex-grow py-2 px-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium shadow-md ${
                        isAddDisabled 
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none" 
                        : "bg-[#2F241F] hover:bg-[#D4A373] text-white"
                      }`}
                    >
                      <ShoppingBag size={16} /> 
                      {isAddDisabled ? "Select Qty" : "Add"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Checkout Button */}
        {cart.length > 0 && (
          <div className="fixed bottom-8 right-8 z-40 animate-bounce-slow">
            <button
              onClick={goToCheckout}
              className="bg-[#2F241F] hover:bg-[#4A403A] text-white pl-6 pr-2 py-2 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-4 group"
            >
              <div className="flex flex-col items-start">
                  <span className="text-[10px] uppercase tracking-widest text-[#D4A373]">Checkout</span>
                  <span className="font-serif text-lg">₹{calculateTotal()}</span>
              </div>
              <div className="bg-[#D4A373] p-3 rounded-full text-[#2F241F] group-hover:rotate-45 transition-transform">
                <ArrowRight size={20} />
              </div>
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}