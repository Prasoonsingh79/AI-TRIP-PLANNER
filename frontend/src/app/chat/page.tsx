"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Mic, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Plane,
  X,
  Bot,
  User as UserIcon,
  Eraser,
  MessageSquare,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function ChatAssistant() {
  const [messages, setMessages] = useState<{ role: string; text: string; time: string }[]>([
    { role: "assistant", text: "Hello! I am your AI Travel Assistant. How can I help you today?", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { text: "Best time to visit Bali?", icon: "☀️" },
    { text: "Paris on a budget?", icon: "🗼" },
    { text: "3-day Tokyo plan", icon: "🍱" },
    { text: "Top beaches in Goa", icon: "🏖️" }
  ];

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async (textToSend: string = input) => {
    if (!textToSend.trim()) return;

    const userMessage = { 
      role: "user", 
      text: textToSend, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    setMessages((prev) => [...prev, userMessage]);
    if (textToSend === input) setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/chat", { message: userMessage.text });
      setMessages((prev) => [...prev, { 
        role: "assistant", 
        text: res.data.response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { 
        role: "assistant", 
        text: "I am having some connection issues, but I'll be back shortly to guide you!",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex lg:pl-64">
      {/* Background Decorative Blur */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-fuchsia-600/10 blur-[100px] rounded-full" />
      </div>

      <div className="flex-1 flex flex-col h-screen max-h-screen relative overflow-hidden px-4 md:px-8">
        
        {/* Chat Header */}
        <header className="h-20 flex items-center justify-between border-b border-white/5 shrink-0 z-10 backdrop-blur-sm bg-slate-950/20">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight flex items-center gap-2">
                Travel Advisor <Sparkles className="w-4 h-4 text-indigo-400" />
              </h2>
              <p className="text-slate-500 text-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Always Ready
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setMessages([messages[0]])}
                className="text-slate-400 hover:text-white hover:bg-white/5 rounded-xl cursor-default"
            >
              <Eraser className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Chat Content */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto pt-8 pb-32 space-y-8 scroll-smooth"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {messages.map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={cn(
                  "flex items-start gap-4",
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center shrink-0 border",
                  msg.role === "user" 
                    ? "bg-slate-900 border-white/5" 
                    : "bg-indigo-600/10 border-indigo-500/10"
                )}>
                  {msg.role === "user" ? <UserIcon className="w-4 h-4 text-slate-400" /> : <Bot className="w-4 h-4 text-indigo-400" />}
                </div>

                <div className={cn(
                  "max-w-[75%] space-y-1.5 px-4 lg:px-0",
                  msg.role === "user" ? "text-right lg:items-end" : "text-left lg:items-start"
                )}>
                  <div className={cn(
                    "px-5 py-3.5 rounded-2xl text-sm lg:text-base leading-relaxed wrap-break-word",
                    msg.role === "user" 
                      ? "bg-indigo-600 text-white rounded-tr-none shadow-xl shadow-indigo-600/10" 
                      : "bg-white/5 text-slate-200 border border-white/5 rounded-tl-none"
                  )}>
                    {msg.text}
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{msg.time}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <div className="flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="w-9 h-9 rounded-full bg-indigo-600/10 border border-indigo-500/10 flex items-center justify-center">
                 <Bot className="w-4 h-4 text-indigo-400 animate-pulse" />
              </div>
              <div className="space-y-2 mt-2">
                 <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
                 </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Footer & Input */}
        <div className="absolute bottom-6 left-4 right-4 md:left-8 md:right-8 z-20">
          <div className="max-w-3xl mx-auto space-y-4">
             {/* Suggestions */}
             <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar lg:justify-center">
                {quickPrompts.map((p, i) => (
                  <button 
                    key={i} 
                    onClick={() => sendMessage(p.text)}
                    className="flex items-center gap-2 whitespace-nowrap bg-white/5 hover:bg-white/10 border border-white/5 px-3.5 py-1.5 rounded-full text-xs text-slate-300 transition-all hover:border-indigo-500/50"
                  >
                    <span>{p.icon}</span> {p.text}
                  </button>
                ))}
             </div>

             {/* Input Bar */}
             <div className="relative group">
                <div className="absolute -inset-0.5 bg-linear-to-r from-indigo-500/30 to-fuchsia-500/30 rounded-2xl blur-md group-focus-within:opacity-100 opacity-0 transition-opacity" />
                <div className="relative bg-slate-900 border border-white/5 rounded-2xl flex items-center p-1.5 pr-2 focus-within:border-indigo-500/50 transition-colors">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
                    placeholder="Ask about destination, budget tips, or hidden gems..."
                    className="flex-1 bg-transparent border-0 focus-visible:ring-0 text-white placeholder:text-slate-500 h-10 lg:h-12 px-4 shadow-none"
                  />
                  <div className="flex items-center gap-1.5">
                    <button className="p-2.5 text-slate-500 hover:text-indigo-400 transition-colors rounded-lg bg-white/5 hover:bg-indigo-500/10 cursor-default">
                      <Mic className="w-5 h-5" />
                    </button>
                    <Button 
                      onClick={() => sendMessage()}
                      disabled={!input.trim() || loading}
                      className="rounded-xl h-10 lg:h-12 w-10 lg:w-12 bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg p-0"
                    >
                      <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6" />
                    </Button>
                  </div>
                </div>
             </div>
             <p className="text-[10px] text-center text-slate-600 font-medium">AI generated answers may contain inaccuracies. Verify important info.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper fun for Tailwind class names
function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
