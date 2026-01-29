/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import {
  Code2,
  Briefcase,
  Mail,
  Terminal,
  User,
  Github,
  Linkedin,
  Twitter,
  Globe,
  ArrowRight,
  Download,
  GraduationCap,
  Award,
  ChevronRight,
  ExternalLink,
  Send,
  Phone,
  MapPin,
} from "lucide-react";
import * as SimpleIcons from "simple-icons";
import SkillsMarquee from "./components/magicui/SkillsMarquee";
import { cn } from "./lib/utils"; // Corrected import path
import "./index.css"; // Ensure the CSS file is imported
import { motion, AnimatePresence } from "framer-motion";
import educationData from './data/education.json';
import certificationData from './data/certifications.json';
import emailjs from '@emailjs/browser';

const skills = [
  { name: "Java", icon: "devicon-java-plain colored", color: "#007396" },
  { name: "Spring Boot", icon: "devicon-spring-plain colored", color: "#6DB33F" },
  {
    name: "JavaScript",
    icon: "devicon-javascript-plain colored",
    color: "#F7DF1E",
  },
  {
    name: "React.js",
    icon: "devicon-react-original colored",
    color: "#61DAFB",
  },
  { name: "PostgreSQL", icon: "devicon-postgresql-plain colored", color: "#4169E1" },
  { name: "MySQL", icon: "devicon-mysql-plain colored", color: "#4479A1" },
  { name: "MongoDB", icon: "devicon-mongodb-plain colored", color: "#47A248" },
  { name: "Docker", icon: "devicon-docker-plain colored", color: "#2496ED" },
  { name: "Git", icon: "devicon-git-plain colored", color: "#F05032" },
  { name: "HTML5", icon: "devicon-html5-plain colored", color: "#E34F26" },
  { name: "CSS3", icon: "devicon-css3-plain colored", color: "#1572B6" },
  { name: "Linux", icon: "devicon-linux-plain colored", color: "#FCC624" },
];
const services = [
  {
    title: "Backend Development",
    description:
      "Building robust REST APIs with Spring Boot, implementing layered architecture and secure authentication.",
    icon: <Terminal size={32} />,
  },
  {
    title: "Database Design",
    description:
      "Designing and optimizing relational databases with PostgreSQL, MySQL using JPA/Hibernate.",
    icon: <Code2 size={32} />,
  },
  {
    title: "API Security",
    description:
      "Implementing JWT authentication, role-based access control, and secure API endpoints.",
    icon: <Code2 size={32} />,
  },
  {
    title: "Full Stack Development",
    description:
      "End-to-end application development with React.js frontend and Spring Boot backend.",
    icon: <Code2 size={32} />,
  },
];

const projects = [
  {
    title: "Hospital Management System - Heal Hub",
    description: "A comprehensive backend system for managing hospital operations including patients, doctors, appointments, and billing workflows.",
    tech: ["Java", "Spring Boot", "PostgreSQL", "JWT", "Hibernate"],
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80",
    liveLink: "https://github.com/sriram1224",
    githubLink: "https://github.com/sriram1224",
    features: [
      "20+ RESTful endpoints with layered architecture",
      "JWT authentication and role-based access control",
      "Relational database schema with 8+ entities",
      "JPA/Hibernate for data persistence",
      "Patient, doctor, and appointment management"
    ]
  },
  {
    title: "SnapTask AI - Smart Task & Reminder System",
    description: "A backend task management system with AI-powered task summarization and intelligent scheduling features.",
    tech: ["Java", "Spring Boot", "PostgreSQL", "JWT", "REST APIs"],
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80",
    liveLink: "https://github.com/sriram1224",
    githubLink: "https://github.com/sriram1224",
    features: [
      "15+ REST APIs with JWT authentication",
      "Task categorization and recurring schedules",
      "AI-based task summarization",
      "Optimized database queries",
      "Comprehensive backend validation"
    ]
  },
];

const TypingEffect = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = [
    "{Java Backend Developer}",
    "{Software Engineer}",
    "{Full Stack Developer}",
  ];

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
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, words]);

  return <span className="typing-text text-[#29B475]">{text}</span>;
};

