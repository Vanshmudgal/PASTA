import React from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight, ShoppingBag, Wheat, ChefHat, Truck } from "lucide-react"; // Swapped icons for context
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  // Updated data for Pasta theme
  const bestsellers = [
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
  ];

  return (
    // Base: Warm Semolina background (#FFFBEB) with Charcoal text (#1C1917)
    <div className="min-h-screen bg-[#FFFBEB] text-[#1C1917] font-sans flex flex-col selection:bg-[#D94F33] selection:text-white">
      <Header />

      <main className="flex-grow">
        {/* --- HERO SECTION --- */}
        <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
          {/* Background Blob: Soft Olive Green */}
          <div className="absolute top-0 right-0 w-2/3 h-full bg-[#E8EDDF] rounded-l-[10rem] -z-10 hidden md:block" />

          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
            {/* Text Content */}
            <div className="space-y-8 animate-fade-in-up">
              <span className="inline-block py-1 px-3 border border-[#D94F33] text-[#D94F33] rounded-full text-sm font-bold tracking-wide uppercase">
                Hand-Rolled Daily
              </span>
              <h1 className="font-serif text-6xl md:text-7xl leading-tight text-[#1C1917]">
                The Art of Pasta, <br />
                <span className="italic text-[#D94F33]">Perfected.</span>
              </h1>
              <p className="text-lg text-[#57534E] max-w-md leading-relaxed">
                Authentic bronze-cut shapes made from organic durum wheat. Experience the true taste of Italy, delivered from our kitchen to yours.
              </p>
              <div className="flex gap-4 pt-4">
                <Link
                  to="/shop"
                  // Primary Button: Terracotta Red
                  className="bg-[#D94F33] hover:bg-[#B9381F] text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2"
                >
                  Order Now <ArrowRight size={18} />
                </Link>
                <Link
                  to="/story"
                  className="group flex items-center gap-2 px-8 py-4 rounded-full border border-[#D94F33] text-[#D94F33] hover:bg-[#FEF2F2] transition-colors font-medium"
                >
                  Our Process
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  // Delicious Pasta Image
                  src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                  alt="Fresh pasta dish"
                  className="w-full h-[600px] object-cover"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-full shadow-xl z-20 hidden md:block animate-bounce-slow">
                <div className="text-center">
                  <span className="block font-serif text-3xl text-[#D94F33]">50+</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wide mt-1 block">Shapes</span>
                  <div className="flex justify-center text-[#D94F33] mt-1">
                     <Star size={12} fill="currentColor" />
                     <Star size={12} fill="currentColor" />
                     <Star size={12} fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FEATURES SCROLLER --- */}
        {/* Background: Deep Olive Green (#2C3325) */}
        <div className="bg-[#2C3325] py-12 text-[#E8EDDF] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-around items-center gap-8 md:gap-0">
                <div className="flex items-center gap-3">
                    <Wheat size={24} />
                    <span className="uppercase tracking-widest text-sm font-semibold">Organic Semolina</span>
                </div>
                <div className="w-px h-8 bg-[#E8EDDF]/20 hidden md:block"></div>
                <div className="flex items-center gap-3">
                    <ChefHat size={24} />
                    <span className="uppercase tracking-widest text-sm font-semibold">Bronze-Cut Texture</span>
                </div>
                <div className="w-px h-8 bg-[#E8EDDF]/20 hidden md:block"></div>
                <div className="flex items-center gap-3">
                    <Truck size={24} />
                    <span className="uppercase tracking-widest text-sm font-semibold">Delivering all over meerut</span>
                </div>
            </div>
        </div>

        {/* --- BESTSELLERS GRID --- */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <span className="text-[#D94F33] font-medium tracking-widest uppercase text-sm">Buon Appetito</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1C1917]">Our Chef's Special</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {bestsellers.map((item) => (
              <div key={item.id} className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E5E5E5]">
                <div className="relative overflow-hidden rounded-xl mb-6 h-64 bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button className="absolute bottom-4 right-4 bg-white text-[#1C1917] p-3 rounded-full shadow-lg translate-y-12 group-hover:translate-y-0 transition-transform duration-300 hover:bg-[#D94F33] hover:text-white">
                    <ShoppingBag size={20} />
                  </button>
                </div>
                <div className="px-2 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-xl text-[#1C1917] mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    <span className="font-medium text-lg text-[#D94F33]">{item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/shop" className="inline-block border-b-2 border-[#1C1917] pb-1 text-[#1C1917] hover:text-[#D94F33] hover:border-[#D94F33] transition-colors uppercase tracking-widest text-sm font-bold">
                View All Shapes
            </Link>
          </div>
        </section>

        {/* --- SPLIT STORY SECTION --- */}
    

        {/* --- NEWSLETTER CTA --- */}
        
      </main>

      <Footer />
    </div>
  );
}