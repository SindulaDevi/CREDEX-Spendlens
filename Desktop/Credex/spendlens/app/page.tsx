"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const pricing: any = {
  "ChatGPT Team": 30,
  "ChatGPT Plus": 20,
  "Cursor Pro": 20,
  "Cursor Business": 40,
  "Claude Pro": 20,
  "Claude Team": 30,
};

export default function Home() {
  const [tool, setTool] = useState("ChatGPT Team");
  const [seats, setSeats] = useState(2);
  const [monthlySpend, setMonthlySpend] = useState(60);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("audit");
    if (saved) {
      setResult(JSON.parse(saved));
    }
  }, []);

  const runAudit = () => {
    let recommendation = "";
    let savings = 0;

    if (tool === "ChatGPT Team" && seats <= 2) {
      recommendation = "Switch to ChatGPT Plus";
      savings = monthlySpend - 20 * seats;
    } else if (tool === "Cursor Business" && seats <= 3) {
      recommendation = "Use Cursor Pro";
      savings = monthlySpend - 20 * seats;
    } else {
      recommendation = "Your spending is already optimized";
      savings = 0;
    }

    const data = {
      id: uuidv4(),
      tool,
      seats,
      monthlySpend,
      recommendation,
      savings,
      annualSavings: savings * 12,
    };

    setResult(data);
    localStorage.setItem("audit", JSON.stringify(data));
  };

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">
          SpendLens AI Audit
        </h1>

        <p className="text-zinc-400 mb-10">
          Discover hidden savings in your AI stack.
        </p>

        <div className="bg-zinc-900 p-6 rounded-2xl space-y-4">
          <select
            className="w-full p-3 rounded bg-zinc-800"
            value={tool}
            onChange={(e) => setTool(e.target.value)}
          >
            <option>ChatGPT Team</option>
            <option>ChatGPT Plus</option>
            <option>Cursor Pro</option>
            <option>Cursor Business</option>
            <option>Claude Pro</option>
            <option>Claude Team</option>
          </select>

          <input
            type="number"
            placeholder="Seats"
            value={seats}
            onChange={(e) => setSeats(Number(e.target.value))}
            className="w-full p-3 rounded bg-zinc-800"
          />

          <input
            type="number"
            placeholder="Monthly Spend"
            value={monthlySpend}
            onChange={(e) => setMonthlySpend(Number(e.target.value))}
            className="w-full p-3 rounded bg-zinc-800"
          />

          <button
            onClick={runAudit}
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold"
          >
            Run Audit
          </button>
        </div>

        {result && (
          <div className="mt-10 bg-green-900/30 border border-green-500 p-6 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4">
              Potential Savings
            </h2>

            <p className="text-xl">
              Monthly Savings: ${result.savings}
            </p>

            <p className="text-xl mb-4">
              Annual Savings: ${result.annualSavings}
            </p>

            <p className="text-zinc-300">
              Recommendation: {result.recommendation}
            </p>

            <div className="mt-6 p-4 bg-zinc-900 rounded-xl">
              <h3 className="font-semibold mb-2">
                AI Summary
              </h3>

              <p className="text-zinc-400">
                Your current AI tooling setup appears to
                have optimization opportunities. Based on
                your team size and usage profile, switching
                plans could significantly reduce monthly
                operational costs while maintaining similar
                productivity.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}