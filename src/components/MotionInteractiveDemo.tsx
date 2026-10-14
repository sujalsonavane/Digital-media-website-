"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MousePointerClick,
  Sliders,
  Sparkles,
  CheckCircle2,
  Bell,
  RefreshCw,
  Heart,
  ChevronRight,
  Zap,
} from "lucide-react";

const tabOptions = [
  { id: "gestures", label: "Spring & Gestures", icon: MousePointerClick },
  { id: "tabs", label: "Shared LayoutId", icon: Sliders },
  { id: "presence", label: "AnimatePresence", icon: Sparkles },
];

export default function MotionInteractiveDemo() {
  const [activeTab, setActiveTab] = useState("gestures");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(142);
  const [toggleState, setToggleState] = useState(true);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [notificationCount, setNotificationCount] = useState(3);

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount((c) => c + 1);
    } else {
      setLiked(false);
      setLikeCount((c) => c - 1);
    }
  };

  return (
    <section id="motion-demo" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 text-xs font-mono uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Motion for React</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Micro-Interactions & Spring Physics
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base mt-3">
          Interactive UI states, gesture responsiveness, smooth layout transitions, and AnimatePresence exit animations.
        </p>
      </div>

      {/* Interactive Tabs Header */}
      <div className="flex justify-center mb-10">
        <div className="flex items-center gap-1.5 p-1.5 bg-neutral-900/90 border border-neutral-800 rounded-2xl">
          {tabOptions.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors z-10 ${
                  isActive ? "text-white" : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="interactive-tab-pill"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-fuchsia-600 rounded-xl -z-10 shadow-lg shadow-indigo-500/25"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panels */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === "gestures" && (
            <motion.div
              key="gestures"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Card 1: Spring Bounce Like Button */}
              <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                    01 • Reactive Tap Dynamics
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Elastic Spring Tap</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Click the button below to trigger high-stiffness spring animation with instant haptic state feedback.
                  </p>
                </div>

                <div className="pt-8 flex flex-col items-center gap-3">
                  <motion.button
                    onClick={handleLike}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.88 }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-colors shadow-lg ${
                      liked
                        ? "bg-rose-500 text-white shadow-rose-500/30"
                        : "bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700"
                    }`}
                  >
                    <motion.div
                      animate={{ scale: liked ? [1, 1.4, 1] : 1, rotate: liked ? [0, -15, 15, 0] : 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <Heart className={`w-4 h-4 ${liked ? "fill-white" : ""}`} />
                    </motion.div>
                    <span>{liked ? "Liked!" : "Press to Like"}</span>
                    <span className="font-mono text-xs opacity-80">({likeCount})</span>
                  </motion.button>
                  <span className="text-[11px] text-neutral-500">Physics: stiffness: 450, damping: 15</span>
                </div>
              </div>

              {/* Card 2: Interactive Spring Switch */}
              <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                    02 • Toggle Physics
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Spring Toggle Switch</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Smooth toggle state where the thumb smoothly transitions with momentum using layout animation.
                  </p>
                </div>

                <div className="pt-8 flex flex-col items-center gap-4">
                  <div
                    onClick={() => setToggleState(!toggleState)}
                    className={`w-16 h-9 rounded-full p-1 cursor-pointer transition-colors duration-300 flex items-center ${
                      toggleState ? "bg-indigo-600" : "bg-neutral-800"
                    }`}
                  >
                    <motion.div
                      layout
                      transition={{ type: "spring", stiffness: 600, damping: 30 }}
                      className={`w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center ${
                        toggleState ? "ml-auto" : "mr-auto"
                      }`}
                    >
                      <Zap className={`w-3.5 h-3.5 ${toggleState ? "text-indigo-600" : "text-neutral-400"}`} />
                    </motion.div>
                  </div>
                  <span className="text-xs font-mono text-neutral-300">
                    Mode: {toggleState ? "Turbo Activated" : "Eco Power"}
                  </span>
                </div>
              </div>

              {/* Card 3: Dynamic Badge Counter */}
              <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                    03 • Animated Pop Counter
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Notice Pop Bubble</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Adding notifications pops the indicator badge with scale bounce and color pulse.
                  </p>
                </div>

                <div className="pt-8 flex flex-col items-center gap-4">
                  <div className="relative">
                    <button
                      onClick={() => setNotificationCount((n) => n + 1)}
                      className="w-12 h-12 rounded-2xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 flex items-center justify-center text-white transition-colors"
                      title="Click to increment"
                    >
                      <Bell className="w-5 h-5 text-neutral-300" />
                    </button>
                    <AnimatePresence mode="popLayout">
                      {notificationCount > 0 && (
                        <motion.span
                          key={notificationCount}
                          initial={{ scale: 0.3, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 600, damping: 20 }}
                          className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center shadow-lg shadow-red-500/30"
                        >
                          {notificationCount}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setNotificationCount((n) => n + 1)}
                      className="px-3 py-1 text-xs rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700"
                    >
                      + Add
                    </button>
                    <button
                      onClick={() => setNotificationCount(0)}
                      className="px-3 py-1 text-xs rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 border border-neutral-700"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "tabs" && (
            <motion.div
              key="tabs"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 max-w-4xl mx-auto"
            >
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-bold text-white">Shared Layout Transitions</h3>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed mb-8">
                In modern UI design, tab navigation often suffers from jarring snap states. With Motion’s <code>layoutId</code>, the highlight container seamlessly calculates delta bounding rects and smoothly glides between targets on the GPU compositor.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["Next.js Server Actions", "GSAP Scroll Sequencing", "Tailwind Design Atoms"].map(
                  (feature, idx) => (
                    <motion.div
                      key={feature}
                      whileHover={{ y: -4, borderColor: "#6366f1" }}
                      className="p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800 cursor-pointer transition-colors"
                    >
                      <span className="text-xs font-mono text-indigo-400">Feature 0{idx + 1}</span>
                      <h4 className="text-base font-semibold text-white mt-1">{feature}</h4>
                      <p className="text-xs text-neutral-400 mt-2">
                        Integrated with zero external state boilerplate.
                      </p>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "presence" && (
            <motion.div
              key="presence"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 max-w-4xl mx-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">AnimatePresence Modal & Card Inspection</h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Select a card below to inspect its layout morph animation.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 1, title: "GSAP Timeline Orchestration", desc: "Coordinates complex multi-element sequences with sub-frame accuracy." },
                  { id: 2, title: "Motion for React Springs", desc: "Physics-based interpolation guaranteeing fluid interruptible gestures." },
                ].map((item) => (
                  <motion.div
                    key={item.id}
                    layoutId={`card-${item.id}`}
                    onClick={() => setSelectedCard(item.id)}
                    className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 cursor-pointer hover:border-neutral-700 transition-colors"
                  >
                    <span className="text-xs font-mono text-fuchsia-400">Expandable Card</span>
                    <h4 className="text-base font-bold text-white mt-1">{item.title}</h4>
                    <p className="text-xs text-neutral-400 mt-2">{item.desc}</p>
                    <span className="inline-flex items-center gap-1 text-xs text-indigo-400 mt-4 font-semibold">
                      Click to expand <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </motion.div>
                ))}
              </div>

              <AnimatePresence>
                {selectedCard && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <motion.div
                      layoutId={`card-${selectedCard}`}
                      className="w-full max-w-md p-6 rounded-3xl bg-neutral-900 border border-neutral-700 text-white shadow-2xl relative"
                    >
                      <button
                        onClick={() => setSelectedCard(null)}
                        className="absolute top-4 right-4 text-xs font-mono px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                      >
                        Close [ESC]
                      </button>
                      <span className="text-xs font-mono text-fuchsia-400">Modal Expanded Inspection</span>
                      <h3 className="text-xl font-bold mt-2">
                        {selectedCard === 1 ? "GSAP Timeline Orchestration" : "Motion for React Springs"}
                      </h3>
                      <p className="text-xs text-neutral-300 mt-3 leading-relaxed">
                        Notice how the card smoothly morphed from its small preview size into this full dialog modal without jumpy layout recalculations.
                      </p>
                      <div className="mt-6 flex justify-end">
                        <button
                          onClick={() => setSelectedCard(null)}
                          className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white"
                        >
                          Got it
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
