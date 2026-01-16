import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Search,
  BookOpen,
  Clock,
  ArrowRight,
  Heart,
  Bookmark,
  TrendingUp,
  Star,
  ExternalLink,
  Brain,
  Users,
  Smile,
  Lightbulb,
  Target,
} from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useAuth } from "../context/AuthContext";
import { IsLoginUser, IsVerifiedUser, IsProfileCompleteUser } from "../components/auth/Verification";

const ResourcesPage = () => {
  const containerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [savedArticles, setSavedArticles] = useState([]);
  const [likedArticles, setLikedArticles] = useState([]);
  const { user } = useAuth();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Categories
  const categories = [
    { id: "all", name: "All Resources", icon: BookOpen, count: 24 },
    { id: "anxiety", name: "Anxiety & Stress", icon: Brain, count: 6 },
    { id: "depression", name: "Depression", icon: Heart, count: 5 },
    { id: "relationships", name: "Relationships", icon: Users, count: 4 },
    { id: "self-care", name: "Self-Care", icon: Smile, count: 5 },
    { id: "mindfulness", name: "Mindfulness", icon: Target, count: 4 },
  ];

  // Curated Articles & Blogs
  const articles = [
    // Anxiety & Stress
    {
      id: 1,
      title: "Understanding Anxiety: Causes, Symptoms, and Coping Strategies",
      excerpt:
        "Learn about the different types of anxiety disorders and evidence-based techniques to manage anxiety in your daily life.",
      category: "anxiety",
      source: "Psychology Today",
      sourceUrl: "https://www.psychologytoday.com/us/basics/anxiety",
      readTime: "8 min read",
      date: "2024",
      featured: true,
      image:
        "https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=800",
      tags: ["Anxiety", "Mental Health", "Coping Skills"],
    },
    {
      id: 2,
      title: "10 Science-Backed Ways to Reduce Stress",
      excerpt:
        "Discover practical, research-proven methods to lower your stress levels and improve your overall well-being.",
      category: "anxiety",
      source: "Harvard Health",
      sourceUrl:
        "https://www.health.harvard.edu/mind-and-mood/top-ways-to-reduce-daily-stress",
      readTime: "6 min read",
      date: "2024",
      featured: false,
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
      tags: ["Stress Management", "Wellness", "Research"],
    },
    {
      id: 3,
      title: "The Connection Between Anxiety and Sleep",
      excerpt:
        "Explore how anxiety affects your sleep quality and learn strategies to break the cycle of sleepless nights.",
      category: "anxiety",
      source: "Sleep Foundation",
      sourceUrl:
        "https://www.sleepfoundation.org/mental-health/anxiety-and-sleep",
      readTime: "7 min read",
      date: "2024",
      featured: false,
      image:
        "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800",
      tags: ["Sleep", "Anxiety", "Health"],
    },
    {
      id: 4,
      title: "Breathing Exercises for Anxiety Relief",
      excerpt:
        "Master simple breathing techniques that can help calm your nervous system in moments of anxiety.",
      category: "anxiety",
      source: "Healthline",
      sourceUrl:
        "https://www.healthline.com/health/breathing-exercises-for-anxiety",
      readTime: "5 min read",
      date: "2024",
      featured: false,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
      tags: ["Breathing", "Techniques", "Anxiety Relief"],
    },
    {
      id: 5,
      title:
        "Social Anxiety: How to Feel More Comfortable in Social Situations",
      excerpt:
        "Practical tips and strategies for managing social anxiety and building confidence in social settings.",
      category: "anxiety",
      source: "Verywell Mind",
      sourceUrl:
        "https://www.verywellmind.com/social-anxiety-disorder-tips-3024209",
      readTime: "9 min read",
      date: "2024",
      featured: false,
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
      tags: ["Social Anxiety", "Confidence", "Social Skills"],
    },
    {
      id: 6,
      title: "Workplace Stress: Strategies for a Healthier Work Life",
      excerpt:
        "Learn how to manage work-related stress and create boundaries for better mental health at work.",
      category: "anxiety",
      source: "Mind",
      sourceUrl:
        "https://www.mind.org.uk/information-support/tips-for-everyday-living/workplace-mental-health/",
      readTime: "7 min read",
      date: "2024",
      featured: false,
      image:
        "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800",
      tags: ["Work Stress", "Boundaries", "Productivity"],
    },

    // Depression
    {
      id: 7,
      title: "Depression: What You Need to Know",
      excerpt:
        "A comprehensive guide to understanding depression, its symptoms, causes, and treatment options.",
      category: "depression",
      source: "National Institute of Mental Health",
      sourceUrl: "https://www.nimh.nih.gov/health/topics/depression",
      readTime: "12 min read",
      date: "2024",
      featured: true,
      image:
        "https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=800",
      tags: ["Depression", "Mental Health", "Treatment"],
    },
    {
      id: 8,
      title: "Cognitive Behavioral Therapy for Depression",
      excerpt:
        "Understand how CBT works and why it's one of the most effective treatments for depression.",
      category: "depression",
      source: "American Psychological Association",
      sourceUrl:
        "https://www.apa.org/ptsd-guideline/patients-and-families/cognitive-behavioral",
      readTime: "8 min read",
      date: "2024",
      featured: false,
      image:
        "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800",
      tags: ["CBT", "Therapy", "Depression Treatment"],
    },
    {
      id: 9,
      title: "The Role of Exercise in Managing Depression",
      excerpt:
        "Discover how physical activity can be a powerful tool in combating depression and improving mood.",
      category: "depression",
      source: "Mayo Clinic",
      sourceUrl:
        "https://www.mayoclinic.org/diseases-conditions/depression/in-depth/depression-and-exercise/art-20046495",
      readTime: "6 min read",
      date: "2024",
      featured: false,
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
      tags: ["Exercise", "Depression", "Physical Health"],
    },
    {
      id: 10,
      title: "Supporting a Loved One with Depression",
      excerpt:
        "Practical advice on how to help someone you care about who is struggling with depression.",
      category: "depression",
      source: "HelpGuide",
      sourceUrl:
        "https://www.helpguide.org/articles/depression/helping-someone-with-depression.htm",
      readTime: "10 min read",
      date: "2024",
      featured: false,
      image:
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800",
      tags: ["Support", "Family", "Caregiving"],
    },
    {
      id: 11,
      title: "Seasonal Affective Disorder: Light Therapy and Beyond",
      excerpt:
        "Learn about SAD and effective treatments including light therapy, lifestyle changes, and more.",
      category: "depression",
      source: "Cleveland Clinic",
      sourceUrl:
        "https://my.clevelandclinic.org/health/diseases/9293-seasonal-depression",
      readTime: "7 min read",
      date: "2024",
      featured: false,
      image:
        "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800",
      tags: ["SAD", "Light Therapy", "Seasonal"],
    },

    // Relationships
    {
      id: 12,
      title: "Building Healthy Communication in Relationships",
      excerpt:
        "Master the art of effective communication to strengthen your personal and professional relationships.",
      category: "relationships",
      source: "Gottman Institute",
      sourceUrl:
        "https://www.gottman.com/blog/category/column/relationship-research/",
      readTime: "9 min read",
      date: "2024",
      featured: true,
      image:
        "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
      tags: ["Communication", "Relationships", "Connection"],
    },
    {
      id: 13,
      title: "Setting Healthy Boundaries in Relationships",
      excerpt:
        "Learn why boundaries are essential and how to establish them while maintaining loving connections.",
      category: "relationships",
      source: "Psychology Today",
      sourceUrl: "https://www.psychologytoday.com/us/basics/boundaries",
      readTime: "8 min read",
      date: "2024",
      featured: false,
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800",
      tags: ["Boundaries", "Self-Respect", "Relationships"],
    },
    {
      id: 14,
      title: "Attachment Styles and How They Affect Your Relationships",
      excerpt:
        "Understanding your attachment style can transform how you relate to others and yourself.",
      category: "relationships",
      source: "Verywell Mind",
      sourceUrl: "https://www.verywellmind.com/attachment-styles-2795344",
      readTime: "11 min read",
      date: "2024",
      featured: false,
      image:
        "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800",
      tags: ["Attachment", "Psychology", "Self-Awareness"],
    },
    {
      id: 15,
      title: "Navigating Conflict in Relationships",
      excerpt:
        "Healthy conflict resolution strategies that can strengthen rather than damage your relationships.",
      category: "relationships",
      source: "HelpGuide",
      sourceUrl:
        "https://www.helpguide.org/articles/relationships-communication/conflict-resolution-skills.htm",
      readTime: "8 min read",
      date: "2024",
      featured: false,
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800",
      tags: ["Conflict", "Resolution", "Communication"],
    },

    // Self-Care
    {
      id: 16,
      title: "The Science of Self-Care: Why It Matters for Mental Health",
      excerpt:
        "Explore the research behind self-care practices and how they contribute to psychological well-being.",
      category: "self-care",
      source: "American Psychological Association",
      sourceUrl: "https://www.apa.org/monitor/2022/01/special-self-care",
      readTime: "7 min read",
      date: "2024",
      featured: true,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
      tags: ["Self-Care", "Wellness", "Research"],
    },
    {
      id: 17,
      title: "Creating a Self-Care Routine That Actually Works",
      excerpt:
        "Practical steps to build a sustainable self-care routine that fits your lifestyle and needs.",
      category: "self-care",
      source: "Mind",
      sourceUrl:
        "https://www.mind.org.uk/information-support/tips-for-everyday-living/self-care/",
      readTime: "6 min read",
      date: "2024",
      featured: false,
      image:
        "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800",
      tags: ["Routine", "Habits", "Self-Care"],
    },
    {
      id: 18,
      title: "Digital Detox: Reclaiming Your Mental Space",
      excerpt:
        "Learn how to create healthy boundaries with technology for better mental health and presence.",
      category: "self-care",
      source: "Healthline",
      sourceUrl: "https://www.healthline.com/health/digital-detox",
      readTime: "8 min read",
      date: "2024",
      featured: false,
      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800",
      tags: ["Digital Wellness", "Technology", "Balance"],
    },
    {
      id: 19,
      title: "The Power of Journaling for Mental Health",
      excerpt:
        "Discover how journaling can help process emotions, reduce stress, and improve self-awareness.",
      category: "self-care",
      source: "Positive Psychology",
      sourceUrl: "https://positivepsychology.com/journaling-for-mindfulness/",
      readTime: "7 min read",
      date: "2024",
      featured: false,
      image:
        "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800",
      tags: ["Journaling", "Writing", "Self-Reflection"],
    },
    {
      id: 20,
      title: "Sleep Hygiene: The Foundation of Mental Wellness",
      excerpt:
        "Improve your sleep quality with these evidence-based sleep hygiene practices.",
      category: "self-care",
      source: "Sleep Foundation",
      sourceUrl: "https://www.sleepfoundation.org/sleep-hygiene",
      readTime: "9 min read",
      date: "2024",
      featured: false,
      image:
        "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800",
      tags: ["Sleep", "Rest", "Health"],
    },

    // Mindfulness
    {
      id: 21,
      title: "Getting Started with Mindfulness Meditation",
      excerpt:
        "A beginner's guide to mindfulness meditation and how to incorporate it into your daily routine.",
      category: "mindfulness",
      source: "Mindful",
      sourceUrl:
        "https://www.mindful.org/meditation/mindfulness-getting-started/",
      readTime: "10 min read",
      date: "2024",
      featured: true,
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
      tags: ["Meditation", "Mindfulness", "Beginners"],
    },
    {
      id: 22,
      title: "The Neuroscience of Mindfulness",
      excerpt:
        "Explore how mindfulness practice actually changes your brain structure and function.",
      category: "mindfulness",
      source: "Harvard Gazette",
      sourceUrl:
        "https://news.harvard.edu/gazette/story/2018/04/harvard-researchers-study-how-mindfulness-may-change-the-brain-in-depressed-patients/",
      readTime: "8 min read",
      date: "2024",
      featured: false,
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800",
      tags: ["Neuroscience", "Brain", "Research"],
    },
    {
      id: 23,
      title: "Mindful Eating: A Path to a Healthier Relationship with Food",
      excerpt:
        "Learn how mindful eating can transform your relationship with food and improve overall well-being.",
      category: "mindfulness",
      source: "Harvard Health",
      sourceUrl:
        "https://www.health.harvard.edu/staying-healthy/mindful-eating",
      readTime: "6 min read",
      date: "2024",
      featured: false,
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800",
      tags: ["Mindful Eating", "Nutrition", "Awareness"],
    },
    {
      id: 24,
      title: "Body Scan Meditation for Stress Relief",
      excerpt:
        "A step-by-step guide to body scan meditation, a powerful technique for releasing tension.",
      category: "mindfulness",
      source: "Greater Good Science Center",
      sourceUrl:
        "https://greatergood.berkeley.edu/article/item/a_five_minute_body_scan_meditation",
      readTime: "5 min read",
      date: "2024",
      featured: false,
      image:
        "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?w=800",
      tags: ["Body Scan", "Relaxation", "Meditation"],
    },
  ];

  // Filter articles
  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      activeCategory === "all" || article.category === activeCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  // Featured articles
  const featuredArticles = articles.filter((article) => article.featured);

  // Toggle save article
  const toggleSave = (articleId) => {
    setSavedArticles((prev) =>
      prev.includes(articleId)
        ? prev.filter((id) => id !== articleId)
        : [...prev, articleId]
    );
  };

  // Toggle like article
  const toggleLike = (articleId) => {
    setLikedArticles((prev) =>
      prev.includes(articleId)
        ? prev.filter((id) => id !== articleId)
        : [...prev, articleId]
    );
  };

  // Article Card Component
  const ArticleCard = ({ article, index, featured = false }) => (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden ${
          featured ? "h-64 md:h-80" : "h-48"
        }`}
      >
        <motion.img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-[#3F2965] capitalize">
            {article.category.replace("-", " ")}
          </span>
        </div>

        {/* Actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          <motion.button
            onClick={() => toggleLike(article.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              likedArticles.includes(article.id)
                ? "bg-[#Dd1764] text-white"
                : "bg-white/90 backdrop-blur-sm text-gray-600 hover:text-[#Dd1764]"
            }`}
          >
            <Heart
              className={`w-4 h-4 ${
                likedArticles.includes(article.id) ? "fill-current" : ""
              }`}
            />
          </motion.button>
          <motion.button
            onClick={() => toggleSave(article.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              savedArticles.includes(article.id)
                ? "bg-[#3F2965] text-white"
                : "bg-white/90 backdrop-blur-sm text-gray-600 hover:text-[#3F2965]"
            }`}
          >
            <Bookmark
              className={`w-4 h-4 ${
                savedArticles.includes(article.id) ? "fill-current" : ""
              }`}
            />
          </motion.button>
        </div>

        {/* Source & Read Time */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-sm">
          <span className="flex items-center gap-1">
            <ExternalLink className="w-3 h-3" />
            {article.source}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3
          className={`font-bold text-[#3F2965] mb-3 group-hover:text-[#Dd1764] transition-colors line-clamp-2 ${
            featured ? "text-xl md:text-2xl" : "text-lg"
          }`}
        >
          {article.title}
        </h3>
        <p
          className={`text-gray-600 mb-4 line-clamp-2 ${
            featured ? "text-base" : "text-sm"
          }`}
        >
          {article.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-[#3F2965]/5 text-[#3F2965] text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Read More Link */}
        <motion.a
          href={article.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#Dd1764] font-semibold text-sm group/link"
          whileHover={{ x: 5 }}
        >
          Read Full Article
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </motion.a>
      </div>

      {/* Featured Badge */}
      {article.featured && (
        <div className="absolute top-4 left-4 z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#3F2965] to-[#Dd1764] text-white text-xs font-bold rounded-full"
          >
            <Star className="w-3 h-3 fill-current" />
            Featured
          </motion.div>
        </div>
      )}
    </motion.article>
  );

  return (
    <IsLoginUser user={user}>
      <IsVerifiedUser user={user}>
        <IsProfileCompleteUser user={user}>
          <>
            <Navbar />
            <div ref={containerRef} className="min-h-screen overflow-hidden">
              {/* Hero Section */}
              <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
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
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-gradient-to-br from-[#3F2965]/10 to-[#Dd1764]/10"
                      style={{
                        width: `${60 + i * 30}px`,
                        height: `${60 + i * 30}px`,
                        left: `${10 + i * 12}%`,
                        top: `${15 + (i % 4) * 20}%`,
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
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </motion.div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-16 text-center">
                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-serif font-bold mb-6"
                  >
                    <span className="text-[#3F2965]">Blogs & </span>
                    <span className="italic bg-gradient-to-r from-[#Dd1764] via-[#7c3aed] to-[#3F2965] bg-clip-text text-transparent">
                      Articles
                    </span>
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-[#3F2965]/70 text-lg md:text-xl max-w-2xl mx-auto mb-10"
                  >
                    Curated mental health resources from trusted sources to
                    support your wellness journey
                  </motion.p>

                  {/* Stats */}
                  {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-8 mt-10"
            >
              {[
                { label: "Articles", value: "24+", icon: BookOpen },
                { label: "Categories", value: "5", icon: Filter },
                { label: "Trusted Sources", value: "12+", icon: Shield },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-[#Dd1764]" />
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-[#3F2965]">{stat.value}</p>
                    <p className="text-sm text-[#3F2965]/60">{stat.label}</p>
                  </div>
                </div>
              ))}
            </motion.div> */}
                </div>
              </section>

              {/* Categories Section */}
              <section className="py-8 bg-white/50 backdrop-blur-sm sticky top-0 z-30 border-b border-[#3F2965]/10">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map((category, index) => (
                      <motion.button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center gap-2 px-5 py-3 rounded-full whitespace-nowrap transition-all ${
                          activeCategory === category.id
                            ? "bg-gradient-to-r from-[#3F2965] to-[#Dd1764] text-white shadow-lg"
                            : "bg-white text-[#3F2965] hover:bg-[#3F2965]/5 border border-[#3F2965]/10"
                        }`}
                      >
                        <category.icon className="w-4 h-4" />
                        <span className="font-medium text-sm">
                          {category.name}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            activeCategory === category.id
                              ? "bg-white/20"
                              : "bg-[#3F2965]/10"
                          }`}
                        >
                          {category.count}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </section>

              {/* Featured Articles */}
              <section className="py-16 bg-gradient-to-b from-[#faf5ff] to-white">
                <div className="max-w-7xl mx-auto px-6">
                  {/* Section Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between mb-10"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-[#Dd1764]" />
                        <span className="text-[#Dd1764] font-bold tracking-wider uppercase text-sm">
                          Featured
                        </span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#3F2965]">
                        Editor's{" "}
                        <span className="italic text-[#Dd1764]">Picks</span>
                      </h2>
                    </div>
                  </motion.div>

                  {/* Featured Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredArticles.slice(0, 3).map((article, index) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        index={index}
                        featured={index === 0}
                      />
                    ))}
                  </div>
                </div>
              </section>

              {/* All Articles */}
              <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                  {/* Section Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between mb-10"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-5 h-5 text-[#Dd1764]" />
                        <span className="text-[#Dd1764] font-bold tracking-wider uppercase text-sm">
                          All Resources
                        </span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#3F2965]">
                        Browse{" "}
                        <span className="italic text-[#Dd1764]">
                          {activeCategory === "all"
                            ? "All Articles"
                            : categories.find((c) => c.id === activeCategory)
                                ?.name}
                        </span>
                      </h2>
                    </div>
                    <p className="text-[#3F2965]/60">
                      {filteredArticles.length} article
                      {filteredArticles.length !== 1 ? "s" : ""} found
                    </p>
                  </motion.div>

                  {/* Articles Grid */}
                  {filteredArticles.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredArticles.map((article, index) => (
                        <ArticleCard
                          key={article.id}
                          article={article}
                          index={index}
                        />
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-20"
                    >
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#3F2965]/10 flex items-center justify-center">
                        <Search className="w-10 h-10 text-[#3F2965]/40" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#3F2965] mb-3">
                        No articles found
                      </h3>
                      <p className="text-[#3F2965]/60 mb-6">
                        Try adjusting your search or filter criteria
                      </p>
                      <motion.button
                        onClick={() => {
                          setSearchQuery("");
                          setActiveCategory("all");
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gradient-to-r from-[#3F2965] to-[#Dd1764] text-white font-bold rounded-full"
                      >
                        Clear Filters
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </section>

              {/* Resources CTA */}
              <section className="py-20 relative overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, #3F2965 0%, #5a3d7a 50%, #Dd1764 100%)`,
                  }}
                />

                {/* Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 2.5 }}
                  />
                </div>

                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <Lightbulb className="w-16 h-16 text-white/80 mx-auto mb-6" />
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
                      Need Personalized Support?
                    </h2>
                    <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
                      While these resources are helpful, sometimes we need
                      personalized guidance. Book a session with our mental
                      wellness experts.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <motion.a
                        href="/booking"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-white text-[#3F2965] font-bold rounded-full shadow-xl hover:shadow-2xl transition-shadow"
                      >
                        Book a Session
                      </motion.a>
                      <motion.a
                        href="/aboutus"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full border border-white/30 hover:bg-white/20 transition-colors"
                      >
                        Learn About Us
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Newsletter Section */}
              <section className="py-16 bg-gradient-to-b from-white to-[#faf5ff]">
                <div className="max-w-4xl mx-auto px-6">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#3F2965]/5"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#3F2965]/10 to-[#Dd1764]/10 flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-[#Dd1764]" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#3F2965] mb-4">
                        Stay Updated with Mental Wellness Tips
                      </h3>
                      <p className="text-[#3F2965]/60 mb-8 max-w-lg mx-auto">
                        Follow us on social media for daily insights, resources,
                        and support on your wellness journey.
                      </p>

                      <div className="flex justify-center gap-4">
                        <motion.a
                          href="https://www.instagram.com/mindsettlerbypb"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-12 h-12 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] flex items-center justify-center text-white shadow-lg"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        </motion.a>
                        <motion.a
                          href="https://www.linkedin.com/in/parnika-bajaj-190719195/"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-12 h-12 rounded-full bg-[#0A66C2] flex items-center justify-center text-white shadow-lg"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>
            </div>
            <Footer />
          </>
        </IsProfileCompleteUser>
      </IsVerifiedUser>
    </IsLoginUser>
  );
};

export default ResourcesPage;
