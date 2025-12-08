// frontend/src/App.jsx
import { useState, useEffect } from "react";
import "./App.css";
import logo from "./assets/lookoutline-logo.png"; // make sure this file exists

const faqs = [
  {
    question: "Do you provide a free site visit?",
    answer:
      "Yes. We offer a free on-site survey within Bangalore to understand camera points, cabling routes and recommend the right package for your space.",
  },
  {
    question: "How long does a typical installation take?",
    answer:
      "For a standard 4–8 camera setup, installation is usually completed in the same day after confirmation. Larger layouts like apartments or offices may take 1–2 days.",
  },
  {
    question: "Can I view my CCTV cameras on my mobile?",
    answer:
      "Absolutely. We configure mobile viewing apps so you can watch live, playback recordings and receive alerts from anywhere with internet access.",
  },
  {
    question: "What kind of warranty and support do you provide?",
    answer:
      "We provide 1-year service warranty on installation workmanship, plus manufacturer warranty on cameras, NVRs/DVRs and other devices as per brand policy.",
  },
  {
    question: "Do you support both homes and commercial spaces?",
    answer:
      "Yes. We install and maintain CCTV and biometric systems for independent houses, apartments, villas, shops, warehouses, offices and other commercial properties.",
  },
];

const whyPoints = [
  {
    icon: "🧠",
    title: "Consultative, not pushy",
    text: "We first understand your layout, risks and budget, then recommend only what you truly need – not just the costliest kit.",
  },
  {
    icon: "⚡",
    title: "Fast & clean installation",
    text: "Neat cabling, proper routing and finishing. Most standard 4–8 camera setups are completed within a day after approval.",
  },
  {
    icon: "📱",
    title: "Mobile-first experience",
    text: "Fully configured mobile app with live view, playback, alerts and sharing access to family or team members.",
  },
  {
    icon: "🤝",
    title: "Long-term relationship",
    text: "Annual maintenance, health checks, upgrades and remote support so your security never goes offline quietly.",
  },
];

const packages = [
  {
    label: "Home starter",
    name: "2-Camera HD Kit",
    price: "Starting around ₹3,999*",
    includes: [
      "2 indoor/outdoor HD cameras",
      "DVR/NVR configuration",
      "Mobile viewing setup",
      "Basic cabling & installation",
    ],
    note: "*Final price depends on exact layout & cable length.",
  },
  {
    label: "Apartment / villa",
    name: "4-Camera Coverage",
    price: "Usually from ₹6,999*",
    includes: [
      "4 HD cameras for key points",
      "Remote access on mobile",
      "Basic signage for deterrence",
      "1 free health check in 6 months",
    ],
    note: "*Site visit recommended for an accurate quote.",
  },
  {
    label: "Business & offices",
    name: "Custom CCTV + Biometric",
    price: "Custom quote",
    includes: [
      "Mix of CCTV & biometric devices",
      "Access control & attendance logs",
      "Multi-user mobile/web access",
      "Priority service support",
    ],
    note: "Best suited for shops, offices, warehouses & clinics.",
  },
];

const testimonials = [
  {
    name: "Rahul S",
    area: "HSR Layout",
    text: "The team helped me plan camera angles properly instead of just installing anywhere. Mobile view is smooth even on 4G.",
  },
  {
    name: "Priya & Arjun",
    area: "Whitefield",
    text: "Got our villa secured with 6 cameras. Wiring was done very neatly and they explained the app patiently to my parents.",
  },
  {
    name: "Mohan Traders",
    area: "KR Puram",
    text: "We use their CCTV + biometric combo in our office. Support has been quick whenever we had a query.",
  },
];

