"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { addStoredItem, CATEGORIES, Item } from "@/data/items";
import toast from "react-hot-toast";

const FIELD_CATEGORIES = CATEGORIES.filter(c => c !== "All");

export default function AddItemPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    category: FIELD_CATEGORIES[0],
    rating: "4.5",
    brand: "",
    image: "",
    inStock: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "var(--text-muted)" }}>Checking authentication...</div>
      </div>
    );
  }

  const set = (key: string, value: string | boolean) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.shortDescription.trim()) e.shortDescription = "Short description is required";
    else if (form.shortDescription.length > 120) e.shortDescription = "Keep it under 120 characters";
    if (!form.fullDescription.trim()) e.fullDescription = "Full description is required";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) e.price = "Enter a valid price";
    if (!form.brand.trim()) e.brand = "Brand is required";
    const rating = Number(form.rating);
    if (isNaN(rating) || rating < 1 || rating > 5) e.rating = "Rating must be between 1 and 5";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); toast.error("Please fix the errors below"); return; }

    setSubmitting(true);
    await new Promise(r => setTimeout(r, 600)); // simulate async

    const newItem: Item = {
      id: `user-${Date.now()}`,
      title: form.title.trim(),
      shortDescription: form.shortDescription.trim(),
      fullDescription: form.fullDescription.trim(),
      price: Number(form.price),
      category: form.category,
      rating: Number(form.rating),
      brand: form.brand.trim(),
      image: form.image.trim() || `https://placehold.co/800x600/0f0f1a/f0a500?text=${encodeURIComponent(form.title)}`,
      inStock: form.inStock,
      specs: { "Brand": form.brand.trim(), "Category": form.category, "Condition": "New" },
      addedBy: user.email || "",
      createdAt: new Date().toISOString().split("T")[0],
    };

    addStoredItem(newItem);
    setSubmitting(false);
    setSuccess(true);
    toast.success("Product added successfully!");
  };

  if (success) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 1.5rem" }}>
        <div style={{ textAlign: "center", maxWidth: "420px" }}>
          <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(62,207,142,0.1)", border: "1px solid rgba(62,207,142,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <CheckCircle size={32} color="var(--success)" />
          </div>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "12px", color: "var(--text)" }}>Product Added!</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "32px", lineHeight: "1.7" }}>Your product has been successfully listed in the Nexus catalogue.</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => { setSuccess(false); setForm({ title: "", shortDescription: "", fullDescription: "", price: "", category: FIELD_CATEGORIES[0], rating: "4.5", brand: "", image: "", inStock: true }); }} className="btn-secondary">
              Add Another
            </button>
            <Link href="/items" className="btn-primary">View Products</Link>
          </div>
        </div>
      </div>
    );
  }

  const inputStyle = (key: string) => ({
    borderColor: errors[key] ? "var(--danger)" : undefined,
  });

  return (
    <div style={{ minHeight: "100vh", padding: "40px 0 80px" }}>
      <div className="container" style={{ maxWidth: "720px" }}>
        <Link href="/items/manage" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--text-muted)", fontSize: "0.875rem", textDecoration: "none", marginBottom: "32px", transition: "color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}>
          <ArrowLeft size={16} /> Back to Manage
        </Link>

        <div style={{ marginBottom: "32px" }}>
          <div className="section-tag">Protected Page</div>
          <h1 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}>Add New Product</h1>
          <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>Fill in the details below to list a new product on Nexus.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "32px", marginBottom: "24px" }}>
            <h3 style={{ fontSize: "0.8rem", fontWeight: 700, marginBottom: "24px", color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Basic Information
            </h3>

            <div style={{ display: "grid", gap: "20px" }}>
              <div>
                <label className="label">Product Title *</label>
                <input className="input" placeholder="e.g. Sony WH-1000XM5 Headphones" value={form.title} onChange={e => set("title", e.target.value)} style={inputStyle("title")} />
                {errors.title && <p style={{ fontSize: "0.75rem", color: "var(--danger)", marginTop: "6px" }}>{errors.title}</p>}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label className="label">Brand *</label>
                  <input className="input" placeholder="e.g. Sony, Apple, Samsung" value={form.brand} onChange={e => set("brand", e.target.value)} style={inputStyle("brand")} />
                  {errors.brand && <p style={{ fontSize: "0.75rem", color: "var(--danger)", marginTop: "6px" }}>{errors.brand}</p>}
                </div>
                <div>
                  <label className="label">Category *</label>
                  <div style={{ position: "relative" }}>
                    <select className="select" value={form.category} onChange={e => set("category", e.target.value)}>
                      {FIELD_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <div style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--text-dim)" }}>▾</div>
                  </div>
                </div>
              </div>

              <div>
                <label className="label">Short Description * <span style={{ color: "var(--text-dim)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>({form.shortDescription.length}/120 chars)</span></label>
                <input className="input" placeholder="A concise 1-2 line product summary" value={form.shortDescription} onChange={e => set("shortDescription", e.target.value)} maxLength={140} style={inputStyle("shortDescription")} />
                {errors.shortDescription && <p style={{ fontSize: "0.75rem", color: "var(--danger)", marginTop: "6px" }}>{errors.shortDescription}</p>}
              </div>

              <div>
                <label className="label">Full Description *</label>
                <textarea className="input" rows={5} placeholder="Detailed product description including key features, use cases, and what makes it special..." value={form.fullDescription} onChange={e => set("fullDescription", e.target.value)} style={{ ...inputStyle("fullDescription"), resize: "vertical", lineHeight: "1.7" }} />
                {errors.fullDescription && <p style={{ fontSize: "0.75rem", color: "var(--danger)", marginTop: "6px" }}>{errors.fullDescription}</p>}
              </div>
            </div>
          </div>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "32px", marginBottom: "24px" }}>
            <h3 style={{ fontSize: "0.8rem", fontWeight: 700, marginBottom: "24px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "'DM Sans', sans-serif" }}>
              Pricing & Details
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
              <div>
                <label className="label">Price (USD) *</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", fontWeight: 600 }}>$</span>
                  <input type="number" min="0.01" step="0.01" className="input" placeholder="0.00" value={form.price} onChange={e => set("price", e.target.value)} style={{ ...inputStyle("price"), paddingLeft: "32px" }} />
                </div>
                {errors.price && <p style={{ fontSize: "0.75rem", color: "var(--danger)", marginTop: "6px" }}>{errors.price}</p>}
              </div>
              <div>
                <label className="label">Rating (1–5) *</label>
                <input type="number" min="1" max="5" step="0.1" className="input" placeholder="e.g. 4.5" value={form.rating} onChange={e => set("rating", e.target.value)} style={inputStyle("rating")} />
                {errors.rating && <p style={{ fontSize: "0.75rem", color: "var(--danger)", marginTop: "6px" }}>{errors.rating}</p>}
              </div>
            </div>

            <div>
              <label className="label">Availability</label>
              <div style={{ display: "flex", gap: "12px" }}>
                {[{ val: true, label: "In Stock" }, { val: false, label: "Out of Stock" }].map(({ val, label }) => (
                  <button key={label} type="button" onClick={() => set("inStock", val)} style={{
                    flex: 1, padding: "11px", borderRadius: "var(--radius-sm)",
                    border: form.inStock === val ? `1px solid ${val ? "var(--success)" : "var(--danger)"}` : "1px solid var(--border)",
                    background: form.inStock === val ? (val ? "rgba(62,207,142,0.1)" : "rgba(224,85,85,0.1)") : "transparent",
                    color: form.inStock === val ? (val ? "var(--success)" : "var(--danger)") : "var(--text-muted)",
                    cursor: "pointer", fontSize: "0.875rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, transition: "all 0.2s",
                  }}>{label}</button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "32px", marginBottom: "32px" }}>
            <h3 style={{ fontSize: "0.8rem", fontWeight: 700, marginBottom: "24px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "'DM Sans', sans-serif" }}>
              Media (Optional)
            </h3>
            <div>
              <label className="label">Image URL</label>
              <div style={{ position: "relative" }}>
                <Upload size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }} />
                <input className="input" placeholder="https://images.unsplash.com/..." value={form.image} onChange={e => set("image", e.target.value)} style={{ paddingLeft: "42px" }} />
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginTop: "6px" }}>Leave blank to use a placeholder image.</p>
              {form.image && (
                <div style={{ marginTop: "12px", borderRadius: "var(--radius-sm)", overflow: "hidden", border: "1px solid var(--border)", height: "140px" }}>
                  <img src={form.image} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                </div>
              )}
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
            <Link href="/items/manage" className="btn-secondary">Cancel</Link>
            <button type="submit" disabled={submitting} className="btn-primary" style={{ padding: "14px 36px", fontSize: "0.95rem", opacity: submitting ? 0.7 : 1, cursor: submitting ? "wait" : "pointer" }}>
              {submitting ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @media (max-width: 600px) {
          form > div > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
