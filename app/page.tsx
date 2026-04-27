"use client";
import Link from "next/link";
import { ArrowRight, Cpu, Shield, Truck, Headphones, Star, Quote, Zap, ChevronRight, Package, TrendingUp, Award } from "lucide-react";
import { staticItems } from "./data/items";

const features = [
  { icon: <Cpu size={22} />, title: "Cutting-Edge Tech", desc: "We source only the most innovative products from the world's leading technology brands." },
  { icon: <Shield size={22} />, title: "Authenticity Guaranteed", desc: "Every product is verified for authenticity with a 2-year warranty on all purchases." },
  { icon: <Truck size={22} />, title: "Express Delivery", desc: "Fast, reliable shipping with real-time tracking delivered to your doorstep." },
  { icon: <Headphones size={22} />, title: "24/7 Expert Support", desc: "Our team of tech specialists is available around the clock to help you." },
];

const testimonials = [
  { name: "Arjun Mehta", role: "Senior Developer", text: "Nexus has completely changed how I shop for tech. The curation is impeccable — every product I've ordered has been flawless.", rating: 5, avatar: "A" },
  { name: "Sarah Chen", role: "UX Designer", text: "Fast delivery, authentic products, and the best customer service I've experienced. My MacBook Pro arrived in perfect condition.", rating: 5, avatar: "S" },
  { name: "Marcus Johnson", role: "Content Creator", text: "The product selection at Nexus is unmatched. I found my Sony headphones here and the price was the best anywhere online.", rating: 5, avatar: "M" },
];

const stats = [
  { icon: <Package size={20} />, value: "50K+", label: "Products Delivered" },
  { icon: <TrendingUp size={20} />, value: "99.8%", label: "Customer Satisfaction" },
  { icon: <Award size={20} />, value: "120+", label: "Trusted Brands" },
  { icon: <Star size={20} />, value: "4.9/5", label: "Average Rating" },
];

