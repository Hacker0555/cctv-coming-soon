// frontend/src/App.jsx
import { useState } from "react";
import "./App.css";
import logo from "./assets/lookoutline-logo.png"; // make sure this file exists

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setLoading(true);

    try {
      // IMPORTANT: relative URL works on both localhost (with proxy) and live domain
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

  return (
    <div className="page">
      <header className="header">
        <div className="logo">
          <img src={logo} alt="LookOutline logo" className="logo-img" />
        </div>
        <nav className="nav-links">
          <a href="#home">Home</a>
        </nav>
      </header>

      <main className="hero" id="home">
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

          {/* NEW: key points list */}
          <ul className="features-list">
            <li>HD night vision CCTV for homes, offices &amp; apartments</li>
            <li>Biometric attendance, access control &amp; visitor logs</li>
            <li>Remote mobile viewing with alerts &amp; cloud backup options</li>
          </ul>

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

          {/* NEW: quick direct contact strip (update phone/whatsapp to your real number) */}
          <div className="contact-quick">
            <span>Prefer talking now?</span>
            <a href="tel:+918088001088" className="contact-link">
              📞 Call us: +91 80880 01088
            </a>
            <a
              href="https://wa.me/918088001088"
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

      <footer className="footer">
        <span>
          © {new Date().getFullYear()} LookOutline. All rights reserved.
        </span>
      </footer>
    </div>
  );
}

export default App;
