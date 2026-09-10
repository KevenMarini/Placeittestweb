"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AUCTION_PAGES = [
  // Page 0 (Cover)
  <div className="flex flex-col h-full justify-center items-center text-center p-6 bg-neon-pink/20 h-[600px]">
    <div className="text-6xl mb-6">⚖️</div>
    <h2 className="font-marker text-4xl text-ink mb-4 leading-tight">Problem Statement<br/>Auction</h2>
    <h3 className="font-sans text-xl font-bold uppercase tracking-widest text-ink">Guidelines</h3>
    <p className="mt-8 font-mono text-sm border-2 border-ink px-4 py-1 bg-paper">Open Book →</p>
  </div>,
  // Page 1
  <div className="p-6 h-[600px] overflow-y-auto bg-paper pb-20">
    <h3 className="font-marker text-2xl mb-4 border-b-2 border-ink pb-2 text-neon-pink">1. Auction Credits</h3>
    <ul className="list-disc pl-5 font-sans text-sm space-y-2 mb-6 text-ink">
      <li>Every team starts the auction with <strong>120 credits</strong>.</li>
      <li>Credits may be used only to bid on Problem Statements.</li>
      <li>Credits spent on a winning bid are deducted permanently and cannot be recovered, refunded, or reused.</li>
      <li>Because there are no top-ups, teams should plan their spending across the whole auction.</li>
    </ul>
    <h3 className="font-marker text-2xl mb-4 border-b-2 border-ink pb-2 text-neon-pink">2. Auction Format</h3>
    <ul className="list-disc pl-5 font-sans text-sm space-y-2 text-ink">
      <li>Problem Statements are auctioned domain-wise: one domain is open for bidding at a time.</li>
      <li>Each domain contains 7 Problem Statements.</li>
      <li>The auction runs across 5 domains in total.</li>
    </ul>
  </div>,
  // Page 2
  <div className="p-6 h-[600px] overflow-y-auto bg-paper pb-20">
    <h3 className="font-marker text-2xl mb-4 border-b-2 border-ink pb-2 text-neon-pink">3. How Bidding Works</h3>
    <ul className="list-disc pl-5 font-sans text-sm space-y-2 mb-6 text-ink">
      <li>The auctioneer announces one Problem Statement at a time for bidding.</li>
      <li>Active teams place bids using their available (undeducted) credits.</li>
      <li>The highest valid bid wins the Problem Statement.</li>
      <li>All bids are final once placed, and a won Problem Statement is never re-auctioned.</li>
    </ul>
    <h3 className="font-marker text-2xl mb-4 border-b-2 border-ink pb-2 text-neon-pink">4. Credit Outcomes</h3>
    <ul className="list-disc pl-5 font-sans text-sm space-y-2 text-ink">
      <li><strong>Winning team:</strong> the full winning bid is deducted from its balance.</li>
      <li><strong>Losing teams:</strong> keeps 100% of its credits and remains active.</li>
    </ul>
  </div>,
  // Page 3
  <div className="p-6 h-[600px] overflow-y-auto bg-paper pb-20">
    <h3 className="font-marker text-2xl mb-4 border-b-2 border-ink pb-2 text-neon-pink">5. One Team, One PS</h3>
    <ul className="list-disc pl-5 font-sans text-sm space-y-2 mb-6 text-ink">
      <li>Each team may win <strong>only one</strong> Problem Statement for the entire auction.</li>
      <li>The moment a team wins, it is removed from all further bidding.</li>
      <li>Leftover credits after a win cannot be used or transferred.</li>
    </ul>
    <h3 className="font-marker text-2xl mb-4 border-b-2 border-ink pb-2 text-neon-pink">6. Domain Locking</h3>
    <ul className="list-disc pl-5 font-sans text-sm space-y-2 text-ink">
      <li>Each domain has a cap on how many teams may win from it to keep distribution even.</li>
      <li>Once cap is reached, the domain locks and bidding moves to the next domain.</li>
    </ul>
  </div>,
  // Page 4
  <div className="p-6 h-[600px] overflow-y-auto bg-paper pb-20">
    <h3 className="font-marker text-2xl mb-4 border-b-2 border-ink pb-2 text-neon-pink">7. Strategic Tips</h3>
    <ul className="list-disc pl-5 font-sans text-sm space-y-2 mb-6 text-ink">
      <li>Review every domain and Problem Statement before bidding begins; you can't undo a win.</li>
      <li>Avoid spending all 120 credits early; strong statements may appear later.</li>
      <li>Keep a credit buffer until you've secured a statement you actually want.</li>
      <li>Watch domain-lock progress carefully.</li>
    </ul>
    <h3 className="font-marker text-2xl mb-4 border-b-2 border-ink pb-2 text-neon-pink">8. Quick Reference</h3>
    <table className="w-full text-left font-sans text-xs border-collapse text-ink">
      <tbody>
        <tr className="border-b border-ink/30"><th className="py-2">Starting credits</th><td>120 per team</td></tr>
        <tr className="border-b border-ink/30"><th className="py-2">PS per domain</th><td>7</td></tr>
        <tr className="border-b border-ink/30"><th className="py-2">Total domains</th><td>5</td></tr>
        <tr className="border-b border-ink/30"><th className="py-2">Wins per team</th><td>Max 1</td></tr>
        <tr className="border-b border-ink/30"><th className="py-2">Losing bid</th><td>Credits retained</td></tr>
      </tbody>
    </table>
  </div>
];

