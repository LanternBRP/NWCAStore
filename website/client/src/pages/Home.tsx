/**
 * NWCA Homepage — "The Circle" Design System
 * Design: Kinetic Wrestling Identity — 2030-era unified platform
 * Colors: Arena Black #0A0E1A / NWCA Navy #17214B / Championship Red #C41E3A / Chalk White #F8F6F1 / Gold #B8860B
 * Fonts: Bebas Neue (display) / Barlow Condensed (labels/nav) / DM Sans (body) / Roboto Mono (data)
 * Sections: Nav → Hero → Hub → News → Events → Shop → Publications → Coaching → Rankings → Grow → WIBN → Sponsors → Footer
 */

import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "wouter";
import NavBar from "@/components/NavBar";
import USMapSilhouette from "@/components/USMapSilhouette";
import WrestlingSingletIcon from "@/components/WrestlingSingletIcon";
import GraduationCapIcon from "@/components/GraduationCapIcon";
import MapPinIcon from "@/components/MapPinIcon";
import Footer from "@/components/Footer";
import VideoHub from "@/components/VideoHub";
import { RANKINGS_DATA as ALL_RANKINGS, HOME_RANKING_TABS } from "@/lib/rankingsData";
import { toast } from "sonner";
import {
  Menu, X, Search, ShoppingBag, ChevronLeft, ChevronRight, ChevronDown,
  Play, Calendar, BookOpen, Trophy, Users, MapPin,
  ArrowRight, Star, Clock, ExternalLink, Briefcase,
  GraduationCap, Shield, Zap, TrendingUp, Download,
  Award, Globe, Mic
} from "lucide-react";



