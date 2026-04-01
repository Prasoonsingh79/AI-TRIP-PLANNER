"use client";

import { useState, useMemo, useEffect } from 'react';
import Map, { Marker, Popup, Source, Layer } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { 
  ArrowLeft, 
  MapPin, 
  Navigation, 
  Navigation2, 
  Layers, 
  Settings,
  Hotel,
  Utensils,
  Camera,
  Maximize,
  Compass,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Use a placeholder public token or instruct user to add their own.
// Mapbox access token from environment variable
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoidXNlcl9wbGFjZWhvbGRlciIsImEiOiJjbGo3MjFqbGwwMHFkM2hwNTh4YmNmbXB5In0.m5NlOz4C21_jWzD1hZ-Lhg';

export default function MapPage() {
  const [popupInfo, setPopupInfo] = useState<any>(null);
  const [viewState, setViewState] = useState({
     longitude: 139.6503,
     latitude: 35.6762,
     zoom: 12,
     pitch: 45,
     bearing: -20
  });

  const mockLocations = useMemo(() => [
    { name: 'Shibuya Crossing', lat: 35.6595, lng: 139.7006, type: 'Attraction', img: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&q=80' },
    { name: 'Tokyo Tower', lat: 35.6586, lng: 139.7454, type: 'Attraction' },
    { name: 'Park Hyatt Tokyo', lat: 35.6853, lng: 139.6914, type: 'Hotel' },
    { name: 'Ichiran Ramen', lat: 35.6701, lng: 139.7024, type: 'Restaurant' }
  ], []);

  // Route geojson mock
  const routeData: any = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: [
        [139.6914, 35.6853],
        [139.7006, 35.6595],
        [139.7024, 35.6701],
        [139.7454, 35.6586],
      ]
    }
  };

  return (
    <div className="relative w-full h-screen bg-slate-950 lg:pl-64">
      {MAPBOX_TOKEN.includes('placeholder') && (
        <div className="absolute inset-0 z-100 flex items-center justify-center bg-slate-950/90 backdrop-blur-md">
          <div className="max-w-md p-8 bg-slate-900 border border-white/10 rounded-[32px] text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto border border-amber-500/20">
              <Compass className="w-8 h-8 text-amber-500 animate-pulse" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white px-2">Mapbox Token Missing</h2>
              <p className="text-slate-400 text-sm leading-relaxed px-4">
                You haven't configured a valid Mapbox access token. Please add <code>NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN</code> to your <code>frontend/.env.local</code> file.
              </p>
            </div>
            <a href="https://account.mapbox.com/" target="_blank" rel="noopener noreferrer" className="block">
              <Button className="w-full h-14 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-xl shadow-indigo-600/20">
                Get a Token
              </Button>
            </a>
          </div>
        </div>
      )}
      
      {/* Floating Control Panel */}
      <div className="absolute top-6 left-6 right-6 lg:left-8 lg:right-8 z-30 pointer-events-none">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="bg-slate-950/80 backdrop-blur-2xl p-4 lg:p-6 rounded-[32px] border border-white/10 shadow-2xl pointer-events-auto flex items-center gap-6"
           >
              <div className="flex flex-col">
                <h1 className="text-xl lg:text-3xl font-black text-white tracking-tighter flex items-center gap-3">
                   Route Vision <Navigation2 className="w-6 h-6 text-indigo-400 rotate-90" />
                </h1>
                <p className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-500">Live Optimization Active</p>
              </div>
              <div className="h-10 w-px bg-white/10 hidden sm:block" />
              <Link href="/result">
                <Button className="h-12 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold gap-2 shadow-xl shadow-indigo-600/20 group transition-all">
                   <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                   Plan View
                </Button>
              </Link>
           </motion.div>

           <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-950/80 backdrop-blur-2xl p-2 rounded-3xl border border-white/10 shadow-xl pointer-events-auto flex gap-1"
           >
              <Button variant="ghost" size="icon" className="w-12 h-12 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 cursor-default"><Layers className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon" className="w-12 h-12 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 cursor-default"><Maximize className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon" className="w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-600/20 cursor-default"><Settings className="w-5 h-5" /></Button>
           </motion.div>
        </div>
      </div>

      {/* Floating Itinerary Sidebar over Map (Desktop only) */}
      <motion.div 
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         className="absolute left-8 bottom-8 top-40 w-80 z-20 pointer-events-none hidden xl:block"
      >
        <div className="h-full bg-slate-950/60 backdrop-blur-3xl rounded-[40px] border border-white/10 p-6 flex flex-col pointer-events-auto space-y-6">
           <div className="space-y-1">
             <h3 className="text-lg font-black text-white flex items-center gap-3">
                <Compass className="w-6 h-6 text-fuchsia-400" /> Waypoints
             </h3>
             <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest pl-9">Optimized Sequence</p>
           </div>

           <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar pr-1">
              {mockLocations.map((loc, i) => (
                <div key={i} className="group relative pl-10 cursor-pointer" onClick={() => { setPopupInfo(loc); setViewState({...viewState, longitude: loc.lng, latitude: loc.lat, zoom: 15}) }}>
                   <div className="absolute left-2 top-2 h-full w-[2px] bg-white/5 group-last:bg-transparent" />
                   <div className="absolute left-0 top-0 w-4 h-4 rounded-full border-2 border-slate-900 bg-indigo-500 group-hover:scale-125 transition-transform ring-4 ring-indigo-500/10" />
                   <div className="bg-white/3 hover:bg-white/8 p-3 rounded-2xl border border-white/5 transition-all">
                      <p className="text-xs font-black text-white mb-0.5">{loc.name}</p>
                      <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">{loc.type}</p>
                   </div>
                </div>
              ))}
           </div>

           <Button className="w-full h-14 rounded-2xl bg-white/5 hover:bg-white/10 text-indigo-400 font-black text-xs uppercase tracking-widest gap-3 transition-all border border-white/5">
              Recalculate Route <ArrowRight className="w-4 h-4" />
           </Button>
        </div>
      </motion.div>

      {/* Map Engine */}
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: '100%', height: '100%' }}
        antialias={true}
      >
        <Source id="route-source" type="geojson" data={routeData}>
          <Layer
            id="route-layer"
            type="line"
            paint={{
              'line-color': '#6366f1',
              'line-width': 4,
              'line-opacity': 0.6,
              'line-dasharray': [2, 1]
            }}
          />
        </Source>

        {mockLocations.map((loc, idx) => (
          <Marker
            key={idx}
            longitude={loc.lng}
            latitude={loc.lat}
            anchor="bottom"
            onClick={e => {
              e.originalEvent.stopPropagation();
              setPopupInfo(loc);
            }}
          >
            <motion.div 
               whileHover={{ scale: 1.2 }}
               className={`w-10 h-10 rounded-2xl border-4 border-slate-900 shadow-2xl flex items-center justify-center cursor-pointer transition-all ${
              loc.type === 'Hotel' ? 'bg-fuchsia-600 ring-4 ring-fuchsia-500/20' :
              loc.type === 'Restaurant' ? 'bg-orange-500 ring-4 ring-orange-500/20' : 'bg-indigo-600 ring-4 ring-indigo-500/20'
            }`}>
              {loc.type === 'Hotel' ? <Hotel className="w-4 h-4 text-white" /> : loc.type === 'Restaurant' ? <Utensils className="w-4 h-4 text-white" /> : <Navigation className="w-4 h-4 text-white" />}
            </motion.div>
          </Marker>
        ))}

        <AnimatePresence>
          {popupInfo && (
            <Popup
              anchor="top"
              longitude={popupInfo.lng}
              latitude={popupInfo.lat}
              onClose={() => setPopupInfo(null)}
              className="rounded-3xl overflow-hidden glass-popup"
              closeButton={false}
              maxWidth="240px"
              offset={20}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-slate-900 border border-white/10 rounded-[28px] overflow-hidden p-0 shadow-2xl"
              >
                 {popupInfo.img && <img src={popupInfo.img} className="w-full h-24 object-cover opacity-80" alt="" />}
                 <div className="p-4 space-y-1">
                   <h3 className="font-black text-white text-base tracking-tight">{popupInfo.name}</h3>
                   <div className="flex items-center gap-2">
                       <Badge variant="outline" className="text-[9px] uppercase font-black border-indigo-500/30 text-indigo-400 h-5 px-1.5">{popupInfo.type}</Badge>
                       <span className="text-[10px] text-slate-500 font-bold">12 min away</span>
                   </div>
                   <Button variant="link" className="text-indigo-400 font-bold text-[10px] h-auto p-0 mt-2 uppercase tracking-widest flex items-center gap-1 group">
                      Book Now <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                   </Button>
                 </div>
              </motion.div>
            </Popup>
          )}
        </AnimatePresence>
      </Map>

      <style jsx global>{`
        .mapboxgl-popup-content {
          background: transparent !important;
          padding: 0 !important;
          box-shadow: none !important;
        }
        .mapboxgl-popup-tip {
             display: none !important;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
