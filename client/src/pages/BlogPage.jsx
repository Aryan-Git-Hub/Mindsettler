import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Link } from "react-router";

const BlogPage = () => {
  // Brand Colors based on your palette
  const colors = {
    primaryPurple: "#3F2965",
    accentPink: "#Dd1764",
    bgLight: "#fdfbfd", // Very subtle pink/purple tint for page background
  };

  // Mock Data matching your reference image + MindSettler context
  const blogPosts = [
    {
      id: 1,
      category: "MindSettler Insights",
      title:
        "Challenges in Counselling: Common Difficulties Therapists and Clients Face",
      image:
        "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Placeholder: Therapy room
      link: "#",
    },
    {
      id: 2,
      category: "Professional Growth",
      title: "How to Close a Private Therapy Practice in India",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Placeholder: Office desk
      link: "#",
    },
    {
      id: 3,
      category: "Anxiety & Stress",
      title: "Confidence Therapy Online: How It Helps You Rebuild Self-Trust",
      image:
        "https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Placeholder: Person reading/relaxing
      link: "#",
    },
    // Added a 4th example to show grid wrapping
    {
      id: 4,
      category: "Self-Help",
      title: "Navigating Life Challenges Through Structured Sessions",
      image:
        "https://images.unsplash.com/photo-1499209974431-276138d71629?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "#",
    },
  ];

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen mt-20 py-16 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: colors.bgLight }}
      >
        {/* Grid Section */}
        <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              {/* Image Container */}
              <div className="shrink-0 h-48 overflow-hidden">
                <img
                  className="h-full w-full object-cover transform hover:scale-105 transition-transform duration-500"
                  src={post.image}
                  alt={post.title}
                />
              </div>

              {/* Content Container */}
              <div className="flex-1 flex flex-col justify-between p-6 bg-white">
                <div className="flex-1">
                  {/* Category Tag */}
                  <p
                    className="text-sm font-bold mb-2"
                    style={{ color: colors.accentPink }}
                  >
                    {post.category}
                  </p>

                  {/* Title */}
                  <Link to={`/blog/${post.id}`} className="block mt-2">
                    <h3
                      className="text-xl font-bold..."
                      style={{ color: colors.primaryPurple }}
                    >
                      {post.title}
                    </h3>
                  </Link>
                </div>

                {/* Read Post Link */}
                <div className="mt-6 flex items-center">
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-base font-semibold hover:underline group flex items-center gap-1"
                    style={{ color: colors.accentPink }}
                  >
                    Read Post
                    <span className="transform group-hover:translate-x-1 transition-transform">
                      »
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
