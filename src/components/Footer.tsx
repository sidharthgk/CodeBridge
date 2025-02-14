import { Github, Twitter, Linkedin, Mail, Heart, Coffee } from "lucide-react";

// Reusable Footer Link Component
const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="text-gray-400 hover:text-amber-500 transition-colors duration-300">
    {children}
  </a>
);

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-black/70 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <p className="text-xl font-bold gold-text">CodeBridge</p>
            <p className="text-gray-400">
              Bridging the gap between programming languages through interactive learning.
            </p>
            <div className="flex space-x-4">
              <FooterLink href="#"><Github className="h-5 w-5" /></FooterLink>
              <FooterLink href="#"><Twitter className="h-5 w-5" /></FooterLink>
              <FooterLink href="#"><Linkedin className="h-5 w-5" /></FooterLink>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><FooterLink href="#">About Us</FooterLink></li>
              <li><FooterLink href="#">Features</FooterLink></li>
              <li><FooterLink href="#">Pricing</FooterLink></li>
              <li><FooterLink href="#">Blog</FooterLink></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Resources</h4>
            <ul className="space-y-2">
              <li><FooterLink href="#">Documentation</FooterLink></li>
              <li><FooterLink href="#">Tutorials</FooterLink></li>
              <li><FooterLink href="#">Community</FooterLink></li>
              <li><FooterLink href="#">API Reference</FooterLink></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Stay Updated</h4>
            <p className="text-gray-400">Get the latest updates and resources.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-black/50 border border-gray-700 rounded-l-lg px-4 py-2 focus:outline-none focus:border-amber-500 flex-grow"
              />
              <button className="bg-amber-500 text-black px-4 py-2 rounded-r-lg hover:bg-amber-600 transition-colors duration-300">
                <Mail className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} CodeBridge. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Terms of Service</FooterLink>
            <span className="text-gray-400">|</span>
            <span className="text-gray-400 flex items-center">
              Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> and <Coffee className="h-4 w-4 text-amber-500 mx-1" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
