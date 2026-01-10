import React, { useEffect, useState, useRef } from 'react';
import { ShieldCheck, Users, RefreshCw, Building2 } from 'lucide-react';

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Logic to trigger animation when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const stats = [
    {
      id: 1,
      icon: <ShieldCheck className="w-10 h-10 mb-4 text-[#Dd1764]" />, // Pink accent icon
      value: 100,
      suffix: "%",
      label: "Safe and Confidential",
    },
    {
      id: 2,
      icon: <Users className="w-10 h-10 mb-4 text-[#Dd1764]" />,
      value: 400,
      suffix: "+",
      label: "Sessions Delivered",
    },
    {
      id: 3,
      icon: <RefreshCw className="w-10 h-10 mb-4 text-[#Dd1764]" />,
      value: 80,
      suffix: "%",
      label: "Repeated Clients",
    },
    {
      id: 4,
      icon: <Building2 className="w-10 h-10 mb-4 text-[#Dd1764]" />,
      value: 10,
      suffix: "+",
      label: "Corporate Partners",
    },
  ];

  return (
    <div 
      ref={sectionRef} 
      className="bg-[#3F2965] py-4 w-full text-white relative overflow-hidden"
    >
      {/* Decorative background circle for subtle texture */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-white/10">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center p-4 group">
              {/* Icon with hover bounce effect */}
              <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                {stat.icon}
              </div>
              
              {/* Animated Number */}
              <h3 className="text-4xl lg:text-5xl font-bold mb-2 font-mono">
                <Counter end={stat.value} duration={2000} isVisible={isVisible} />
                {stat.suffix}
              </h3>
              
              {/* Label */}
              <p className="text-gray-300 font-medium text-sm lg:text-base tracking-wide uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper Component for the Number Animation
const Counter = ({ end, duration, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      // Calculate current count based on progress
      const nextCount = Math.min(
        Math.floor((progress / duration) * end),
        end
      );

      setCount(nextCount);

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return <span>{count}</span>;
};

export default StatsSection;