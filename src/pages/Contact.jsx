import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useState } from "react";
import { Mail, Phone, Clock, MapPin, Send, CheckCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setShowSuccess(true);

    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      message: "",
    });

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] font-sans selection:bg-[#D4A373] selection:text-white flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="w-full max-w-6xl">
            
            {/* Header Text */}
            <div className="text-center mb-16">
                <span className="text-[#D4A373] font-bold tracking-widest uppercase text-sm mb-2 block">
                    We'd love to hear from you
                </span>
                <h1 className="font-serif text-5xl text-[#2F241F]">Get in Touch</h1>
            </div>

            {/* Main Card Container */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
                
                {/* Left Side: Contact Info (Dark Theme) */}
                <div className="md:w-5/12 bg-[#2F241F] text-[#FFFDF5] p-10 md:p-14 flex flex-col justify-between relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A373] opacity-10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
                    
                    <div>
                        <h2 className="font-serif text-3xl mb-6">Contact Information</h2>
                        <p className="text-[#FFFDF5]/70 mb-12 leading-relaxed">
                            Have a question about our pasta, custom orders, or just want to say hello? Fill out the form or reach us directly.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/5 rounded-full text-[#D4A373]">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <h3 className="font-serif text-lg mb-1">Phone</h3>
                                    <p className="text-[#FFFDF5]/70 text-sm hover:text-[#D4A373] transition-colors cursor-pointer">+91 8800205227</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/5 rounded-full text-[#D4A373]">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h3 className="font-serif text-lg mb-1">Email</h3>
                                    <p className="text-[#FFFDF5]/70 text-sm hover:text-[#D4A373] transition-colors cursor-pointer">inesapastaz@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/5 rounded-full text-[#D4A373]">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h3 className="font-serif text-lg mb-1">Location</h3>
                                    <p className="text-[#FFFDF5]/70 text-sm">
                                        Showroom F-10, First Floor, Near Aditya Complex,<br/>
                                        Pallavpuram, Meerut<br/>
                                        Uttar Pradesh, India
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 md:mt-0 pt-8 border-t border-white/10">
                        <div className="flex items-center gap-3 text-[#D4A373]">
                            <Clock size={18} />
                            <span className="font-medium tracking-wide text-sm uppercase">Mon - Sat: 8am - 7pm</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form (Light Theme) */}
                <div className="md:w-7/12 p-10 md:p-14 bg-white relative">
                     {/* Success Message Overlay */}
                    {showSuccess && (
                        <div className="absolute top-0 left-0 w-full h-full bg-white/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center animate-fade-in">
                            <div className="bg-green-50 p-4 rounded-full mb-4 text-green-600">
                                <CheckCircle size={48} />
                            </div>
                            <h3 className="font-serif text-2xl text-[#2F241F] mb-2">Message Sent!</h3>
                            <p className="text-gray-500">We'll get back to you shortly.</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col justify-center">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-bold text-[#5A4D44] uppercase tracking-wider">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-[#FFFDF5] border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4A373] focus:ring-1 focus:ring-[#D4A373] transition-all"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-bold text-[#5A4D44] uppercase tracking-wider">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-[#FFFDF5] border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4A373] focus:ring-1 focus:ring-[#D4A373] transition-all"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-bold text-[#5A4D44] uppercase tracking-wider">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="6"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-[#FFFDF5] border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4A373] focus:ring-1 focus:ring-[#D4A373] transition-all resize-none"
                                placeholder="How can we help you?"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full bg-[#2F241F] hover:bg-[#4A403A] text-white font-medium py-4 rounded-lg transition-all shadow-lg flex justify-center items-center gap-2 ${
                            isSubmitting ? "opacity-75 cursor-not-allowed" : "hover:-translate-y-1"
                            }`}
                        >
                            {isSubmitting ? (
                            <>
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                Sending...
                            </>
                            ) : (
                            <>
                                Send Message <Send size={18} />
                            </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;