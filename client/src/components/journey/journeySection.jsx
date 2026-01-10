import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const JourneySection = () => {
  const containerRef = useRef(null);

  // 1. Track scroll progress for the river path animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // 2. Smooth out the path drawing for a "liquid" feel
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 20,
    restDelta: 0.001,
  });

  const milestones = [
    {
      title: "Awareness",
      desc: "Recognizing the patterns of your mind and the noise of daily life.",
      side: "left",
    },
    {
      title: "Discovery",
      desc: "Exploring evidence-based psycho-education tools tailored for you.",
      side: "right",
    },
    {
      title: "Practice",
      desc: "Implementing daily rituals and mental exercises to find your center.",
      side: "left",
    },
    {
      title: "Clarity",
      desc: "Walking forward with a settled mind and a renewed sense of purpose.",
      side: "right",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative pt-5 overflow-hidden"
      // 3. Misty Valley Gradient Background
      style={{
        // background: `radial-gradient(circle at 0% 0%, #f3f0ff 0%, #ffffff 50%),
        //              radial-gradient(circle at 100% 100%, #e0f2fe 0%, #ffffff 50%)`,
        backgroundColor: "#f3f1ff",
      }}
    >
      {/* 4. Floating Aura Blobs for Depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-96 h-96 bg-purple-200/30 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-40 right-10 w-125 h-125 bg-blue-100/40 rounded-full blur-[120px]"
        />
      </div>

      <div className="max-w-5xl mx-auto relative px-4">
        {/* Section Header */}
        <div className="text-center mb-32 relative z-10">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#E83E8C] font-bold tracking-[0.3em] uppercase text-sm"
          >
            The Path Forward
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-[#3A3267] mt-4"
          >
            Your Mental Wellness Journey
          </motion.h2>
        </div>

        {/* 5. The Animated SVG River Path */}
        <svg
          className="absolute left-1/2 -translate-x-1/2 top-48 w-full h-[80%] pointer-events-none"
          viewBox="0 0 400 1200"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Background Path */}
          <path
            d="M200,0 C350,200 50,400 200,600 C350,800 50,1000 200,1200"
            stroke="#e2e8f0"
            strokeWidth="4"
            strokeDasharray="12 12"
          />
          {/* Animated Path with Glow */}
          <motion.path
            d="M200,0 C350,200 50,400 200,600 C350,800 50,1000 200,1200"
            stroke="#E83E8C"
            strokeWidth="6"
            strokeLinecap="round"
            style={{ pathLength }}
            className="drop-shadow-[0_0_10px_rgba(232,62,140,0.5)]"
          />
        </svg>

        {/* 6. Milestone Cards with Strong Back-Lighting */}
        <div className="relative z-10">
          {milestones.map((step, index) => {
            // Single brand color for each card
            // const brandColor = index % 2 === 0 ? "#Dd1764" : "#3F2965";
            const brandColor = "#4c4883";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`flex w-full mb-64 ${
                  step.side === "left" ? "justify-start" : "justify-end"
                }`}
              >
                <div className="relative group max-w-sm w-full">
                  {/* --- THE BACKLIGHT SOURCE --- */}
                  <div
                    className="absolute -inset-1 z-0 opacity-10 blur-[100px] rounded-full transition-opacity duration-500 group-hover:opacity-40"
                    style={{
                      backgroundColor: brandColor,
                    }}
                  />

                  {/* Milestone Marker (River Dot) */}
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#E83E8C] shadow-[0_0_20px_rgba(232,62,140,1)] z-20
            ${
              step.side === "left"
                ? "-right-12 md:-right-24"
                : "-left-12 md:-left-24"
            }`}
                  />

                  {/* --- THE GLASS CARD --- */}
                  <div className="relative z-10 p-10 bg-white/30 backdrop-blur-2xl rounded-4xl border border-white/40 shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2">
                    {/* Inner "Refractive" Glow */}
                    <div
                      className="absolute -top-20 -right-20 w-40 h-40 opacity-20 blur-3xl rounded-full"
                      style={{ backgroundColor: brandColor }}
                    />

                    <span className="text-5xl mb-6 block drop-shadow-lg">
                      {index === 0 && "🧘"}
                      {index === 1 && "💡"}
                      {index === 2 && "🌱"}
                      {index === 3 && "✨"}
                    </span>
                    <h3 className="text-3xl font-serif font-bold text-[#3A3267] mb-4">
                      {step.title}
                    </h3>
                    <p className="text-slate-700 text-lg leading-relaxed font-sans font-medium">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
