// frontend/src/App.jsx
import { useState } from "react";
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
        </nav>
      </header>

      {/* MAIN HERO (Services + Lead form) */}
      <main className="hero" id="services">
        <section className="hero-left">
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

        <section className="hero-right">
          <div className="phone-card">
            <div className="phone-header">Live View</div>
            <div className="phone-body">
              <div className="camera-view" />
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
      <section className="timeline-section">
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

      {/* PRODUCTS: brands + trust strip */}
      <section id="products">
        <section className="trust-strip">
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

        <section className="brands-section">
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
      </section>

      {/* SUPPORT: FAQ + location */}
      <section id="support">
        <section className="faq-section">
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

        <section className="location-section">
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
