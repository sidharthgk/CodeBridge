import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import Playground from "../components/Playground";
import Footer from "../components/Footer";
import { 
  Code2, 
  Laptop, 
  Brain, 
  Trophy, 
  BarChart3, 
  GitCompare, 
  Zap, 
  Users, 
  Globe,
  ArrowRight
} from 'lucide-react';

// -----------------------------
// FeatureCard Component
// -----------------------------
const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}
      className="glass-panel p-6 hover:border-amber-500/30 transition-all duration-300"
    >
      <Icon className="h-8 w-8 text-amber-500 mb-4" />
      <h3 className="text-xl font-montserrat mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

// -----------------------------
// StatisticCard Component
// -----------------------------
const StatisticCard = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <h3 className="text-4xl font-bold gold-text mb-2">{value}</h3>
    <p className="text-gray-400">{label}</p>
  </div>
);

// -----------------------------
// Interactive Playground Component
// -----------------------------
<section className="py-20 bg-black/50">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-8 gold-text">
      Try Our Interactive Playground
    </h2>
    <div className="max-w-4xl mx-auto">
      <Playground />
    </div>
  </div>
</section>

// -----------------------------
// Main LandingPage Component
// -----------------------------
const LandingPage = () => {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const featuresContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={heroInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gold-text">
              Master Any Programming Language
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Learn programming through interactive comparison and hands-on practice.
              Your journey to becoming a polyglot developer starts here.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/signup"
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-semibold shadow-md shadow-amber-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30"
                >
                  Start Learning Now
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="#features"
                  className="px-6 py-3 rounded-lg border border-amber-500/50 text-amber-500 font-semibold transition-all duration-300 hover:bg-amber-500/10"
                >
                  Explore Features
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Statistics Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatisticCard value="50K+" label="Active Learners" />
            <StatisticCard value="100+" label="Programming Courses" />
            <StatisticCard value="95%" label="Success Rate" />
            <StatisticCard value="24/7" label="Expert Support" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 gold-text">
            Why Choose CodeBridge?
          </h2>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={featuresContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <FeatureCard
              icon={Code2}
              title="Side-by-Side Learning"
              description="Compare and learn multiple programming languages simultaneously with our innovative parallel learning approach."
            />
            <FeatureCard
              icon={Laptop}
              title="Interactive Code Editor"
              description="Write, run, and test code directly in your browser with our powerful Monaco-based editor."
            />
            <FeatureCard
              icon={Brain}
              title="AI-Powered Guidance"
              description="Receive personalized learning recommendations and instant feedback on your code."
            />
            <FeatureCard
              icon={Trophy}
              title="Achievement System"
              description="Stay motivated with our gamified learning experience featuring badges and streaks."
            />
            <FeatureCard
              icon={BarChart3}
              title="Progress Tracking"
              description="Monitor your learning journey with detailed analytics and progress visualization."
            />
            <FeatureCard
              icon={GitCompare}
              title="Code Conversion"
              description="Convert code between different programming languages with our intelligent translation system."
            />
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 gold-text">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold mb-4">1. Choose Your Path</h3>
              <p className="text-gray-400">
                Select your learning mode and preferred programming languages.
              </p>
            </div>
            <div className="glass-panel p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold mb-4">2. Learn Interactively</h3>
              <p className="text-gray-400">
                Practice with real-time feedback and interactive exercises.
              </p>
            </div>
            <div className="glass-panel p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold mb-4">3. Build Projects</h3>
              <p className="text-gray-400">
                Apply your skills by building real-world applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Playground Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 gold-text">
            Try Our Interactive Playground
          </h2>
          <p className="text-xl text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Experience our side-by-side learning approach. Switch between languages and see how the same concept is expressed differently.
          </p>
          <div className="max-w-4xl mx-auto">
            <Playground />
          </div>
          <div className="text-center mt-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/playground"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/50 hover:bg-amber-500/20 transition-all duration-300"
              >
                <span>Try Full Playground</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 gold-text">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who have accelerated their careers with CodeBridge.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/signup"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-semibold shadow-md shadow-amber-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30"
            >
              Get Started for Free
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;