const SkillCard = ({ name, icon, color }) => (
  <div className="flex items-center gap-2 text-sm md:text-base hover:bg-[#0A1917] p-2 rounded-md transition-all duration-300">
    <div>
      <i className={icon} style={{ color }}></i>
    </div>
    <span>{name}</span>
  </div>
);

// Add animation utility function
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible];
};

// Add animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

// Add ContactForm component before App component
const ContactForm = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // Log form data
    console.log('Form Data:', form);

    try {
      const result = await emailjs.sendForm(
        'service_3ui9vjd',
        'template_n34phpq',
        formRef.current,
        'Jn0AEbV1BHC_XzPK0'
      );
      console.log('EmailJS Response:', result);
      if (result.status === 200) {
        setSuccess(true);
        setForm({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        throw new Error(`Unexpected status: ${result.status}`);
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setError(error.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-300">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-[#0C1E1B] border border-[#29B475]/20 rounded-lg focus:border-[#29B475] focus:ring-1 focus:ring-[#29B475] text-gray-300 placeholder-gray-500 transition-all duration-300"
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-300">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-[#0C1E1B] border border-[#29B475]/20 rounded-lg focus:border-[#29B475] focus:ring-1 focus:ring-[#29B475] text-gray-300 placeholder-gray-500 transition-all duration-300"
            placeholder="john@example.com"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium text-gray-300">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-[#0C1E1B] border border-[#29B475]/20 rounded-lg focus:border-[#29B475] focus:ring-1 focus:ring-[#29B475] text-gray-300 placeholder-gray-500 transition-all duration-300"
          placeholder="What's this about?"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-gray-300">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows="5"
          className="w-full px-4 py-3 bg-[#0C1E1B] border border-[#29B475]/20 rounded-lg focus:border-[#29B475] focus:ring-1 focus:ring-[#29B475] text-gray-300 placeholder-gray-500 transition-all duration-300 resize-none"
          placeholder="Your message here..."
        ></textarea>
      </div>
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      {success && (
        <div className="text-[#29B475] text-sm">Message sent successfully!</div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#29B475] text-white px-6 py-3 rounded-lg hover:bg-[#29B475]/90 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <>
            Send Message <Send className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
};

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  const handleDownloadCV = () => {
    // Replace this URL with your actual CV file URL
    const cvUrl = "";
    window.open(cvUrl, "_blank");
  };

  // Add smooth scroll behavior
  useEffect(() => {
    // Add smooth scroll behavior to the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Optional: Add a custom scroll animation
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
          section.style.opacity = '1';
          section.style.transform = 'translateY(0)';
        }
      });
    };

    // Add initial styles to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', handleScroll);
    // Trigger once on load
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className=" bg-[#0C1E1B] text-white font-mono">
      {/* Navbar */}
      <nav
        className={`fixed transition-all duration-500 z-50 ${
          scrolled
            ? "bottom-6 left-4 right-4 rounded-lg"
            : "top-0 w-full bg-gradient-to-b from-[#0C1E1B]/80 to-transparent backdrop-blur-sm"
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <div
            className={`flex items-center justify-between h-16 ${
              scrolled
                ? "glass-navbar px-6 border border-[#29B475] rounded-xl"
                : "px-6"
            }`}
          >
            <button
              onClick={(e) => {
                const element = document.getElementById("home");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className={`text-[#29B475] font-bold transition-all duration-300 ${
                scrolled ? "text-lg md:text-xl" : "text-xl md:text-2xl hover:text-[#2BCB8A]"
              } hover:scale-105 transition-transform cursor-pointer logo-font`}
            >
              <span className="font-mono opacity-80">{`<`}</span>
              Bhargav Sri Ram
              <span className="font-mono opacity-80">{`/>`}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden px-3 py-2 rounded-xl transition-all duration-300 ${
                scrolled
                  ? "bg-[#1E1E1E] hover:bg-[#2A2A2A] text-[#29B475]"
                  : "bg-[#29B475]/10 hover:bg-[#29B475]/20 text-[#29B475]"
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <span className="text-2xl">×</span>
              ) : (
                <span className="text-xl">☰</span>
              )}
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-4">
              {[
                { name: "About", id: "about" },
                { name: "Services", id: "services" },
                { name: "Education", id: "education" },
                { name: "Projects", id: "projects" },
                { name: "Contact", id: "contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 font-mono flex items-center justify-center ${
                    scrolled
                      ? "hover:bg-[#29B475] text-white hover:text-[#ffffff]"
                      : "text-[#29B475] hover:bg-[#29B475]/10 hover:text-[#2BCB8A]"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden absolute left-0 right-0 transition-all duration-300 ${
              menuOpen ? "max-h-64 py-4" : "max-h-0"
            } overflow-hidden ${
              scrolled
                ? "bg-[#0A1917] shadow-lg"
                : "bg-[#0A1917]/95 backdrop-blur-sm border-t border-[#29B475]/20"
            }`}
          >
            {[
              { name: "About", id: "about" },
              { name: "Services", id: "services" },
              { name: "Education", id: "education" },
              { name: "Projects", id: "projects" },
              { name: "Contact", id: "contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-4 py-2 my-1 mx-4 transition-all duration-300 ${
                  scrolled
                    ? "bg-[#1E1E1E] hover:bg-[#2A2A2A] text-gray-300 hover:text-[#29B475] rounded-lg"
                    : "hover:bg-[#29B475]/10 text-[#29B475] hover:text-[#2BCB8A] rounded-lg"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="pt-16">
        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen w-full px-4 py-8 max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Content Column */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
              <p className="text-[#29B475] animate-fadeIn flex items-center gap-2">
                Hi <span className="animate-wave inline-block">👋</span>, my
                name is
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
                Building scalable REST APIs and database-driven applications with Spring Boot.
                Passionate about backend development, API security, and delivering maintainable solutions.
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
                    href="https://github.com/sriram1224"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#29B475] transition-colors"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kasukurthi-bhargav-781a88227/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#29B475] transition-colors"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a
                    href="https://x.com/Bhargavsriram5"
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
                  src="https://res.cloudinary.com/djqmqawu9/image/upload/v1769673857/Professional_portrait_in_crisp_attire_oqoff1.png" // Updated image path
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
            <div className="flex flex-col items-center">
              <div className="max-w-4xl text-center">
                <p className="text-gray-300 mb-8 text-base md:text-lg leading-relaxed">
                  Java Backend Developer with strong experience building Spring Boot-based REST APIs and database-driven applications.
                  Skilled in JPA/Hibernate, SQL optimization, and layered backend architecture. Hands-on with API security using JSON Web Tokens (JWT),
                  backend problem solving, and containerized development using Docker. Comfortable working across the full backend development lifecycle
                  and delivering scalable, maintainable services.
                </p>
                <SkillsMarquee />
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
                  <h3 className="text-xl font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Update Education & Certification Section */}
        <section id="education" className="py-16 md:py-20 px-4 bg-[#0A1917]">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold mb-12 text-center flex items-center justify-center gap-2"
            >
              <GraduationCap className="text-[#29B475]" />
              <span>Education & Certifications</span>
            </motion.h2>

            {/* Education Section - Horizontal Cards with Parallax */}
            <div className="mb-20">
              <motion.h3 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-xl font-semibold mb-8 text-[#29B475] text-center"
              >
                Education Journey
              </motion.h3>

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {educationData.education.map((edu, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover="hover"
                    className="relative"
                  >
                    <motion.div
                      variants={cardVariants}
                      className="bg-[#0C1E1B] p-6 rounded-xl border border-[#29B475]/20 hover:border-[#29B475] h-full"
                    >
                      <div className="flex flex-col h-full">
                        <div className="text-[#29B475] mb-4 transform group-hover:scale-110 transition-transform duration-300">
                          <GraduationCap size={24} />
                        </div>
                        <h4 className="text-lg font-semibold mb-2">{edu.degree}</h4>
                        <p className="text-gray-300 mb-1">{edu.institution}</p>
                        <p className="text-[#29B475] text-sm mb-2">{edu.year}</p>
                        <p className="text-gray-400 text-sm mb-4">{edu.description}</p>

                        {/* Achievements */}
                        <div className="mb-4">
                          <h5 className="text-[#29B475] text-sm font-semibold mb-2">Key Achievements:</h5>
                          <ul className="space-y-1">
                            {edu.achievements.map((achievement, i) => (
                              <li key={i} className="text-gray-300 text-sm flex items-center gap-2">
                                <ChevronRight size={14} className="text-[#29B475]" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Relevant Courses */}
                        <div className="mt-auto">
                          <h5 className="text-[#29B475] text-sm font-semibold mb-2">Relevant Courses:</h5>
                          <div className="flex flex-wrap gap-2">
                            {edu.relevantCourses.map((course, i) => (
                              <span
                                key={i}
                                className="bg-[#0A1917] text-[#29B475] px-2 py-1 rounded-full text-xs"
                              >
                                {course}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-[#29B475]/5 rounded-bl-full -z-10"></div>
                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#29B475]/5 rounded-tr-full -z-10"></div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Certifications Section - Interactive Timeline */}
            <div>
              <motion.h3 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-xl font-semibold mb-12 text-[#29B475] text-center"
              >
                Professional Certifications
              </motion.h3>

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative"
              >
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#29B475]/20"></div>

                <div className="space-y-12">
                  {certificationData.certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className={`relative flex items-center ${
                        index % 2 === 0 ? "justify-start" : "justify-end"
                      }`}
                    >
                      {/* Timeline Dot */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.2 }}
                        className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#29B475] z-10"
                      ></motion.div>

                      {/* Content Card */}
                      <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        className={`w-[calc(50%-2rem)] bg-[#0C1E1B] p-6 rounded-xl border border-[#29B475]/20 hover:border-[#29B475] transform transition-all duration-300 ${
                          index % 2 === 0 ? "hover:-translate-x-2" : "hover:translate-x-2"
                        }`}
                      >
                        <div className="flex flex-col">
                          <div className="flex items-start gap-4 mb-4">
                            <motion.div
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                              className="text-[#29B475] mt-1"
                            >
                              <Award size={24} />
                            </motion.div>
                            <div>
                              <h4 className="text-lg font-semibold mb-2">{cert.title}</h4>
                              <p className="text-gray-300 mb-1">{cert.issuer}</p>
                              <p className="text-[#29B475] text-sm mb-2">{cert.year}</p>
                              <motion.p
                                whileHover={{ scale: 1.05 }}
                                className="text-gray-400 text-sm inline-block"
                              >
                                Credential ID: {cert.credentialId}
                              </motion.p>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-gray-300 text-sm mb-4">{cert.description}</p>

                          {/* Skills */}
                          <div className="mb-4">
                            <h5 className="text-[#29B475] text-sm font-semibold mb-2">Skills Acquired:</h5>
                            <div className="flex flex-wrap gap-2">
                              {cert.skills.map((skill, i) => (
                                <span
                                  key={i}
                                  className="bg-[#0A1917] text-[#29B475] px-2 py-1 rounded-full text-xs"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Validity and Verification */}
                          <div className="flex items-center justify-between mt-auto">
                            <span className="text-gray-400 text-sm">Valid for: {cert.validity}</span>
                            <a
                              href={cert.verificationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#29B475] text-sm hover:text-[#29B475]/80 transition-colors flex items-center gap-1"
                            >
                              Verify <ExternalLink size={14} />
                            </a>
                          </div>
                        </div>

                        {/* Hover Effect Border */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute inset-0 border-2 border-[#29B475] rounded-xl pointer-events-none"
                        ></motion.div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Replace Portfolio Section with Projects Section */}
        <section id="projects" className="py-16 md:py-20 px-4 bg-[#0A1917] overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center flex items-center justify-center gap-2">
              <Terminal className="text-[#29B475]" />
              <span>Projects</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => {
                const [ref, isVisible] = useScrollAnimation();
                return (
                  <div
                    key={project.title}
                    ref={ref}
                    className={`transform ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    } transition-all duration-700 ease-out`}
                  >
                    <div className="group relative bg-[#0C1E1B] rounded-xl overflow-hidden border border-[#29B475]/20 hover:border-[#29B475] transition-all duration-300 h-full flex flex-col">
                      {/* Project Image with Overlay */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E1B] via-[#0C1E1B]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Tech Stack Tags */}
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                          {project.tech.slice(0, 3).map((tech, i) => (
                            <span
                              key={i}
                              className="bg-[#0A1917]/90 backdrop-blur-sm text-[#29B475] px-2 py-1 rounded-full text-xs font-medium transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                              style={{ transitionDelay: `${i * 100}ms` }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Project Content */}
                      <div className="p-6 flex-grow flex flex-col">
                        <h3 className="text-xl font-bold mb-3 group-hover:text-[#29B475] transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-gray-300 text-sm mb-4 flex-grow">
                          {project.description}
                        </p>

                        {/* Features List */}
                        <div className="mb-6">
                          <ul className="space-y-2">
                            {project.features.slice(0, 3).map((feature, i) => (
                              <li
                                key={i}
                                className="flex items-center text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
                              >
                                <span className="text-[#29B475] mr-2">•</span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-auto">
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-[#29B475] text-white px-4 py-2 rounded-lg hover:bg-[#29B475]/90 transition-colors flex items-center justify-center gap-2 text-sm group-hover:scale-105 transform transition-transform duration-300"
                          >
                            Live Demo
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                          </a>
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 border border-[#29B475] text-[#29B475] px-4 py-2 rounded-lg hover:bg-[#29B475] hover:text-white transition-colors flex items-center justify-center gap-2 text-sm group-hover:scale-105 transform transition-transform duration-300"
                          >
                            <Github size={16} />
                            Code
                          </a>
                        </div>

                        {/* View More Button */}
                        {project.features.length > 3 && (
                          <button
                            onClick={() => {
                              // Add your modal or expand functionality here
                              console.log("View more features for:", project.title);
                            }}
                            className="mt-4 text-[#29B475] text-sm hover:text-[#29B475]/80 transition-colors duration-300 flex items-center justify-center gap-1 group-hover:scale-105 transform transition-transform duration-300"
                          >
                            View More Features
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                          </button>
                        )}
                      </div>

                      {/* Hover Effect Border */}
                      <div className="absolute inset-0 border-2 border-[#29B475] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-20 px-4 bg-[#0A1917]">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold mb-12 text-center flex items-center justify-center gap-2"
            >
              <Mail className="text-[#29B475]" />
              <span>Get in Touch</span>
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-6 text-[#29B475]">Let's Connect</h3>
                  <p className="text-gray-300 mb-8">
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#0C1E1B] p-3 rounded-lg">
                      <Mail className="w-6 h-6 text-[#29B475]" />
                    </div>
                    <div>
                      <h4 className="text-gray-300 font-medium mb-1">Email</h4>
                      <a 
                        href="mailto:kasukurthibhargav@gmail.com"
                        className="text-[#29B475] hover:underline"
                      >
                        kasukurthibhargav@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-[#0C1E1B] p-3 rounded-lg">
                      <Phone className="w-6 h-6 text-[#29B475]" />
                    </div>
                    <div>
                      <h4 className="text-gray-300 font-medium mb-1">Phone</h4>
                      <a
                        href="tel:+919398746611"
                        className="text-[#29B475] hover:underline"
                      >
                        +91 93987 46611
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-[#0C1E1B] p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-[#29B475]" />
                    </div>
                    <div>
                      <h4 className="text-gray-300 font-medium mb-1">Location</h4>
                      <p className="text-[#29B475]">
                        Hyderabad, India
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-6">
                  <h4 className="text-gray-300 font-medium mb-4">Connect with me</h4>
                  <div className="flex gap-4">
                    <a
                      href="https://github.com/sriram1224"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#0C1E1B] p-3 rounded-lg text-gray-400 hover:text-[#29B475] transition-colors"
                    >
                      <Github className="w-6 h-6" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/kasukurthi-bhargav-781a88227/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#0C1E1B] p-3 rounded-lg text-gray-400 hover:text-[#29B475] transition-colors"
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>
                    <a
                      href="https://x.com/Bhargavsriram5"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#0C1E1B] p-3 rounded-lg text-gray-400 hover:text-[#29B475] transition-colors"
                    >
                      <Twitter className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-[#0C1E1B] p-8 rounded-xl border border-[#29B475]/20"
              >
                <h3 className="text-xl font-semibold mb-6 text-[#29B475]">Send me a message</h3>
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
