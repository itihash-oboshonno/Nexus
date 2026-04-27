import Link from "next/link";
import { Zap, Target, Heart, Globe, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const team = [
    { name: "Alexandra Wei", role: "Co-Founder & CEO", letter: "A", bg: "#f0a500" },
    { name: "Marcus Patel", role: "Head of Curation", letter: "M", bg: "#6366f1" },
    { name: "Sofia Torres", role: "Lead Designer", letter: "S", bg: "#3ecf8e" },
    { name: "James Okafor", role: "Tech Director", letter: "J", bg: "#e05555" },
  ];

  const values = [
    { icon: <Target size={20} />, title: "Precision Curation", desc: "We handpick every product based on quality, innovation, and real-world performance." },
    { icon: <Heart size={20} />, title: "Customer First", desc: "Every decision we make is guided by what's best for our community of tech enthusiasts." },
    { icon: <Globe size={20} />, title: "Global Reach", desc: "We partner with leading brands worldwide to bring you the best tech regardless of origin." },
    { icon: <Zap size={20} />, title: "Always Evolving", desc: "Technology never stands still — and neither do we. We constantly update our catalogue." },
  ];

  return (
    <div>
      {/* Hero */}
      <section style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", padding: "80px 0 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "500px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(240,165,0,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="section-tag">Our Story</div>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", marginBottom: "20px", maxWidth: "640px" }}>
            We&apos;re Passionate About the Right Technology
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", maxWidth: "580px", lineHeight: "1.8" }}>
            Nexus was founded in 2021 with a simple mission: cut through the noise and bring the world&apos;s best technology products to the people who truly appreciate them. We&apos;re not just a marketplace — we&apos;re a community of tech enthusiasts who live and breathe innovation.
          </p>
        </div>
      </section>

      {/* Mission + image grid */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
            <div>
              <div className="section-tag">Mission</div>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", marginBottom: "20px" }}>Connecting People with Technology That Matters</h2>
              <p style={{ color: "var(--text-muted)", lineHeight: "1.8", marginBottom: "16px" }}>
                The technology industry is overwhelming. New products launch daily, specs are hard to compare, and marketing hype is everywhere. We built Nexus to be the antidote — a curated space where quality speaks for itself.
              </p>
              <p style={{ color: "var(--text-muted)", lineHeight: "1.8", marginBottom: "28px" }}>
                Every product on our platform has been tested and vetted by our team of specialists. We only feature what we&apos;d genuinely recommend to a friend — premium, innovative, and worth every cent.
              </p>
              <Link href="/items" className="btn-primary">
                Explore Our Catalogue <ArrowRight size={16} />
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {[
                { bg: "#1a1a2e", text: "Founded 2021", sub: "Bangladesh" },
                { bg: "#0f0f1a", text: "50K+ Customers", sub: "Worldwide" },
                { bg: "#0f0f1a", text: "120+ Brands", sub: "Partnered" },
                { bg: "#1a1a2e", text: "99.8% Satisfaction", sub: "Rate" },
              ].map((c, i) => (
                <div key={i} style={{
                  background: c.bg, border: "1px solid var(--border)",
                  borderRadius: "var(--radius)", padding: "28px",
                  display: "flex", flexDirection: "column", justifyContent: "flex-end", minHeight: "140px",
                  transition: "border-color 0.2s",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border-light)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, color: "var(--text)", marginBottom: "4px" }}>{c.text}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{c.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "0 0 80px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div className="section-tag" style={{ justifyContent: "center" }}>Our Values</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}>What Drives Us</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
            {values.map((v, i) => (
              <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "28px", transition: "all 0.25s ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "var(--accent-glow)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", marginBottom: "16px" }}>
                  {v.icon}
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "10px", color: "var(--text)", fontFamily: "'DM Sans', sans-serif" }}>{v.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: "1.7" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "80px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div className="section-tag" style={{ justifyContent: "center" }}>The Team</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}>The People Behind Nexus</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px", maxWidth: "800px", margin: "0 auto" }}>
            {team.map((m, i) => (
              <div key={i} style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "28px", textAlign: "center", transition: "all 0.25s ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-light)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: m.bg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, color: "#fff" }}>{m.letter}</div>
                <div style={{ fontWeight: 600, color: "var(--text)", marginBottom: "4px" }}>{m.name}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 0", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", marginBottom: "16px" }}>Join the Nexus Community</h2>
          <p style={{ color: "var(--text-muted)", maxWidth: "460px", margin: "0 auto 32px", lineHeight: "1.7" }}>
            Create a free account to add products, manage your listings, and access exclusive features.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/register" className="btn-primary">Create Account <ArrowRight size={16} /></Link>
            <Link href="/items" className="btn-secondary">Browse Products</Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          section > div > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