// ─── YouTube Facade Component ────────────────────────────────────────────────
// Uses maxresdefault.jpg (1280×720) for crisp thumbnails; loads iframe only on click
function YouTubeFacade({ videoId, title, label, labelColor = "#C41E3A" }: {
  videoId: string;
  title: string;
  label?: string;
  labelColor?: string;
}) {
  const [active, setActive] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  const fallback = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  const [imgSrc, setImgSrc] = useState(thumb);

  if (active) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&color=white`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    );
  }

  return (
    <button
      className="absolute inset-0 w-full h-full group cursor-pointer"
      onClick={() => setActive(true)}
      aria-label={`Play ${title}`}
    >
      <img
        src={imgSrc}
        alt={title}
        onError={() => setImgSrc(fallback)}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-[#FF0000] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
          <svg className="w-6 h-6 text-white ml-1" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </div>
      </div>
      {/* Label badge */}
      {label && (
        <div
          className="absolute top-2 left-2 font-condensed font-800 text-[9px] tracking-widest uppercase text-white px-2 py-1"
          style={{ backgroundColor: labelColor + 'e6' }}
        >
          {label}
        </div>
      )}
    </button>
  );
}

declare const ShopifyBuy: any;

/*<![CDATA[*/
(function () {
  var scriptURL: string = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
  if (window.ShopifyBuy) {
    if (window.ShopifyBuy.UI) {
      ShopifyBuyInit();
    } else {
      loadScript();
    }
  } else {
    loadScript();
  }
  function loadScript(): void {
    var script: HTMLScriptElement = document.createElement('script');
    script.async = true;
    script.src = scriptURL;
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
    script.onload = ShopifyBuyInit;
  }
  function ShopifyBuyInit(): void {
    var client: any = ShopifyBuy.buildClient({
      domain: 'sdmxr7-gg.myshopify.com',
      storefrontAccessToken: '5b3bf7300adf65553d3b4ff962c33764',
    });
    ShopifyBuy.UI.onReady(client).then(function (ui: any) {
      ui.createComponent('collection', {
        id: '482457223525',
        node: document.getElementById('collection-component-1795561937134'),
        moneyFormat: '%24%7B%7Bamount%7D%7D',
        options: {
  "product": {
    "styles": {
      "product": {
        "@media (min-width: 601px)": {
          "max-width": "calc(15% - 20px)",
          "margin-left": "20px",
          "margin-bottom": "50px",
          "width": "calc(15% - 20px)"
        },
        "img": {
          "height": "calc(100% - 15px)",
          "position": "absolute",
          "left": "0",
          "right": "0",
          "top": "0"
        },
        "imgWrapper": {
          "padding-top": "calc(75% + 15px)",
          "position": "relative",
          "height": "0"
        }
      },
      "title": {
        "color": "#ffffff"
      },
      "button": {
        ":hover": {
          "background-color": "#b01b34"
        },
        "background-color": "#c41e3a",
        ":focus": {
          "background-color": "#b01b34"
        },
        "border-radius": "0px",
        "padding-left": "100px",
        "padding-right": "100px"
      },
      "price": {
        "color": "#ffffff"
      },
      "compareAt": {
        "color": "#ffffff"
      },
      "unitPrice": {
        "color": "#ffffff"
      }
    },
    "text": {
      "button": "Add to cart"
    }
  },
  "productSet": {
    "styles": {
      "products": {
        "@media (min-width: 601px)": {
          "margin-left": "-20px"
        }
      }
    }
  },
  "modalProduct": {
    "contents": {
      "img": false,
      "imgWithCarousel": true,
      "button": false,
      "buttonWithQuantity": true
    },
    "styles": {
      "product": {
        "@media (min-width: 601px)": {
          "max-width": "100%",
          "margin-left": "0px",
          "margin-bottom": "0px"
        }
      },
      "button": {
        ":hover": {
          "background-color": "#b01b34"
        },
        "background-color": "#c41e3a",
        ":focus": {
          "background-color": "#b01b34"
        },
        "border-radius": "0px",
        "padding-left": "100px",
        "padding-right": "100px"
      },
      "title": {
        "font-family": "Helvetica Neue, sans-serif",
        "font-weight": "bold",
        "font-size": "26px",
        "color": "#4c4c4c"
      },
      "price": {
        "font-family": "Helvetica Neue, sans-serif",
        "font-weight": "normal",
        "font-size": "18px",
        "color": "#4c4c4c"
      },
      "compareAt": {
        "font-family": "Helvetica Neue, sans-serif",
        "font-weight": "normal",
        "font-size": "15.299999999999999px",
        "color": "#4c4c4c"
      },
      "unitPrice": {
        "font-family": "Helvetica Neue, sans-serif",
        "font-weight": "normal",
        "font-size": "15.299999999999999px",
        "color": "#4c4c4c"
      }
    },
    "text": {
      "button": "Add to cart"
    }
  },
  "option": {},
  "cart": {
    "styles": {
      "button": {
        ":hover": {
          "background-color": "#b01b34"
        },
        "background-color": "#c41e3a",
        ":focus": {
          "background-color": "#b01b34"
        },
        "border-radius": "0px"
      }
    },
    "text": {
      "total": "Subtotal",
      "button": "Checkout"
    }
  },
  "toggle": {
    "styles": {
      "toggle": {
        "background-color": "#c41e3a",
        ":hover": {
          "background-color": "#b01b34"
        },
        ":focus": {
          "background-color": "#b01b34"
        }
      }
    }
  }
},
      });
    });
  }
})();

// ─── Asset URLs ────────────────────────────────────────────────────────────────
const ASSETS = {
  logo: "/manus-storage/NWCALogo_02601508.png",
  heroAction: "https://d2xsxph8kpxj0f.cloudfront.net/310519663283983903/Hfy5MinW2PXVKLrBsPEmFG/nwca_hero_action-eENn2pr8W8AJEig9Y5EhYy.webp",
  heroMat: "https://d2xsxph8kpxj0f.cloudfront.net/310519663283983903/Hfy5MinW2PXVKLrBsPEmFG/nwca_hero_mat_overhead-ZjcC7ehC6HPqP9Gq57azF8.webp",
  womenWrestling: "https://d2xsxph8kpxj0f.cloudfront.net/310519663283983903/Hfy5MinW2PXVKLrBsPEmFG/nwca_women_wrestling-CvTd5t5jXpaak5d4UiEJg2.webp",
  menWrestling: "/manus-storage/hero_mens_wrestling_ncaa_c024eec0.jpg",
  coaching: "https://d2xsxph8kpxj0f.cloudfront.net/310519663283983903/Hfy5MinW2PXVKLrBsPEmFG/nwca_coaching_sideline-4uwFYm9ohWGchbmuNTT8Mk.webp",
  matOnly: "/manus-storage/mat_only_hero_1854ca59.jpg",
};

// ─── Data ──────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  {
    label: "Coaching",
    items: ["Youth Development", "Scholastic Coaches", "Collegiate Coaches", "Earn CEU Credits", "Coaching Courses", "Leadership Academy"],
  },
  {
    label: "Events",
    items: ["NWCA Convention", "All-Star Classic", "National Duals", "Convention Schedule"],
    url: "/events",
  },
  {
    label: "Rankings",
    items: ["NCAA D1 Men", "NCAA D2 Men", "NCAA D3 Men", "NCAA Women", "NAIA Men", "NAIA Women", "NJCAA Men", "NJCAA Women"],
  },
  {
    label: "Women's Wrestling",
    items: ["Facts & Resources", "HS Girls Sanctioning Map", "College Programs Map", "Uniform Guide"],
  },
  {
    label: "Grow the Sport",
    items: ["Career Center", "Where to Wrestle Map", "State Profile Map", "Start a Program", "Why Wrestle?"],
  },
  {
    label: "Resources",
    items: ["Health & Safety", "Weight Management", "Mat Safety", "Skin Infection Prevention", "Publications"],
  },
  {
    label: "Press & Stories",
    items: ["Press Releases", "Feature Stories", "Rankings News", "Women's Wrestling", "Coaching"],
    url: "/press",
  },
  {
    label: "Shop",
    items: ["Apparel", "Headwear", "Outerwear", "Accessories", "All Products"],
    url: "#shop",
  },
];

const NEWS_ITEMS = [
  {
    id: 1,
    category: "Press Release",
    date: "Apr 18, 2026",
    title: "NWCA Announces 2026 Convention Dates and Keynote Speakers",
    excerpt: "The annual NWCA Convention will bring together over 2,000 wrestling coaches from across the country for three days of professional development, networking, and competition.",
    img: "/manus-storage/nwca_convention_2026_logo_332ce2cd.png",
    featured: true,
    url: "http://www.nwcaconvention.com",
  },
  {
    id: 2,
    category: "Women's Wrestling",
    date: "Apr 15, 2026",
    title: "Record 47 States Now Sanction Girls High School Wrestling",
    excerpt: "Women's wrestling continues its historic growth with three additional states officially sanctioning the sport this spring.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663283983903/Hfy5MinW2PXVKLrBsPEmFG/nwca_women_wrestling-CvTd5t5jXpaak5d4UiEJg2.webp",
    url: "https://nwcaonline.com/sports/wrestling/womens-wrestling",
  },
  {
    id: 3,
    category: "Rankings",
    date: "Apr 12, 2026",
    title: "Penn State Holds Top Spot in Final D1 Dual Rankings",
    excerpt: "The Nittany Lions close out the season ranked No. 1 in the country for the third consecutive year.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663283983903/Hfy5MinW2PXVKLrBsPEmFG/nwca_men_wrestling-WjWzhv5r9eaGje2r3TTCeD.webp",
    url: "https://nwcaonline.com/sports/wrestling/rankings",
  },
  {
    id: 4,
    category: "Coaching",
    date: "Apr 10, 2026",
    title: "NWCA Launches New Online CEU Platform for Scholastic Coaches",
    excerpt: "Coaches can now earn continuing education credits entirely online through the new NWCA Learning Management System.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663283983903/Hfy5MinW2PXVKLrBsPEmFG/nwca_coaching_sideline-4uwFYm9ohWGchbmuNTT8Mk.webp",
    url: "https://nwcaonline.com/sports/wrestling/coaching",
  },
  {
    id: 5,
    category: "Grow the Sport",
    date: "Apr 7, 2026",
    title: "Wrestling Participation Hits All-Time High With 320,000 HS Athletes",
    excerpt: "New NWCA participation data shows wrestling at its highest enrollment numbers in the sport's history.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663283983903/Hfy5MinW2PXVKLrBsPEmFG/nwca_hero_mat_overhead-ZjcC7ehC6HPqP9Gq57azF8.webp",
    url: "https://nwcaonline.com/sports/wrestling/grow-the-sport",
  },
];

const EVENTS = [
  {
    id: 1,
    date: { month: "MAY", day: "14", year: "2026" },
    title: "NWCA Convention 2026",
    location: "Las Vegas, NV",
    type: "Convention",
    url: "http://www.nwcaconvention.com",
    daysOut: 22,
  },
  {
    id: 2,
    date: { month: "JUN", day: "3", year: "2026" },
    title: "Scholastic Leadership Academy",
    location: "Annapolis, MD",
    type: "Development",
    url: "#",
    daysOut: 42,
  },
  {
    id: 3,
    date: { month: "NOV", day: "8", year: "2026" },
    title: "NWCA All-Star Classic",
    location: "State College, PA",
    type: "Competition",
    url: "https://nwcaonline.com/sports/asc",
    daysOut: 200,
  },
  {
    id: 4,
    date: { month: "JAN", day: "15", year: "2027" },
    title: "National Duals Championship",
    location: "Las Vegas, NV",
    type: "Competition",
    url: "https://nwcaonline.com/sports/natduals",
    daysOut: 268,
  },
];

const SHOP_PRODUCTS: { id: number; name: string; brand: string; price: number; originalPrice: number | null; badge: string | null; img: string; colors: string[] }[] = [
  {
    id: 1,
    name: "NWCA Performance Polo",
    brand: "Nike",
    price: 64.99,
    originalPrice: null,
    badge: "BESTSELLER",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    colors: ["#17214B", "#C41E3A", "#1a1a1a"],
  },
  {
    id: 2,
    name: "NWCA Insulated Water Bottle",
    brand: "NWCA Gear",
    price: 34.99,
    originalPrice: null,
    badge: "NEW",
    img: "/manus-storage/water-bottle_bd52efb0.jpg",
    colors: ["#17214B", "#C41E3A"],
  },
  {
    id: 3,
    name: "NWCA Snapback Cap",
    brand: "New Era",
    price: 34.99,
    originalPrice: null,
    badge: "NEW",
    img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80",
    colors: ["#17214B", "#C41E3A"],
  },
  {
    id: 4,
    name: "NWCA Quarter-Zip",
    brand: "Adidas",
    price: 89.99,
    originalPrice: null,
    badge: null,
    img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
    colors: ["#17214B", "#F8F6F1"],
  },
];

const PUBLICATIONS = [
  {
    id: 1,
    title: "The Complete Guide to Folkstyle Wrestling",
    type: "Digital + Print",
    price: 29.99,
    pages: 248,
    icon: BookOpen,
    color: "#C41E3A",
  },
  {
    id: 2,
    title: "Women's Wrestling Coaching Handbook",
    type: "Digital PDF",
    price: 19.99,
    pages: 186,
    icon: Award,
    color: "#4A6FA5",
  },
  {
    id: 3,
    title: "NWCA Annual Research Report 2025",
    type: "Free Download",
    price: 0,
    pages: 94,
    icon: TrendingUp,
    color: "#B8860B",
  },
  {
    id: 4,
    title: "Freestyle Wrestling Technique Manual",
    type: "Digital PDF",
    price: 24.99,
    pages: 212,
    icon: Zap,
    color: "#C41E3A",
  },
];

// Rankings data is now sourced from the shared lib/rankingsData.ts module.
// Updating that file updates BOTH this home page snippet and the full /rankings page.

const COACHING_TIERS = [
  {
    level: "Youth",
    title: "Youth Coaches Program",
    desc: "Build the foundation. Develop safe, effective coaching skills for athletes ages 6–14 in folkstyle and freestyle wrestling.",
    features: ["USA Wrestling Certified", "Online & In-Person", "Beginner Friendly", "Free Starter Resources"],
    cta: "Start Here",
    url: "https://nwcaonline.com/sports/2023/3/24/coaching-development-for-youth-coaches.aspx",
    icon: Shield,
    accent: "#4A6FA5",
  },
  {
    level: "Scholastic",
    title: "Scholastic Coaches Program",
    desc: "Elevate your high school program. Advanced techniques, compliance training, and leadership development for HS coaches.",
    features: ["CEU Credits Available", "Leadership Academy", "USMC Partnership", "State Certification Support"],
    cta: "Get Certified",
    url: "https://nwcaonline.com/sports/2023/3/24/coaching-development-for-scholastic-coaches.aspx",
    icon: GraduationCap,
    accent: "#C41E3A",
    featured: true,
  },
  {
    level: "Collegiate",
    title: "Collegiate Coaches Program",
    desc: "The pinnacle of coaching development. NCAA compliance, recruiting strategy, program management, and elite technique.",
    features: ["NCAA Compliance", "Recruiting Strategy", "Elite Technique", "Career Center Access"],
    cta: "Level Up",
    url: "https://nwcaonline.com/sports/2023/3/24/coaching-development-for-collegiate-coaches.aspx",
    icon: Trophy,
    accent: "#B8860B",
  },
];

// Real NWCA sponsors — alpha order, solid white stripe per client feedback
// Hero slides defined at module level — never recreated on render
const HERO_SLIDES = [
  { img: "/manus-storage/mat_only_hero_1854ca59.jpg", label: "The Circle — NWCA" },
  { img: "/manus-storage/hero_coaches_celebration_6adcdc14.jpg", label: "NWCA Coaches" },
  { img: "/manus-storage/hero_womens_coach_1e1154d4.jpg", label: "NWCA Coaching" },
];

const SPONSOR_FILTERS: Record<string, string> = {
  "Cluffy": "invert(1)",
};

const SPONSORS = [
  { name: "3C2A", url: "https://www.3c2a.com", logo: "/manus-storage/3C_2A_Logo_2023_e102cabe.png" },
  { name: "ARMS", url: "https://www.armswrestling.com", logo: "/manus-storage/ARMS_Logo_2C_96abc901.png" },
  { name: "BTS", url: "https://www.bts.com", logo: "/manus-storage/BTS_60a83204.png" },
  { name: "Cliff Keen", url: "https://www.cliffkeen.com", logo: "/manus-storage/CKPrimaryLogo-Blue_89a6bc83.webp" },
  { name: "Cluffy", url: "https://www.cluffy.com", logo: "/manus-storage/CluffyLogoWhite-inline_56b884fc.webp" },
  { name: "Defense Soap", url: "https://www.defensesoap.com", logo: "/manus-storage/DEFENSE_SOAP_WORDMARK_BLACK_7886c48f.png" },
  { name: "DOC", url: "https://www.doc.com", logo: "/manus-storage/DOClogo_c8666850.png" },
  { name: "DripDrop", url: "https://www.dripdrop.com", logo: "/manus-storage/DripDrop_Logo-Horz_311c-302c_37319785.png" },
  { name: "FloWrestling", url: "https://www.flowrestling.com", logo: "/manus-storage/FloWrestling_ignite_black_8ffe721c.png" },
  { name: "InBody", url: "https://www.inbodyusa.com", logo: "/manus-storage/INBodylarge_edc7703d.png" },
  { name: "MatBoss", url: "https://www.matboss.com", logo: "/manus-storage/MatBoss_Logo_178b284e.svg" },
  { name: "Resilite", url: "https://www.resilite.com", logo: "/manus-storage/RESILITE_TheMatCompany_FullColor_0e2efb68.png" },
  { name: "RefReps", url: "https://www.refreps.com", logo: "/manus-storage/RefRepsPrimaryLogoWebSize_585547bc.png" },
  { name: "Sterilaser", url: "https://www.sterilaser.com", logo: "/manus-storage/SterilaserLogo_e89ba391.webp" },
  { name: "United States Marine Corps", url: "https://www.marines.com", logo: "/manus-storage/USMC-STACKED-LOGO-BLACK_RGB_a737c1b2.png" },
  { name: "Work It Out", url: "https://www.workitout.com", logo: "/manus-storage/WorkItOut_Logo_d8086dc1.png" },
];

const PARTNER_ORGS = [
  { name: "NCAA", url: "https://www.ncaa.org", logo: "/manus-storage/ncaa_logo_3ae29f27.png" },
  { name: "NAIA", url: "https://www.naia.org", logo: "/manus-storage/National_Association_of_Intercollegiate_Athletics_logo.svg_9b8b8cd1.png" },
  { name: "NJCAA", url: "https://www.njcaa.org", logo: "/manus-storage/National_Junior_College_Athletic_Association_logo_cab98be1.png" },
  { name: "NCWA", url: "https://www.ncwa.net", logo: "/manus-storage/national-collegiate-wrestling-association-logo-png_seeklogo-544798_88740b02.png" },
  { name: "USA Wrestling", url: "https://www.themat.com", logo: "/manus-storage/New_USA_Wrestling_Logo_174455cf.jpg" },
  { name: "USWF", url: "https://www.uswf.org", logo: "/manus-storage/USWFLogoTransparent_00cf621c.png" },
  { name: "NFHS", url: "https://www.nfhs.org", logo: "/manus-storage/National_Federation_of_State_High_School_Associations_logo.svg_e917214a.png" },
  { name: "NATA", url: "https://www.nata.org", logo: "/manus-storage/nata_logo_final_blue_0_5c004c22.png" },
];

// ─── Component ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeRankTab, setActiveRankTab] = useState("NCAA D1 Men");
  const [cartCount, setCartCount] = useState(0);
  const [pressIndex, setPressIndex] = useState(0);
  const PRESS_VISIBLE = 3;
    const [heroSlide, setHeroSlide] = useState(0);
  const [, navigate] = useLocation();
  // heroSlides is now HERO_SLIDES (module-level constant — never recreated on render)
  const heroSlides = HERO_SLIDES;
  // Preload all hero images on mount
  useEffect(() => {
    HERO_SLIDES.forEach((slide) => {
      const img = new window.Image();
      img.src = slide.img;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroSlide((s) => (s + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

 

  const handleAddToCart = (name: string) => {
    setCartCount((c) => c + 1);
    toast.success(`${name} added to cart`, {
      description: "Visit the NWCA Store to complete your purchase",
      action: { label: "View Store", onClick: () => navigate("/shop") },
    });
  };

  const handleComingSoon = () => toast.info("Feature coming soon", { description: "We're building this into the platform." });

  return (
    <div className="min-h-screen bg-[#1c2333] text-[#F8F6F1] overflow-x-hidden">
      {/* ── NAVIGATION ───────────────────────────────────────────── */}
      <NavBar />


      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
        {/* Single background div — CSS background-image swap, no img tags, no opacity layers */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroSlides[heroSlide].img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E1A] via-[#0A0E1A]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-transparent to-[#0A0E1A]/20" />

        {/* Content */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center px-4 md:px-8 lg:px-16">
          <div className="max-w-3xl w-full">
            <div className="mb-4 flex items-start gap-2 md:gap-3">
              <span className="w-6 md:w-10 h-px bg-[#F5C842] flex-shrink-0 mt-[0.55em]" />
              <span className="font-condensed font-700 text-[10px] md:text-sm tracking-[0.15em] uppercase text-[#F5C842] leading-snug">Official Home of the National Wrestling Coaches Association</span>
            </div>

            {/* Wrestling Coaches Change Lives — official brand logo, white stroke for dark bg contrast */}
            <img
              src="/manus-storage/wccl_logo_text_white_final_0816d085.png"
              alt="Wrestling Coaches Change Lives"
              className="mb-8 w-full h-auto"
              style={{
                maxWidth: 'min(480px, 90vw)',
              }}
            />

            <p className="font-body text-[#d0d5de] text-base md:text-lg max-w-xl mb-8 leading-relaxed pr-4 md:pr-0">
              The voice for high school and college wrestling coaches — advancing coaching development, student-wrestler well-being, and advocacy for the sport.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <a
                href="/join"
                className="btn-primary flex items-center gap-2"
              >
                Join NWCA <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/shop"
                onClick={(e) => { e.preventDefault(); navigate("/shop"); }}
                className="btn-outline flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Shop Gear
              </a>
              <a
                href="http://www.nwcaconvention.com"
                target="_blank"
                rel="noreferrer"
                className="btn-outline flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" /> Convention 2026
              </a>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroSlide(i)}
              className={`transition-all duration-300 rounded-full ${i === heroSlide ? "w-8 h-2 bg-[#C41E3A]" : "w-2 h-2 bg-white/30 hover:bg-white/60"}`}
            />
          ))}
        </div>


      </section>

      {/* ── PLATFORM HUB STRIP ──────────────────────────────────────── */}
      <section className="bg-[#F0F2F5] border-y border-gray-200 py-0">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-gray-200">
            {[
              { icon: Users, label: "Membership", sub: "Join or Renew", url: "/join" },
              { icon: ShoppingBag, label: "Gear Store", sub: "Shop Official Gear", url: "/shop" },
              { icon: Calendar, label: "Convention", sub: "July 31–Aug 2, 2026", url: "/events" },
              { icon: Briefcase, label: "Career Center", sub: "Find Coaching Jobs", url: "https://nwcaonline.com/sports/2023/4/4/career-center.aspx", external: true },
              { icon: Trophy, label: "Rankings", sub: "All Divisions", url: "/rankings" },
              { icon: BookOpen, label: "Publications", sub: "Guides & Research", url: "/coaching/resources" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.url}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                onClick={undefined}
                className="flex flex-col items-center justify-center gap-2 py-6 px-4 hover:bg-[#C41E3A]/8 transition-colors group"
              >
                <item.icon className="w-8 h-8 text-[#C41E3A] group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                <div className="text-center">
                  <div className="font-condensed font-700 text-sm tracking-wide text-[#17214B]">{item.label}</div>
                  <div className="font-body text-[10px] text-[#4a5568] mt-0.5">{item.sub}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── GROW THE SPORT — bold horizontal stat dashboard ── */}
      <section id="grow-the-sport" className="bg-[#0A0E1A] border-y border-white/5">
        <div className="container py-16 md:py-20">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start lg:items-center">

            {/* Left — massive bold headline + subtext */}
            <div className="flex-shrink-0 lg:w-80">
              <h2 className="font-display text-7xl md:text-8xl text-white mb-5 tracking-tight" style={{ lineHeight: '0.88' }}>
                GROW<br />THE<br /><span className="text-[#F5C842]">SPORT</span>
              </h2>
              <p className="font-body text-[#8892a4] text-sm leading-relaxed">
                The NWCA is the driving force behind wrestling's expansion at every level — from youth mats to the NCAA podium. We track the numbers, build the programs, and advocate for the sport's future.
              </p>
              <Link
                href="/grow/state-map"
                className="inline-flex items-center gap-2 mt-5 font-condensed font-700 text-[11px] tracking-widest uppercase text-[#F5C842] border border-[#F5C842]/40 px-4 py-2.5 hover:bg-[#F5C842]/10 transition-colors"
              >
                View State Profile Map →
              </Link>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px self-stretch bg-white/10" />

            {/* Right — dashboard panel with red glow */}
            <div className="flex-1 relative">
              {/* Glow layer behind the boxes */}
              <div className="absolute inset-0 rounded-sm" style={{ boxShadow: '0 0 80px 20px rgba(196,30,58,0.18), 0 0 200px 60px rgba(196,30,58,0.08)', pointerEvents: 'none' }} />
              <div className="relative grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-white/10 border border-[#C41E3A]/30 bg-[#0D1220]">

                {/* Collegiate Growth */}
                <div className="px-6 pt-6 pb-7 flex flex-col">
                  {/* Fixed-height header zone: icon label + sub-label */}
                  <div className="h-14 flex flex-col justify-start">
                    <div className="flex items-center gap-2 mb-1">
                      <GraduationCapIcon size={22} />
                      <span className="font-condensed font-700 text-[9px] tracking-[0.2em] uppercase text-white">Collegiate Growth</span>
                    </div>
                    <p className="font-body text-white/50 text-[11px] leading-snug">New Collegiate Programs Since 2001</p>
                  </div>
                  {/* Number — always at same vertical start */}
                  <div className="font-display text-[5rem] leading-none font-black text-white mt-2" style={{ textShadow: '0 0 30px rgba(255,255,255,0.15)' }}>479</div>
                  <div className="font-condensed font-700 text-[10px] tracking-widest uppercase text-white/40 mt-2">Total</div>
                </div>

                {/* Collegiate Women */}
                <div className="px-6 pt-6 pb-7 flex flex-col">
                  <div className="h-14 flex flex-col justify-start">
                    <div className="flex items-center gap-2 mb-1">
                      <WrestlingSingletIcon variant="women" size={22} />
                      <span className="font-condensed font-700 text-[9px] tracking-[0.2em] uppercase text-white">Collegiate Women</span>
                    </div>
                  </div>
                  <div className="font-display text-[5rem] leading-none font-black text-white mt-2" style={{ textShadow: '0 0 30px rgba(255,255,255,0.15)' }}>134</div>
                  <div className="font-condensed font-700 text-[10px] tracking-widest uppercase text-white/40 mt-2">Programs</div>
                </div>

                {/* Collegiate Men */}
                <div className="px-6 pt-6 pb-7 flex flex-col">
                  <div className="h-14 flex flex-col justify-start">
                    <div className="flex items-center gap-2 mb-1">
                      <WrestlingSingletIcon variant="men" size={22} />
                      <span className="font-condensed font-700 text-[9px] tracking-[0.2em] uppercase text-white">Collegiate Men</span>
                    </div>
                  </div>
                  <div className="font-display text-[5rem] leading-none font-black text-white mt-2" style={{ textShadow: '0 0 30px rgba(255,255,255,0.15)' }}>345</div>
                  <div className="font-condensed font-700 text-[10px] tracking-widest uppercase text-white/40 mt-2">Programs</div>
                </div>

                {/* High School Impact — 47 states with US map */}
                <div className="px-6 pt-6 pb-7 flex flex-col">
                  <div className="h-14 flex flex-col justify-start">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPinIcon size={22} />
                      <span className="font-condensed font-700 text-[9px] tracking-[0.2em] uppercase text-white">High School Impact</span>
                    </div>
                  </div>
                  {/* Number on same baseline as other cells; map floats to the right */}
                  <div className="flex items-end gap-3 mt-2">
                    <div className="font-display text-[5rem] leading-none font-black text-white" style={{ textShadow: '0 0 30px rgba(255,255,255,0.15)' }}>47</div>
                    <USMapSilhouette className="w-20 h-auto mb-1 flex-shrink-0 opacity-90" />
                  </div>
                  <p className="font-condensed font-900 text-sm text-white uppercase leading-tight mt-2">
                    STATES SPONSOR A HIGH SCHOOL<br />
                    <span className="text-white">GIRLS STATE CHAMPIONSHIP</span>
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWS & PRESS RELEASES ────────────────────────────────────── */}
      <section className="relative bg-[#0A0E1A] overflow-hidden">
        {/* Hero slide — full-width, tall */}
        <div className="relative h-[520px] md:h-[600px]">
          {NEWS_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-700 ${pressIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            >
              {/* Background image */}
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E1A] via-[#0A0E1A]/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-transparent to-transparent" />
              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="container">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-condensed font-700 text-[11px] tracking-widest uppercase bg-[#C41E3A] text-white px-3 py-1">
                        {item.category}
                      </span>
                      <span className="font-mono-data text-xs text-white/80">{item.date}</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
                      {item.title}
                    </h2>
                    {item.excerpt && (
                      <p className="font-body text-base text-white/85 leading-relaxed mb-6 max-w-xl line-clamp-2">
                        {item.excerpt}
                      </p>
                    )}
                    <a
                      href={item.url || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 font-condensed font-700 text-sm tracking-widest uppercase bg-[#C41E3A] text-white px-6 py-3 hover:bg-[#a01830] transition-colors"
                    >
                      Read Story <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Left / Right arrows */}
          <button
            onClick={() => setPressIndex(i => Math.max(0, i - 1))}
            disabled={pressIndex === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-black/40 border border-white/20 text-white hover:bg-[#C41E3A] hover:border-[#C41E3A] disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            aria-label="Previous story"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setPressIndex(i => Math.min(NEWS_ITEMS.length - 1, i + 1))}
            disabled={pressIndex >= NEWS_ITEMS.length - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-black/40 border border-white/20 text-white hover:bg-[#C41E3A] hover:border-[#C41E3A] disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            aria-label="Next story"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Top label + All News link */}
          <div className="absolute top-6 left-0 right-0 z-20">
            <div className="container flex items-center justify-between">
              <div>
                <div className="section-label mb-1">Latest News</div>
                <h3 className="font-display text-2xl text-white tracking-wide">PRESS &amp; STORIES</h3>
              </div>
              <a
                href="/press"
                onClick={(e) => { e.preventDefault(); navigate('/press'); }}
                className="hidden md:flex items-center gap-2 font-condensed font-700 text-sm tracking-widest uppercase text-white hover:text-white transition-colors"
              >
                All News <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Dot indicators + story count */}
          <div className="absolute bottom-6 left-0 right-0 z-20">
            <div className="container flex items-center justify-between">
              <div className="flex items-center gap-2">
                {NEWS_ITEMS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPressIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      pressIndex === i ? "bg-[#C41E3A] w-8" : "w-3 bg-white/30 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
              <span className="font-mono-data text-xs text-white/40">
                {pressIndex + 1} / {NEWS_ITEMS.length}
              </span>
            </div>
          </div>
        </div>

        {/* Thumbnail strip below hero */}
        <div className="border-t border-white/5 bg-[#111827]">
          <div className="container">
            <div className="flex overflow-x-auto gap-0 scrollbar-hide">
              {NEWS_ITEMS.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setPressIndex(idx)}
                  className={`flex-shrink-0 flex items-center gap-3 px-5 py-4 text-left transition-all border-b-2 ${
                    pressIndex === idx
                      ? "border-[#C41E3A] bg-white/5"
                      : "border-transparent hover:bg-white/5 hover:border-white/20"
                  }`}
                  style={{ width: "220px" }}
                >
                  <div className="w-14 h-10 flex-shrink-0 overflow-hidden">
                    <img src={item.img} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-condensed font-700 text-[9px] tracking-widest uppercase text-[#F5C842] mb-0.5">{item.category}</div>
                    <div className="font-condensed font-600 text-xs text-white/80 leading-snug line-clamp-2">{item.title}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ── RANKINGS DASHBOARD ──────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden bg-[#F4F5F7]">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="section-label mb-2" style={{color:'#0A1628'}}>Live Standings</div>
              <h2 className="font-display text-5xl text-[#0A1628]">RANKINGS</h2>
            </div>
            <button onClick={() => navigate("/rankings")}
              className="hidden md:flex items-center gap-2 font-condensed font-700 text-sm tracking-widest uppercase text-[#0A1628] hover:text-[#C41E3A] transition-colors">
              Full Rankings <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          {/* Division tabs — sourced from shared rankingsData.ts */}
          <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
            {HOME_RANKING_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveRankTab(tab.id)}
                className={`flex-shrink-0 font-condensed font-700 text-xs tracking-widest uppercase px-4 py-2 transition-all ${activeRankTab === tab.id ? "bg-[#C41E3A] text-white" : "bg-white text-[#4a5568] hover:text-[#0A1628] border border-gray-200"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* Rankings table — data from shared rankingsData.ts, same as /rankings page */}
          {(() => {
            const division = ALL_RANKINGS.find((d) => d.id === activeRankTab);
            const rows = division?.teams.slice(0, 5) ?? [];
            return (
              <div className="bg-white border border-gray-200 overflow-hidden shadow-md">
                {rows.map((row, i) => (
                  <button key={row.rank} onClick={() => navigate("/rankings")}
                    className="w-full grid grid-cols-12 px-4 py-3.5 items-center hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors text-left">
                    <div className="col-span-1">
                      <span className={`font-display text-lg ${i === 0 ? "text-[#B8860B]" : i === 1 ? "text-[#c8cdd6]" : i === 2 ? "text-[#b45309]" : "text-[#c8cdd6]"}`}>
                        {row.rank}
                      </span>
                    </div>
                    <div className="col-span-7 font-condensed font-700 text-sm text-[#0A1628]">{row.institution}</div>
                    <div className="col-span-2 font-mono-data text-xs text-[#F5C842] text-right font-600">{row.points}</div>
                    <div className="col-span-2 font-mono-data text-xs text-[#c8cdd6] text-right">{row.lastRank ?? "—"}</div>
                  </button>
                ))}
              </div>
            );
          })()}
          <div className="mt-4 text-center">
            <button onClick={() => navigate("/rankings")} className="font-condensed font-700 text-sm tracking-widest uppercase px-6 py-2.5 border border-[#0A1628] text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all">
              View All Divisions &amp; Weight Classes
            </button>
          </div>
        </div>
      </section>

      {/* ── WOMEN'S WRESTLING FEATURE ────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={ASSETS.heroAction} alt="Women's Wrestling" className="w-full h-full object-cover object-center" style={{ objectPosition: '60% center' }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E1A] via-[#0A0E1A]/75 to-transparent" />
        </div>
        <div className="relative z-10 container py-24">
          <div className="max-w-xl">
            <div className="section-label mb-4">Growing the Sport</div>
            <h2 className="font-display text-6xl md:text-7xl text-white leading-none mb-4">
              WOMEN'S<br /><span className="text-[#F5C842]">WRESTLING</span>
            </h2>
            <p className="font-body text-[#d0d5de] text-base leading-relaxed mb-6">
              The fastest-growing sport in America. From 47 sanctioned states to the NCAA podium — the NWCA is the driving force behind women's wrestling at every level. Freestyle, folkstyle, scholastic, and collegiate.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { num: "47", label: "States Sanctioned" },
                { num: "320K+", label: "HS Athletes" },
                { num: "120+", label: "College Programs" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-4xl text-[#F5C842]">{stat.num}</div>
                  <div className="font-condensed font-600 text-[10px] tracking-widest uppercase text-[#c8cdd6] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Link href="/womens-wrestling"
                className="btn-primary flex items-center gap-2">
                Women's Resources <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/grow/state-map"
                className="btn-outline flex items-center gap-2">
                <Globe className="w-4 h-4" /> Sanctioning Map
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* ── NWCA VIDEO HUB ─────────────────────────────────────────── */}
      <VideoHub />

      {/* ── EVENTS ──────────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden bg-[#EEF0F4]">

        <div className="container relative z-10">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="section-label mb-2" style={{color:'#0A1628'}}>Schedule</div>
              <h2 className="font-display text-5xl text-[#0A1628]">UPCOMING EVENTS</h2>
            </div>
            <a href="http://www.nwcaconvention.com" target="_blank" rel="noreferrer"
              className="hidden md:flex items-center gap-2 font-condensed font-700 text-sm tracking-widest uppercase text-[#0A1628] hover:text-[#F5C842] transition-colors">
              Full Calendar <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {EVENTS.map((event, i) => (
              <a
                key={event.id}
                href={event.url}
                target="_blank"
                rel="noreferrer"
                className="group bg-white border border-gray-200 hover:border-[#C41E3A]/50 p-6 transition-all shadow-sm hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Date block */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-center bg-[#C41E3A] px-3 py-2 min-w-[60px]">
                    <div className="font-condensed font-800 text-xs tracking-widest text-white uppercase">{event.date.month}</div>
                    <div className="font-display text-3xl text-white leading-none">{event.date.day}</div>
                    <div className="font-mono-data text-[10px] text-white/85">{event.date.year}</div>
                  </div>
                  <div>
                    <span className="font-condensed font-700 text-[10px] tracking-widest uppercase text-[#c8cdd6]">{event.type}</span>
                    <h3 className="font-condensed font-700 text-base text-[#0A1628] leading-snug mt-1">{event.title}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[#c8cdd6] mb-4">
                  <MapPin className="w-3 h-3" />
                  <span className="font-body text-xs">{event.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#c8cdd6]">
                    <Clock className="w-3 h-3" />
                    <span className="font-mono-data text-[10px]">{event.daysOut} days away</span>
                  </div>
                  {event.title !== "NWCA All-Star Classic" && (
                    <span className="font-condensed font-700 text-xs tracking-wide text-[#F5C842] group-hover:gap-2 flex items-center gap-1 transition-all">
                      Register <ChevronRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── SHOP PORTAL ─────────────────────────────────────────────── */}
      <section id="shop" className="py-20 bg-[#1c2333]">
        <div id='collection-component-1795561937134'></div>
      </section>

      {/* ── PUBLICATIONS STORE ──────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden bg-[#F8F6F1]">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="section-label mb-2" style={{color:'#0A1628'}}>Knowledge Base</div>
              <h2 className="font-display text-5xl text-[#0A1628]">PUBLICATIONS <span className="text-[#B8860B]">&amp; GUIDES</span></h2>
              <p className="font-body text-[#4b5563] text-sm mt-2">Coaching manuals, research reports, and digital resources</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {PUBLICATIONS.map((pub) => (
              <div
                key={pub.id}
                className="bg-white border border-gray-200 hover:border-gray-300 p-6 transition-all shadow-sm hover:-translate-y-1 cursor-pointer group hover:shadow-xl"
                onClick={() => window.open('https://nwcaonline.com/sports/2023/4/3/publications.aspx', '_blank')}
              >
                <div className="w-12 h-12 flex items-center justify-center mb-4" style={{ background: `${pub.color}20` }}>
                  <pub.icon className="w-6 h-6" style={{ color: pub.color }} />
                </div>
                <h3 className="font-condensed font-700 text-base text-[#0A1628] leading-snug mb-2">{pub.title}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-condensed font-600 text-[10px] tracking-widest uppercase text-[#c8cdd6]">{pub.type}</span>
                  <span className="text-[#c8cdd6]">·</span>
                  <span className="font-mono-data text-[10px] text-[#c8cdd6]">{pub.pages} pages</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono-data font-600 text-lg text-[#0A1628]">
                    {pub.price === 0 ? "FREE" : `$${pub.price.toFixed(2)}`}
                  </span>
                  <button className="flex items-center gap-1.5 font-condensed font-700 text-xs tracking-wide text-[#F5C842] group-hover:gap-2.5 transition-all">
                    {pub.price === 0 ? <><Download className="w-3.5 h-3.5" /> Download</> : <><ShoppingBag className="w-3.5 h-3.5" /> Buy Now</>}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COACHING DEVELOPMENT ────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden bg-[#141824]">
        {/* Background mat image */}
        <div className="absolute inset-0 opacity-5">
          <img src={ASSETS.coaching} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E1A] via-transparent to-[#0A0E1A]" />

        <div className="container relative z-10">
          <div className="text-center mb-12">
            <div className="section-label mb-2 justify-center flex">Develop Your Craft</div>
            <h2 className="font-display text-5xl md:text-6xl text-white">COACHING <span className="text-[#F5C842]">DEVELOPMENT</span></h2>
            <p className="font-body text-[#c8cdd6] text-base mt-3 max-w-xl mx-auto">
              Programs for every level — from youth mat rooms to Division I programs. Folkstyle and freestyle coaching excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COACHING_TIERS.map((tier) => (
              <div
                key={tier.level}
                className={`relative bg-[#222b3d] border p-8 transition-all hover:-translate-y-2 ${tier.featured ? "border-[#C41E3A]/50 shadow-[0_0_30px_rgba(196,30,58,0.15)]" : "border-white/5 hover:border-white/15"}`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C41E3A] font-condensed font-800 text-[10px] tracking-widest uppercase text-white px-3 py-1">
                    Most Popular
                  </div>
                )}
                <div className="w-12 h-12 flex items-center justify-center mb-6" style={{ background: `${tier.accent}20` }}>
                  <tier.icon className="w-6 h-6" style={{ color: tier.accent }} />
                </div>
                <div className="font-condensed font-700 text-[10px] tracking-widest uppercase mb-1" style={{ color: tier.accent }}>
                  {tier.level}
                </div>
                <h3 className="font-display text-2xl text-white mb-3">{tier.title}</h3>
                <p className="font-body text-sm text-[#c8cdd6] mb-6 leading-relaxed">{tier.desc}</p>
                <ul className="space-y-2 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 font-body text-sm text-[#d0d5de]">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: tier.accent }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={tier.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full flex items-center justify-center gap-2 font-condensed font-700 text-sm tracking-widest uppercase py-3 transition-all ${tier.featured ? "bg-[#C41E3A] text-white hover:bg-[#a01830]" : "border border-white/15 text-white hover:border-white/40"}`}
                >
                  {tier.cta} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── WIBN FEATURE ────────────────────────────────────────────── */}
      {/* WIBN Brand Guide: Primary Green #0d5732 | White #ffffff | Black #000000 | Accent Gray #a9a9a9 */}
      {/* CTA Button: #0d5732 bg / #ffffff text | Fonts: condensed bold headers, clean body */}
      <section className="relative overflow-hidden" style={{ background: "#0d5732" }}>

        {/* Green header bar with WIBN logo and headline */}
        <div className="py-8 px-6">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <img
                src="/manus-storage/WIBNHorizontal_0d1beefb.png"
                alt="Wrestlers in Business Network"
                className="h-16 w-auto object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <div>
                <h2 className="font-display text-3xl md:text-4xl text-white leading-none uppercase">
                  Wrestlers In <span className="text-white/80">Business</span> Network
                </h2>
                <p className="text-white/70 text-sm mt-1 font-condensed tracking-wide uppercase">
                  Connecting the wrestling community to professional success
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content — white panel */}
        <div className="bg-white">
          <div className="container py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

              {/* Left: copy + stats + CTAs */}
              <div>
                <h2 className="font-display text-5xl md:text-6xl text-black leading-none mb-5">
                  WRESTLERS IN<br />
                  <span className="text-[#0d5732]">BUSINESS</span><br />
                  NETWORK
                </h2>
                <p className="text-[#444] text-base leading-relaxed mb-8" style={{ fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, sans-serif" }}>
                  The WIBN connects former wrestlers now thriving in business, law, medicine, and industry. A powerful network built on the discipline and grit of the wrestling room.
                </p>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-px bg-[#a9a9a9] border border-[#a9a9a9] mb-8">
                  {[
                    { num: "5,000+", label: "Members" },
                    { num: "50", label: "Industries" },
                    { num: "40+", label: "Anchor Partners" },
                    { num: "All 50", label: "States" },
                  ].map((s) => (
                    <div key={s.label} className="bg-white p-5">
                      <div className="font-display text-4xl text-[#0d5732] leading-none">{s.num}</div>
                      <div className="text-[10px] font-condensed font-700 tracking-widest uppercase text-[#a9a9a9] mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://wrestlersinbusiness.org"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-condensed font-700 tracking-widest uppercase text-white transition-all duration-200 hover:opacity-90"
                    style={{ background: "#0d5732" }}
                  >
                    Join WIBN <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

              </div>

              {/* Right: WIBN full promo image with drop shadow */}
              <div className="rounded-lg overflow-hidden" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.25)' }}>
                <img
                  src="/manus-storage/HKSfQkjXgAAIIPP_3c75cae3.jpg"
                  alt="Wrestlers in Business Network — Employers Can't Hire You If They Can't Find You"
                  className="w-full h-auto block"
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── SPONSORS ────────────────────────────────────────────────── */}
      {/* Solid white stripe per client spec; sponsors in alpha order with clickable links */}
      <section className="py-10 bg-white border-t border-gray-200">
        <div className="container">
          <div className="text-[11px] font-condensed font-700 tracking-[0.2em] uppercase text-gray-400 text-center mb-6">Official Partners &amp; Sponsors</div>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {SPONSORS.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                title={s.name}
                className="flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity duration-200"
              >
                <img
                  src={s.logo}
                  alt={s.name}
                  className="h-10 md:h-12 w-auto max-w-[140px] object-contain"
                  style={SPONSOR_FILTERS[s.name] ? { filter: SPONSOR_FILTERS[s.name] } : undefined}
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNER ORGANIZATIONS ────────────────────────────────── */}
      <section className="py-10 bg-gray-50 border-t border-gray-200">
        <div className="container">
          <div className="text-[11px] font-condensed font-700 tracking-[0.2em] uppercase text-gray-400 text-center mb-6">Partner Organizations</div>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {PARTNER_ORGS.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                title={p.name}
                className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-200"
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  className="h-10 md:h-12 w-auto max-w-[140px] object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
