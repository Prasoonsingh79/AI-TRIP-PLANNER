"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  History, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Trash2, 
  Search,
  RefreshCcw,
  Sparkles,
  Plane
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function HistoryPage() {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8000/trips", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTrips(response.data.reverse()); // Newest first
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const viewTrip = (itineraryJson: string) => {
    localStorage.setItem("tripResult", itineraryJson);
    router.push("/result");
  };

  const filteredTrips = trips.filter(t => 
    t.destination.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6 lg:pl-72 selection:bg-indigo-500/10 selection:text-indigo-900 overflow-x-hidden relative">
      
      {/* Background Orbs - Subtler for Light Theme */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] right-[-5%] w-[600px] h-[600px] bg-indigo-500/5 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[5%] left-[20%] w-[500px] h-[500px] bg-fuchsia-500/5 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      <div className="max-w-5xl mx-auto space-y-10 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-8 border-b border-slate-200">
          <div className="space-y-4">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm"
            >
              <History className="w-4 h-4" /> Past Adventures
            </motion.div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-none">Your <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 via-indigo-400 to-indigo-600">Travel Legacy</span></h1>
            <p className="text-slate-500 font-medium max-w-xl">Relive your past itineraries and explore world-class recommendations from your previous neural-generated trips.</p>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input 
               placeholder="Search destinations..." 
               className="h-14 pl-12 bg-white border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-indigo-600 font-medium shadow-sm transition-all"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="h-64 bg-white rounded-[40px] border border-slate-100" />
            ))}
          </div>
        )}

        {/* Trips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredTrips.map((trip, i) => {
               const data = JSON.parse(trip.itinerary_json);
               return (
                 <motion.div
                   key={trip.id}
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: i * 0.05 }}
                   layout
                 >
                   <Card className="bg-white border-slate-200 p-6 rounded-[40px] hover:border-indigo-600/30 transition-all group relative overflow-hidden h-full flex flex-col justify-between shadow-xl shadow-slate-200/50">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full translate-x-16 -translate-y-16 group-hover:bg-indigo-500/10 transition-colors" />
                     
                     <div className="space-y-6 relative z-10">
                        <div className="flex justify-between items-start">
                           <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100 shadow-sm">
                              <Plane className="w-6 h-6" />
                           </div>
                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                              <Calendar className="w-3 h-3 text-fuchsia-600" />
                              {new Date(trip.created_at).toLocaleDateString()}
                           </p>
                        </div>

                        <div className="space-y-2">
                           <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors uppercase">{trip.destination}</h3>
                           <p className="text-slate-500 text-sm line-clamp-2 font-medium leading-relaxed italic">"{data.summary || "Archived Journey"}"</p>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                           {data.recommendations?.hotels?.slice(0, 1).map((h: any) => (
                             <div key={h.name} className="px-3 py-1 bg-slate-50 rounded-full border border-slate-100 text-[9px] uppercase font-black text-slate-500 tracking-wider">
                                {h.name}
                             </div>
                           ))}
                           <div className="px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100 text-[9px] uppercase font-black text-indigo-600 tracking-wider">
                              {data.day_wise?.length || 0} Days
                           </div>
                        </div>
                     </div>

                     <div className="pt-10 relative z-10">
                        <Button 
                          onClick={() => viewTrip(trip.itinerary_json)}
                          className="w-full h-12 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white font-black uppercase text-[10px] tracking-[0.2em] gap-3 transition-all border-none shadow-lg shadow-slate-200"
                        >
                           Re-Explore Journey <ArrowRight className="w-4 h-4" />
                        </Button>
                     </div>
                   </Card>
                 </motion.div>
               );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {!loading && filteredTrips.length === 0 && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="py-32 flex flex-col items-center text-center space-y-6 bg-white rounded-[60px] border border-slate-200 border-dashed"
           >
              <div className="w-20 h-20 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center">
                 <RefreshCcw className="w-10 h-10 text-slate-300 animate-spin-slow" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest leading-none">No past trips found</h3>
                <p className="text-slate-500 text-sm max-w-sm px-6 font-medium">Start your first adventure using our AI Planner to build your travel history.</p>
              </div>
              <Button onClick={() => router.push("/planner")} className="bg-indigo-600 hover:bg-slate-900 text-white rounded-2xl h-14 px-10 font-black uppercase tracking-widest text-[10px] gap-2 shadow-2xl shadow-indigo-200 border-none transition-all">
                 Plan New Trip <Sparkles className="w-4 h-4" />
              </Button>
           </motion.div>
        )}
      </div>
    </div>
  );
}
