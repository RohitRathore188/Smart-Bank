import React, { useState } from "react";
import { CustomerDashboardLayout } from "../../components/layout/CustomerDashboardLayout";
import { PageTransition } from "../../components/animations/PageTransition";
import { FloatingCard } from "../../components/animations/MicroInteractions";

export const AIAssistantPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"CHAT" | "HEALTH" | "EXPENSE" | "INVEST" | "FRAUD">("CHAT");
  const [messages, setMessages] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    { sender: "ai", text: "Namaste Rohit! I am SmartBank Gemini AI, your autonomous financial co-pilot. How can I assist your wealth today?" }
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [isListening, setIsListening] = useState(false);

  // Health Score Component Metrics
  const healthScore = 88; // /100

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userText = inputQuery;
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputQuery("");

    setTimeout(() => {
      let aiReply = "Based on your SmartBank portfolio, your ₹15,00,000 Tax-Saver FD is generating ₹11,775 monthly interest. You can optimize your 80C limit further by allocating ₹25,000 to Sovereign Gold Bonds.";
      if (userText.toLowerCase().includes("loan")) {
        aiReply = "Your credit rating of 785 qualifies you for a pre-approved ₹15,00,000 Personal Loan at 10.5% p.a. or Home Loan top-up at 8.4% p.a.";
      } else if (userText.toLowerCase().includes("fraud")) {
        aiReply = "All recent transactions on RuPay Card 6521 have been verified with a low anomaly risk score of 4/100.";
      }
      setMessages((prev) => [...prev, { sender: "ai", text: aiReply }]);
    }, 1000);
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setInputQuery("What is my current Tax-Saver FD yield?");
        setIsListening(false);
      }, 2500);
    }
  };

  return (
    <CustomerDashboardLayout>
      <PageTransition>
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl animate-spin">🤖</span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Gemini AI Financial Intelligence Hub
                </h1>
              </div>
              <p className="text-sm text-slate-400">Autonomous Banking Co-Pilot • Voice Banking, Fraud Radar & Financial Health Score</p>
            </div>

            <button
              onClick={toggleVoice}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all shadow-lg ${
                isListening
                  ? "bg-red-500 text-white animate-pulse"
                  : "bg-gradient-to-r from-emerald-500 to-cyan-600 text-white"
              }`}
            >
              <span>{isListening ? "🎙️ Listening..." : "🎙️ Voice Banking Input"}</span>
            </button>
          </div>

          {/* Feature Navigation Tabs */}
          <div className="flex space-x-2 border-b border-white/10 pb-3 overflow-x-auto">
            {[
              { id: "CHAT", label: "🤖 AI Assistant & Voice" },
              { id: "HEALTH", label: "📊 Health Score (88/100)" },
              { id: "EXPENSE", label: "📈 Expense & Budget Planner" },
              { id: "INVEST", label: "💡 Investment & Loan Advisor" },
              { id: "FRAUD", label: "🚨 Fraud & Line Explainer" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Conversational AI & Voice */}
          {activeTab === "CHAT" && (
            <FloatingCard className="p-6 space-y-4 h-[550px] flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xl p-3.5 rounded-2xl text-xs space-y-1 ${
                        m.sender === "user"
                          ? "bg-gradient-to-r from-emerald-500 to-cyan-600 text-white"
                          : "bg-white/10 text-slate-200 border border-white/10"
                      }`}
                    >
                      <div className="font-bold text-[10px] opacity-75 uppercase">
                        {m.sender === "user" ? "You" : "Gemini AI Co-Pilot"}
                      </div>
                      <p>{m.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSend} className="flex space-x-2 pt-2 border-t border-white/10">
                <input
                  type="text"
                  placeholder="Ask Gemini AI (e.g. How much can I save on tax under 80C?)..."
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  className="flex-1 p-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-xl font-bold text-xs text-white"
                >
                  Send
                </button>
              </form>
            </FloatingCard>
          )}

          {/* Tab 2: Financial Health Score */}
          {activeTab === "HEALTH" && (
            <FloatingCard className="p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <h3 className="font-bold text-white text-base">Financial Health Score Evaluation</h3>
                <span className="text-xs font-bold text-emerald-400 font-mono">Tier 1 Excellent</span>
              </div>

              <div className="text-center py-6">
                <div className="text-6xl font-black text-emerald-400 font-mono tracking-tight">{healthScore} <span className="text-lg text-slate-400">/ 100</span></div>
                <p className="text-xs text-slate-300 mt-2">Your debt-to-income ratio is 18%. Excellent emergency vault buffer of 6 months.</p>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-slate-400 text-[10px]">Savings Ratio</div>
                  <div className="text-emerald-400 font-bold text-sm">34% (Target: &gt;30%)</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-slate-400 text-[10px]">Credit Score</div>
                  <div className="text-cyan-300 font-bold text-sm">785 CIBIL</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-slate-400 text-[10px]">Tax Efficiency</div>
                  <div className="text-amber-300 font-bold text-sm">92% (80C Maxed)</div>
                </div>
              </div>
            </FloatingCard>
          )}

          {/* Tab 3: Expense & Budget Planner */}
          {activeTab === "EXPENSE" && (
            <FloatingCard className="p-6 space-y-4">
              <h3 className="font-bold text-white text-base">Category Expense Analysis & 50/30/20 Budget Planner</h3>
              <div className="space-y-3 font-mono text-xs">
                {[
                  { cat: "Housing & Rent", spent: "₹45,000", limit: "₹50,000", pct: 90, color: "bg-emerald-400" },
                  { cat: "Food & Dining (Zomato)", spent: "₹14,200", limit: "₹20,000", pct: 71, color: "bg-cyan-400" },
                  { cat: "Investment SIPs", spent: "₹35,000", limit: "₹35,000", pct: 100, color: "bg-amber-400" },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/5 space-y-1">
                    <div className="flex justify-between text-white font-bold">
                      <span>{item.cat}</span>
                      <span>{item.spent} / {item.limit}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </FloatingCard>
          )}

          {/* Tab 4: Investment Advisor */}
          {activeTab === "INVEST" && (
            <FloatingCard className="p-6 space-y-4">
              <h3 className="font-bold text-white text-base">Gemini Investment & Yield Suggestions</h3>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
                <div className="font-bold text-emerald-300">💡 Recommended Action: Allocate ₹50,000 to 7.85% Tax-Saver FD</div>
                <p className="text-slate-400">Rebalancing your uninvested ₹9,24,000 cash balance into a 5-Year Tax Saver FD yields an additional ₹3,925 per month in risk-free interest.</p>
              </div>
            </FloatingCard>
          )}

          {/* Tab 5: Fraud & Transaction Explainer */}
          {activeTab === "FRAUD" && (
            <FloatingCard className="p-6 space-y-4">
              <h3 className="font-bold text-white text-base">Transaction Anomaly & Plain-English Explainer</h3>
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-white/5 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white">POS/APPLE.COM/CUPERTINO</div>
                    <div className="text-[10px] text-slate-400">AI Explanation: Apple Store Online digital hardware purchase.</div>
                  </div>
                  <span className="text-emerald-400 font-bold">Risk: 2/100 (Safe)</span>
                </div>
              </div>
            </FloatingCard>
          )}
        </div>
      </PageTransition>
    </CustomerDashboardLayout>
  );
};
