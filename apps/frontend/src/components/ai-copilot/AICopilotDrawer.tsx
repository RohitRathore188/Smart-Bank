import React, { useState } from "react";

interface AICopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: "user" | "gemini";
  text: string;
  action?: {
    label: string;
    type: string;
  };
}

export const AICopilotDrawer: React.FC<AICopilotDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "gemini",
      text: "Hello Alex! I am your SmartBank AI Co-Pilot. I monitor your vaults, detect high yield opportunities, and safeguard your card transactions. How can I help you today?",
    }
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const promptSuggestions = [
    "Transfer $500 from USD vault to EUR vault",
    "Analyze my dining expense trend this month",
    "What is my current loan eligibility score?",
    "Freeze my virtual SaaS card"
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const newMessages: Message[] = [...messages, { sender: "user", text: query }];
    setMessages(newMessages);
    if (!textToSend) setInput("");
    setIsThinking(true);

    setTimeout(() => {
      let botReply = "I've analyzed your financial context. ";
      let actionObj: Message["action"] = undefined;

      if (query.toLowerCase().includes("transfer") || query.toLowerCase().includes("eur")) {
        botReply = "EUR/USD is currently at 0.918 (0.4% above 7-day average). I have calculated a $500.00 USD transfer to yield €459.00 EUR with zero FX fee.";
        actionObj = { label: "Execute $500 USD → EUR Transfer", type: "FX_TRANSFER" };
      } else if (query.toLowerCase().includes("dining") || query.toLowerCase().includes("expense")) {
        botReply = "Your dining expenses total $340.00 this month (14% lower than last month). Your AI budget rule auto-routed $50.00 to your High-Yield Savings Vault.";
      } else if (query.toLowerCase().includes("loan") || query.toLowerCase().includes("credit")) {
        botReply = "Your SmartBank Credit Rating is 785/850 (Tier 1 Premier). You are instantly pre-approved for up to $25,000 at 5.4% APR.";
        actionObj = { label: "Claim $25,000 Instant Loan", type: "CLAIM_LOAN" };
      } else {
        botReply = "I have processed your query against your double-entry ledger. All balances are verified and secure.";
      }

      setMessages([...newMessages, { sender: "gemini", text: botReply, action: actionObj }]);
      setIsThinking(false);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[440px] bg-slate-900/90 backdrop-blur-2xl border-l border-white/10 shadow-2xl z-50 flex flex-col font-sans transition-all duration-300">
      {/* Header */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-xl shadow-lg shadow-cyan-500/25">
            🤖
          </div>
          <div>
            <h3 className="font-bold text-white text-base leading-tight">Gemini AI Co-Pilot</h3>
            <p className="text-xs text-cyan-400 font-medium">Autonomous Financial Intelligence</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Message List */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-none shadow-md"
                  : "bg-white/5 border border-white/10 text-slate-200 rounded-bl-none backdrop-blur-md"
              }`}
            >
              {msg.text}
            </div>

            {msg.action && (
              <button
                onClick={() => alert(`Triggered Action: ${msg.action?.label}`)}
                className="mt-2 text-xs font-semibold px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl shadow-md hover:from-emerald-400 hover:to-teal-500 transition-all duration-200"
              >
                ⚡ {msg.action.label}
              </button>
            )}
          </div>
        ))}

        {isThinking && (
          <div className="flex items-center space-x-2 text-xs text-cyan-400 font-medium p-3 bg-white/5 rounded-2xl max-w-[60%]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>Gemini is analyzing ledger context...</span>
          </div>
        )}
      </div>

      {/* Prompt Suggestions Pills */}
      <div className="px-5 py-2 overflow-x-auto flex space-x-2 scrollbar-none">
        {promptSuggestions.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            className="whitespace-nowrap text-[11px] font-medium bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 px-3 py-1.5 rounded-full border border-white/10 transition-colors"
          >
            💡 {prompt}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-4 border-t border-white/10 bg-white/5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Gemini to transfer, analyze, or forecast..."
            className="flex-1 bg-white/5 border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none"
          />
          <button
            type="submit"
            className="p-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold shadow-md shadow-cyan-500/20 hover:opacity-90"
          >
            ➔
          </button>
        </form>
      </div>
    </div>
  );
};
