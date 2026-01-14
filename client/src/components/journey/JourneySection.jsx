import { useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const JourneySection = () => {
  const containerRef = useRef(null);
  const [openBook, setOpenBook] = useState(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  //Slow and smooth animation
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 10, // Very low = very slow response
    damping: 40, // High = smooth, less bouncy
    restDelta: 0.0001, // Smaller = more precise
  });

  const milestones = [
    {
      title: "Awareness",
      desc: "Recognizing the patterns of your mind.",
      side: "left",
      icon: "🧘",
      innerContent: {
        title: "Deep Dive into Awareness",
        points: [
          "Understand your thought patterns",
          "Identify emotional triggers",
          "Practice mindful observation",
          "Build self-awareness habits",
        ],
        quote: "The first step toward change is awareness.",
      },
    },
    {
      title: "Discovery",
      desc: "Exploring evidence-based tools for you.",
      side: "right",
      icon: "💡",
      innerContent: {
        title: "Tools for Transformation",
        points: [
          "Cognitive behavioral techniques",
          "Meditation practices",
          "Journaling methods",
          "Breathing exercises",
        ],
        quote: "Discovery consists of seeing what everybody has seen.",
      },
    },
    {
      title: "Practice",
      desc: "Implementing daily rituals and exercises.",
      side: "left",
      icon: "🌱",
      innerContent: {
        title: "Building Your Practice",
        points: [
          "Morning mindfulness routine",
          "Evening reflection sessions",
          "Weekly progress reviews",
          "Community support circles",
        ],
        quote: "Practice makes progress, not perfection.",
      },
    },
    {
      title: "Clarity",
      desc: "Walking forward with renewed purpose.",
      side: "right",
      icon: "✨",
      innerContent: {
        title: "Achieving Mental Clarity",
        points: [
          "Clear decision-making skills",
          "Emotional resilience",
          "Purpose-driven living",
          "Sustainable well-being",
        ],
        quote: "Clarity comes from engagement, not thought.",
      },
    },
  ];

  // Book Card Component
  const BookCard = ({ step, index }) => {
    const isOpen = openBook === index;

    return (
      <div
        className="relative w-72 h-80 cursor-pointer"
        style={{ perspective: "1500px" }}
        onMouseEnter={() => setOpenBook(index)}
        onMouseLeave={() => setOpenBook(null)}
      >
        {/* Book Shadow */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            boxShadow: isOpen
              ? "20px 20px 60px rgba(63,41,101,0.25), -5px 5px 30px rgba(221,23,100,0.15)"
              : "10px 10px 30px rgba(63,41,101,0.15)",
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Back Page (Revealed Content) */}
        <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden">
          {/* Inner Content */}
          <div className="relative p-5 h-full flex flex-col">
            <motion.h4
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ delay: isOpen ? 0.3 : 0, duration: 0.3 }}
              className="text-lg font-bold text-[#3F2965] mb-3"
            >
              {step.innerContent.title}
            </motion.h4>

            <motion.ul
              className="space-y-2 flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ delay: isOpen ? 0.4 : 0, duration: 0.3 }}
            >
              {step.innerContent.points.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: isOpen ? 0 : -10, opacity: isOpen ? 1 : 0 }}
                  transition={{ delay: isOpen ? 0.4 + i * 0.1 : 0 }}
                  className="flex items-start gap-2 text-[#3F2965]/70 text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#3F2965] to-[#Dd1764] mt-1.5 shrink-0" />
                  {point}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ delay: isOpen ? 0.7 : 0 }}
              className="mt-3 p-3 bg-gradient-to-r from-[#3F2965]/5 to-[#Dd1764]/5 rounded-xl"
            >
              <p className="text-[#3F2965]/60 italic text-xs">
                "{step.innerContent.quote}"
              </p>
            </motion.div>
          </div>
        </div>

        {/* Book Spine */}
        <motion.div
          className="absolute top-0 bottom-0 w-2 bg-gradient-to-b from-[#3F2965] via-[#5a3d7a] to-[#Dd1764] rounded-l-sm z-10"
          style={{
            left: 0,
            transformOrigin: "left center",
          }}
          animate={{
            x: isOpen ? -4 : 0,
          }}
          transition={{ duration: 0.6, ease: [0.645, 0.045, 0.355, 1] }}
        />

        {/* Front Cover (Flips) */}
        <motion.div
          className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-[#3F2965] via-[#5a3d7a] to-[#Dd1764]"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "left center",
            backfaceVisibility: "hidden",
          }}
          animate={{
            rotateY: isOpen ? -160 : 0,
          }}
          transition={{
            duration: 0.6,
            ease: [0.645, 0.045, 0.355, 1],
          }}
        >
          {/* Front Face */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-6"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Decorative circles */}
            <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/10" />
            <div className="absolute bottom-8 left-4 w-10 h-10 rounded-full bg-white/10" />

            {/* Icon */}
            <motion.span
              className="text-5xl mb-4 relative z-10 drop-shadow-lg"
              animate={!isOpen ? { y: [0, -5, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {step.icon}
            </motion.span>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-2 text-center relative z-10">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-white/80 text-center text-sm mb-4 relative z-10">
              {step.desc}
            </p>

            {/* Hover instruction */}
            <motion.div
              className="flex items-center gap-2 text-white/90 text-xs font-medium relative z-10"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span>Hover to explore</span>
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.div>

            {/* Step number badge */}
            <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold text-sm">{index + 1}</span>
            </div>
          </div>

          {/* Back Face (visible when flipped) */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white rounded-2xl"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          />
        </motion.div>

        {/* Left page fold shadow when opening */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 bottom-0 left-0 w-6 bg-gradient-to-r from-black/20 to-transparent z-5 rounded-l-2xl"
              style={{ transformOrigin: "left" }}
            />
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, 
            #faf5ff 0%, 
            #f3e8ff 15%,
            #ede4ff 30%,
            #fce7f3 50%, 
            #fdf2f8 70%,
            #faf5ff 85%,
            #f5f3ff 100%
          )
        `,
      }}
    >
      {/* Decorative Top Wave */}
      <svg
        className="absolute top-0 left-0 w-full h-32 opacity-50"
        preserveAspectRatio="none"
        viewBox="0 0 1440 120"
      >
        <path
          fill="url(#topWaveGradient)"
          d="M0,60 C360,120 1080,0 1440,60 L1440,0 L0,0 Z"
        />
        <defs>
          <linearGradient
            id="topWaveGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="rgba(63,41,101,0.1)" />
            <stop offset="50%" stopColor="rgba(221,23,100,0.1)" />
            <stop offset="100%" stopColor="rgba(63,41,101,0.1)" />
          </linearGradient>
        </defs>
      </svg>

      <div className="max-w-6xl mx-auto relative px-4 pt-24">
        {/* Section Header */}
        <div className="text-center mb-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <span className="px-6 py-2 rounded-full bg-gradient-to-r from-[#3F2965]/10 to-[#Dd1764]/10 border border-[#3F2965]/20 text-[#Dd1764] font-bold tracking-[0.3em] uppercase text-sm">
              The Path Forward
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3F2965] via-[#7c3aed] to-[#Dd1764] mt-4"
          >
            Your Mental Wellness Journey
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[#3F2965]/60 text-xl mt-6 max-w-2xl mx-auto font-medium"
          >
            Hover over each milestone to open the book of knowledge
          </motion.p>

          {/* Animated Dots */}
          <motion.div
            className="flex justify-center gap-2 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-[#3F2965] to-[#Dd1764]"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </motion.div>
        </div>

        {/* SVG River Path */}
        <svg
          className="absolute left-1/2 -translate-x-1/2 top-64 w-full pointer-events-none z-0"
          style={{ height: "calc(100% - 16rem)" }}
          viewBox="0 0 400 1400"
          fill="none"
          preserveAspectRatio="xMidYMin slice"
        >
          <defs>
            <linearGradient
              id="riverGradientLight"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#3F2965" stopOpacity="0.3" />
              <stop offset="25%" stopColor="#7c3aed" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#Dd1764" stopOpacity="0.5" />
              <stop offset="75%" stopColor="#7c3aed" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3F2965" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Background Path */}
          <path
            d="M200,0 C350,180 50,360 200,540 C350,720 50,900 200,1080 C280,1200 200,1300 200,1400"
            stroke="rgba(63,41,101,0.08)"
            strokeWidth="50"
            strokeLinecap="round"
            fill="none"
          />

          {/* Dashed Guide Path */}
          <path
            d="M200,0 C350,180 50,360 200,540 C350,720 50,900 200,1080 C280,1200 200,1300 200,1400"
            stroke="rgba(63,41,101,0.15)"
            strokeWidth="2"
            strokeDasharray="10 10"
            fill="none"
          />

          {/* Animated Main Path */}
          <motion.path
            d="M200,0 C350,180 50,360 200,540 C350,720 50,900 200,1080 C280,1200 200,1300 200,1400"
            stroke="url(#riverGradientLight)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            style={{ pathLength }}
          />

          {/* End point circle */}
          <motion.circle
            cx="200"
            cy="1390"
            r="8"
            fill="#Dd1764"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>

        {/* Book Cards */}
        <div className="relative z-10">
          {milestones.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, type: "spring" }}
              className={`flex w-full mb-40 ${
                step.side === "left"
                  ? "justify-start pl-12"
                  : "justify-end pr-12"
              }`}
            >
              <BookCard step={step} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center pb-20 pt-8 relative z-10"
        >
          <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Button Glow */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[#3F2965] to-[#Dd1764] blur-xl opacity-40"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <Link to="/booking">
              <button className="relative px-12 py-5 rounded-full bg-gradient-to-r from-[#3F2965] via-[#5a3d7a] to-[#Dd1764] text-white font-bold text-lg shadow-2xl hover:shadow-[#Dd1764]/30 transition-shadow duration-300">
                <span className="flex items-center gap-3">
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    Start Your Journey📖
                  </motion.span>
                </span>
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default JourneySection;
