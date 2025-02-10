import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Code, Terminal, BookOpen } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initialize Intersection Observer for fade-in animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0');
            entry.target.classList.add('translate-y-0');
            entry.target.classList.remove('translate-y-10');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    // Observe all elements with animation class
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0A0A0A]">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1A1A1A_1px,transparent_1px)] bg-[length:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFD700]/10 rounded-full filter blur-3xl animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#B8860B]/10 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl w-full space-y-16 py-32">
            <div className="text-center space-y-8">
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
                <span className="block text-white opacity-90">Master Code</span>
                <span className="block mt-2 bg-gradient-to-r from-[#FFD700] via-[#FDB347] to-[#B8860B] bg-clip-text text-transparent">
                  Through Understanding
                </span>
              </h1>
              <p className="max-w-2xl mx-auto text-xl text-gray-300/80">
                Break through language barriers and learn programming concepts that truly matter.
                Compare, understand, and master any programming language naturally.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <button
                  onClick={() => navigate('/auth?mode=signup')}
                  className="group relative px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#B8860B] rounded-full text-black font-semibold text-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]"
                >
                  <span className="relative flex items-center">
                    Start Learning Now
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-500" />
                  </span>
                </button>
                <button
                  onClick={() => navigate('/learn?mode=compare')}
                  className="px-8 py-4 border-2 border-[#FFD700]/30 text-white rounded-full font-semibold text-lg transition-all duration-500 hover:border-[#FFD700] hover:bg-[#FFD700]/5 hover:shadow-[0_0_30px_rgba(255,215,0,0.1)]"
                >
                  Try Interactive Demo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Terminal,
                title: 'Interactive Learning',
                description: 'Write and execute code directly in your browser with real-time feedback and syntax highlighting.',
              },
              {
                icon: Code,
                title: 'Language Mastery',
                description: 'Master new programming languages by understanding their similarities and differences.',
              },
              {
                icon: BookOpen,
                title: 'Structured Progress',
                description: 'Follow a carefully crafted learning path that builds upon your existing knowledge.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 group p-8 rounded-3xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] hover:border-[#FFD700]/20 hover:bg-white/[0.05]"
              >
                <feature.icon className="w-12 h-12 mb-6 text-[#FFD700]" />
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Code Comparison Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 rounded-3xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] p-12">
            <h2 className="text-4xl font-bold text-center mb-16">
              <span className="bg-gradient-to-r from-[#FFD700] to-[#B8860B] bg-clip-text text-transparent">
                Learn Through Comparison
              </span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-400" />
                  <h3 className="text-lg font-semibold text-white">Python</h3>
                </div>
                <pre className="p-6 rounded-2xl bg-black/50 border border-white/[0.05]">
                  <code className="text-blue-400">
                    {`def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)`}
                  </code>
                </pre>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#FFD700]" />
                  <h3 className="text-lg font-semibold text-white">JavaScript</h3>
                </div>
                <pre className="p-6 rounded-2xl bg-black/50 border border-white/[0.05]">
                  <code className="text-[#FFD700]">
                    {`function quicksort(arr) {
    if (arr.length <= 1) return arr;
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    return [...quicksort(left), ...middle, ...quicksort(right)];
}`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: '15K+', label: 'Active Learners' },
              { number: '25+', label: 'Programming Languages' },
              { number: '1000+', label: 'Interactive Exercises' },
            ].map((stat, index) => (
              <div
                key={index}
                className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 group p-8 rounded-3xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] text-center hover:border-[#FFD700]/20"
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-[#FFD700] to-[#B8860B] bg-clip-text text-transparent mb-4">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FFD700] to-[#B8860B] p-16 text-center">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-6">
                Start Your Learning Journey Today
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of developers who are accelerating their learning through our innovative platform.
              </p>
              <button
                onClick={() => navigate('/auth?mode=signup')}
                className="group px-8 py-4 bg-black text-white rounded-full font-semibold text-lg transition-all duration-500 hover:bg-gray-900 hover:scale-105"
              >
                <span className="flex items-center">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-500" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
