import React, { useState, useEffect } from 'react';
import { Code2, Briefcase, Mail, Terminal, User, Github, Linkedin, Twitter, Globe, ArrowRight, Download } from 'lucide-react';
import * as SimpleIcons from 'simple-icons';
import SkillsMarquee from './components/magicui/SkillsMarquee';
import { cn } from './lib/utils'; // Corrected import path
import './index.css'; // Ensure the CSS file is imported

const skills = [
  { name: 'JavaScript', icon: 'devicon-javascript-plain colored', color: '#F7DF1E' },
  { name: 'TypeScript', icon: 'devicon-typescript-plain colored', color: '#3178C6' },
  { name: 'React.js', icon: 'devicon-react-original colored', color: '#61DAFB' },
  { name: 'Node.js', icon: 'devicon-nodejs-plain colored', color: '#339933' },
  { name: 'Python', icon: 'devicon-python-plain colored', color: '#3776AB' },
  { name: 'MongoDB', icon: 'devicon-mongodb-plain colored', color: '#47A248' },
  { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored', color: '#4169E1' },
  { name: 'AWS Cloud', icon: 'devicon-amazonwebservices-plain colored', color: '#FF9900' },
  { name: 'Docker', icon: 'devicon-docker-plain colored', color: '#2496ED' },
  { name: 'CI/CD', icon: 'devicon-github-original colored', color: '#2088FF' },
  { name: 'GraphQL', icon: 'devicon-graphql-plain colored', color: '#E10098' },
  { name: 'Agile/Jira', icon: 'devicon-jira-plain colored', color: '#0052CC' }
];
const services = [
  {
    title: 'Full Stack Development',
    description: 'End-to-end web application development with modern technologies and best practices.',
    icon: <Code2 size={32} />
  },
  {
    title: 'Backend Architecture',
    description: 'Scalable and secure server-side solutions with optimized database design.',
    icon: <Terminal size={32} />
  },
  {
    title: 'Frontend Development',
    description: 'Responsive and interactive user interfaces with modern frameworks.',
    icon: <Code2 size={32} />
  },
  {
    title: 'Database Design',
    description: 'Efficient database architecture and optimization for scalable applications.',
    icon: <Code2 size={32} />
  }
];

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured online shopping platform with real-time inventory management.',
    tech: 'React, Node.js, MongoDB',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80'
  },
  {
    title: 'Task Management System',
    description: 'Collaborative project management tool with real-time updates.',
    tech: 'TypeScript, React, Firebase',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80'
  },
  {
    title: 'Analytics Dashboard',
    description: 'Real-time data visualization and analytics platform.',
    tech: 'React, D3.js, Node.js',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80'
  }
];

const TypingEffect = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = ["{Full Stack Developer}", "{Software Engineer}", "{Tech Enthusiast}"];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, words]);

  return (
    <span className="typing-text text-[#29B475]">
      {text}
    </span>
  );
};