const quickQuestions = [
  "How much does a basic home CCTV setup cost?",
  "Do you serve my area in Bangalore?",
  "How long does installation take?",
  "Do you provide AMC / yearly maintenance?",
  "Can I view cameras on my mobile?",
];

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    serviceType: "CCTV Installation",
    message: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // theme: light / dark
  const [theme, setTheme] = useState("light");

  // simple chat assistant
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      from: "bot",
      text:
        "Hi! I'm LookOutline Assist. Ask about pricing, areas we serve, installation time, or warranty.",
    },
  ]);

  // scroll-into-view animations
  useEffect(() => {
    const elements = document.querySelectorAll("[data-animate]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // attach theme to <html> so CSS can switch variables
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to send lead");
      }

      setStatus({
        type: "success",
        message: "Thank you! We’ll contact you shortly.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        serviceType: "CCTV Installation",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "Something went wrong. Please call/WhatsApp us directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleChatToggle = () => {
    setChatOpen((prev) => !prev);
  };

  const getChatReply = (text) => {
    const q = text.toLowerCase();

    if (
      q.includes("price") ||
      q.includes("cost") ||
      q.includes("package") ||
      q.includes("quote")
    ) {
      return (
        "Most home CCTV setups start around ₹3,999–₹6,999 depending on camera count, cable length and brand. " +
        "Share your details in the form above and we’ll send a clear, no-obligation quote."
      );
    }

    if (
      q.includes("area") ||
      q.includes("location") ||
      q.includes("serve") ||
      q.includes("service") ||
      q.includes("bangalore")
    ) {
      return (
        "We currently serve all major areas in Bangalore – Electronic City, Whitefield, HSR, BTM, Yelahanka, Hebbal, KR Puram, Jayanagar, JP Nagar, Indiranagar and more. " +
        "If you’re within Bangalore city limits, we most likely cover your area."
      );
    }

    if (
      q.includes("time") ||
      q.includes("how long") ||
      q.includes("install") ||
      q.includes("installation")
    ) {
      return (
        "A typical 2–4 camera home installation usually completes in the same day after confirmation. " +
        "Bigger villas, apartments or offices may take 1–2 working days based on complexity."
      );
    }

    if (q.includes("warranty") || q.includes("support") || q.includes("amc")) {
      return (
        "We provide a 1-year service warranty on installation workmanship, plus manufacturer warranty on cameras/NVRs. " +
        "Annual maintenance (AMC) and health checks are available for long-term support."
      );
    }

    if (
      q.includes("mobile") ||
      q.includes("app") ||
      q.includes("remote") ||
      q.includes("view")
    ) {
      return (
        "Yes, you can watch your cameras on mobile from anywhere with internet. " +
        "We configure the app for live view, playback and basic alerts during installation."
      );
    }

    return (
      "Thanks for your question! For anything specific, the best option is to leave your details in the form so we can call you back with an exact answer. " +
      "You can also ask me about pricing, areas we serve, installation time, warranty or mobile viewing."
    );
  };

  const sendChat = (question) => {
    const trimmed = question.trim();
    if (!trimmed) return;
    const reply = getChatReply(trimmed);
    setChatMessages((prev) => [
      ...prev,
      { from: "user", text: trimmed },
      { from: "bot", text: reply },
    ]);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendChat(chatInput);
    setChatInput("");
  };

  const handleQuickQuestion = (q) => {
    setChatOpen(true);
    sendChat(q);
  };

  return (
    <div className="page" id="top">
      <header className="header">
        <div className="logo">
          <button
            type="button"
            className="logo-button"
            onClick={scrollToTop}
            aria-label="Go to home"
          >
            <img src={logo} alt="LookOutline logo" className="logo-img" />
          </button>
        </div>
        <nav className="nav-links">
          <a href="#products">Products</a>
          <a href="#services">Services</a>
          <a href="#support">Support</a>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
          <a href="tel:+919876543210" className="nav-cta">
            📞 Call Now
          </a>
        </nav>
      </header>

      {/* LIVE STATUS BAR */}
      <section className="status-bar" data-animate>
        <div className="status-left">
          <span className="status-dot" />
          <span className="status-live-text">Live status</span>
        </div>
        <div className="status-right">
          <span className="status-chip">
            📸 <strong>120+</strong> cameras secured this month
          </span>
          <span className="status-chip">
            🧰 <strong>10+</strong> technicians on field
          </span>
          <span className="status-chip">
            ⭐ <strong>4.9/5</strong> customer happiness
          </span>
        </div>
      </section>

      {/* MAIN HERO (Services + Lead form) */}
      <main className="hero" id="services">
        <section className="hero-left" data-animate>
          <h1>
            Smart CCTV &<br />
            Biometric Security
          </h1>

          <p className="subtitle">
            We&apos;re launching a full-stack security service platform – sales,
            installation and maintenance of CCTV cameras, NVRs, and biometric
            attendance systems for homes, apartments and businesses in
            Bangalore.
          </p>

          <ul className="features-list">
            <li>HD night vision CCTV for homes, offices &amp; apartments</li>
            <li>Biometric attendance, access control &amp; visitor logs</li>
            <li>Remote mobile viewing with alerts &amp; cloud backup options</li>
          </ul>

          {/* Quick facts row */}
          <div className="quick-facts">
            <div className="fact-pill">
              <span className="fact-label">Free</span>
              <span className="fact-text">On-site survey</span>
            </div>
            <div className="fact-pill">
              <span className="fact-label">Same-day</span>
              <span className="fact-text">Priority installs</span>
            </div>
            <div className="fact-pill">
              <span className="fact-label">1 year</span>
              <span className="fact-text">Service warranty</span>
            </div>
          </div>

          <p className="mini-text">
            Leave your details and we&apos;ll get back to you with a free site
            visit &amp; quote as soon as we launch.
          </p>

          <form className="lead-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="Your name *"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone / WhatsApp *"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <input
                type="email"
                name="email"
                placeholder="Email (optional)"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name="city"
                placeholder="Area / City"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
              >
                <option value="CCTV Installation">CCTV Installation</option>
                <option value="CCTV Service / AMC">CCTV Service / AMC</option>
                <option value="Biometric Attendance">
                  Biometric Attendance
                </option>
                <option value="Video Door Phone">Video Door Phone</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <textarea
              name="message"
              rows={3}
              placeholder="Tell us briefly about your requirement"
              value={formData.message}
              onChange={handleChange}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Get Early Access"}
            </button>

            {status.message && (
              <p
                className={`status-message ${
                  status.type === "success" ? "success" : "error"
                }`}
              >
                {status.message}
              </p>
            )}
          </form>

          <div className="contact-quick">
            <span>Prefer talking now?</span>
            <a href="tel:+919876543210" className="contact-link">
              📞 Call us: +91 98765 43210
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="contact-link"
            >
              💬 WhatsApp us
            </a>
          </div>

          <div className="coming-soon">
            We are almost ready to launch. Be the first to know.
          </div>

          <div className="social">
            <span>Follow us:</span>
            <a href="#">LinkedIn</a>
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
          </div>
        </section>

        <section className="hero-right" data-animate>
          <div className="phone-card">
            <div className="phone-header">Live View</div>
            <div className="phone-body">
              <div className="camera-view">
                <div className="camera-overlay">
                  <div className="camera-rec">
                    <span className="camera-rec-dot" />
                    <span className="camera-rec-text">REC</span>
                  </div>
                  <div className="camera-meta">
                    <span className="camera-location">Main Entrance</span>
                    <span className="camera-status">LIVE • 1080p</span>
                  </div>
                </div>
              </div>
              <div className="badge">24×7 Monitoring</div>
              <div className="phone-text">
                <h3>Security Got Smarter</h3>
                <p>Remote view, alerts, and access logs in one place.</p>
              </div>
              <button className="phone-btn">Coming Soon</button>
            </div>
          </div>

          <div className="shape shape-red" />
          <div className="shape shape-yellow" />
          <div className="shape shape-blue" />
        </section>
      </main>

      {/* HOW IT WORKS TIMELINE */}
      <section className="timeline-section" data-animate>
        <h2 className="timeline-title">How it works</h2>
        <p className="timeline-subtitle">
          Just three simple steps to secure your home or business.
        </p>
        <div className="timeline-steps">
          <div className="timeline-step">
            <div className="timeline-number">1</div>
            <div className="timeline-content">
              <h3>Share your requirement</h3>
              <p>
                Submit the form or call/WhatsApp us with a few details about
                your property and the number of cameras you&apos;re thinking
                about.
              </p>
            </div>
          </div>
          <div className="timeline-step">
            <div className="timeline-number">2</div>
            <div className="timeline-content">
              <h3>Free site visit &amp; quote</h3>
              <p>
                Our technician visits your location, plans camera points &amp;
                cabling and shares the best options and a transparent quote.
              </p>
            </div>
          </div>
          <div className="timeline-step">
            <div className="timeline-number">3</div>
            <div className="timeline-content">
              <h3>Installation &amp; handover</h3>
              <p>
                We complete the installation, configure mobile view and train
                you on using the system – usually within 1 working day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-section" data-animate>
        <h2 className="why-title">Why choose LookOutline?</h2>
        <p className="why-subtitle">
          Not just hardware. We focus on the right design, clean execution and
          long-term reliability.
        </p>
        <div className="why-grid">
          {whyPoints.map((item) => (
            <div key={item.title} className="why-card">
              <div className="why-icon">{item.icon}</div>
              <h3 className="why-card-title">{item.title}</h3>
              <p className="why-card-text">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS: brands + trust strip + packages */}
      <section id="products">
        <section className="trust-strip" data-animate>
          <div className="trust-item">
            <div className="trust-icon">🛡️</div>
            <div className="trust-text">
              <span className="trust-title">500+ installations</span>
              <span className="trust-subtitle">
                Homes &amp; businesses secured
              </span>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon">⭐</div>
            <div className="trust-text">
              <span className="trust-title">4.9/5 rated service</span>
              <span className="trust-subtitle">
                Trusted by Bangalore customers
              </span>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon">🧰</div>
            <div className="trust-text">
              <span className="trust-title">Certified technicians</span>
              <span className="trust-subtitle">
                Professional installation &amp; support
              </span>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon">📍</div>
            <div className="trust-text">
              <span className="trust-title">Bangalore-wide coverage</span>
              <span className="trust-subtitle">
                Apartments, villas &amp; offices
              </span>
            </div>
          </div>
        </section>

        <section className="brands-section" data-animate>
          <p className="brands-label">We work with leading security brands</p>
          <div className="brands-row">
            <span className="brand-pill">Hikvision</span>
            <span className="brand-pill">CP Plus</span>
            <span className="brand-pill">Dahua</span>
            <span className="brand-pill">Honeywell</span>
            <span className="brand-pill">Realme / TP-Link</span>
            <span className="brand-pill">Biometric OEMs</span>
          </div>
        </section>

        {/* PACKAGES PREVIEW */}
        <section className="packages-section" data-animate>
          <h2 className="packages-title">A quick idea of packages</h2>
          <p className="packages-subtitle">
            Exact pricing depends on your layout, cable length and brand
            preference – these are just ballpark starting points.
          </p>
          <div className="packages-grid">
            {packages.map((pkg) => (
              <div key={pkg.name} className="package-card">
                <p className="package-label">{pkg.label}</p>
                <h3 className="package-name">{pkg.name}</h3>
                <p className="package-price">{pkg.price}</p>
                <ul className="package-list">
                  {pkg.includes.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <p className="package-note">{pkg.note}</p>
              </div>
            ))}
          </div>
          <p className="packages-footer">
            Share a few details above and we&apos;ll send a{" "}
            <strong>clear, no-obligation quote</strong> tailored for your space.
          </p>
        </section>
      </section>

      {/* SUPPORT: Testimonials + FAQ + location */}
      <section id="support">
        {/* TESTIMONIALS */}
        <section className="testimonials-section" data-animate>
          <h2 className="testimonials-title">What customers say</h2>
          <p className="testimonials-subtitle">
            Early customers who&apos;ve worked with our team for CCTV and
            biometric installations.
          </p>
          <div className="testimonials-row">
            {testimonials.map((t) => (
              <div key={t.name} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">
                    {t.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="testimonial-name">{t.name}</p>
                    <p className="testimonial-area">{t.area}</p>
                  </div>
                </div>
                <div className="testimonial-rating">★★★★★</div>
                <p className="testimonial-text">“{t.text}”</p>
              </div>
            ))}
          </div>
        </section>

        <section className="faq-section" data-animate>
          <h2 className="faq-title">Frequently asked questions</h2>
          <div className="faq-list">
            {faqs.map((item, index) => (
              <div
                key={item.question}
                className={`faq-item ${
                  openFaqIndex === index ? "faq-open" : ""
                }`}
              >
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{item.question}</span>
                  <span className="faq-toggle">
                    {openFaqIndex === index ? "−" : "+"}
                  </span>
                </button>
                {openFaqIndex === index && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="location-section" data-animate>
          <div className="location-header">
            <div className="location-icon">📍</div>
            <div>
              <h2 className="location-title">Where we currently serve</h2>
              <p className="location-subtitle">
                We&apos;re starting with complete coverage across Bangalore
                city.
              </p>
            </div>
          </div>

          <div className="location-box">
            <p className="location-main">
              <strong>Bangalore –</strong> North, South, East &amp; West
            </p>
            <div className="location-grid">
              <span className="location-pill">Electronic City</span>
              <span className="location-pill">Whitefield</span>
              <span className="location-pill">Marathahalli</span>
              <span className="location-pill">HSR Layout</span>
              <span className="location-pill">BTM Layout</span>
              <span className="location-pill">Yelahanka</span>
              <span className="location-pill">Hebbal</span>
              <span className="location-pill">KR Puram</span>
              <span className="location-pill">Jayanagar</span>
              <span className="location-pill">JP Nagar</span>
              <span className="location-pill">Indiranagar</span>
              <span className="location-pill">Many more localities…</span>
            </div>
            <p className="location-note">
              If you&apos;re within Bangalore city limits, we&apos;ll most
              likely cover your area. Leave your details above and we&apos;ll
              confirm service availability.
            </p>
          </div>
        </section>
      </section>

      {/* Chat widget (bottom left) */}
      <div className="chat-widget">
        {chatOpen ? (
          <div className="chat-window">
            <div className="chat-header">
              <div>
                <div className="chat-title">LookOutline Assist</div>
                <div className="chat-subtitle">
                  Quick questions about CCTV &amp; biometrics
                </div>
              </div>
              <button
                type="button"
                className="chat-close"
                onClick={handleChatToggle}
                aria-label="Close chat"
              >
                ×
              </button>
            </div>
            <div className="chat-body">
              <div className="chat-messages">
                {chatMessages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`chat-message chat-${m.from}`}
                  >
                    <div className="chat-bubble">{m.text}</div>
                  </div>
                ))}
              </div>
              <div className="chat-quick">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    className="chat-quick-btn"
                    onClick={() => handleQuickQuestion(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
              <form className="chat-input-row" onSubmit={handleChatSubmit}>
                <input
                  type="text"
                  placeholder="Type your question…"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                />
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="chat-toggle-button"
            onClick={handleChatToggle}
          >
            💡 Ask a question
          </button>
        )}
      </div>

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noreferrer"
        className="floating-whatsapp"
      >
        <span className="wa-icon">💬</span>
        <span className="wa-text">Chat on WhatsApp</span>
      </a>

      <footer className="footer">
        <span>
          © {new Date().getFullYear()} LookOutline. All rights reserved.
        </span>
      </footer>
    </div>
  );
}

export default App;
