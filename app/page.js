"use client";

import { useState } from "react";

export default function Home() {
  const [messageText, setMessageText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [emailSender, setEmailSender] = useState("");
  const [result, setResult] = useState(null);
  const [riskLevel, setRiskLevel] = useState(null); // 🔹 Now directly received from backend
  const [loading, setLoading] = useState(false); // 🔹 "Thinking" indicator

  const checkScam = async (type) => {
    const text = type === "message" ? messageText : emailText;
    if (!text.trim()) {
      setResult("Indsæt tekst for at tjekke, lær måske hvordan fra en ven.");
      return;
    }

    setLoading(true);
    setResult(null);
    setRiskLevel(null);

    try {
      const response = await fetch("https://scam-checker-dk.onrender.com/check-scam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, type }),
      });

      if (!response.ok) {
        throw new Error(`Serveren svarede med en fejl: ${response.status}`);
      }

      const data = await response.json();
      setResult(data.result);
      setRiskLevel(data.riskLevel); // 🔹 Use risk level from backend
    } catch (error) {
      console.error("Fejl ved tjek:", error);
      setResult("Beklager, der opstod en fejl. Prøv venligst igen senere.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg text-center border border-gray-300">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-6">Svindeltjek</h1>
        <p className="text-lg text-gray-700 mb-6">
          Indsæt tekst fra en besked eller email, så hjælper vi dig med at tjekke for mulig svindel.
        </p>

        {/* Tab System */}
        <div className="flex border-b border-gray-300 mb-4">
          <button className="flex-1 py-2 text-lg font-medium bg-blue-100 border-blue-500 rounded-t-lg">Tjek en besked</button>
          <button className="flex-1 py-2 text-lg font-medium text-gray-600 hover:bg-gray-200">Tjek en email</button>
        </div>

        {/* Input Area */}
        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 mt-2 shadow-sm"
          placeholder="Kopier teksten fra sms eller email og indsæt her (Marker tekst + Kopier + Klik på dette felt + Indsæt)."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        ></textarea>
        <button
          className={`mt-4 w-full px-6 py-3 rounded-lg text-lg font-medium shadow-md transition-all cursor-pointer ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
          onClick={() => checkScam("message")}
          disabled={loading}
        >
          {loading ? "Analyserer..." : "Svindeltjek"}
        </button>

        {/* Result Section with Traffic Light */}
        {result && (
          <div id="scam-result" className="mt-6 p-4 border border-gray-300 rounded-lg shadow-md text-left">
            {/* Traffic Light Indicator */}
            <div className="flex flex-col items-center mb-4">
              <div className={`w-6 h-6 mb-1 rounded-full ${riskLevel === "high" ? "bg-red-500 shadow-lg" : "bg-gray-300"}`}></div>
              <div className={`w-6 h-6 mb-1 rounded-full ${riskLevel === "medium" ? "bg-yellow-500 shadow-lg" : "bg-gray-300"}`}></div>
              <div className={`w-6 h-6 rounded-full ${riskLevel === "low" ? "bg-green-500 shadow-lg" : "bg-gray-300"}`}></div>
            </div>
            
            {/* Result Display */}
            <p className="text-lg font-semibold text-gray-800">Indikation:</p>
            <p className="text-md text-gray-700 mt-2 whitespace-pre-line">{result}</p>
          </div>
        )}
      </div>
    </main>
  );
}