const EVENT_PAGES = [
  <div className="flex flex-col h-full justify-center items-center text-center p-6 bg-neon-cyan/20 h-[600px]">
    <div className="text-6xl mb-6">📜</div>
    <h2 className="font-marker text-4xl text-ink mb-4 leading-tight">Event<br/>Guidelines</h2>
    <h3 className="font-sans text-xl font-bold uppercase tracking-widest text-ink">Rulebook</h3>
    <p className="mt-8 font-mono text-sm border-2 border-ink px-4 py-1 bg-paper">Open Book →</p>
  </div>,
  <div className="flex flex-col h-full justify-center items-center text-center p-6 h-[600px] bg-paper">
    <div className="text-6xl mb-4">🚧</div>
    <h2 className="font-marker text-3xl text-ink mb-2">Coming Soon</h2>
    <p className="font-sans text-sm text-ink-light max-w-xs mx-auto">
      The official event guidelines are currently being finalized and will be updated here shortly!
    </p>
  </div>
];

export default function RuleBooks() {
  const [activeBook, setActiveBook] = useState<"event" | "auction">("auction");
  const [page, setPage] = useState(0);

  const pages = activeBook === "auction" ? AUCTION_PAGES : EVENT_PAGES;

  const nextPage = () => {
    if (page < pages.length - 1) setPage(p => p + 1);
  };

  const prevPage = () => {
    if (page > 0) setPage(p => p - 1);
  };

  const switchBook = (book: "event" | "auction") => {
    setActiveBook(book);
    setPage(0);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-16 px-4">
      <div className="text-center mb-10">
        <h2 className="font-marker text-5xl text-ink mb-6">The Rule Books</h2>
        
        {/* Book Selector Tabs */}
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => switchBook("auction")}
            className={`font-marker text-2xl px-6 py-2 border-4 border-ink shadow-[4px_4px_0px_rgba(26,26,26,1)] transition-transform hover:-translate-y-1 ${
              activeBook === "auction" ? "bg-neon-pink text-white wobbly-border" : "bg-paper text-ink wobbly-border-alt"
            }`}
          >
            Auction Rules
          </button>
          <button
            onClick={() => switchBook("event")}
            className={`font-marker text-2xl px-6 py-2 border-4 border-ink shadow-[4px_4px_0px_rgba(26,26,26,1)] transition-transform hover:-translate-y-1 ${
              activeBook === "event" ? "bg-neon-cyan text-ink wobbly-border-alt" : "bg-paper text-ink wobbly-border"
            }`}
          >
            Event Rules
          </button>
        </div>
      </div>

      {/* The Book Container */}
      <div className="relative mx-auto max-w-md w-full perspective-[1000px]">
        {/* Book binding styling */}
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-ink/10 rounded-l-lg z-20 border-r border-ink/20 pointer-events-none"></div>
        
        <div className="bg-paper border-4 border-ink shadow-[8px_8px_0px_rgba(26,26,26,1)] rounded-r-2xl overflow-hidden relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeBook}-${page}`}
              initial={{ rotateY: 90, opacity: 0, originX: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full"
            >
              {pages[page]}
            </motion.div>
          </AnimatePresence>

          {/* Page Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-ink p-3 flex justify-between items-center z-30">
            <button 
              onClick={prevPage}
              disabled={page === 0}
              className="text-white font-mono text-sm px-3 py-1 hover:text-neon-pink disabled:opacity-30 transition-colors"
            >
              ← Prev
            </button>
            <span className="text-white font-mono text-xs">
              Page {page + 1} of {pages.length}
            </span>
            <button 
              onClick={nextPage}
              disabled={page === pages.length - 1}
              className="text-white font-mono text-sm px-3 py-1 hover:text-neon-cyan disabled:opacity-30 transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className="mt-16 bg-canvas border-4 border-ink p-8 shadow-[4px_4px_0px_rgba(26,26,26,1)] wobbly-border-alt max-w-2xl mx-auto text-center">
        <h3 className="font-marker text-3xl text-ink mb-6">📥 Download PDF Versions</h3>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/auction-rules.pdf" 
            download
            className="flex-1 bg-neon-pink text-white font-sans font-bold px-6 py-4 border-2 border-ink shadow-[4px_4px_0px_rgba(26,26,26,1)] hover:bg-ink hover:text-neon-pink transition-all flex items-center justify-center gap-2"
          >
            <span className="text-xl">📄</span> Auction Guidelines PDF
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("Event Guidelines PDF will be available shortly!");
            }}
            className="flex-1 bg-paper text-ink font-sans font-bold px-6 py-4 border-2 border-ink shadow-[4px_4px_0px_rgba(26,26,26,1)] hover:bg-neon-cyan transition-all flex items-center justify-center gap-2 opacity-80"
          >
            <span className="text-xl">📄</span> Event Guidelines PDF
          </a>
        </div>
        <p className="font-mono text-xs text-ink-light mt-4">
          * Note: PDF files are provided for offline reference.
        </p>
      </div>
    </div>
  );
}
