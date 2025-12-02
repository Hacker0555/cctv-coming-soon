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
      // IMPORTANT: use relative URL for production
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
