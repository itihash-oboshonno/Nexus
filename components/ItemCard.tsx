import Link from "next/link";
import { Star, ArrowRight, Tag } from "lucide-react";
import { Item } from "@/data/items";

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <div className="stars" style={{ display: "flex", gap: "1px" }}>
        {[1, 2, 3, 4, 5].map(s => (
          <Star key={s} size={12} fill={s <= Math.round(rating) ? "var(--accent)" : "none"} stroke="var(--accent)" strokeWidth={1.5} />
        ))}
      </div>
      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: "2px" }}>{rating.toFixed(1)}</span>
    </div>
  );
}

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Image */}
      <div style={{ position: "relative", height: "200px", overflow: "hidden", background: "var(--surface-2)" }}>
        <img
          src={item.image}
          alt={item.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          onError={e => { (e.currentTarget as HTMLImageElement).src = `https://placehold.co/400x300/0f0f1a/f0a500?text=${encodeURIComponent(item.title)}`; }}
        />
        {/* Category badge */}
        <div style={{ position: "absolute", top: "12px", left: "12px" }}>
          <span className="badge badge-accent" style={{ fontSize: "0.7rem" }}>
            <Tag size={9} />{item.category}
          </span>
        </div>
        {/* Out of stock */}
        {!item.inStock && (
          <div style={{
            position: "absolute", inset: 0, background: "rgba(7,7,13,0.65)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", border: "1px solid var(--border-light)", padding: "6px 14px", borderRadius: "100px", background: "var(--surface)" }}>
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "8px" }}>
          <StarRating rating={item.rating} />
        </div>
        <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text)", marginBottom: "8px", lineHeight: "1.4", fontFamily: "'DM Sans', sans-serif" }}>
          {item.title}
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: "1.6", flex: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {item.shortDescription}
        </p>

        {/* Footer */}
        <div style={{ marginTop: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, color: "var(--accent)" }}>
              ${item.price.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
            </span>
          </div>
          <Link href={`/items/${item.id}`} style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "transparent", border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)", padding: "7px 14px",
            color: "var(--text)", fontSize: "0.8rem", fontWeight: 500,
            textDecoration: "none", transition: "all 0.2s ease",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; (e.currentTarget as HTMLElement).style.background = "var(--accent-glow)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
            View Details <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
