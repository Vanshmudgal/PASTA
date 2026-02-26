import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Leaf, Heart, Globe, Award, Users, Utensils } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutUs() {
  // State to track if images have loaded
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isLocationImageLoaded, setIsLocationImageLoaded] = useState(false);

  const values = [
    {
      icon: <Utensils className="w-8 h-8" />,
      title: "Hand-Rolled Daily",
      desc: "No machines, just hands. Our pasta is made fresh every morning right here in Meerut using traditional techniques.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Authentic Recipes",
      desc: "We don't indian-ize our pasta. We serve it the way nonna makes it in Tuscany—rich, creamy, and full of soul.",
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Fresh Ingredients",
      desc: "From sun-ripened tomatoes to fresh basil, we source the finest produce from local farmers in Uttar Pradesh.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Made with Amore",
      desc: "Food is a love language. Every plate that leaves our kitchen is crafted with passion and attention to detail.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "World Class Standards",
      desc: "Bringing international hygiene and culinary standards to the heart of our city.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Meerut's Own",
      desc: "Born in Pallavpuram, built for our community. We are proud to be a local brand with a global vision.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDF8F3] font-sans text-[#1A1814] selection:bg-[#F9D71C] selection:text-[#1A1814]">
      <Header />

      <main>
        {/* --- HERO SECTION --- */}
        <section className="relative py-20 md:py-32 px-6 flex flex-col items-center text-center bg-[url('https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=2032&auto=format&fit=crop')] bg-cover bg-center bg-fixed">
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <span className="text-[#F9D71C] font-bold tracking-widest uppercase text-sm mb-4 block">
              Est. 2023 • Meerut
            </span>
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 leading-tight">
              Bringing <span className="italic text-[#F9D71C]">Italy</span> <br />
              to Your Plate
            </h1>
            <p className="text-xl text-[#E5E5E5] max-w-2xl mx-auto leading-relaxed font-light">
              We didn't just want to open a restaurant. We wanted to bring the authentic taste of hand-rolled pasta to the streets of Meerut.
            </p>
          </div>
        </section>

        {/* --- ORIGIN STORY --- */}
        <section className="px-6 py-24 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            
            {/* Image Side with Fallback UI */}
            <div className="relative group h-[500px]">
              <div className="absolute -inset-4 border-2 border-[#F9D71C] rounded-2xl rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
              
              {/* Fallback Skeleton */}
              {!isImageLoaded && (
                <div className="absolute inset-0 z-10 rounded-2xl shadow-2xl bg-[#E8E3DD] animate-pulse rotate-[-2deg] group-hover:rotate-0 transition-transform duration-500 flex items-center justify-center">
                  <span className="text-[#8B5A2B] font-medium font-serif italic">Loading...</span>
                </div>
              )}

              {/* Actual Image */}
              <img
                src="https://s.lightorangebean.com/media/20240914160809/Spicy-Penne-Pasta_-done.png.webp"
                alt="Chef making pasta"
                onLoad={() => setIsImageLoaded(true)}
                className={`absolute inset-0 z-10 rounded-2xl shadow-2xl w-full h-full object-cover rotate-[-2deg] group-hover:rotate-0 transition-all duration-500 ${
                  isImageLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>

            {/* Text Side */}
            <div className="space-y-6">
              <h2 className="font-serif text-4xl md:text-5xl text-[#1A1814]">
                It started in <br/> <span className="text-[#8B5A2B] italic">Pallavpuram.</span>
              </h2>
              <div className="w-24 h-1.5 bg-[#F9D71C]"></div>
              
              <p className="text-lg leading-relaxed text-gray-600">
                Meerut has always loved food, but we noticed something was missing. While there were plenty of places serving "pasta," it was often drowned in ketchup or mayo. 
              </p>
              <p className="text-lg leading-relaxed text-gray-600">
                <strong>INESA PASTAZ</strong> was born out of a desire to change that. We wanted to serve the <em>real deal</em>—Al Dente pasta, slow-simmered marinara, and creamy Alfredo made from scratch, not a packet.
              </p>
              <p className="text-lg leading-relaxed text-gray-600">
                Located in the M Seven Complex, we are now Meerut's go-to spot for authentic Italian dining.
              </p>

              <div className="pt-4">
                <p className="font-serif text-xl italic text-[#8B5A2B]">- The Inesa Team</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- VALUES SECTION (Dark Mode) --- */}
        <section className="bg-[#1A1814] py-24 px-6 text-[#FFFDF5]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-5xl mb-4 text-white">
                The Inesa Philosophy
              </h2>
              <p className="text-[#F9D71C] uppercase tracking-widest text-sm font-medium">
                Why we are Meerut's Favorite
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-x-8 gap-y-12">
              {values.map((item, index) => (
                <div
                  key={index}
                  className="group bg-white/5 p-8 rounded-2xl hover:bg-[#F9D71C] transition-colors duration-300 border border-white/10"
                >
                  <div className="text-[#F9D71C] mb-6 group-hover:text-[#1A1814] transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="font-serif text-xl mb-3 text-white group-hover:text-[#1A1814]">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-[#1A1814]/80 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- LOCATION / CTA --- */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 border-2 border-[#F9D71C] p-8 md:p-16 rounded-[3rem]">
            <div className="md:w-1/2">
               <h2 className="font-serif text-3xl md:text-4xl text-[#1A1814] mb-6">
                Come visit us at M Seven Complex.
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Experience the aroma of fresh garlic, basil, and melting cheese. 
                Whether it's a date night or a family dinner, we have a table waiting for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/shop"
                  className="bg-[#F9D71C] hover:bg-[#E8C220] text-[#1A1814] font-bold py-3 px-10 rounded-full transition-all shadow-lg text-center"
                >
                  Order Online
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-[#1A1814] text-[#1A1814] hover:bg-[#1A1814] hover:text-[#F9D71C] font-bold py-3 px-10 rounded-full transition-all text-center"
                >
                  Get Directions
                </Link>
              </div>
            </div>
            
            {/* Map/Image Placeholder */}
            <div className="md:w-1/2 w-full h-64 md:h-80 bg-gray-100 rounded-3xl overflow-hidden shadow-inner relative">
                
                {/* Fallback Skeleton */}
                {!isLocationImageLoaded && (
                  <div className="absolute inset-0 z-10 bg-[#E8E3DD] animate-pulse flex items-center justify-center">
                    <span className="text-[#8B5A2B] font-medium font-serif italic">Loading Location...</span>
                  </div>
                )}

                {/* Actual Image */}
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Clock_Tower%2C_Meerut_%282023%29_1.jpg" 
                    alt="Restaurant Location"
                    onLoad={() => setIsLocationImageLoaded(true)}
                    className={`absolute inset-0 z-10 w-full h-full object-cover transition-opacity duration-500 ${
                      isLocationImageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                />

                {/* Location Badge (Fades in with image) */}
                <div className={`absolute bottom-4 left-4 z-20 bg-white/90 backdrop-blur px-4 py-2 rounded-lg text-xs font-bold shadow-sm transition-opacity duration-500 ${
                  isLocationImageLoaded ? "opacity-100" : "opacity-0"
                }`}>
                    📍 A Block, Pallavpuram
                </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}