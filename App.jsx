import { useState } from "react";

// ── Color tokens & global styles injected once ──────────────────────────────
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --yellow: #F5C518;
      --yellow-dark: #C9A010;
      --yellow-light: #FEF6D0;
      --black: #0D0D0D;
      --gray-900: #1A1A1A;
      --gray-700: #3D3D3D;
      --gray-500: #717171;
      --gray-200: #E8E8E8;
      --gray-100: #F5F5F5;
      --white: #FFFFFF;
      --red: #D94040;
      --green: #2A8C5A;
      --radius-sm: 6px;
      --radius-md: 12px;
      --radius-lg: 20px;
      --radius-xl: 32px;
      --shadow: 0 2px 16px rgba(0,0,0,0.08);
      --shadow-lg: 0 8px 40px rgba(0,0,0,0.14);
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--gray-100);
      color: var(--gray-900);
      line-height: 1.6;
      min-height: 100vh;
    }

    h1, h2, h3, h4, h5 {
      font-family: 'Syne', sans-serif;
      line-height: 1.15;
    }

    /* Nav */
    .nav {
      position: sticky; top: 0; z-index: 100;
      background: var(--black);
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 2rem;
      height: 68px;
      border-bottom: 3px solid var(--yellow);
    }
    .nav-logo {
      font-family: 'Syne', sans-serif;
      font-weight: 800; font-size: 1.4rem;
      color: var(--white); text-decoration: none;
      display: flex; align-items: center; gap: 8px;
      cursor: pointer;
    }
    .nav-logo span { color: var(--yellow); }
    .nav-links { display: flex; gap: 6px; }
    .nav-link {
      font-size: 0.9rem; font-weight: 500;
      color: rgba(255,255,255,0.7);
      padding: 8px 14px; border-radius: var(--radius-sm);
      cursor: pointer; border: none; background: none;
      transition: color 0.2s, background 0.2s;
      font-family: 'DM Sans', sans-serif;
      letter-spacing: 0.01em;
    }
    .nav-link:hover { color: var(--white); background: rgba(255,255,255,0.08); }
    .nav-link.active { color: var(--black); background: var(--yellow); font-weight: 600; }
    .nav-cta {
      background: var(--yellow); color: var(--black);
      border: none; border-radius: var(--radius-sm);
      font-family: 'Syne', sans-serif; font-weight: 700;
      font-size: 0.88rem; padding: 10px 20px;
      cursor: pointer; transition: background 0.2s, transform 0.15s;
    }
    .nav-cta:hover { background: var(--yellow-dark); transform: translateY(-1px); }

    /* Buttons */
    .btn {
      display: inline-flex; align-items: center; gap: 8px;
      font-family: 'Syne', sans-serif; font-weight: 700;
      border: none; border-radius: var(--radius-md);
      cursor: pointer; transition: all 0.2s; text-decoration: none;
    }
    .btn-primary {
      background: var(--yellow); color: var(--black);
      padding: 14px 28px; font-size: 1rem;
    }
    .btn-primary:hover { background: var(--yellow-dark); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(245,197,24,0.35); }
    .btn-outline {
      background: transparent; color: var(--white);
      border: 2px solid var(--white); padding: 12px 26px; font-size: 0.95rem;
    }
    .btn-outline:hover { background: var(--white); color: var(--black); }
    .btn-dark {
      background: var(--black); color: var(--white);
      padding: 14px 28px; font-size: 1rem;
    }
    .btn-dark:hover { background: var(--gray-700); transform: translateY(-2px); }
    .btn-sm { padding: 10px 20px; font-size: 0.88rem; }

    /* Cards */
    .card {
      background: var(--white); border-radius: var(--radius-lg);
      padding: 2rem; box-shadow: var(--shadow);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }

    /* Hero */
    .hero {
      background: var(--black);
      padding: 5rem 2rem 6rem;
      text-align: center;
      position: relative; overflow: hidden;
    }
    .hero::before {
      content: ''; position: absolute; inset: 0;
      background: repeating-linear-gradient(
        45deg, transparent, transparent 40px,
        rgba(245,197,24,0.03) 40px, rgba(245,197,24,0.03) 41px
      );
      pointer-events: none;
    }
    .hero-eyebrow {
      display: inline-block;
      background: var(--yellow); color: var(--black);
      font-family: 'Syne', sans-serif; font-weight: 700;
      font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase;
      padding: 6px 16px; border-radius: var(--radius-sm); margin-bottom: 1.5rem;
    }
    .hero h1 { font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 800; color: var(--white); margin-bottom: 1.25rem; }
    .hero h1 span { color: var(--yellow); }
    .hero p { font-size: 1.15rem; color: rgba(255,255,255,0.65); max-width: 520px; margin: 0 auto 2.5rem; }

    /* Sections */
    .section { padding: 5rem 2rem; }
    .section-title { font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 800; margin-bottom: 0.75rem; }
    .section-sub { font-size: 1.05rem; color: var(--gray-500); margin-bottom: 3rem; }
    .section-label {
      display: inline-block;
      font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--yellow-dark);
      margin-bottom: 0.5rem; font-family: 'Syne', sans-serif;
    }

    /* Grid */
    .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
    .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; }
    .grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.25rem; }

    /* Container */
    .container { max-width: 1120px; margin: 0 auto; }

    /* Form */
    .form-group { margin-bottom: 1.25rem; }
    .form-label {
      display: block; font-weight: 500; font-size: 0.9rem;
      margin-bottom: 0.4rem; color: var(--gray-700);
    }
    .form-label .required { color: var(--red); margin-left: 2px; }
    .form-input, .form-select, .form-textarea {
      width: 100%; padding: 12px 14px;
      border: 1.5px solid var(--gray-200); border-radius: var(--radius-sm);
      font-family: 'DM Sans', sans-serif; font-size: 0.95rem;
      color: var(--gray-900); background: var(--white);
      transition: border-color 0.2s, box-shadow 0.2s;
      outline: none;
    }
    .form-input:focus, .form-select:focus, .form-textarea:focus {
      border-color: var(--yellow); box-shadow: 0 0 0 3px rgba(245,197,24,0.15);
    }
    .form-input.error, .form-select.error, .form-textarea.error {
      border-color: var(--red); box-shadow: 0 0 0 3px rgba(217,64,64,0.1);
    }
    .form-input.valid { border-color: var(--green); }
    .error-msg { color: var(--red); font-size: 0.82rem; margin-top: 4px; display: flex; align-items: center; gap: 4px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }

    /* Badge */
    .badge {
      display: inline-flex; align-items: center; gap: 5px;
      font-size: 0.78rem; font-weight: 600;
      padding: 4px 10px; border-radius: 99px;
    }
    .badge-yellow { background: var(--yellow-light); color: var(--yellow-dark); }
    .badge-black { background: var(--black); color: var(--yellow); }

    /* Stats bar */
    .stats-bar {
      background: var(--yellow); padding: 1.5rem 2rem;
      display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap;
    }
    .stat-item { text-align: center; }
    .stat-num { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 2rem; color: var(--black); }
    .stat-lbl { font-size: 0.82rem; font-weight: 500; color: rgba(0,0,0,0.6); }

    /* Icon circle */
    .icon-circle {
      width: 56px; height: 56px; border-radius: 50%;
      background: var(--yellow-light); color: var(--yellow-dark);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.5rem; margin-bottom: 1rem; flex-shrink: 0;
    }
    .icon-circle.dark { background: var(--black); color: var(--yellow); }

    /* Team card */
    .team-card { text-align: center; }
    .team-avatar {
      width: 80px; height: 80px; border-radius: 50%;
      background: var(--gray-200);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Syne', sans-serif; font-weight: 800;
      font-size: 1.5rem; color: var(--gray-700);
      margin: 0 auto 1rem;
    }

    /* Toast */
    .toast {
      position: fixed; bottom: 2rem; right: 2rem; z-index: 200;
      background: var(--green); color: var(--white);
      padding: 1rem 1.5rem; border-radius: var(--radius-md);
      font-weight: 500; font-size: 0.95rem;
      box-shadow: var(--shadow-lg); display: flex; align-items: center; gap: 10px;
      animation: slideUp 0.3s ease;
    }
    @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

    /* Footer */
    .footer { background: var(--black); color: rgba(255,255,255,0.6); padding: 3rem 2rem 2rem; }
    .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 2rem; margin-bottom: 2.5rem; }
    @media (max-width: 700px) { .footer-grid { grid-template-columns: 1fr 1fr; } .nav-links { display: none; } }
    .footer-logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.3rem; color: var(--white); margin-bottom: 0.75rem; }
    .footer-logo span { color: var(--yellow); }
    .footer h4 { font-family: 'Syne', sans-serif; color: var(--white); font-size: 0.95rem; margin-bottom: 0.75rem; }
    .footer-link { display: block; font-size: 0.88rem; color: rgba(255,255,255,0.55); cursor: pointer; margin-bottom: 6px; transition: color 0.2s; }
    .footer-link:hover { color: var(--yellow); }
    .footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
    .footer-bottom p { font-size: 0.82rem; }

    /* Page header */
    .page-header { background: var(--black); padding: 4rem 2rem 3rem; }
    .page-header h1 { font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 800; color: var(--white); }
    .page-header h1 span { color: var(--yellow); }
    .page-header p { color: rgba(255,255,255,0.6); font-size: 1.05rem; margin-top: 0.75rem; max-width: 500px; }

    /* Contact */
    .contact-info-item { display: flex; gap: 1rem; align-items: flex-start; margin-bottom: 1.5rem; }
    .contact-icon { width: 44px; height: 44px; background: var(--yellow-light); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 1.2rem; }

    /* Service card accent */
    .service-card { position: relative; overflow: hidden; }
    .service-card::after { content: ''; position: absolute; top: -20px; right: -20px; width: 80px; height: 80px; background: var(--yellow-light); border-radius: 50%; opacity: 0.6; transition: transform 0.3s; }
    .service-card:hover::after { transform: scale(1.4); }

    /* Booking steps */
    .booking-steps { display: flex; gap: 0; margin-bottom: 2.5rem; border-radius: var(--radius-md); overflow: hidden; border: 1.5px solid var(--gray-200); }
    .booking-step { flex: 1; padding: 0.75rem; text-align: center; font-size: 0.82rem; font-weight: 600; font-family: 'Syne', sans-serif; color: var(--gray-500); background: var(--white); border-right: 1.5px solid var(--gray-200); transition: background 0.2s, color 0.2s; }
    .booking-step:last-child { border-right: none; }
    .booking-step.active { background: var(--yellow); color: var(--black); }
    .booking-step.done { background: var(--black); color: var(--yellow); }

    /* Divider */
    .divider { height: 1px; background: var(--gray-200); margin: 2rem 0; }

    /* Alert */
    .alert-success {
      background: #EAF7EF; border: 1.5px solid #2A8C5A; border-radius: var(--radius-md);
      padding: 1.5rem; margin-top: 1.5rem; display: flex; align-items: flex-start; gap: 12px;
    }
  `}</style>
);

// ── Shared Nav & Footer ──────────────────────────────────────────────────────
function Nav({ page, setPage }) {
  const links = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "about", label: "About Us" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <nav className="nav">
      <div className="nav-logo" onClick={() => setPage("home")}>
        🚕 <span>Book</span>ATaxi
      </div>
      <div className="nav-links">
        {links.map((l) => (
          <button
            key={l.id}
            className={`nav-link ${page === l.id ? "active" : ""}`}
            onClick={() => setPage(l.id)}
          >
            {l.label}
          </button>
        ))}
      </div>
      <button className="nav-cta" onClick={() => setPage("book")}>
        Book a Ride →
      </button>
    </nav>
  );
}

function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">🚕 <span>Book</span>ATaxi</div>
            <p style={{ fontSize: "0.88rem", lineHeight: 1.8, maxWidth: 260 }}>
              Your reliable ride partner — available 24/7 across the city. Safety, comfort, and punctuality guaranteed.
            </p>
          </div>
          <div>
            <h4>Navigate</h4>
            {["home","services","about","contact"].map(p => (
              <span key={p} className="footer-link" onClick={() => setPage(p)}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </span>
            ))}
          </div>
          <div>
            <h4>Services</h4>
            {["Standard Ride","Premium Ride","Airport Transfer","Corporate Account","Group Booking"].map(s => (
              <span key={s} className="footer-link" onClick={() => setPage("services")}>{s}</span>
            ))}
          </div>
          <div>
            <h4>Contact</h4>
            <span className="footer-link">📞 1-800-TAXI-NOW</span>
            <span className="footer-link">✉ hello@bookataxiapp.com</span>
            <span className="footer-link">📍 123 Main St, Cityville</span>
            <span className="footer-link">🕐 24/7 Support</span>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 BookATaxi. All rights reserved.</p>
          <p>Privacy Policy · Terms of Service · Cookie Policy</p>
        </div>
      </div>
    </footer>
  );
}

// ── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="hero-eyebrow">🚕 Trusted by 50,000+ riders</div>
          <h1>Your Ride,<br /><span>On Demand</span></h1>
          <p>Fast, reliable, and affordable taxi bookings — wherever you are, whenever you need it.</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={() => setPage("book")}>
              Book a Ride Now →
            </button>
            <button className="btn btn-outline" onClick={() => setPage("services")}>
              View Services
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-bar">
        {[["50K+","Happy Riders"],["98%","On-Time Rate"],["24/7","Availability"],["4.9★","Average Rating"]].map(([n,l]) => (
          <div key={l} className="stat-item">
            <div className="stat-num">{n}</div>
            <div className="stat-lbl">{l}</div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="section-label">Simple Process</div>
          <h2 className="section-title">How It Works</h2>
          <p className="section-sub">Three easy steps to get your ride</p>
          <div className="grid-3">
            {[
              { icon: "📍", step: "01", title: "Enter Location", desc: "Tell us where you're starting and where you want to go." },
              { icon: "🚕", step: "02", title: "Choose Your Ride", desc: "Pick from Standard, Premium, or Specialty options." },
              { icon: "✅", step: "03", title: "Confirm & Go", desc: "Get matched with a driver and track your ride in real time." },
            ].map(({ icon, step, title, desc }) => (
              <div key={step} className="card" style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{icon}</div>
                <div className="badge badge-yellow" style={{ marginBottom: "0.75rem" }}>Step {step}</div>
                <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.15rem", marginBottom: "0.5rem" }}>{title}</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--gray-500)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="section" style={{ background: "var(--gray-100)" }}>
        <div className="container">
          <div className="section-label">What We Offer</div>
          <h2 className="section-title">Our Services</h2>
          <p className="section-sub">Tailored rides for every need</p>
          <div className="grid-2">
            {[
              { icon: "🚗", title: "Standard Ride", price: "From $5", desc: "Comfortable everyday rides at an affordable price." },
              { icon: "💎", title: "Premium Ride", price: "From $15", desc: "Luxury vehicles for those special occasions." },
              { icon: "✈️", title: "Airport Transfer", price: "From $25", desc: "Stress-free, punctual airport pickups and drop-offs." },
              { icon: "👥", title: "Group Booking", price: "From $20", desc: "Spacious vehicles for groups of up to 8 people." },
            ].map(({ icon, title, price, desc }) => (
              <div key={title} className="card service-card" style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <div className="icon-circle" style={{ fontSize: "1.4rem" }}>{icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                    <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.05rem" }}>{title}</h3>
                    <span className="badge badge-black">{price}</span>
                  </div>
                  <p style={{ fontSize: "0.9rem", color: "var(--gray-500)" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <button className="btn btn-dark" onClick={() => setPage("services")}>See All Services</button>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ background: "var(--yellow)", padding: "4rem 2rem", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1rem" }}>
            Ready for Your Next Ride?
          </h2>
          <p style={{ fontSize: "1.1rem", color: "rgba(0,0,0,0.65)", marginBottom: "2rem" }}>
            Join thousands of satisfied riders. Book in under 60 seconds.
          </p>
          <button className="btn btn-dark" style={{ fontSize: "1.05rem", padding: "16px 36px" }} onClick={() => setPage("book")}>
            Book Now — It's Free →
          </button>
        </div>
      </section>
    </>
  );
}

// ── SERVICES PAGE ────────────────────────────────────────────────────────────
function ServicesPage({ setPage }) {
  const services = [
    { icon: "🚗", title: "Standard Ride", price: "$5 – $20", tag: "Most Popular", desc: "Our everyday ride option. Clean, comfortable cars for solo or duo travel. Ideal for daily commutes, errands, and casual trips around town.", features: ["Up to 4 passengers","AC & music","Driver rating guarantee","Real-time tracking"] },
    { icon: "💎", title: "Premium Ride", price: "$15 – $60", tag: "Top Rated", desc: "Upgrade to a luxury experience with our Premium fleet. Professional chauffeurs, high-end vehicles, and premium amenities.", features: ["Luxury vehicle","Professional chauffeur","Complimentary water","Flight tracking"] },
    { icon: "✈️", title: "Airport Transfer", price: "$25 – $80", tag: "Guaranteed On-Time", desc: "Never miss a flight again. Our airport specialists monitor your flight in real time and adjust pickup times automatically.", features: ["Flight monitoring","Meet & greet","Luggage assistance","Free waiting time"] },
    { icon: "🏢", title: "Corporate Account", price: "Custom pricing", tag: "Business", desc: "Managed accounts for businesses of all sizes. Centralized billing, priority dispatch, and monthly reports.", features: ["Priority dispatch","Monthly invoicing","Dedicated account manager","Reporting dashboard"] },
    { icon: "👥", title: "Group Booking", price: "$20 – $100", tag: "Groups 5–8", desc: "Spacious minivans and SUVs for larger groups. Perfect for events, weddings, airport runs, and night-outs.", features: ["Up to 8 passengers","Extra luggage space","Coordinated pickups","Competitive group rates"] },
    { icon: "🌙", title: "Night Ride", price: "$8 – $30", tag: "24/7", desc: "Available around the clock. Our night shift drivers are specially vetted for late-night safety and reliability.", features: ["Background-checked drivers","GPS sharing","SOS button","Fixed night pricing"] },
  ];

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="section-label" style={{ color: "var(--yellow)" }}>What We Offer</div>
          <h1>Our <span>Services</span></h1>
          <p>From daily commutes to luxury rides — we have a service for every journey.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid-2">
            {services.map(({ icon, title, price, tag, desc, features }) => (
              <div key={title} className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ fontSize: "2.2rem" }}>{icon}</div>
                  <span className="badge badge-yellow">{tag}</span>
                </div>
                <div>
                  <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.2rem", marginBottom: "4px" }}>{title}</h3>
                  <p style={{ color: "var(--yellow-dark)", fontWeight: 700, fontFamily: "Syne, sans-serif", fontSize: "0.95rem" }}>{price}</p>
                </div>
                <p style={{ fontSize: "0.9rem", color: "var(--gray-500)", lineHeight: 1.7 }}>{desc}</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
                  {features.map(f => (
                    <li key={f} style={{ fontSize: "0.88rem", display: "flex", alignItems: "center", gap: "8px", color: "var(--gray-700)" }}>
                      <span style={{ color: "var(--green)", fontWeight: 700 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button className="btn btn-primary btn-sm" onClick={() => setPage("book")} style={{ alignSelf: "flex-start", marginTop: "auto" }}>
                  Book This Service →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage({ setPage }) {
  const team = [
    { initials: "MJ", name: "Marcus Johnson", role: "Founder & CEO" },
    { initials: "SP", name: "Sara Patel", role: "Head of Operations" },
    { initials: "DL", name: "David Lee", role: "Chief Technology Officer" },
    { initials: "AM", name: "Aisha Mbeki", role: "Head of Driver Experience" },
  ];

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="section-label" style={{ color: "var(--yellow)" }}>Our Story</div>
          <h1>About <span>BookATaxi</span></h1>
          <p>Connecting communities through safe, reliable, and affordable transportation since 2018.</p>
        </div>
      </div>

      {/* Mission */}
      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <div>
              <div className="section-label">Our Mission</div>
              <h2 className="section-title">Rides That <span style={{ color: "var(--yellow-dark)" }}>Move</span> Lives Forward</h2>
              <p style={{ color: "var(--gray-500)", marginBottom: "1.5rem", lineHeight: 1.8 }}>
                BookATaxi was founded on a simple belief: getting from A to B should be stress-free, safe, and accessible to everyone. We started as a small fleet of 10 cars in Cityville — today we operate in 35 cities with over 4,000 licensed drivers.
              </p>
              <p style={{ color: "var(--gray-500)", marginBottom: "2rem", lineHeight: 1.8 }}>
                Every ride we power is a commitment to our community: transparency in pricing, accountability in service, and a driver network that is thoroughly vetted and continuously supported.
              </p>
              <button className="btn btn-primary" onClick={() => setPage("book")}>Book Your First Ride</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {[
                { icon: "🌍", title: "35 Cities", desc: "And growing every quarter" },
                { icon: "🚗", title: "4,000+ Drivers", desc: "Licensed and background-checked" },
                { icon: "⭐", title: "4.9 Stars", desc: "Average app store rating" },
                { icon: "💼", title: "6 Years", desc: "Of trusted service" },
              ].map(({ icon, title, desc }) => (
                <div key={title} style={{ background: "var(--gray-100)", borderRadius: "var(--radius-md)", padding: "1.25rem" }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{icon}</div>
                  <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1rem" }}>{title}</div>
                  <div style={{ fontSize: "0.82rem", color: "var(--gray-500)" }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: "var(--black)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="section-label" style={{ color: "var(--yellow)" }}>Our Values</div>
          <h2 className="section-title" style={{ color: "var(--white)" }}>What We Stand For</h2>
          <p className="section-sub" style={{ color: "rgba(255,255,255,0.5)" }}>The principles that guide every decision we make</p>
          <div className="grid-3">
            {[
              { icon: "🔒", title: "Safety First", desc: "All drivers undergo rigorous background checks, vehicle inspections, and ongoing safety training." },
              { icon: "💰", title: "Fair Pricing", desc: "No surge pricing surprises. What you see is what you pay — always." },
              { icon: "🤝", title: "Community", desc: "We support local drivers with fair pay, benefits, and career development opportunities." },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ background: "rgba(255,255,255,0.05)", borderRadius: "var(--radius-lg)", padding: "2rem", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{icon}</div>
                <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, color: "var(--yellow)", marginBottom: "0.75rem" }}>{title}</h3>
                <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ background: "var(--gray-100)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="section-label">The People</div>
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-sub">Passionate people building the future of urban mobility</p>
          <div className="grid-4">
            {team.map(({ initials, name, role }) => (
              <div key={name} className="card team-card">
                <div className="team-avatar">{initials}</div>
                <h4 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: "4px" }}>{name}</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--gray-500)" }}>{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ── CONTACT PAGE ─────────────────────────────────────────────────────────────
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    else if (form.name.trim().length < 2) e.name = "Name must be at least 2 characters.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email address.";
    if (!form.subject.trim()) e.subject = "Subject is required.";
    if (!form.message.trim()) e.message = "Message is required.";
    else if (form.message.trim().length < 15) e.message = "Message must be at least 15 characters.";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) setSubmitted(true);
  };

  const field = (key, label, type = "text", ph = "") => (
    <div className="form-group">
      <label className="form-label">{label} <span className="required">*</span></label>
      {type === "textarea" ? (
        <textarea
          className={`form-textarea ${errors[key] ? "error" : form[key] ? "valid" : ""}`}
          rows={5} placeholder={ph}
          value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
          style={{ resize: "vertical" }}
        />
      ) : (
        <input
          className={`form-input ${errors[key] ? "error" : form[key] ? "valid" : ""}`}
          type={type} placeholder={ph}
          value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
        />
      )}
      {errors[key] && <div className="error-msg">⚠ {errors[key]}</div>}
    </div>
  );

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="section-label" style={{ color: "var(--yellow)" }}>Get In Touch</div>
          <h1>Contact <span>Us</span></h1>
          <p>We'd love to hear from you. Our team typically responds within 2 hours.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "3rem", alignItems: "start" }}>
            {/* Info */}
            <div>
              <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.3rem", marginBottom: "1.5rem" }}>Contact Information</h3>
              {[
                { icon: "📞", label: "Phone", value: "1-800-TAXI-NOW\nMon–Sun, 24/7" },
                { icon: "✉️", label: "Email", value: "hello@bookataxiapp.com\nSupport responds in 2hrs" },
                { icon: "📍", label: "Headquarters", value: "123 Main Street\nCityville, CA 90001" },
                { icon: "💬", label: "Live Chat", value: "Available in our app\niOS and Android" },
              ].map(({ icon, label, value }) => (
                <div key={label} className="contact-info-item">
                  <div className="contact-icon">{icon}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: "2px" }}>{label}</div>
                    <div style={{ fontSize: "0.88rem", color: "var(--gray-500)", whiteSpace: "pre-line" }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="card" style={{ padding: "2.5rem" }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                  <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.4rem", marginBottom: "0.5rem" }}>Message Sent!</h3>
                  <p style={{ color: "var(--gray-500)" }}>Thanks for reaching out. We'll get back to you within 2 hours.</p>
                  <button className="btn btn-primary" style={{ marginTop: "1.5rem" }} onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}>Send Another Message</button>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.2rem", marginBottom: "1.5rem" }}>Send Us a Message</h3>
                  <div className="form-row">
                    {field("name", "Full Name", "text", "Jane Smith")}
                    {field("email", "Email Address", "email", "jane@email.com")}
                  </div>
                  {field("subject", "Subject", "text", "Booking issue, feedback, partnership...")}
                  {field("message", "Your Message", "textarea", "Tell us how we can help...")}
                  <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={handleSubmit}>
                    Send Message →
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ── BOOKING PAGE ─────────────────────────────────────────────────────────────
function BookingPage() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    pickupAddress: "", dropoffAddress: "", date: "", time: "",
    serviceType: "", passengers: "", luggage: "", notes: "",
    cardNumber: "", cardName: "", expiry: "", cvv: "",
    paymentMethod: "card",
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [booked, setBooked] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validateStep1 = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required.";
    if (!form.lastName.trim()) e.lastName = "Last name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email format.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    else if (!/^\+?[\d\s\-()]{7,15}$/.test(form.phone)) e.phone = "Enter a valid phone number.";
    return e;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.pickupAddress.trim()) e.pickupAddress = "Pickup address is required.";
    if (!form.dropoffAddress.trim()) e.dropoffAddress = "Drop-off address is required.";
    if (!form.date) e.date = "Date is required.";
    else {
      const selected = new Date(form.date);
      const today = new Date(); today.setHours(0, 0, 0, 0);
      if (selected < today) e.date = "Date cannot be in the past.";
    }
    if (!form.time) e.time = "Time is required.";
    if (!form.serviceType) e.serviceType = "Please select a service type.";
    if (!form.passengers) e.passengers = "Please select number of passengers.";
    return e;
  };

  const validateStep3 = () => {
    if (form.paymentMethod !== "card") return {};
    const e = {};
    if (!form.cardName.trim()) e.cardName = "Cardholder name is required.";
    if (!form.cardNumber.trim()) e.cardNumber = "Card number is required.";
    else if (!/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(form.cardNumber.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim())) {
      if (form.cardNumber.replace(/\D/g, "").length !== 16) e.cardNumber = "Card number must be 16 digits.";
    }
    if (!form.expiry.trim()) e.expiry = "Expiry date is required.";
    else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) e.expiry = "Use MM/YY format.";
    if (!form.cvv.trim()) e.cvv = "CVV is required.";
    else if (!/^\d{3,4}$/.test(form.cvv)) e.cvv = "CVV must be 3-4 digits.";
    return e;
  };

  const nextStep = () => {
    let e = {};
    if (step === 1) e = validateStep1();
    if (step === 2) e = validateStep2();
    if (step === 3) e = validateStep3();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      if (step < 3) setStep(s => s + 1);
      else setBooked(true);
    }
  };

  const inp = (key, label, type = "text", ph = "", required = true) => (
    <div className="form-group">
      <label className="form-label">{label}{required && <span className="required"> *</span>}</label>
      <input
        className={`form-input ${errors[key] ? "error" : form[key] ? "valid" : ""}`}
        type={type} placeholder={ph} value={form[key]}
        onChange={e => set(key, e.target.value)}
      />
      {errors[key] && <div className="error-msg">⚠ {errors[key]}</div>}
    </div>
  );

  const sel = (key, label, options, required = true) => (
    <div className="form-group">
      <label className="form-label">{label}{required && <span className="required"> *</span>}</label>
      <select
        className={`form-select ${errors[key] ? "error" : form[key] ? "valid" : ""}`}
        value={form[key]} onChange={e => set(key, e.target.value)}
      >
        <option value="">Select...</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {errors[key] && <div className="error-msg">⚠ {errors[key]}</div>}
    </div>
  );

  const today = new Date().toISOString().split("T")[0];

  if (booked) {
    const confNum = "BAT" + Math.random().toString(36).substring(2, 8).toUpperCase();
    return (
      <section className="section">
        <div className="container" style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎉</div>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "2rem", marginBottom: "0.75rem" }}>Booking Confirmed!</h2>
          <p style={{ color: "var(--gray-500)", marginBottom: "2rem" }}>Your ride has been booked successfully. You'll receive a confirmation email at <strong>{form.email}</strong>.</p>
          <div className="card" style={{ textAlign: "left", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
              <span style={{ fontWeight: 600 }}>Confirmation #</span>
              <span className="badge badge-black">{confNum}</span>
            </div>
            {[
              ["Passenger", `${form.firstName} ${form.lastName}`],
              ["Pickup", form.pickupAddress],
              ["Drop-off", form.dropoffAddress],
              ["Date & Time", `${form.date} at ${form.time}`],
              ["Service", form.serviceType],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: "1px solid var(--gray-200)", fontSize: "0.9rem" }}>
                <span style={{ color: "var(--gray-500)" }}>{k}</span>
                <span style={{ fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => { setBooked(false); setStep(1); setForm(Object.fromEntries(Object.keys(form).map(k => [k, ""]))); }}>
            Book Another Ride
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="section-label" style={{ color: "var(--yellow)" }}>Ride Booking</div>
          <h1>Book a <span>Ride</span></h1>
          <p>Fill in the details below. Takes less than 2 minutes.</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 680 }}>
          {/* Steps indicator */}
          <div className="booking-steps">
            {["1. Your Details","2. Trip Info","3. Payment"].map((s, i) => (
              <div key={s} className={`booking-step ${step === i+1 ? "active" : step > i+1 ? "done" : ""}`}>
                {step > i+1 ? "✓ " : ""}{s}
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: "2.5rem" }}>
            {/* Step 1: Personal Details */}
            {step === 1 && (
              <>
                <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.25rem", marginBottom: "1.5rem" }}>Personal Details</h3>
                <div className="form-row">
                  {inp("firstName", "First Name", "text", "Jane")}
                  {inp("lastName", "Last Name", "text", "Smith")}
                </div>
                {inp("email", "Email Address", "email", "jane@email.com")}
                {inp("phone", "Phone Number", "tel", "+1 (555) 000-0000")}
              </>
            )}

            {/* Step 2: Trip Details */}
            {step === 2 && (
              <>
                <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.25rem", marginBottom: "1.5rem" }}>Trip Details</h3>
                {inp("pickupAddress", "Pickup Address", "text", "123 Main St, Cityville")}
                {inp("dropoffAddress", "Drop-off Address", "text", "456 Airport Blvd, Terminal 2")}
                <div className="form-row">
                  {inp("date", "Pickup Date", "date")}
                  {inp("time", "Pickup Time", "time")}
                </div>
                {sel("serviceType", "Service Type", [
                  { value: "Standard Ride", label: "🚗 Standard Ride" },
                  { value: "Premium Ride", label: "💎 Premium Ride" },
                  { value: "Airport Transfer", label: "✈️ Airport Transfer" },
                  { value: "Group Booking", label: "👥 Group Booking" },
                  { value: "Night Ride", label: "🌙 Night Ride" },
                  { value: "Corporate Account", label: "🏢 Corporate Account" },
                ])}
                <div className="form-row">
                  {sel("passengers", "Passengers", [1,2,3,4,5,6,7,8].map(n => ({ value: String(n), label: `${n} passenger${n > 1 ? "s" : ""}` })))}
                  {sel("luggage", "Luggage", [
                    { value: "none", label: "No luggage" },
                    { value: "small", label: "Small (1–2 bags)" },
                    { value: "medium", label: "Medium (3–4 bags)" },
                    { value: "large", label: "Large (5+ / oversized)" },
                  ], false)}
                </div>
                <div className="form-group">
                  <label className="form-label">Special Requests <span style={{ color: "var(--gray-500)", fontWeight: 400 }}>(optional)</span></label>
                  <textarea className="form-textarea" rows={3} placeholder="Child seat, accessibility needs, etc." value={form.notes} onChange={e => set("notes", e.target.value)} style={{ resize: "vertical" }} />
                </div>
              </>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <>
                <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.25rem", marginBottom: "1.5rem" }}>Payment Details</h3>
                <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
                  {[["card","💳 Credit / Debit Card"],["cash","💵 Cash on Arrival"],["wallet","📱 Digital Wallet"]].map(([v, l]) => (
                    <button key={v} onClick={() => set("paymentMethod", v)} style={{
                      flex: 1, padding: "12px", borderRadius: "var(--radius-sm)", cursor: "pointer",
                      fontFamily: "DM Sans, sans-serif", fontWeight: 500, fontSize: "0.88rem",
                      border: form.paymentMethod === v ? "2px solid var(--yellow-dark)" : "1.5px solid var(--gray-200)",
                      background: form.paymentMethod === v ? "var(--yellow-light)" : "var(--white)",
                      color: form.paymentMethod === v ? "var(--yellow-dark)" : "var(--gray-700)",
                      transition: "all 0.2s",
                    }}>{l}</button>
                  ))}
                </div>

                {form.paymentMethod === "card" && (
                  <>
                    {inp("cardName", "Cardholder Name", "text", "Jane Smith")}
                    <div className="form-group">
                      <label className="form-label">Card Number <span className="required">*</span></label>
                      <input
                        className={`form-input ${errors.cardNumber ? "error" : form.cardNumber ? "valid" : ""}`}
                        type="text" placeholder="1234 5678 9012 3456" maxLength={19}
                        value={form.cardNumber}
                        onChange={e => {
                          let v = e.target.value.replace(/\D/g, "").slice(0, 16);
                          v = v.replace(/(\d{4})(?=\d)/g, "$1 ");
                          set("cardNumber", v);
                        }}
                      />
                      {errors.cardNumber && <div className="error-msg">⚠ {errors.cardNumber}</div>}
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Expiry Date <span className="required">*</span></label>
                        <input
                          className={`form-input ${errors.expiry ? "error" : form.expiry ? "valid" : ""}`}
                          type="text" placeholder="MM/YY" maxLength={5}
                          value={form.expiry}
                          onChange={e => {
                            let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                            if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
                            set("expiry", v);
                          }}
                        />
                        {errors.expiry && <div className="error-msg">⚠ {errors.expiry}</div>}
                      </div>
                      <div className="form-group">
                        <label className="form-label">CVV <span className="required">*</span></label>
                        <input
                          className={`form-input ${errors.cvv ? "error" : form.cvv ? "valid" : ""}`}
                          type="text" placeholder="123" maxLength={4}
                          value={form.cvv} onChange={e => set("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
                        />
                        {errors.cvv && <div className="error-msg">⚠ {errors.cvv}</div>}
                      </div>
                    </div>
                    <div style={{ background: "var(--gray-100)", borderRadius: "var(--radius-sm)", padding: "0.75rem 1rem", fontSize: "0.82rem", color: "var(--gray-500)", display: "flex", alignItems: "center", gap: "8px" }}>
                      🔒 Your payment information is encrypted and secure.
                    </div>
                  </>
                )}

                {form.paymentMethod !== "card" && (
                  <div style={{ background: "var(--yellow-light)", borderRadius: "var(--radius-md)", padding: "1.5rem", border: "1.5px solid var(--yellow)" }}>
                    <p style={{ fontSize: "0.9rem", color: "var(--yellow-dark)", fontWeight: 500 }}>
                      {form.paymentMethod === "cash"
                        ? "💵 You'll pay the driver directly in cash at the end of your ride. Exact change appreciated."
                        : "📱 You'll receive a payment link to your email before your ride. Complete it in the app."}
                    </p>
                  </div>
                )}

                {/* Order summary */}
                <div className="divider" />
                <h4 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, marginBottom: "1rem" }}>Booking Summary</h4>
                <div style={{ background: "var(--gray-100)", borderRadius: "var(--radius-md)", padding: "1rem", fontSize: "0.88rem" }}>
                  {[
                    ["Name", `${form.firstName} ${form.lastName}`],
                    ["Service", form.serviceType],
                    ["Pickup", form.pickupAddress],
                    ["Drop-off", form.dropoffAddress],
                    ["Date & Time", `${form.date} at ${form.time}`],
                    ["Passengers", form.passengers],
                  ].map(([k, v]) => v && (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid var(--gray-200)" }}>
                      <span style={{ color: "var(--gray-500)" }}>{k}</span>
                      <span style={{ fontWeight: 500 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Navigation buttons */}
            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
              {step > 1 && (
                <button className="btn btn-outline" style={{ color: "var(--black)", borderColor: "var(--gray-200)", flex: 1, justifyContent: "center" }} onClick={() => setStep(s => s - 1)}>
                  ← Back
                </button>
              )}
              <button className="btn btn-primary" style={{ flex: 2, justifyContent: "center" }} onClick={nextStep}>
                {step === 3 ? "Confirm Booking 🎉" : "Next Step →"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage setPage={setPage} />;
      case "services": return <ServicesPage setPage={setPage} />;
      case "about": return <AboutPage setPage={setPage} />;
      case "contact": return <ContactPage />;
      case "book": return <BookingPage />;
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <>
      <GlobalStyle />
      <Nav page={page} setPage={setPage} />
      <main>{renderPage()}</main>
      <Footer setPage={setPage} />
    </>
  );
}
