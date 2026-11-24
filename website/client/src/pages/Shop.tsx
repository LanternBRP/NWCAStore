/**
 * NWCA Official Gear Store
 * ─────────────────────────────────────────────────────────────────────────────
 * Design: Dark navy base (#0A1628) · NWCA Red (#C41E3A) · Gold (#F5C842)
 * Layout: Full-page shop — sticky filter sidebar + product grid + cart drawer
 *
 * DATA LAYER NOTE:
 * All product data is currently served from the PRODUCTS constant below.
 * When the vendor provides their Shopify Storefront API credentials, replace
 * the PRODUCTS array with a Shopify Storefront API fetch (useEffect / React Query).
 * The UI components (ProductCard, ProductModal, CartDrawer) are already structured
 * to accept the same shape as Shopify's product/variant objects.
 *
 * Shopify swap checklist:
 *  1. Add VITE_SHOPIFY_DOMAIN and VITE_SHOPIFY_STOREFRONT_TOKEN to .env
 *  2. Replace PRODUCTS with a storefront GraphQL query (products.edges)
 *  3. Map Shopify variant.id → product.variantId for checkout line items
 *  4. Connect Shopify Cart API (cartCreate / line mutations) and retrieve cart.checkoutUrl
 *     before hosted checkout. The retired Checkout API must not be used.
 */

import { useState, useMemo } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ShoppingCart, X, Plus, Minus, ChevronRight, Filter, Star, Tag, Truck } from "lucide-react";
import { toast } from "sonner";

// ── Types ────────────────────────────────────────────────────────────────────

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number | null;
  badge: string | null;
  img: string;
  colors: string[];
  sizes: string[];
  description: string;
  rating: number;
  reviews: number;
}

interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

