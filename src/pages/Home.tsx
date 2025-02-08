import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, GitBranch, Globe, ArrowRight } from 'lucide-react';

function Home() {
  const navigate = useNavigate();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="space-y-20 overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center h-screen w-screen">
        {/* Full-bleed background image with dark overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1920&q=80"
            alt="Coding Background"
            className="w-full h-full min-w-full min-h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-85" />
        </div>
        {/* Hero Content Container with glassmorphism effect */}
        <div className="relative z-10 text-center px-4 sm:px-6 py-8 max-w-4xl mx-auto rounded-xl backdrop-blur-md bg-black bg-opacity-40 animate-fade-in">
          <h1 className="font-bold leading-tight text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Learn Any Programming Language
            <span className="block mt-2 bg-gradient-to-r from-[#D4AF37] to-[#FFDF50] bg-clip-text text-transparent">
              10x Faster
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Master new programming languages by leveraging what you already know.
            Compare syntax, patterns, and concepts side by side.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <button
              onClick={() => navigate('/auth?mode=signup')}
              className="group inline-flex items-center px-6 sm:px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#FFDF50] text-black rounded-lg font-semibold text-base sm:text-lg transition-transform duration-300 hover:scale-105"
            >
              <span>Start Learning Now</span>
              <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/learn?mode=compare')}
              className="inline-flex items-center px-6 sm:px-8 py-3 border border-[#D4AF37] text-white rounded-lg font-semibold text-base sm:text-lg transition-transform duration-300 hover:scale-105"
            >
              Try Demo
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            icon: Zap,
            title: 'Learn Faster',
            description: 'Understand new languages through the lens of what you already know',
          },
          {
            icon: GitBranch,
            title: 'Interactive Learning',
            description: 'Write and execute code directly in your browser with instant feedback',
          },
          {
            icon: Globe,
            title: 'Multiple Languages',
            description: 'Support for all major programming languages and frameworks',
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="animate-on-scroll opacity-0 p-6 sm:p-8 rounded-xl border border-transparent hover:border-[#D4AF37] transition-all duration-300 shadow-md bg-black bg-opacity-40 backdrop-blur-sm"
          >
            <feature.icon className="w-10 h-10 mb-4 text-[#D4AF37]" />
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-sm sm:text-base text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Language Comparison Demo */}
      <div className="animate-on-scroll opacity-0 mx-4 p-6 sm:p-8 rounded-xl bg-black bg-opacity-40 backdrop-blur-sm">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#D4AF37] to-[#FFDF50] bg-clip-text text-transparent">
          See the Difference
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Python Demo */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />
              <h3 className="text-base sm:text-lg font-semibold text-white">Python</h3>
            </div>
            <pre className="p-4 rounded-lg overflow-x-auto bg-black bg-opacity-70">
              <code className="text-[#D4AF37] text-sm sm:text-base">
                {`def greet(name):
    return f"Hello, {name}!"

numbers = [1, 2, 3, 4, 5]
doubled = [x * 2 for x in numbers]`}
              </code>
            </pre>
          </div>
          {/* Java Demo */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#FFDF50]" />
              <h3 className="text-base sm:text-lg font-semibold text-white">Java</h3>
            </div>
            <pre className="p-4 rounded-lg overflow-x-auto bg-black bg-opacity-70">
              <code className="text-[#FFDF50] text-sm sm:text-base">
                {`public String greet(String name) {
    return "Hello, " + name + "!";
}

List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
List<Integer> doubled = numbers.stream()
    .map(x -> x * 2)
    .collect(Collectors.toList());`}
              </code>
            </pre>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[
          { number: '10,000+', label: 'Active Learners' },
          { number: '15+', label: 'Programming Languages' },
          { number: '500+', label: 'Interactive Exercises' },
        ].map((stat, index) => (
          <div
            key={index}
            className="p-6 sm:p-8 rounded-xl text-center bg-black bg-opacity-40 backdrop-blur-sm border border-transparent hover:border-[#D4AF37] transition-all duration-300 shadow-md"
          >
            <div className="text-3xl sm:text-4xl font-bold text-[#D4AF37] mb-2">{stat.number}</div>
            <div className="text-sm sm:text-base text-gray-300">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Call-To-Action (CTA) Section */}
      <div className="animate-on-scroll opacity-0 mx-4 p-8 sm:p-12 rounded-xl text-center bg-gradient-to-r from-black to-gray-900 bg-opacity-60 backdrop-blur-md">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#D4AF37] to-[#FFDF50] bg-clip-text text-transparent">
          Ready to Start Your Journey?
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
          Join thousands of developers accelerating their learning on a platform designed for clarity and sophistication.
        </p>
        <button
          onClick={() => navigate('/auth?mode=signup')}
          className="group inline-flex items-center px-6 sm:px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#FFDF50] text-black rounded-lg font-semibold text-sm sm:text-base transition-transform duration-300 hover:scale-105"
        >
          <span>Get Started for Free</span>
          <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

export default Home;
