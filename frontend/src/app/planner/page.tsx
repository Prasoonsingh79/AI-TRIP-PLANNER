"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe,
  Users, 
  MapPin, 
  Calendar, 
  CreditCard, 
  Plane, 
  Hotel,
  Mic,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Compass,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

export default function PlannerForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    travelers: 1,
    age_group: "Adults (18-35)",
    destination: "",
    travel_dates: "",
    budget: "Medium",
    interests: [] as string[],
    transport_pref: "Flight",
    stay_pref: "Hotel",
  });
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const interestOptions = ["Adventure", "Religious", "Nature", "Nightlife", "Food", "Art & Culture", "Photography", "Shopping"];

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.destination) {
      alert("Please enter a destination to architect your trip!");
      return;
    }
    
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/plan-trip", formData);
      localStorage.setItem("tripResult", JSON.stringify(res.data.data));
      router.push("/result");
    } catch (err) {
      console.error(err);
      alert("Failed to generate trip. Make sure the backend is running.");
      setLoading(false);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setFormData(prev => ({ ...prev, destination: "Bali, Indonesia", interests: ["Adventure", "Nature", "Food"] }));
        setIsRecording(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 pt-36 pb-12 lg:pl-72 lg:pr-12 selection:bg-indigo-500/30 overflow-x-hidden relative">
      
      {/* Background Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] right-[-5%] w-[600px] h-[600px] bg-indigo-600/5 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[5%] left-[20%] w-[500px] h-[500px] bg-fuchsia-600/5 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        
        {/* Header Section */}
        <section className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2.5 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-indigo-400 font-bold tracking-wider text-xs uppercase">Generation Engine v2.4</span>
          </motion.div>
          
          <div className="space-y-2">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]"
            >
              Let's design your <br/> 
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-fuchsia-400 to-indigo-400 animate-gradient-x">
                perfect escape.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed"
            >
              Tell us about your preferences and our AI will craft a high-fidelity itinerary tailored specifically to your vibe.
            </motion.p>
          </div>
        </section>

        {/* Input Cards Container */}
        <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Destination & Name Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white/3 border-white/5 backdrop-blur-3xl p-8 rounded-[2.5rem] hover:border-white/10 transition-all duration-500 shadow-2xl h-full flex flex-col justify-between">
              <CardContent className="p-0 space-y-10">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                        <Globe className="w-5 h-5 text-blue-400" />
                      </div>
                      <Label className="text-white font-black text-xl tracking-tight">Trip Name</Label>
                    </div>
                    <div className="relative group">
                      <Input
                        required
                        className="bg-slate-900/50 border-white/10 h-16 pl-12 rounded-2xl focus-visible:ring-blue-500 text-white text-lg font-medium transition-all"
                        placeholder="e.g. Summer Break 2026"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                        <MapPin className="w-5 h-5 text-indigo-400" />
                      </div>
                      <Label className="text-white font-black text-xl tracking-tight">Destination</Label>
                    </div>
                  <div className="relative">
                    <Input
                      required
                      className="bg-slate-900/50 border-white/10 h-16 pl-14 rounded-2xl focus-visible:ring-indigo-500 text-white text-lg font-medium transition-all"
                      placeholder="e.g. Kyoto, Japan"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    />
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500" />
                    <button
                      type="button"
                      onClick={toggleRecording}
                      className={cn(
                        "absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-xl transition-all",
                        isRecording ? "bg-rose-500/20 text-rose-500 animate-pulse" : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                      )}
                    >
                      <Mic className="w-6 h-6" />
                    </button>
                    <AnimatePresence>
                      {isRecording && (
                        <motion.p 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute -bottom-6 left-1 text-xs text-rose-400 font-bold tracking-wider uppercase animate-pulse"
                        >
                          Listening to you...
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                    </div>
                    <Label className="text-white font-black text-xl tracking-tight">Timeline & Crowd</Label>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative group">
                      <Input
                        required
                        type="number"
                        min={1}
                        className="bg-slate-900/50 border-white/10 h-14 pl-12 rounded-xl focus-visible:ring-indigo-500 text-white font-bold"
                        value={formData.travelers}
                        onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) || 1 })}
                      />
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                    </div>
                    <div className="relative group">
                      <Input
                        required
                        placeholder="Oct 12 - 18"
                        className="bg-slate-900/50 border-white/10 h-14 pl-12 rounded-xl focus-visible:ring-indigo-500 text-white font-bold"
                        value={formData.travel_dates}
                        onChange={(e) => setFormData({ ...formData, travel_dates: e.target.value })}
                      />
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Preferences Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white/3 border-white/5 backdrop-blur-3xl p-8 rounded-[2.5rem] hover:border-white/10 transition-all duration-500 shadow-2xl h-full">
              <CardContent className="p-0 space-y-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-fuchsia-500/20 flex items-center justify-center border border-fuchsia-500/30">
                      <CreditCard className="w-5 h-5 text-fuchsia-400" />
                    </div>
                    <Label className="text-white font-black text-xl tracking-tight">Budget & Style</Label>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] pl-1">Plan Category</Label>
                      <Select onValueChange={(v) => setFormData({...formData, budget: v ?? "Medium"})} value={formData.budget}>
                        <SelectTrigger className="bg-slate-900/50 border-white/10 h-14 rounded-2xl text-white font-bold text-base focus:ring-2 focus:ring-indigo-500 transition-all">
                          <SelectValue placeholder="Budget Style" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-white/10 text-white rounded-2xl overflow-hidden backdrop-blur-2xl">
                          <SelectItem value="Economy" className="hover:bg-indigo-600 focus:bg-indigo-600 transition-colors py-3">Economy / Backpacker</SelectItem>
                          <SelectItem value="Medium" className="hover:bg-indigo-600 focus:bg-indigo-600 transition-colors py-3">Standard / Comfortable</SelectItem>
                          <SelectItem value="Luxury" className="hover:bg-indigo-600 focus:bg-indigo-600 transition-colors py-3">Luxury / Premium</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] pl-1">Stay</Label>
                        <Select onValueChange={(v) => setFormData({...formData, stay_pref: v ?? "Hotel"})} value={formData.stay_pref}>
                          <SelectTrigger className="bg-slate-900/50 border-white/10 h-14 rounded-xl text-white font-bold transition-all">
                            <SelectValue placeholder="Stay" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900 border-white/10 text-white rounded-xl backdrop-blur-2xl">
                            <SelectItem value="Hotel">Hotels</SelectItem>
                            <SelectItem value="Airbnb">Rentals</SelectItem>
                            <SelectItem value="Hostel">Hostels</SelectItem>
                            <SelectItem value="Resort">Resorts</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] pl-1">Route</Label>
                        <Select onValueChange={(v) => setFormData({...formData, transport_pref: v ?? "Flight"})} value={formData.transport_pref}>
                          <SelectTrigger className="bg-slate-900/50 border-white/10 h-14 rounded-xl text-white font-bold transition-all">
                            <SelectValue placeholder="Transport" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900 border-white/10 text-white rounded-xl backdrop-blur-2xl">
                            <SelectItem value="Flight">Flights</SelectItem>
                            <SelectItem value="Train">Trains</SelectItem>
                            <SelectItem value="Car">Car Rental</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Interests Section - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="md:col-span-2"
          >
            <Card className="bg-white/3 border-white/5 backdrop-blur-3xl p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-indigo-500 via-fuchsia-500 to-indigo-500" />
               <CardContent className="p-0 space-y-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
                      <Compass className="w-5 h-5 text-orange-400" />
                    </div>
                    <Label className="text-white font-black text-2xl tracking-tight">What are you into?</Label>
                  </div>
                  <p className="text-slate-500 text-sm pl-12 font-medium">Select multiple tags to refine the AI's algorithm.</p>
                </div>
                
                <div className="flex flex-wrap gap-4 pl-0 md:pl-12">
                  {interestOptions.map((interest) => (
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      key={interest}
                      onClick={() => handleInterestToggle(interest)}
                      className={cn(
                        "px-8 py-3.5 rounded-[1.25rem] border-2 text-sm font-black transition-all duration-500 uppercase tracking-widest",
                        formData.interests.includes(interest)
                          ? "bg-indigo-600 border-indigo-400 text-white shadow-xl shadow-indigo-500/40"
                          : "bg-slate-900/50 border-white/5 text-slate-500 hover:border-white/20 hover:text-slate-200 hover:bg-slate-800"
                      )}
                    >
                      {interest}
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="md:col-span-2 pt-12 flex flex-col items-center gap-6"
          >
             <Button
                type="submit"
                disabled={loading}
                className="group relative h-20 px-16 text-2xl font-black rounded-[2rem] bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_20px_50px_rgba(79,70,229,0.3)] transition-all duration-500 disabled:opacity-50 overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                {loading ? (
                  <span className="flex items-center gap-4">
                    <div className="w-6 h-6 border-[3px] border-white/20 border-t-white rounded-full animate-spin" />
                    Neural Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-4">
                    Architect My Trip
                    <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform duration-500" />
                  </span>
                )}
             </Button>
             <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em]">Powered by GPT-4o Generation Engine</p>
          </motion.div>
        </form>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