// ── Product Data ─────────────────────────────────────────────────────────────
// TODO: Replace with Shopify Storefront API fetch when vendor credentials are available.

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "NWCA Performance Polo",
    brand: "Nike",
    category: "Tops",
    price: 64.99,
    originalPrice: null,
    badge: "BESTSELLER",
    img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&q=80",
    colors: ["#17214B", "#C41E3A", "#1a1a1a"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Official NWCA embroidered polo. Moisture-wicking fabric keeps you comfortable on the sideline or in the office. Available in navy, red, and black.",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "NWCA Insulated Water Bottle",
    brand: "NWCA Gear",
    category: "Accessories",
    price: 34.99,
    originalPrice: 39.99,
    badge: "NEW",
    img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80",
    colors: ["#17214B", "#C41E3A"],
    sizes: ["32oz", "64oz"],
    description: "Double-wall vacuum insulated stainless steel bottle with NWCA logo. Keeps drinks cold 24 hours, hot 12 hours.",
    rating: 4.9,
    reviews: 87,
  },
  {
    id: 3,
    name: "NWCA Snapback Cap",
    brand: "New Era",
    category: "Headwear",
    price: 34.99,
    originalPrice: null,
    badge: "NEW",
    img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80",
    colors: ["#17214B", "#C41E3A"],
    sizes: ["One Size"],
    description: "Structured snapback with embroidered NWCA shield logo. Adjustable fit for all head sizes.",
    rating: 4.7,
    reviews: 56,
  },
  {
    id: 4,
    name: "NWCA Quarter-Zip",
    brand: "Adidas",
    category: "Tops",
    price: 89.99,
    originalPrice: null,
    badge: null,
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    colors: ["#17214B", "#f5f5f5"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Premium quarter-zip pullover with NWCA wordmark on chest. Soft fleece interior, wind-resistant shell.",
    rating: 4.6,
    reviews: 43,
  },
  {
    id: 5,
    name: "NWCA Wrestling Singlet",
    brand: "Cliff Keen",
    category: "Performance",
    price: 74.99,
    originalPrice: 89.99,
    badge: "SALE",
    img: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=600&q=80",
    colors: ["#17214B", "#C41E3A"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Official NWCA competition singlet. Sublimated design, four-way stretch fabric, NWCA shield on chest.",
    rating: 4.9,
    reviews: 211,
  },
  {
    id: 6,
    name: "NWCA Coaches Hoodie",
    brand: "Nike",
    category: "Tops",
    price: 79.99,
    originalPrice: null,
    badge: null,
    img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    colors: ["#1a1a1a", "#17214B", "#C41E3A"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    description: "Heavyweight fleece hoodie with NWCA Coaches embroidery. Kangaroo pocket, drawstring hood.",
    rating: 4.7,
    reviews: 98,
  },
  {
    id: 7,
    name: "NWCA Gym Bag",
    brand: "NWCA Gear",
    category: "Bags",
    price: 54.99,
    originalPrice: 64.99,
    badge: "SALE",
    img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    colors: ["#1a1a1a", "#17214B"],
    sizes: ["One Size"],
    description: "Large capacity duffel with separate shoe compartment. NWCA logo patch, adjustable shoulder strap.",
    rating: 4.5,
    reviews: 67,
  },
  {
    id: 8,
    name: "NWCA Wrestling Shorts",
    brand: "Adidas",
    category: "Performance",
    price: 44.99,
    originalPrice: null,
    badge: null,
    img: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80",
    colors: ["#1a1a1a", "#17214B", "#C41E3A"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Lightweight training shorts with NWCA side stripe. 4-way stretch, moisture-wicking, internal drawstring.",
    rating: 4.6,
    reviews: 79,
  },
  {
    id: 9,
    name: "NWCA Lanyard",
    brand: "NWCA Gear",
    category: "Accessories",
    price: 9.99,
    originalPrice: null,
    badge: null,
    img: "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=600&q=80",
    colors: ["#17214B", "#C41E3A"],
    sizes: ["One Size"],
    description: "Woven NWCA lanyard with breakaway safety clasp and badge holder. Perfect for conventions and events.",
    rating: 4.4,
    reviews: 33,
  },
  {
    id: 10,
    name: "NWCA Long Sleeve Tee",
    brand: "Nike",
    category: "Tops",
    price: 39.99,
    originalPrice: null,
    badge: null,
    img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80",
    colors: ["#17214B", "#C41E3A", "#1a1a1a", "#f5f5f5"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    description: "Soft cotton-blend long sleeve with NWCA chest logo. Relaxed fit, ribbed cuffs.",
    rating: 4.5,
    reviews: 52,
  },
  {
    id: 11,
    name: "NWCA Beanie",
    brand: "New Era",
    category: "Headwear",
    price: 24.99,
    originalPrice: null,
    badge: null,
    img: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&q=80",
    colors: ["#17214B", "#C41E3A", "#1a1a1a"],
    sizes: ["One Size"],
    description: "Knit cuffed beanie with embroidered NWCA logo. Acrylic blend, one size fits most.",
    rating: 4.6,
    reviews: 41,
  },
  {
    id: 12,
    name: "NWCA Coaches Polo",
    brand: "Adidas",
    category: "Tops",
    price: 69.99,
    originalPrice: 79.99,
    badge: "SALE",
    img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&q=80",
    colors: ["#17214B", "#1a1a1a"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Adidas coaches polo with NWCA embroidery. Climalite moisture management, UV protection.",
    rating: 4.7,
    reviews: 88,
  },
];

const CATEGORIES = ["All", "Tops", "Performance", "Headwear", "Accessories", "Bags"];
const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Rated", value: "rating" },
  { label: "Newest", value: "newest" },
];

// ── Cart Drawer ───────────────────────────────────────────────────────────────

function CartDrawer({ items, onClose, onUpdateQty, onRemove }: {
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (id: number, color: string, size: string, delta: number) => void;
  onRemove: (id: number, color: string, size: string) => void;
}) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // The unified checkout page documents and hosts the Shopify handoff. Once
  // variants are live, pass the cart's Shopify variant IDs and quantities to
  // the commerce API / Shopify Cart API before redirecting to checkoutUrl.
  const handleCheckout = () => {
    window.location.assign("/checkout?flow=product");
  };

  return (
    <div className="fixed inset-0 z-[200] flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      {/* Drawer */}
      <div className="w-full max-w-md bg-[#0A1628] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-5 h-5 text-[#F5C842]" />
            <span className="font-condensed font-700 text-lg text-white tracking-wide uppercase">Your Cart</span>
            <span className="bg-[#C41E3A] text-white text-xs font-condensed font-700 px-2 py-0.5 rounded-full">
              {items.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <ShoppingCart className="w-12 h-12 text-white/20 mb-3" />
              <p className="font-body text-white/50 text-sm">Your cart is empty</p>
              <button onClick={onClose} className="mt-4 font-condensed font-700 text-xs tracking-widest uppercase text-[#F5C842] hover:text-white transition-colors">
                Continue Shopping →
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-4 bg-white/5 p-4 rounded">
                <img src={item.product.img} alt={item.product.name} className="w-16 h-16 object-cover rounded flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-condensed font-700 text-sm text-white leading-tight">{item.product.name}</p>
                  <p className="font-body text-xs text-white/50 mt-0.5">{item.selectedSize} · {item.product.brand}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQty(item.product.id, item.selectedColor, item.selectedSize, -1)}
                        className="w-6 h-6 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-condensed font-700 text-sm text-white w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQty(item.product.id, item.selectedColor, item.selectedSize, 1)}
                        className="w-6 h-6 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-condensed font-700 text-sm text-[#F5C842]">${(item.product.price * item.quantity).toFixed(2)}</span>
                      <button onClick={() => onRemove(item.product.id, item.selectedColor, item.selectedSize)} className="text-white/30 hover:text-[#C41E3A] transition-colors">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-white/50 text-xs font-body">
              <Truck className="w-3.5 h-3.5" />
              Free shipping on orders over $75
            </div>
            <div className="flex items-center justify-between">
              <span className="font-condensed font-700 text-sm text-white/70 uppercase tracking-wide">Subtotal</span>
              <span className="font-condensed font-700 text-xl text-white">${total.toFixed(2)}</span>
            </div>
            {/* Redirects to the Shopify handoff owned by the unified commerce flow. */}
            <button
              onClick={handleCheckout}
              className="w-full bg-[#C41E3A] hover:bg-[#a01830] text-white font-condensed font-700 text-sm tracking-widest uppercase py-4 transition-colors"
            >
              Proceed to Checkout →
            </button>
            <p className="text-center text-xs text-white/30 font-body">Secure checkout powered by Shopify</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Product Detail Modal ──────────────────────────────────────────────────────

function ProductModal({ product, onClose, onAddToCart }: {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
}) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#0A1628] w-full max-w-3xl rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        {/* Image */}
        <div className="md:w-1/2 flex-shrink-0 relative">
          <img src={product.img} alt={product.name} className="w-full h-64 md:h-full object-cover" />
          {product.badge && (
            <span className="absolute top-4 left-4 bg-[#F5C842] text-[#0A1628] font-condensed font-700 text-xs tracking-widest uppercase px-3 py-1">
              {product.badge}
            </span>
          )}
        </div>
        {/* Details */}
        <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
          <p className="font-condensed text-xs tracking-widest uppercase text-[#F5C842] mb-1">{product.brand}</p>
          <h2 className="font-condensed font-900 text-2xl text-white mb-2 leading-tight">{product.name}</h2>
          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[1,2,3,4,5].map(s => (
                <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.round(product.rating) ? "text-[#F5C842] fill-[#F5C842]" : "text-white/20"}`} />
              ))}
            </div>
            <span className="font-body text-xs text-white/50">{product.rating} ({product.reviews} reviews)</span>
          </div>
          {/* Price */}
          <div className="flex items-baseline gap-3 mb-5">
            <span className="font-condensed font-900 text-3xl text-white">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="font-body text-sm text-white/40 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <p className="font-body text-sm text-white/70 leading-relaxed mb-6">{product.description}</p>
          {/* Color */}
          <div className="mb-5">
            <p className="font-condensed font-700 text-xs tracking-widest uppercase text-white/60 mb-2">Color</p>
            <div className="flex gap-2">
              {product.colors.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  style={{ backgroundColor: c }}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === c ? "border-[#F5C842] scale-110" : "border-white/20"}`}
                />
              ))}
            </div>
          </div>
          {/* Size */}
          {product.sizes[0] !== "One Size" && (
            <div className="mb-6">
              <p className="font-condensed font-700 text-xs tracking-widest uppercase text-white/60 mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1.5 font-condensed font-700 text-xs tracking-wide border transition-all ${
                      selectedSize === s
                        ? "bg-[#C41E3A] border-[#C41E3A] text-white"
                        : "border-white/20 text-white/60 hover:border-white/50 hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          <button
            onClick={() => { onAddToCart(product, selectedColor, selectedSize); onClose(); }}
            className="mt-auto w-full bg-[#C41E3A] hover:bg-[#a01830] text-white font-condensed font-700 text-sm tracking-widest uppercase py-4 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Product Card ──────────────────────────────────────────────────────────────

function ProductCard({ product, onSelect, onAddToCart }: {
  product: Product;
  onSelect: (p: Product) => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
}) {
  return (
    <div className="group bg-[#111827] overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]" onClick={() => onSelect(product)}>
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span className={`absolute top-3 left-3 font-condensed font-700 text-xs tracking-widest uppercase px-2.5 py-1 ${
            product.badge === "SALE" ? "bg-[#C41E3A] text-white" :
            product.badge === "BESTSELLER" ? "bg-[#F5C842] text-[#0A1628]" :
            "bg-[#17214B] text-white border border-white/20"
          }`}>
            {product.badge}
          </span>
        )}
        {/* Quick add overlay */}
        <div className="absolute inset-0 bg-[#0A1628]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(product, product.colors[0], product.sizes[0]); }}
            className="bg-[#C41E3A] hover:bg-[#a01830] text-white font-condensed font-700 text-xs tracking-widest uppercase px-5 py-2.5 transition-colors"
          >
            Quick Add
          </button>
        </div>
      </div>
      {/* Info */}
      <div className="p-4" onClick={() => onSelect(product)}>
        <p className="font-condensed text-xs tracking-widest uppercase text-[#F5C842] mb-1">{product.brand}</p>
        <h3 className="font-condensed font-700 text-base text-white leading-tight mb-2">{product.name}</h3>
        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {[1,2,3,4,5].map(s => (
              <Star key={s} className={`w-3 h-3 ${s <= Math.round(product.rating) ? "text-[#F5C842] fill-[#F5C842]" : "text-white/20"}`} />
            ))}
          </div>
          <span className="font-body text-xs text-white/40">({product.reviews})</span>
        </div>
        {/* Colors */}
        <div className="flex items-center gap-1.5 mb-3">
          {product.colors.map(c => (
            <span key={c} style={{ backgroundColor: c }} className="w-3.5 h-3.5 rounded-full border border-white/20" />
          ))}
        </div>
        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="font-condensed font-700 text-lg text-white">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="font-body text-xs text-white/40 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Shop Page ────────────────────────────────────────────────────────────

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  const handleAddToCart = (product: Product, color: string, size: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.selectedColor === color && i.selectedSize === size);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id && i.selectedColor === color && i.selectedSize === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, quantity: 1, selectedColor: color, selectedSize: size }];
    });
    toast.success(`${product.name} added to cart`, {
      description: `Size: ${size}`,
      action: { label: "View Cart", onClick: () => setCartOpen(true) },
    });
  };

  const handleUpdateQty = (id: number, color: string, size: string, delta: number) => {
    setCart(prev =>
      prev
        .map(i => i.product.id === id && i.selectedColor === color && i.selectedSize === size
          ? { ...i, quantity: i.quantity + delta }
          : i
        )
        .filter(i => i.quantity > 0)
    );
  };

  const handleRemove = (id: number, color: string, size: string) => {
    setCart(prev => prev.filter(i => !(i.product.id === id && i.selectedColor === color && i.selectedSize === size)));
  };

  const filtered = useMemo(() => {
    let list = activeCategory === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory);
    switch (sortBy) {
      case "price-asc": return [...list].sort((a, b) => a.price - b.price);
      case "price-desc": return [...list].sort((a, b) => b.price - a.price);
      case "rating": return [...list].sort((a, b) => b.rating - a.rating);
      case "newest": return [...list].filter(p => p.badge === "NEW").concat(list.filter(p => p.badge !== "NEW"));
      default: return list;
    }
  }, [activeCategory, sortBy]);

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <NavBar />

      {/* Hero Banner */}
      <div className="bg-[#111827] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="section-label mb-3">Official Gear</p>
            <h1 className="font-display text-5xl md:text-6xl text-white leading-none">
              NWCA <span className="text-[#F5C842]">STORE</span>
            </h1>
            <p className="font-body text-white/60 text-sm mt-3 max-w-md">
              Official NWCA licensed apparel and gear. Powered by our vendor partner — all orders fulfilled and shipped directly to you.
            </p>
          </div>
          {/* Cart button */}
          <button
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-3 bg-[#C41E3A] hover:bg-[#a01830] text-white font-condensed font-700 text-sm tracking-widest uppercase px-6 py-3 transition-colors self-start md:self-auto"
          >
            <ShoppingCart className="w-4 h-4" />
            Cart
            {cartCount > 0 && (
              <span className="bg-white text-[#C41E3A] text-xs font-condensed font-700 w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Shopify API Notice Banner */}
      <div className="bg-[#F5C842]/10 border-b border-[#F5C842]/20 px-4 py-2.5 text-center">
        <p className="font-body text-xs text-[#F5C842]/80">
          <Tag className="w-3 h-3 inline mr-1.5" />
          <strong>Coming Soon:</strong> Live inventory and checkout will be enabled once our vendor's Shopify API is connected. Products shown are representative samples.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          {/* Category filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden flex items-center gap-2 font-condensed font-700 text-xs tracking-widest uppercase text-white/70 border border-white/20 px-3 py-2"
            >
              <Filter className="w-3.5 h-3.5" /> Filters
            </button>
            <div className={`${showFilters ? "flex" : "hidden"} sm:flex flex-wrap gap-2`}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-condensed font-700 text-xs tracking-widest uppercase px-4 py-2 border transition-all ${
                    activeCategory === cat
                      ? "bg-[#C41E3A] border-[#C41E3A] text-white"
                      : "border-white/20 text-white/60 hover:border-white/50 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          {/* Sort + count */}
          <div className="flex items-center gap-4">
            <span className="font-body text-xs text-white/40">{filtered.length} products</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-[#111827] border border-white/20 text-white/70 font-body text-xs px-3 py-2 focus:outline-none focus:border-[#F5C842]"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={setSelectedProduct}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-[#111827] border border-white/10 p-8 md:p-12 text-center">
          <p className="section-label mb-4">More Coming Soon</p>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
            FULL CATALOG <span className="text-[#F5C842]">LAUNCHING SOON</span>
          </h2>
          <p className="font-body text-white/60 text-sm max-w-lg mx-auto">
            Once our vendor's Shopify storefront is connected, the complete NWCA licensed gear catalog — including custom team orders — will be available here with full checkout.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6 text-white/40 text-xs font-body">
            <Truck className="w-4 h-4" />
            Free shipping on orders over $75 · Secure checkout · Easy returns
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <CartDrawer
          items={cart}
          onClose={() => setCartOpen(false)}
          onUpdateQty={handleUpdateQty}
          onRemove={handleRemove}
        />
      )}

      <Footer />
    </div>
  );
}
