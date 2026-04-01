"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

export default function ChatAssistant() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([
    { role: "assistant", text: "Hello! I am your AI Travel Assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/chat", { message: userMessage.text });
      setMessages((prev) => [...prev, { role: "assistant", text: res.data.response }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: "assistant", text: "Sorry, I am having trouble connecting to the server." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-3xl flex-1 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        <div className="p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            AI Travel Assistant
          </h1>
          <p className="text-sm text-slate-400">Ask me anything about your next trip</p>
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white"
                    : "bg-slate-800 text-slate-200 border border-slate-700"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl px-5 py-3 bg-slate-800 text-slate-400 border border-slate-700 animate-pulse">
                Thinking...
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-900 border-t border-slate-800 flex gap-3 items-center">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="E.g., What are the best beaches in Goa?"
            className="flex-1 bg-slate-950 border-slate-700 focus-visible:ring-blue-500 rounded-full h-12 px-6"
          />
          <Button
            onClick={sendMessage}
            disabled={loading}
            className="rounded-full w-12 h-12 p-0 bg-blue-600 hover:bg-blue-500 shrink-0"
          >
            ✈️
          </Button>
        </div>
      </div>
    </div>
  );
}