const featuredItems = staticItems.slice(0, 3);

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div className="hero-grid" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />
        <div style={{ position: "absolute", top: "10%", right: "5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(240,165,0,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "0", left: "0", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(60,60,120,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1, padding: "80px 1.5rem" }}>
          <div style={{ maxWidth: "700px" }}>
            <div className="section-tag" style={{ animationDelay: "0s" }}>Premium Tech Marketplace</div>
            <h1 style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)", fontWeight: 700, color: "var(--text)", marginBottom: "24px", lineHeight: "1.1" }}>
              The Future of{" "}
              <span className="gradient-text">Technology</span>
              {" "}Is Here
            </h1>
            <p style={{ fontSize: "1.15rem", color: "var(--text-muted)", lineHeight: "1.8", maxWidth: "520px", marginBottom: "40px" }}>
              Discover a curated collection of premium tech products. From pro audio to next-gen computing — we bring you tomorrow&apos;s technology today.
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link href="/items" className="btn-primary" style={{ fontSize: "0.95rem", padding: "14px 32px" }}>
                Explore Products <ArrowRight size={16} />
              </Link>
              <Link href="/about" className="btn-secondary" style={{ fontSize: "0.95rem", padding: "14px 32px" }}>Learn More</Link>
            </div>
            <div style={{ marginTop: "48px", display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ display: "flex" }}>
                {["A", "S", "M", "J"].map((l, i) => (
                  <div key={i} style={{ width: "32px", height: "32px", borderRadius: "50%", background: `hsl(${40 + i * 30}, 80%, ${40 + i * 5}%)`, border: "2px solid var(--bg)", marginLeft: i > 0 ? "-10px" : "0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, color: "#fff" }}>{l}</div>
                ))}
              </div>
              <div>
                <div style={{ display: "flex", gap: "2px", marginBottom: "2px" }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="var(--accent)" stroke="var(--accent)" />)}
                </div>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Trusted by <strong style={{ color: "var(--text)" }}>50,000+</strong> customers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BANNER */}
      <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--surface)", padding: "48px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "32px" }}>
            {stats.map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ color: "var(--accent)", display: "flex", justifyContent: "center", marginBottom: "8px" }}>{s.icon}</div>
                <div style={{ fontSize: "2rem", fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--text)", marginBottom: "4px" }}>{s.value}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "100px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div className="section-tag" style={{ justifyContent: "center" }}>Why Nexus</div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "var(--text)", marginBottom: "16px" }}>Built for Tech Enthusiasts</h2>
            <p style={{ color: "var(--text-muted)", maxWidth: "480px", margin: "0 auto", lineHeight: "1.7" }}>
              We&apos;ve designed every aspect of the Nexus experience for people who demand the best.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
            {features.map((f, i) => (
              <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "32px", transition: "all 0.25s ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.background = "var(--surface-2)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.background = "var(--surface)"; }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "var(--accent-glow)", border: "1px solid rgba(240,165,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", marginBottom: "20px" }}>{f.icon}</div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "10px", color: "var(--text)", fontFamily: "'DM Sans', sans-serif" }}>{f.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: "1.7" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section style={{ padding: "0 0 100px" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div className="section-tag">Top Picks</div>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "var(--text)" }}>Featured Products</h2>
            </div>
            <Link href="/items" style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--accent)", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none" }}>
              View all <ChevronRight size={16} />
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {featuredItems.map(item => (
              <div key={item.id} className="card" style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ height: "220px", overflow: "hidden", background: "var(--surface-2)", position: "relative" }}>
                  <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                    onError={e => { (e.currentTarget as HTMLImageElement).src = `https://placehold.co/400x300/0f0f1a/f0a500?text=${item.title}`; }}
                  />
                  <div style={{ position: "absolute", top: "12px", left: "12px" }}>
                    <span className="badge badge-accent" style={{ fontSize: "0.7rem" }}>{item.category}</span>
                  </div>
                </div>
                <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--text)", marginBottom: "8px", fontFamily: "'DM Sans', sans-serif" }}>{item.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", flex: 1, lineHeight: "1.6", marginBottom: "20px" }}>{item.shortDescription}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, color: "var(--accent)" }}>${item.price.toLocaleString()}</span>
                    <Link href={`/items/${item.id}`} className="btn-primary" style={{ padding: "9px 18px", fontSize: "0.8rem" }}>View Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "80px 0", background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div className="section-tag" style={{ justifyContent: "center" }}>Reviews</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "var(--text)" }}>What Our Customers Say</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "28px", transition: "all 0.25s ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-light)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
                <Quote size={24} color="var(--accent)" style={{ opacity: 0.6, marginBottom: "16px" }} />
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: "1.8", marginBottom: "20px" }}>&ldquo;{t.text}&rdquo;</p>
                <div style={{ display: "flex", gap: "2px", marginBottom: "16px" }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={13} fill="var(--accent)" stroke="var(--accent)" />)}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#07070d", fontSize: "0.9rem" }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text)" }}>{t.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 0" }}>
        <div className="container">
          <div style={{ background: "linear-gradient(135deg, var(--surface-2) 0%, var(--surface) 100%)", border: "1px solid var(--border-light)", borderRadius: "24px", padding: "clamp(40px, 6vw, 80px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(240,165,0,0.1) 0%, transparent 70%)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: "var(--accent)", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Zap size={28} color="#07070d" />
              </div>
              <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", marginBottom: "16px", color: "var(--text)" }}>Ready to Upgrade Your Setup?</h2>
              <p style={{ color: "var(--text-muted)", maxWidth: "500px", margin: "0 auto 36px", fontSize: "1rem", lineHeight: "1.7" }}>
                Join thousands of tech enthusiasts who trust Nexus for their premium technology needs.
              </p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/items" className="btn-primary" style={{ fontSize: "1rem", padding: "15px 36px" }}>Shop Now <ArrowRight size={18} /></Link>
                <Link href="/register" className="btn-secondary" style={{ fontSize: "1rem", padding: "15px 36px" }}>Create Account</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
