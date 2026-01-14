import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import introVideo from "../assets/video/IMG_2808.MOV";
import { Link } from "react-router";

const AboutUsPage = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("education");
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Video control functions
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(progress);
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
      setIsVideoLoaded(true);
    }
  };

  const handleProgressClick = (e) => {
    if (videoRef.current) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const clickPosition = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = clickPosition * videoRef.current.duration;
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
    setVideoProgress(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Auto-hide controls when playing
  useEffect(() => {
    let timeout;
    if (isVideoPlaying) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    } else {
      setShowControls(true);
    }
    return () => clearTimeout(timeout);
  }, [isVideoPlaying]);

  const handleMouseMove = () => {
    setShowControls(true);
    if (isVideoPlaying) {
      setTimeout(() => setShowControls(false), 3000);
    }
  };

  const founderData = {
    name: "Parnika Bajaj",
    role: "Founder & Mental Wellness Advocate",
    tagline: "Transforming mental wellness, one mind at a time",
    story: `I founded MindSettler in April 2023 with a single goal: to make mental wellness accessible, approachable, and truly transformative.
            During my years studying psychology across two continents, I realized that awareness wasn't the problem. The real barriers were accessibility and the fear of judgment.`,
    mission: `This platform offers you a safe, confidential sanctuary where healing is:  
1. Personalized to your unique journey.
2. Evidence-based for real results.
3. Deeply empathetic to your needs.`,
    education: [
      {
        degree: "Master of Arts in Counseling Psychology",
        institution: "Golden Gate University",
        year: "2022",
        icon: "🎓",
      },
      {
        degree: "Bachelor of Science (Hons) in Psychology",
        institution: "University of Edinburgh",
        year: "2018 - 2022",
        icon: "📚",
      },
    ],
    experience: [
      {
        title: "Founder of MindSettler",
        period: "April 2023 - Present",
        description: "Building a platform that prioritizes mental wellness",
      },
      {
        title: "Mental Health Counselor",
        period: "2+ years",
        description:
          "Specialized in anxiety, depression, and relationship counseling",
      },
      {
        title: "Therapeutic Practitioner",
        period: "Ongoing",
        description: "Trained in evidence-based therapeutic approaches",
      },
    ],
    values: [
      {
        title: "Empathy First",
        description: "Understanding before advising",
        icon: "💜",
      },
      {
        title: "Evidence-Based",
        description: "Science-backed approaches",
        icon: "🔬",
      },
      {
        title: "Accessibility",
        description: "Mental health for everyone",
        icon: "🌍",
      },
      {
        title: "Confidentiality",
        description: "Your privacy, always protected",
        icon: "🔒",
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div ref={containerRef} className="min-h-screen overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0 z-0"
            style={{ y: backgroundY }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse at 20% 20%, rgba(63,41,101,0.15) 0%, transparent 50%),
                  radial-gradient(ellipse at 80% 80%, rgba(221,23,100,0.1) 0%, transparent 50%),
                  radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 70%),
                  linear-gradient(135deg, #faf5ff 0%, #f3e8ff 25%, #fce7f3 50%, #fdf2f8 75%, #f5f3ff 100%)
                `,
              }}
            />

            {/* Floating Elements */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-br from-[#3F2965]/10 to-[#Dd1764]/10"
                style={{
                  width: `${80 + i * 40}px`,
                  height: `${80 + i * 40}px`,
                  left: `${10 + i * 15}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            ))}
          </motion.div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto mt-20 px-6 py-20">
            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-4">
                <span className="text-[#3F2965]">Meet the </span>
                <span className="italic bg-gradient-to-r from-[#Dd1764] via-[#7c3aed] to-[#3F2965] bg-clip-text text-transparent">
                  Founder
                </span>
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-[#3F2965]/60 text-lg md:text-xl max-w-2xl mx-auto font-medium"
              >
                Learn about the vision, education, and experience behind
                MindSettler
              </motion.p>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Video Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                {/* Decorative Frame */}
                <div className="absolute -inset-4 bg-gradient-to-br from-[#3F2965]/20 via-[#7c3aed]/10 to-[#Dd1764]/20 rounded-3xl blur-2xl" />

                <div className="relative">
                  {/* Corner Decorations */}
                  <div className="absolute -top-3 -left-3 w-12 h-12 border-t-4 border-l-4 border-[#3F2965]/30 rounded-tl-2xl" />
                  <div className="absolute -top-3 -right-3 w-12 h-12 border-t-4 border-r-4 border-[#Dd1764]/30 rounded-tr-2xl" />
                  <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-4 border-l-4 border-[#Dd1764]/30 rounded-bl-2xl" />
                  <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-4 border-r-4 border-[#3F2965]/30 rounded-br-2xl" />

                  {/* Video Container */}
                  <div
                    className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden shadow-2xl"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => isVideoPlaying && setShowControls(false)}
                  >
                    {/* Watch Introduction Badge */}
                    <AnimatePresence>
                      {(!isVideoPlaying || showControls) && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="absolute top-4 left-1/2 -translate-x-1/2 z-20"
                        >
                          <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-[#3F2965] text-xs font-bold tracking-wider uppercase shadow-lg border border-[#3F2965]/10">
                            Watch Introduction
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* ==================== VIDEO PLAYER ==================== */}
                    <div className="relative aspect-[3/4] bg-black">
                      {/* Video Element */}
                      <video
                        ref={videoRef}
                        className="absolute inset-0 w-full h-full object-cover"
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onEnded={handleVideoEnd}
                        onPlay={() => setIsVideoPlaying(true)}
                        onPause={() => setIsVideoPlaying(false)}
                        playsInline
                        preload="metadata"
                        // ========== CHOOSE YOUR VIDEO SOURCE ==========
                        // Option 1: Video from public folder
                        // src="/videos/intro-video.mp4"
                        // Option 2: Video from assets (import at top)
                        src={introVideo}
                        // Option 3: External URL (YouTube, Vimeo won't work directly - use embed)
                        // src="https://www.w3schools.com/html/mov_bbb.mp4"
                        // Option 4: Sample video for testing
                        // src="https://www.instagram.com/p/DQ_Nzguk50a/"
                        // ==============================================
                        poster="/images/video-poster.jpg" // Optional thumbnail
                      />

                      {/* Loading Indicator */}
                      {!isVideoLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#3F2965]/10 to-[#Dd1764]/10">
                          <motion.div
                            className="w-16 h-16 border-4 border-[#3F2965]/20 border-t-[#Dd1764] rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        </div>
                      )}

                      {/* Play Button Overlay */}
                      <AnimatePresence>
                        {!isVideoPlaying && isVideoLoaded && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 flex items-center justify-center bg-black/30"
                          >
                            <motion.button
                              onClick={handlePlayPause}
                              className="relative group"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {/* Glow Effect */}
                              <motion.div
                                className="absolute inset-0 bg-[#Dd1764] rounded-full blur-xl opacity-40"
                                animate={{
                                  scale: [1, 1.2, 1],
                                  opacity: [0.4, 0.6, 0.4],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                              {/* Button */}
                              <div className="relative w-20 h-20 bg-gradient-to-br from-[#3F2965] to-[#Dd1764] rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-[#Dd1764]/50 transition-shadow">
                                <svg
                                  className="w-8 h-8 text-white ml-1"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </motion.button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Video Controls */}
                      <AnimatePresence>
                        {(showControls || !isVideoPlaying) && isVideoLoaded && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 pt-12"
                          >
                            <div className="flex flex-col gap-3">
                              {/* Progress Bar */}
                              <div
                                className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer group relative"
                                onClick={handleProgressClick}
                              >
                                {/* Buffer Bar (optional - for streaming) */}
                                <div
                                  className="absolute h-full bg-white/30 rounded-full"
                                  style={{ width: "100%" }}
                                />
                                {/* Progress Bar */}
                                <motion.div
                                  className="h-full bg-gradient-to-r from-[#Dd1764] to-[#3F2965] rounded-full relative"
                                  style={{ width: `${videoProgress}%` }}
                                >
                                  {/* Scrubber Handle */}
                                  <motion.div
                                    className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                    whileHover={{ scale: 1.2 }}
                                  />
                                </motion.div>
                              </div>

                              {/* Controls Row */}
                              <div className="flex items-center gap-4 text-white">
                                {/* Play/Pause Button */}
                                <motion.button
                                  onClick={handlePlayPause}
                                  className="hover:text-[#Dd1764] transition-colors p-1"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  {isVideoPlaying ? (
                                    <svg
                                      className="w-6 h-6"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                    </svg>
                                  ) : (
                                    <svg
                                      className="w-6 h-6"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M8 5v14l11-7z" />
                                    </svg>
                                  )}
                                </motion.button>

                                {/* Time Display */}
                                <span className="font-mono text-sm text-white/80">
                                  {formatTime(currentTime)} /{" "}
                                  {formatTime(videoDuration)}
                                </span>

                                {/* Spacer */}
                                <div className="flex-1" />

                                {/* Volume/Mute Button */}
                                <motion.button
                                  onClick={handleMuteToggle}
                                  className="hover:text-[#Dd1764] transition-colors p-1"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  {isMuted ? (
                                    <svg
                                      className="w-6 h-6"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                                    </svg>
                                  ) : (
                                    <svg
                                      className="w-6 h-6"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                                    </svg>
                                  )}
                                </motion.button>

                                {/* Fullscreen Button */}
                                <motion.button
                                  onClick={handleFullscreen}
                                  className="hover:text-[#Dd1764] transition-colors p-1"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                                  </svg>
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {/* ==================== END VIDEO PLAYER ==================== */}
                  </div>

                  {/* Floating Stats */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="absolute -right-6 top-1/4 bg-white rounded-2xl shadow-xl p-4 border border-[#3F2965]/10"
                  >
                    <div className="text-center">
                      <span className="text-3xl font-bold bg-gradient-to-r from-[#3F2965] to-[#Dd1764] bg-clip-text text-transparent">
                        2+
                      </span>
                      <p className="text-xs text-[#3F2965]/60 font-medium">
                        Years Experience
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                    className="absolute -left-6 bottom-1/4 bg-white rounded-2xl shadow-xl p-4 border border-[#Dd1764]/10"
                  >
                    <div className="text-center">
                      <span className="text-3xl font-bold bg-gradient-to-r from-[#Dd1764] to-[#3F2965] bg-clip-text text-transparent">
                        1K+
                      </span>
                      <p className="text-xs text-[#3F2965]/60 font-medium">
                        Lives Touched
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Content Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-8"
              >
                {/* Founder Name & Title */}
                <div>
                  <motion.h2
                    className="text-3xl md:text-4xl font-serif font-bold text-[#3F2965] mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {founderData.name}
                  </motion.h2>
                  <motion.p
                    className="text-[#Dd1764] font-medium tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    {founderData.role}
                  </motion.p>
                </div>

                {/* Story */}
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <p className="text-[#3F2965]/80 leading-relaxed text-lg">
                    {founderData.story}
                  </p>
                  <p className="text-[#3F2965]/70 leading-relaxed whitespace-pre-line">
                    {founderData.mission}
                  </p>
                </motion.div>

                {/* Tabs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  {/* Tab Headers */}
                  <div className="flex gap-6 mb-6 border-b border-[#3F2965]/10 pb-2">
                    {["education", "experience"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`relative text-sm font-bold tracking-[0.2em] uppercase transition-colors ${
                          activeTab === tab
                            ? "text-[#Dd1764]"
                            : "text-[#3F2965]/40 hover:text-[#3F2965]/70"
                        }`}
                      >
                        {tab}
                        {activeTab === tab && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#3F2965] to-[#Dd1764] rounded-full"
                          />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <AnimatePresence mode="wait">
                    {activeTab === "education" && (
                      <motion.div
                        key="education"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        {founderData.education.map((edu, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-white to-[#3F2965]/5 border border-[#3F2965]/10 hover:shadow-lg transition-shadow"
                          >
                            <span className="text-2xl">{edu.icon}</span>
                            <div>
                              <h4 className="font-bold text-[#3F2965]">
                                {edu.degree}
                              </h4>
                              <p className="text-[#3F2965]/60 text-sm">
                                {edu.institution}
                              </p>
                              <span className="text-xs text-[#Dd1764] font-medium">
                                {edu.year}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}

                    {activeTab === "experience" && (
                      <motion.div
                        key="experience"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        {founderData.experience.map((exp, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative pl-6 border-l-2"
                            style={{
                              borderImage:
                                "linear-gradient(to bottom, #3F2965, #Dd1764) 1",
                            }}
                          >
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gradient-to-br from-[#3F2965] to-[#Dd1764]" />
                            <h4 className="font-bold text-[#3F2965]">
                              {exp.title}
                            </h4>
                            <span className="text-xs text-[#Dd1764] font-medium">
                              {exp.period}
                            </span>
                            <p className="text-[#3F2965]/60 text-sm mt-1">
                              {exp.description}
                            </p>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#3F2965] to-[#Dd1764] text-white font-bold rounded-full shadow-xl overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#Dd1764] to-[#3F2965] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative">Learn More</span>
                    <motion.span
                      className="relative"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-gradient-to-b from-[#f5f3ff] to-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#3F2965]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#Dd1764]/10 rounded-full blur-3xl" />
          </div>

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-[#Dd1764] font-bold tracking-[0.3em] uppercase text-sm">
                Our Foundation
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#3F2965] mt-4">
                Core <span className="italic text-[#Dd1764]">Values</span>
              </h2>
              <p className="text-[#3F2965]/60 mt-4 max-w-xl mx-auto">
                The principles that guide every interaction at MindSettler
              </p>
            </motion.div>

            {/* Values Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {founderData.values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg border border-[#3F2965]/5 overflow-hidden"
                >
                  {/* Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3F2965]/5 to-[#Dd1764]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon */}
                  <motion.span
                    className="text-4xl block mb-4 relative z-10"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  >
                    {value.icon}
                  </motion.span>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[#3F2965] mb-2 relative z-10">
                    {value.title}
                  </h3>
                  <p className="text-[#3F2965]/60 text-sm relative z-10">
                    {value.description}
                  </p>

                  {/* Corner Accent */}
                  <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-[#3F2965]/10 to-[#Dd1764]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-24 relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, #3F2965 0%, #5a3d7a 50%, #Dd1764 100%)`,
            }}
          />

          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-10 left-10 text-white/10 text-[200px] font-serif leading-none"
              animate={{ opacity: [0.05, 0.1, 0.05] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              "
            </motion.div>
            <motion.div
              className="absolute bottom-10 right-10 text-white/10 text-[200px] font-serif leading-none rotate-180"
              animate={{ opacity: [0.05, 0.1, 0.05] }}
              transition={{ duration: 5, repeat: Infinity, delay: 2.5 }}
            >
              "
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.blockquote
                className="text-2xl md:text-4xl font-serif text-white leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                "Mental health is not a destination, but a process. It's about
                how you drive, not where you're going."
              </motion.blockquote>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center gap-4"
              >
                <div className="w-12 h-0.5 bg-white/30 rounded-full" />
                <span className="text-white/80 font-medium">Parnika Bajaj</span>
                <div className="w-12 h-0.5 bg-white/30 rounded-full" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-b from-white to-[#faf5ff] relative">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[#Dd1764] font-bold tracking-[0.3em] uppercase text-sm">
                Ready to Begin?
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#3F2965] mt-4 mb-6">
                Start Your{" "}
                <span className="italic text-[#Dd1764]">Wellness Journey</span>
              </h2>
              <p className="text-[#3F2965]/60 mb-10 max-w-xl mx-auto">
                Join thousands who have already taken the first step towards
                better mental health with MindSettler.
              </p>

                <Link to="/booking">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group px-10 py-5 bg-gradient-to-r from-[#3F2965] via-[#5a3d7a] to-[#Dd1764] text-white font-bold text-lg rounded-full shadow-2xl overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#Dd1764] via-[#5a3d7a] to-[#3F2965] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <span className="relative flex items-center gap-3">
                  Get Started Today
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
              </Link>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap justify-center gap-6 mt-12"
              >
                {[
                  "🔒 100% Confidential",
                  "💜 Evidence-Based",
                  "🌟 Personalized Care",
                ].map((badge, i) => (
                  <span
                    key={i}
                    className="text-[#3F2965]/60 text-sm font-medium"
                  >
                    {badge}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutUsPage;