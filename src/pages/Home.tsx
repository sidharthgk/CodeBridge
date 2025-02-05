import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, BookOpen, Zap, GitBranch, Users, Globe, ArrowRight } from 'lucide-react';

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
      <div className="flex flex-col items-center justify-center min-h-[90vh] relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5" />
        <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto px-4 animate-fade-in">
          <h1 className="text-7xl font-bold leading-tight">
            Learn Any Programming Language
            <span className="block bg-gradient-to-r from-[#FFD700] to-[#FFDF50] text-transparent bg-clip-text mt-2">
              10x Faster
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Master new programming languages by leveraging what you already know.
            Compare syntax, patterns, and concepts side by side.
          </p>
          
          <div className="flex flex-wrap gap-6 justify-center">
            <button
              onClick={() => navigate('/auth?mode=signup')}
              className="group px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#FFDF50] text-black rounded-lg font-semibold hover-glow text-lg flex items-center space-x-2 transition-all duration-300 hover:scale-105"
            >
              <span>Start Learning Now</span>
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/learn?mode=compare')}
              className="button-hover px-8 py-4 bg-[#2D2D2D] border border-[#FFD700] text-white rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105"
            >
              Try Demo
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {[
          {
            icon: Zap,
            title: 'Learn Faster',
            description: 'Understand new languages through the lens of what you already know'
          },
          {
            icon: GitBranch,
            title: 'Interactive Learning',
            description: 'Write and execute code directly in your browser with instant feedback'
          },
          {
            icon: Globe,
            title: 'Multiple Languages',
            description: 'Support for all major programming languages and frameworks'
          }
        ].map((feature, index) => (
          <div
            key={index}
            className="animate-on-scroll opacity-0 bg-[#2D2D2D] p-8 rounded-lg border border-[#404040] hover:border-[#FFD700] transition-all duration-300 card-hover"
          >
            <feature.icon className="w-12 h-12 text-[#FFD700] mb-4" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Language Comparison Demo */}
      <div className="animate-on-scroll opacity-0 bg-[#2D2D2D] rounded-lg p-8 mx-4">
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-[#FFD700] to-[#FFDF50] text-transparent bg-clip-text">
          See the Difference
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#FFD700]" />
              <h3 className="text-xl font-semibold">Python</h3>
            </div>
            <pre className="code-block bg-[#1A1A1A] p-4 rounded-lg overflow-x-auto">
              <code className="text-[#FFD700]">
{`def greet(name):
    return f"Hello, {name}!"

numbers = [1, 2, 3, 4, 5]
doubled = [x * 2 for x in numbers]`}
              </code>
            </pre>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#FFDF50]" />
              <h3 className="text-xl font-semibold">Java</h3>
            </div>
            <pre className="code-block bg-[#1A1A1A] p-4 rounded-lg overflow-x-auto">
              <code className="text-[#FFDF50]">
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
      <div className="animate-on-scroll opacity-0 grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {[
          { number: '10,000+', label: 'Active Learners' },
          { number: '15+', label: 'Programming Languages' },
          { number: '500+', label: 'Interactive Exercises' }
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-[#2D2D2D] p-8 rounded-lg border border-[#404040] text-center card-hover"
          >
            <div className="text-4xl font-bold text-[#FFD700] mb-2">{stat.number}</div>
            <div className="text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="animate-on-scroll opacity-0 bg-gradient-to-r from-[#2D2D2D] to-[#1A1A1A] rounded-lg p-12 mx-4 text-center">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#FFD700] to-[#FFDF50] text-transparent bg-clip-text">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Join thousands of developers who are accelerating their learning through our platform.
        </p>
        <button
          onClick={() => navigate('/auth?mode=signup')}
          className="group px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#FFDF50] text-black rounded-lg font-semibold hover-glow text-lg flex items-center space-x-2 mx-auto transition-all duration-300 hover:scale-105"
        >
          <span>Get Started for Free</span>
          <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

export default Home;