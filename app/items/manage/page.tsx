"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Eye, Trash2, AlertTriangle, Package, Star, Tag } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getStoredItems, deleteStoredItem, Item } from "@/data/items";
import toast from "react-hot-toast";

export default function ManageItemsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<Item | null>(null);
  const [view, setView] = useState<"table" | "grid">("table");

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (user) setItems(getStoredItems());
  }, [user]);

  if (loading || !user) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "var(--text-muted)" }}>Checking authentication...</div>
      </div>
    );
  }

  const handleDelete = (item: Item) => setDeleteTarget(item);

  const confirmDelete = () => {
    if (!deleteTarget) return;
    deleteStoredItem(deleteTarget.id);
    setItems(prev => prev.filter(i => i.id !== deleteTarget.id));
    toast.success(`"${deleteTarget.title}" removed`);
    setDeleteTarget(null);
  };

  const userItems = items.filter(i => i.addedBy === user.email);
  const staticCount = items.length - userItems.length;

  return (
    <div style={{ minHeight: "100vh", padding: "40px 0 80px" }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div className="section-tag">Protected Page</div>
            <h1 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}>Manage Products</h1>
            <p style={{ color: "var(--text-muted)", marginTop: "6px" }}>
              {items.length} total products &mdash; {userItems.length} added by you
            </p>
          </div>
          <Link href="/items/add" className="btn-primary">
            <Plus size={16} /> Add Product
          </Link>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px", marginBottom: "32px" }}>
          {[
            { label: "Total Products", value: items.length, icon: <Package size={18} />, color: "var(--accent)" },
            { label: "Your Listings", value: userItems.length, icon: <Tag size={18} />, color: "#6366f1" },
            { label: "In Stock", value: items.filter(i => i.inStock).length, icon: <Star size={18} />, color: "var(--success)" },
            { label: "Catalogue Items", value: staticCount, icon: <Package size={18} />, color: "var(--text-muted)" },
          ].map((s, i) => (
            <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: "1.8rem", fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--text)" }}>{s.value}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "2px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
                </div>
                <div style={{ color: s.color }}>{s.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* View toggle */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px", gap: "8px" }}>
          {["table", "grid"].map(v => (
            <button key={v} onClick={() => setView(v as "table" | "grid")} style={{
              padding: "7px 16px", borderRadius: "8px", border: view === v ? "1px solid var(--accent)" : "1px solid var(--border)",
              background: view === v ? "var(--accent-glow)" : "transparent",
              color: view === v ? "var(--accent)" : "var(--text-muted)",
              cursor: "pointer", fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif",
              textTransform: "capitalize", transition: "all 0.2s",
            }}>{v}</button>
          ))}
        </div>

        {items.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px", background: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
            <Package size={48} style={{ color: "var(--text-dim)", margin: "0 auto 16px" }} />
            <h3 style={{ color: "var(--text)", marginBottom: "8px", fontFamily: "'DM Sans', sans-serif" }}>No products yet</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>Start by adding your first product.</p>
            <Link href="/items/add" className="btn-primary"><Plus size={16} /> Add First Product</Link>
          </div>
        ) : view === "table" ? (
          /* Table view */
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table className="table" style={{ minWidth: "700px" }}>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Stock</th>
                    <th>Source</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item.id}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div style={{ width: "44px", height: "44px", borderRadius: "8px", overflow: "hidden", flexShrink: 0, background: "var(--surface-2)" }}>
                            <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              onError={e => { (e.currentTarget as HTMLImageElement).src = `https://placehold.co/44x44/0f0f1a/f0a500?text=${item.title[0]}`; }} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.875rem", maxWidth: "220px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</div>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{item.brand}</div>
                          </div>
                        </div>
                      </td>
                      <td><span className="badge badge-muted">{item.category}</span></td>
                      <td style={{ fontWeight: 600, color: "var(--accent)", fontFamily: "'Playfair Display', serif" }}>${item.price.toLocaleString()}</td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                          <Star size={12} fill="var(--accent)" stroke="var(--accent)" />
                          <span style={{ fontSize: "0.85rem" }}>{item.rating}</span>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: "0.8rem", padding: "3px 10px", borderRadius: "100px", fontWeight: 600, background: item.inStock ? "rgba(62,207,142,0.1)" : "rgba(224,85,85,0.1)", color: item.inStock ? "var(--success)" : "var(--danger)" }}>
                          {item.inStock ? "In Stock" : "Out"}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontSize: "0.75rem", color: item.addedBy ? "var(--accent)" : "var(--text-dim)" }}>
                          {item.addedBy ? "You" : "Catalogue"}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                          <Link href={`/items/${item.id}`} style={{
                            display: "inline-flex", alignItems: "center", gap: "5px", padding: "6px 12px",
                            borderRadius: "6px", border: "1px solid var(--border)", color: "var(--text-muted)",
                            fontSize: "0.78rem", textDecoration: "none", transition: "all 0.2s",
                          }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-light)"; (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}>
                            <Eye size={13} /> View
                          </Link>
                          {item.addedBy && (
                            <button onClick={() => handleDelete(item)} style={{
                              display: "inline-flex", alignItems: "center", gap: "5px", padding: "6px 12px",
                              borderRadius: "6px", border: "1px solid rgba(224,85,85,0.3)", color: "var(--danger)",
                              fontSize: "0.78rem", background: "transparent", cursor: "pointer", transition: "all 0.2s",
                            }}
                              onMouseEnter={e => (e.currentTarget.style.background = "rgba(224,85,85,0.08)")}
                              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                              <Trash2 size={13} /> Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Grid view */
          <div className="items-grid">
            {items.map(item => (
              <div key={item.id} className="card" style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ height: "160px", overflow: "hidden", background: "var(--surface-2)", position: "relative" }}>
                  <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={e => { (e.currentTarget as HTMLImageElement).src = `https://placehold.co/400x200/0f0f1a/f0a500?text=${item.title[0]}`; }} />
                  <div style={{ position: "absolute", top: "8px", left: "8px" }}>
                    <span className="badge badge-accent" style={{ fontSize: "0.68rem" }}>{item.category}</span>
                  </div>
                  {item.addedBy && (
                    <div style={{ position: "absolute", top: "8px", right: "8px" }}>
                      <span style={{ fontSize: "0.68rem", padding: "3px 8px", borderRadius: "100px", background: "var(--accent)", color: "#07070d", fontWeight: 700 }}>Yours</span>
                    </div>
                  )}
                </div>
                <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text)", marginBottom: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "12px" }}>{item.brand}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--accent)" }}>${item.price.toLocaleString()}</span>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <Link href={`/items/${item.id}`} style={{ padding: "5px 10px", borderRadius: "6px", border: "1px solid var(--border)", color: "var(--text-muted)", fontSize: "0.75rem", textDecoration: "none" }}>
                        <Eye size={12} />
                      </Link>
                      {item.addedBy && (
                        <button onClick={() => handleDelete(item)} style={{ padding: "5px 10px", borderRadius: "6px", border: "1px solid rgba(224,85,85,0.3)", color: "var(--danger)", background: "transparent", cursor: "pointer" }}>
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete confirm modal */}
      {deleteTarget && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(7,7,13,0.8)", backdropFilter: "blur(8px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
          onClick={() => setDeleteTarget(null)}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "32px", maxWidth: "400px", width: "100%", animation: "fadeUp 0.2s ease" }}
            onClick={e => e.stopPropagation()}>
            <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "rgba(224,85,85,0.1)", border: "1px solid rgba(224,85,85,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <AlertTriangle size={24} color="var(--danger)" />
            </div>
            <h3 style={{ fontSize: "1.2rem", textAlign: "center", marginBottom: "12px", color: "var(--text)" }}>Delete Product?</h3>
            <p style={{ color: "var(--text-muted)", textAlign: "center", fontSize: "0.9rem", lineHeight: "1.6", marginBottom: "28px" }}>
              Are you sure you want to remove <strong style={{ color: "var(--text)" }}>&ldquo;{deleteTarget.title}&rdquo;</strong>? This action cannot be undone.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => setDeleteTarget(null)} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
              <button onClick={confirmDelete} style={{
                flex: 1, padding: "12px", borderRadius: "var(--radius-sm)",
                background: "var(--danger)", color: "#fff", border: "none",
                cursor: "pointer", fontWeight: 600, fontSize: "0.9rem", fontFamily: "'DM Sans', sans-serif",
                transition: "opacity 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
