import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Assuming you use React Router
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const BlogDetail = () => {
  // 1. Get the ID from the URL (e.g., /blog/1)
  const { id } = useParams();
  const [post, setPost] = useState(null);

  // Brand Colors (Matching your Palette)
  const colors = {
    primaryPurple: '#3F2965', // Deep Purple
    accentPink: '#Dd1764',    // Vibrat Pink
    bgLight: '#fdfbfd',       // Light Tint
    textMain: '#2D2D2D',      // Dark Gray for readability
    textLight: '#666666',     // Light Gray for metadata
  };

  // 2. Mock Data (Ideally, this comes from a shared file or API)
  // We include 'content' here which is the full article text.
  const allPosts = [
    {
      id: 1,
      category: 'MindSettler Insights',
      title: 'Challenges in Counselling: Common Difficulties Therapists and Clients Face',
      date: 'Oct 12, 2025',
      author: 'Dr. A. Sharma',
      image: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      content: `
        <p class="mb-4">Therapy is a journey of self-discovery, but it isn't without its hurdles. Both therapists and clients often face resistance during the initial stages of the process. Trust is the foundation of any successful session, yet building it takes time.</p>
        <h3 class="text-xl font-bold mt-6 mb-3" style="color:${colors.primaryPurple}">1. The Fear of Vulnerability</h3>
        <p class="mb-4">Opening up to a stranger is intimidating. Clients often fear judgment, which leads to withholding information. This "filtering" can slow down progress. At MindSettler, we emphasize a non-judgmental space to combat this specific anxiety.</p>
        <h3 class="text-xl font-bold mt-6 mb-3" style="color:${colors.primaryPurple}">2. Managing Expectations</h3>
        <p class="mb-4">Many individuals expect immediate results. However, mental health healing is rarely linear. It involves peaks and valleys. Educating clients about the 'process' versus the 'outcome' is a critical first step.</p>
        <p class="mb-4">Understanding these challenges helps us create better frameworks for healing. Whether you are a practitioner or seeking help, patience is your strongest ally.</p>
      `
    },
    {
      id: 2,
      category: 'Professional Growth',
      title: 'How to Close a Private Therapy Practice in India',
      date: 'Nov 05, 2025',
      author: 'R. Verma',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      content: `<p>Closing a practice is as complex as starting one. It involves ethical considerations regarding client handovers, record retention, and emotional closure...</p>`
    },
    {
      id: 3,
      category: 'Anxiety & Stress',
      title: 'Confidence Therapy Online: How It Helps You Rebuild Self-Trust',
      date: 'Dec 20, 2025',
      author: 'S. Gupta',
      image: 'https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      content: `<p>Confidence isn't just about being loud; it's about trusting your own decisions. Online therapy provides a safe, controlled environment to practice these skills...</p>`
    },
  ];

  // 3. Find the post when component mounts
  useEffect(() => {
    // In a real app, you would fetch data here. 
    // For now, we find the post from our array matching the ID.
    const foundPost = allPosts.find(p => p.id === parseInt(id));
    setPost(foundPost);
    
    // Scroll to top when opening a new page
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen mt-30" style={{ backgroundColor: colors.bgLight }}>
        
        {/* --- Header / Hero Section --- */}
        <div className="w-full h-64 md:h-96 relative">
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white max-w-7xl mx-auto">
                <span 
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 bg-white"
                  style={{ color: colors.accentPink }}
                >
                  {post.category}
                </span>
                <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-2">
                  {post.title}
                </h1>
                <div className="flex items-center text-sm md:text-base opacity-90 gap-4">
                  <span>By {post.author}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
            </div>
        </div>

        {/* --- Main Content Layout --- */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Breadcrumb Navigation */}
          <div className="mb-8 text-sm">
            <Link to="/" className="hover:underline" style={{ color: colors.textLight }}>Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blogs" className="hover:underline" style={{ color: colors.textLight }}>Blogs</Link>
            <span className="mx-2">/</span>
            <span style={{ color: colors.accentPink }}>Current Post</span>
          </div>

          {/* Article Body */}
          <article className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
            {/* We use dangerouslySetInnerHTML to render the HTML string from mock data */}
            <div 
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Divider */}
            <hr className="my-8 border-gray-200" />

            {/* Bottom Call to Action */}
            <div className="flex flex-col md:flex-row items-center justify-between bg-purple-50 p-6 rounded-xl border border-purple-100">
                <div>
                    <h4 className="font-bold text-lg" style={{ color: colors.primaryPurple }}>Need help with this topic?</h4>
                    <p className="text-sm text-gray-600">Book a session with our experts today.</p>
                </div>
                <Link to="/booking">
                <button 
                    className="mt-4 md:mt-0 px-6 py-2 rounded-lg text-white font-semibold transition-transform transform hover:scale-105"
                    style={{ backgroundColor: colors.accentPink }}
                >
                    Book Consultation
                </button>
                </Link>
            </div>
          </article>

          {/* Navigation Button */}
          <div className="mt-8">
            <Link 
              to="/blogs" 
              className="inline-flex items-center font-semibold hover:underline"
              style={{ color: colors.primaryPurple }}
            >
              ← Back to all articles
            </Link>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default BlogDetail;