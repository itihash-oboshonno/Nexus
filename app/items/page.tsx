"use client";
import { useState, useEffect, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { getStoredItems, CATEGORIES, Item } from "@/data/items";
import ItemCard from "@/components/ItemCard";

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $200", min: 0, max: 200 },
  { label: "$200 – $500", min: 200, max: 500 },
  { label: "$500 – $1,000", min: 500, max: 1000 },
  { label: "Over $1,000", min: 1000, max: Infinity },
];

const RATING_OPTIONS = [
  { label: "All Ratings", min: 0 },
  { label: "4.5+ Stars", min: 4.5 },
  { label: "4.7+ Stars", min: 4.7 },
  { label: "4.9+ Stars", min: 4.9 },
];

const SORT_OPTIONS = [
  { label: "Relevance", value: "relevance" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Highest Rated", value: "rating" },
  { label: "Newest", value: "newest" },
];

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(0);
  const [rating, setRating] = useState(0);
  const [sort, setSort] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setItems(getStoredItems());
  }, []);

  const filtered = useMemo(() => {
    let result = [...items];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(i => i.title.toLowerCase().includes(q) || i.shortDescription.toLowerCase().includes(q) || i.brand.toLowerCase().includes(q));
    }
    if (category !== "All") {
      result = result.filter(i => i.category === category);
    }
    const pr = PRICE_RANGES[priceRange];
    result = result.filter(i => i.price >= pr.min && i.price <= pr.max);
    const rv = RATING_OPTIONS[rating];
    result = result.filter(i => i.rating >= rv.min);
    switch (sort) {
      case "price_asc": result.sort((a, b) => a.price - b.price); break;
      case "price_desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "newest": result.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || "")); break;
    }
    return result;
  }, [items, search, category, priceRange, rating, sort]);

  const activeFilters = [
    category !== "All" && category,
    priceRange !== 0 && PRICE_RANGES[priceRange].label,
    rating !== 0 && RATING_OPTIONS[rating].label,
  ].filter(Boolean) as string[];

  const clearAll = () => { setCategory("All"); setPriceRange(0); setRating(0); setSearch(""); };

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", padding: "40px 0 32px" }}>
        <div className="container">
          <div className="section-tag">Catalogue</div>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "8px" }}>All Products</h1>
          <p style={{ color: "var(--text-muted)", marginBottom: "28px" }}>
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} available
          </p>

          {/* Search bar */}
          <div style={{ position: "relative", maxWidth: "560px" }}>
            <Search size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }} />
            <input
              className="input"
              placeholder="Search products, brands..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: "48px", paddingRight: search ? "48px" : "16px" }}
            />
            {search && (
              <button onClick={() => setSearch("")} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "32px 1.5rem" }}>
        {/* Filter bar */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", marginBottom: "24px" }}>
          {/* Category tabs */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", flex: 1 }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} style={{
                padding: "7px 16px", borderRadius: "100px",
                border: category === cat ? "1px solid var(--accent)" : "1px solid var(--border)",
                background: category === cat ? "var(--accent-glow)" : "transparent",
                color: category === cat ? "var(--accent)" : "var(--text-muted)",
                fontSize: "0.82rem", fontWeight: 500, cursor: "pointer", transition: "all 0.2s",
                fontFamily: "'DM Sans', sans-serif",
              }}>{cat}</button>
            ))}
          </div>

          {/* Filter toggle + sort */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button onClick={() => setShowFilters(!showFilters)} style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "8px 16px", borderRadius: "8px",
              border: showFilters ? "1px solid var(--accent)" : "1px solid var(--border)",
              background: showFilters ? "var(--accent-glow)" : "var(--surface)",
              color: showFilters ? "var(--accent)" : "var(--text-muted)",
              fontSize: "0.85rem", cursor: "pointer", transition: "all 0.2s",
              fontFamily: "'DM Sans', sans-serif",
            }}>
              <SlidersHorizontal size={15} /> Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
            </button>
            <div style={{ position: "relative" }}>
              <select className="select" value={sort} onChange={e => setSort(e.target.value)} style={{ width: "auto", paddingRight: "32px", fontSize: "0.85rem" }}>
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Expanded filters */}
        {showFilters && (
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "24px", marginBottom: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
            <div>
              <label className="label">Price Range</label>
              {PRICE_RANGES.map((pr, i) => (
                <button key={i} onClick={() => setPriceRange(i)} style={{
                  display: "block", width: "100%", textAlign: "left", padding: "8px 12px",
                  borderRadius: "6px", border: "none", cursor: "pointer",
                  background: priceRange === i ? "var(--accent-glow)" : "transparent",
                  color: priceRange === i ? "var(--accent)" : "var(--text-muted)",
                  fontSize: "0.875rem", fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s",
                }}>{pr.label}</button>
              ))}
            </div>
            <div>
              <label className="label">Minimum Rating</label>
              {RATING_OPTIONS.map((ro, i) => (
                <button key={i} onClick={() => setRating(i)} style={{
                  display: "block", width: "100%", textAlign: "left", padding: "8px 12px",
                  borderRadius: "6px", border: "none", cursor: "pointer",
                  background: rating === i ? "var(--accent-glow)" : "transparent",
                  color: rating === i ? "var(--accent)" : "var(--text-muted)",
                  fontSize: "0.875rem", fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s",
                }}>{ro.label}</button>
              ))}
            </div>
          </div>
        )}

        {/* Active filter chips */}
        {activeFilters.length > 0 && (
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px", alignItems: "center" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Active:</span>
            {activeFilters.map(f => (
              <span key={f} className="badge badge-accent">{f}</span>
            ))}
            <button onClick={clearAll} style={{ fontSize: "0.8rem", color: "var(--danger)", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
              Clear all
            </button>
          </div>
        )}

        {/* Items grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🔍</div>
            <h3 style={{ fontSize: "1.4rem", color: "var(--text)", marginBottom: "8px", fontFamily: "'DM Sans', sans-serif" }}>No products found</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>Try adjusting your search or filter criteria.</p>
            <button onClick={clearAll} className="btn-primary">Clear filters</button>
          </div>
        ) : (
          <div className="items-grid">
            {filtered.map(item => <ItemCard key={item.id} item={item} />)}
          </div>
        )}
      </div>
    </div>
  );
}
