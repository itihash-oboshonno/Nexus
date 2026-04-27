"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Star, Tag, CheckCircle, XCircle, ShoppingCart } from "lucide-react";
import { getStoredItems, Item } from "@/data/items";
import ItemCard from "@/components/ItemCard";
import toast from "react-hot-toast";

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <div style={{ display: "flex", gap: "2px" }}>
        {[1,2,3,4,5].map(s => <Star key={s} size={16} fill={s <= Math.round(rating) ? "var(--accent)" : "none"} stroke="var(--accent)" strokeWidth={1.5} />)}
      </div>
      <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{rating.toFixed(1)} out of 5</span>
    </div>
  );
}

export default function ItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState<Item | null>(null);
  const [related, setRelated] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const all = getStoredItems();
    const found = all.find(i => i.id === params.id);
    setItem(found || null);
    if (found) {
      setRelated(all.filter(i => i.category === found.category && i.id !== found.id).slice(0, 3));
    }
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div style={{ padding: "80px 0", textAlign: "center" }}>
        <div style={{ color: "var(--text-muted)" }}>Loading...</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div style={{ padding: "80px 0", textAlign: "center" }}>
        <h2 style={{ color: "var(--text)", marginBottom: "16px" }}>Product Not Found</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>The product you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/items" className="btn-primary">Back to Products</Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="container" style={{ padding: "32px 1.5rem" }}>
        {/* Back button */}
        <button onClick={() => router.back()} style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          color: "var(--text-muted)", background: "none", border: "none",
          cursor: "pointer", fontSize: "0.875rem", marginBottom: "32px",
          transition: "color 0.2s", fontFamily: "'DM Sans', sans-serif",
        }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}>
          <ArrowLeft size={16} /> Back to Products
        </button>

        {/* Main product section */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", marginBottom: "80px" }}
          className="detail-grid">
          {/* Image */}
          <div style={{ position: "relative" }}>
            <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", background: "var(--surface)", border: "1px solid var(--border)", aspectRatio: "4/3" }}>
              <img
                src={item.image} alt={item.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={e => { (e.currentTarget as HTMLImageElement).src = `https://placehold.co/600x400/0f0f1a/f0a500?text=${encodeURIComponent(item.title)}`; }}
              />
            </div>
          </div>

          {/* Info */}
          <div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
              <span className="badge badge-accent"><Tag size={10} />{item.category}</span>
              <span className="badge" style={{ background: item.inStock ? "rgba(62,207,142,0.1)" : "rgba(224,85,85,0.1)", color: item.inStock ? "var(--success)" : "var(--danger)", border: `1px solid ${item.inStock ? "rgba(62,207,142,0.2)" : "rgba(224,85,85,0.2)"}` }}>
                {item.inStock ? <><CheckCircle size={10} /> In Stock</> : <><XCircle size={10} /> Out of Stock</>}
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "var(--text)", marginBottom: "12px" }}>{item.title}</h1>

            <div style={{ marginBottom: "20px" }}><StarRating rating={item.rating} /></div>

            <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: "1.8", marginBottom: "24px" }}>{item.fullDescription}</p>

            <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "32px", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>Price</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "var(--accent)" }}>
                  ${item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>Brand</div>
                <div style={{ fontWeight: 600, color: "var(--text)", fontSize: "1rem" }}>{item.brand}</div>
              </div>
            </div>

            <button
              onClick={() => toast.success("Added to wishlist!")}
              disabled={!item.inStock}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                width: "100%", justifyContent: "center",
                background: item.inStock ? "var(--accent)" : "var(--surface-2)",
                color: item.inStock ? "#07070d" : "var(--text-muted)",
                border: "none", borderRadius: "var(--radius-sm)",
                padding: "15px 32px", fontSize: "0.95rem", fontWeight: 700,
                cursor: item.inStock ? "pointer" : "not-allowed",
                transition: "all 0.2s", fontFamily: "'DM Sans', sans-serif",
                textTransform: "uppercase", letterSpacing: "0.04em",
              }}
              onMouseEnter={e => { if (item.inStock) { (e.currentTarget as HTMLElement).style.background = "#ffc033"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; } }}
              onMouseLeave={e => { if (item.inStock) { (e.currentTarget as HTMLElement).style.background = "var(--accent)"; (e.currentTarget as HTMLElement).style.transform = "none"; } }}>
              <ShoppingCart size={18} />
              {item.inStock ? "Add to Wishlist" : "Out of Stock"}
            </button>
          </div>
        </div>

        {/* Specifications */}
        <div style={{ marginBottom: "80px" }}>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "24px", color: "var(--text)" }}>Specifications</h2>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
            {Object.entries(item.specs).map(([key, value], i) => (
              <div key={key} style={{
                display: "flex", padding: "16px 24px",
                borderBottom: i < Object.entries(item.specs).length - 1 ? "1px solid var(--border)" : "none",
                alignItems: "center",
              }}>
                <div style={{ width: "200px", flexShrink: 0, fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{key}</div>
                <div style={{ fontSize: "0.95rem", color: "var(--text)" }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional info */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "28px", marginBottom: "80px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "24px" }}>
          {[
            { label: "Category", value: item.category },
            { label: "Brand", value: item.brand },
            { label: "Rating", value: `${item.rating} / 5.0` },
            { label: "Added", value: item.createdAt || "N/A" },
            { label: "Availability", value: item.inStock ? "In Stock" : "Out of Stock" },
          ].map(({ label, value }) => (
            <div key={label}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>{label}</div>
              <div style={{ fontSize: "0.95rem", color: "var(--text)", fontWeight: 500 }}>{value}</div>
            </div>
          ))}
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
              <h2 style={{ fontSize: "1.8rem", color: "var(--text)" }}>Related Products</h2>
              <Link href="/items" style={{ fontSize: "0.875rem", color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>View all</Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
              {related.map(r => <ItemCard key={r.id} item={r} />)}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
