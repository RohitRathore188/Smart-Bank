import React, { useState } from "react";
import { CustomerDashboardLayout } from "../../components/layout/CustomerDashboardLayout";

export const AIAssistantPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"CHAT" | "LOAN" | "EXPENSE" | "INVEST" | "FRAUD">("CHAT");
  
  // Chat State
  const [chatMessages, setChatMessages] = useState([
    { sender: "gemini", text: "Hello! I am your SmartBank Gemini Financial Assistant. Ask me to calculate loan EMIs, analyze your spending trends, or suggest high-yield investment routes." }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // EMI Calculator State
  const [loanAmount, setLoanAmount] = useState("20000");
  const [loanTerm, setLoanTerm] = useState(24);
  const [loanApr, setLoanApr] = useState("5.4");

  // Fraud Evaluator State
  const [testAmount, setTestAmount] = useState("12500");
  const [testMerchant, setTestMerchant] = useState("Unverified Overseas FX");
  const [fraudResult, setFraudResult] = useState<any>(null);

  const calculateEMI = () => {
    const p = parseFloat(loanAmount);
    const r = parseFloat(loanApr) / 100 / 12;
    const n = loanTerm;
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return isNaN(emi) ? "0.00" : emi.toFixed(2);
  };

  const handleChatSend = (textOverride?: string) => {
    const prompt = textOverride || chatInput;
    if (!prompt.trim()) return;

    const updated = [...chatMessages, { sender: "user", text: prompt }];
    setChatMessages(updated);
    if (!textOverride) setChatInput("");

    setTimeout(() => {
      let botReply = "I have analyzed your request against your double-entry ledger context.";
      const lower = prompt.toLowerCase();

      if (lower.includes("loan") || lower.includes("emi")) {
        botReply = `Based on your credit score of 785/850, a $${loanAmount} loan over ${loanTerm} months at ${loanApr}% APR yields an estimated EMI of $${calculateEMI()}/month.`;
      } else if (lower.includes("expense") || lower.includes("budget")) {
        botReply = "Your total expenses this month are $2,180.50 (14% below budget). Cloud hosting ($342.50) is your largest operational line item.";
      } else if (lower.includes("invest") || lower.includes("yield")) {
        botReply = "I suggest allocating $5,000 to your 5.20% High-Yield Vault to generate $260.00 in passive annual interest.";
      }

      setChatMessages([...updated, { sender: "gemini", text: botReply }]);
      
      // Voice Assistant Synthesis Simulation
      if ("speechSynthesis" in window) {
        setIsSpeaking(true);
        const utterance = new SpeechSynthesisUtterance(botReply);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      }
    }, 800);
  };

  const toggleVoiceListening = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        handleChatSend("Analyze my monthly dining expenses");
      }, 3000);
    }
  };

  const handleEvaluateFraud = () => {
    const amt = parseFloat(testAmount);
    const score = amt > 10000 ? 88 : 12;
    const status = score > 50 ? "HIGH_RISK_HOLD" : "LOW_RISK_CLEARED";
    setFraudResult({
      score,
      status,
      recommendation: score > 50 ? "Requires 2FA & Manager Approval" : "Instant Authorization Allowed"
    });
  };

  return (
    <CustomerDashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white flex items-center space-x-3">
              <span>SmartBank AI Intelligence Hub</span>
              <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                Gemini 1.5 Pro
              </span>
            </h1>
            <p className="text-sm text-slate-400">Autonomous advisor, EMI calculator, expense planning, and fraud shield</p>
          </div>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="flex space-x-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 overflow-x-auto">
          {[
            { id: "CHAT", label: "🤖 AI Assistant & Voice", icon: "💬" },
            { id: "LOAN", label: "💎 Loan Advisor & EMI", icon: "📊" },
            { id: "EXPENSE", label: "📈 Expense & Budget Planner", icon: "🎯" },
            { id: "INVEST", label: "💡 Investment Suggestions", icon: "💰" },
            { id: "FRAUD", label: "🛡️ Fraud Risk Evaluator", icon: "🚨" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: AI Assistant & Voice Interface */}
        {activeTab === "CHAT" && (
          <div className="p-6 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 space-y-4 h-[520px] flex flex-col">
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-bold text-white uppercase tracking-wider">Conversational Engine</span>
              </div>

              {/* Voice Status Indicator */}
              <div className="flex items-center space-x-2">
                {isSpeaking && <span className="text-xs text-cyan-400 font-mono animate-pulse">🔊 Gemini Speaking...</span>}
                {isListening && <span className="text-xs text-red-400 font-mono animate-ping">🎙️ Listening...</span>}
                <button
                  onClick={toggleVoiceListening}
                  className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                    isListening ? "bg-red-500/20 text-red-300 border-red-500/30" : "bg-white/10 hover:bg-white/20 text-slate-300"
                  }`}
                >
                  🎙️ Voice Assistant
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 p-2">
              {chatMessages.map((m, idx) => (
                <div key={idx} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                    m.sender === "user" ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-none" : "bg-white/5 border border-white/10 text-slate-200 rounded-bl-none"
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Prompt Quick Options */}
            <div className="flex space-x-2 overflow-x-auto py-1">
              {["Calculate $20k Loan EMI", "Analyze monthly expenses", "Recommend investment routes"].map((p, i) => (
                <button key={i} onClick={() => handleChatSend(p)} className="whitespace-nowrap text-[11px] font-semibold bg-white/5 hover:bg-cyan-500/20 text-cyan-300 px-3 py-1.5 rounded-full border border-white/10">
                  💡 {p}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={(e) => { e.preventDefault(); handleChatSend(); }} className="flex space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask Gemini to calculate loans, analyze budget, or check fraud score..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400"
              />
              <button type="submit" className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm rounded-xl shadow-lg">
                Send
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: Loan Advisor & EMI Calculator */}
        {activeTab === "LOAN" && (
          <div className="p-8 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 space-y-6">
            <h3 className="font-extrabold text-white text-xl">AI Loan Advisor & Dynamic EMI Calculator</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-slate-300 font-semibold mb-1">
                    <span>Principal Amount ($):</span>
                    <span className="font-mono text-cyan-400 font-bold text-lg">${loanAmount}</span>
                  </div>
                  <input type="range" min="2000" max="100000" step="1000" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className="w-full accent-cyan-400 cursor-pointer" />
                </div>

                <div>
                  <label className="text-xs text-slate-300 uppercase font-semibold">Repayment Term (Months)</label>
                  <div className="flex space-x-2 mt-2">
                    {[12, 24, 36, 48, 60].map((t) => (
                      <button key={t} onClick={() => setLoanTerm(t)} className={`flex-1 py-2 rounded-xl font-bold text-xs ${loanTerm === t ? "bg-cyan-500 text-white" : "bg-white/5 text-slate-400"}`}>
                        {t}m
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
                    <span>Interest Rate (Fixed APR):</span>
                    <span className="font-mono text-emerald-400 font-bold">{loanApr}%</span>
                  </div>
                  <input type="range" min="3.0" max="15.0" step="0.1" value={loanApr} onChange={(e) => setLoanApr(e.target.value)} className="w-full accent-emerald-400 cursor-pointer" />
                </div>
              </div>

              {/* Calculated EMI Display */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between text-center space-y-4">
                <div className="text-xs text-slate-400 uppercase font-semibold">Calculated Monthly EMI</div>
                <div className="text-4xl font-extrabold text-cyan-400 font-mono">${calculateEMI()} <span className="text-xs text-slate-400">/ mo</span></div>
                <div className="text-xs text-slate-300">Total Interest Payable: <span className="font-mono font-bold text-emerald-400">${((parseFloat(calculateEMI()) * loanTerm) - parseFloat(loanAmount)).toFixed(2)}</span></div>
                <button onClick={() => alert(`Pre-approved for $${loanAmount} loan at $${calculateEMI()}/mo!`)} className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 font-extrabold text-white text-sm rounded-xl shadow-lg">
                  Apply Instant Pre-Approved Credit Line
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Expense Analysis & Budget Planner */}
        {activeTab === "EXPENSE" && (
          <div className="p-8 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 space-y-6">
            <h3 className="font-extrabold text-white text-xl">AI Expense Analysis & Budget Planner</h3>

            <div className="space-y-4">
              {[
                { category: "Cloud Infrastructure (AWS/Vercel)", amount: "$342.50", pct: 45, color: "bg-cyan-400" },
                { category: "Dining & Entertainment", amount: "$340.00", pct: 35, color: "bg-blue-500" },
                { category: "Travel & Rideshare", amount: "$124.00", pct: 15, color: "bg-indigo-500" },
                { category: "SaaS Software Subscriptions", amount: "$84.00", pct: 5, color: "bg-purple-500" },
              ].map((c, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-300">
                    <span>{c.category}</span>
                    <span className="font-mono text-cyan-400">{c.amount}</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Investment Suggestions */}
        {activeTab === "INVEST" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "USD High-Yield Vault (5.20% APY)", desc: "Route idle liquidity from USD checking to earn compounding daily yield.", return: "+$520.00 / yr per $10k", icon: "📈" },
              { title: "EUR Foreign Exchange Vault (3.80% APY)", desc: "Capitalize on EUR/USD strength while securing European yield.", return: "+€380.00 / yr per €10k", icon: "🌐" },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-3">
                <div className="text-3xl">{item.icon}</div>
                <h3 className="font-bold text-white text-base">{item.title}</h3>
                <p className="text-xs text-slate-400">{item.desc}</p>
                <div className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 p-2 rounded-xl inline-block">{item.return}</div>
                <button onClick={() => alert(`Activated investment route for ${item.title}`)} className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-xs rounded-xl shadow-lg">
                  Execute Automated Yield Route
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: Fraud Risk Evaluator */}
        {activeTab === "FRAUD" && (
          <div className="p-8 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 space-y-6">
            <h3 className="font-extrabold text-white text-xl">Gemini Real-Time Fraud Score Evaluator</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-400 font-semibold uppercase">Transaction Amount ($)</label>
                  <input type="number" value={testAmount} onChange={(e) => setTestAmount(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white mt-1 outline-none font-mono" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-semibold uppercase">Merchant & Geolocation</label>
                  <input type="text" value={testMerchant} onChange={(e) => setTestMerchant(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white mt-1 outline-none" />
                </div>
                <button onClick={handleEvaluateFraud} className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-sm text-white rounded-xl shadow-lg">
                  Run Gemini Risk Scoring Model
                </button>
              </div>

              {fraudResult && (
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between text-center space-y-3">
                  <div className="text-xs text-slate-400 uppercase font-semibold">Gemini AI Risk Score</div>
                  <div className={`text-5xl font-black font-mono ${fraudResult.score > 50 ? "text-red-400" : "text-emerald-400"}`}>
                    {fraudResult.score} <span className="text-xs text-slate-400">/ 100</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-white">{fraudResult.status}</div>
                  <div className="text-xs text-slate-300">{fraudResult.recommendation}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </CustomerDashboardLayout>
  );
};