const SkillCard = ({ name, icon, color }) => (
  <div className="flex items-center gap-2 text-sm md:text-base hover:bg-[#0A1917] p-2 rounded-md transition-all duration-300">
    <div><i className={icon} style={{ color }}></i></div>
    <span>{name}</span>
  </div>
);

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const handleDownloadCV = () => {
    // Replace this URL with your actual CV file URL
    const cvUrl = '/path-to-your-cv.pdf';
    window.open(cvUrl, '_blank');
  };

  return (
    <div className=" bg-[#0C1E1B] text-white font-mono">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0A1917]/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
        }`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="text-[#29B475] font-bold text-lg md:text-xl hover:scale-105 transition-transform cursor-pointer logo-font">
              <span className="font-mono">{`<`}</span>
              Bhargav Sri Ram
              <span className="font-mono">{`/>`}</span>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#29B475]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <span className="text-2xl">×</span>
              ) : (
                <span className="text-xl">☰</span>
              )}
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {[
                { name: 'About', id: 'about' },
                { name: 'Services', id: 'services' },
                { name: 'Portfolio', id: 'portfolio' },
                { name: 'Contact', id: 'contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-300 hover:text-[#29B475] transition-colors duration-300 font-mono relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#29B475] transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden absolute left-0 right-0 bg-[#0A1917] shadow-lg transition-all duration-300 ${menuOpen ? 'max-h-64 py-4' : 'max-h-0'
            } overflow-hidden`}>
            {[
              { name: 'About', id: 'about' },
              { name: 'Services', id: 'services' },
              { name: 'Portfolio', id: 'portfolio' },
              { name: 'Contact', id: 'contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:text-[#29B475] hover:bg-[#0C1E1B]/50 transition-colors"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="pt-16">
        {/* Hero Section */}
        <section className="min-h-screen w-full px-4 py-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Content Column */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
              <p className="text-[#29B475] animate-fadeIn flex items-center gap-2">
                Hi <span className="animate-wave inline-block">👋</span>, my name is
              </p>

              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
                Bhargav
              </h1>

              <div className="text-2xl lg:text-4xl">
                <span>I'm a </span>
                <span className="text-[#29B475]">
                  <TypingEffect />
                </span>
              </div>

              <p className="text-lg text-gray-300 max-w-xl">
                Passionate about creating innovative web solutions and turning complex problems into elegant interfaces.
              </p>

              {/* Buttons and Social Links Container */}
              <div className="flex flex-col w-full sm:w-auto gap-4">
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#contact"
                    className="w-full sm:w-auto bg-[#29B475] text-white px-6 py-3 rounded-lg hover:bg-[#29B475]/90 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    Get in touch <ArrowRight className="w-5 h-5" />
                  </a>

                  <button
                    onClick={handleDownloadCV}
                    className="w-full sm:w-auto border-2 border-[#29B475] text-[#29B475] px-6 py-3 rounded-lg hover:bg-[#29B475] hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    Download CV <Download className="w-5 h-5" />
                  </button>
                </div>

                {/* Social Links */}
                <div className="flex justify-center md:justify-start gap-6">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#29B475] transition-colors"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#29B475] transition-colors"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#29B475] transition-colors"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Image Column - Visible on all devices */}
            <div className="relative w-full max-w-lg mx-auto md:ml-auto order-first md:order-last">
              <div className="aspect-square relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="./assets/profile img.png"
                  alt="Professional Developer"
                  className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-20 px-4 bg-[#0A1917]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center flex items-center justify-center gap-2">
              <User className="text-[#29B475]" />
              <span>About Me</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <p className="text-gray-300 mb-6 text-sm md:text-base">
                  With over 5 years of experience in full-stack development, I specialize in building scalable web applications that solve real-world problems. My approach combines technical expertise with creative problem-solving to deliver exceptional user experiences.
                </p>




                <SkillsMarquee />



              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0C1E1B] p-4 md:p-6 rounded-lg">
                  <h3 className="text-2xl md:text-4xl font-bold text-[#29B475] mb-2">5+</h3>
                  <p className="text-gray-300 text-sm md:text-base">Years of Experience</p>
                </div>
                <div className="bg-[#0C1E1B] p-4 md:p-6 rounded-lg">
                  <h3 className="text-2xl md:text-4xl font-bold text-[#29B475] mb-2">50+</h3>
                  <p className="text-gray-300 text-sm md:text-base">Projects Completed</p>
                </div>
                <div className="bg-[#0C1E1B] p-4 md:p-6 rounded-lg">
                  <h3 className="text-2xl md:text-4xl font-bold text-[#29B475] mb-2">30+</h3>
                  <p className="text-gray-300 text-sm md:text-base">Happy Clients</p>
                </div>
                <div className="bg-[#0C1E1B] p-4 md:p-6 rounded-lg">
                  <h3 className="text-2xl md:text-4xl font-bold text-[#29B475] mb-2">15+</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 md:py-20 px-4 bg-[#0A1917]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center flex items-center justify-center gap-2">
              <Briefcase className="text-[#29B475]" />
              <span>Services</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-[#0C1E1B] p-6 rounded-lg text-center transition-transform hover:scale-105"
                >
                  <div className="text-[#29B475] mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-300 text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Portfolio Section */}
        <section id="portfolio" className="py-16 md:py-20 px-4 bg-[#0A1917]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center flex items-center justify-center gap-2">
              <Terminal className="text-[#29B475]" />
              <span>Portfolio</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.title}
                  className="group relative overflow-hidden rounded-lg transition-all duration-300"
                  style={{
                    animation: `fadeIn 0.5s ease-out forwards ${index * 0.1}s`,
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 md:h-64 object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E1B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-[#29B475] mb-2 text-sm md:text-base">{project.tech}</p>
                    <p className="text-gray-300 text-sm md:text-base">{project.description}</p>
                    <a href="#" className="text-[#29B475] mt-4 flex items-center gap-2 hover:gap-3 transition-all text-sm md:text-base">
                      View Project <ArrowRight size={20} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center flex items-center justify-center gap-2">
              <Mail className="text-[#29B475]" />
              <span>Get in Touch</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <p className="flex items-center gap-3 text-sm md:text-base">
                    <Mail className="text-[#29B475]" />
                    hello@example.com
                  </p>
                  <p className="flex items-center gap-3 text-sm md:text-base">
                    <Globe className="text-[#29B475]" />
                    www.example.com
                  </p>
                </div>
                <div className="mt-8">
                  <h4 className="text-base md:text-lg font-bold mb-4">Follow Me</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-[#29B475] transition-colors">
                      <Github size={24} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-[#29B475] transition-colors">
                      <Linkedin size={24} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-[#29B475] transition-colors">
                      <Twitter size={24} />
                    </a>
                  </div>
                </div>
              </div>
              <form className="space-y-4 md:space-y-6">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full bg-[#0C1E1B] border border-[#29B475]/20 rounded-lg p-3 focus:border-[#29B475] outline-none transition-colors text-sm md:text-base"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-[#0C1E1B] border border-[#29B475]/20 rounded-lg p-3 focus:border-[#29B475] outline-none transition-colors text-sm md:text-base"
                />
                <textarea
                  placeholder="Message"
                  rows={6}
                  className="w-full bg-[#0C1E1B] border border-[#29B475]/20 rounded-lg p-3 focus:border-[#29B475] outline-none transition-colors text-sm md:text-base"
                ></textarea>
                <button className="w-full bg-[#29B475] text-white py-3 px-6 rounded-lg hover:bg-[#29B475]/90 transition-colors flex items-center justify-center gap-2 text-sm md:text-base">
                  Send Message <ArrowRight size={20} />
                </button>
              </form>
            </div>
          </div>
        </section>
      </div >
    </div >
  );
}

export default App;
