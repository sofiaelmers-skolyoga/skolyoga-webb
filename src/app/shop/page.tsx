"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShoppingBag, 
  ShoppingCart,
  Sparkles, 
  BookOpen, 
  Check, 
  Mail, 
  Send, 
  Loader2, 
  CheckCircle,
  X,
  ArrowRight,
  Plus,
  Minus,
  Trash2
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

interface Product {
  id: string;
  title: string;
  category: "Kompendier" | "Böcker & Kort" | "Kläder";
  price: number;
  description: string;
  image: string;
  badge?: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const products: Product[] = [
  {
    id: "p-1",
    title: "Kompendium: Stresshantering",
    category: "Kompendier",
    price: 349,
    description: "Komplett analogt övningsmaterial och lektionsförslag för nervsystemsreglering, andningsövningar och mikropauser vid skolbänken.",
    image: "/images/photos/photo_6.jpg",
    badge: "Bästsäljare",
  },
  {
    id: "p-2",
    title: "Kompendium: Fokus & Studieteknik",
    category: "Kompendier",
    price: 349,
    description: "Praktiskt kompendium med övningar för att rikta, upprätthålla och återfå fokus under långa lektionspass och provsituationer.",
    image: "/images/photos/photo_8.jpg",
  },
  {
    id: "p-3",
    title: "Kompendium: Trygghet",
    category: "Kompendier",
    price: 349,
    description: "Analoga övningar för gemenskap, känslohantering och självmedkänsla som skapar ett inkluderande klassrumsklimat.",
    image: "/images/photos/photo_9.jpg",
  },
  {
    id: "p-4",
    title: "Yoga i förskolan",
    category: "Böcker & Kort",
    price: 395,
    description: "Metodhandbok skapad för förskollärare och barnskötare. Lekfulla sagor, djurpositioner och närvaro anpassad för 1–5 år.",
    image: "/images/photos/photo_12.jpg",
    badge: "Populär",
  },
  {
    id: "p-5",
    title: "Yoga i lågstadiet",
    category: "Böcker & Kort",
    price: 395,
    description: "Pedagogisk guide för F–3 med konkreta rörelsepauser, klassrumsregler och övningar som stärker kroppsuppfattningen.",
    image: "/images/photos/photo_14.jpg",
  },
  {
    id: "p-6",
    title: "Andetagets pekbok",
    category: "Böcker & Kort",
    price: 199,
    description: "Färgglad, tålig pekbok för de allra yngsta barnen som introducerar andetaget och lugnande beröring på ett mysigt sätt.",
    image: "/images/photos/photo_4.jpg",
  },
  {
    id: "p-7",
    title: "Budskapskort för klassrummet",
    category: "Böcker & Kort",
    price: 289,
    description: "En kortlek med 40 inspirerande affirmations- och reflektionskort som eleverna kan dra i början eller slutet av skoldagen.",
    image: "/images/photos/photo_3.jpg",
  },
  {
    id: "p-8",
    title: "Skolyoga Hoodie",
    category: "Kläder",
    price: 649,
    description: "Mjuk och bekväm hoodie i ekologisk bomull med diskret Skolyoga-emblem broderat på bröstet. Perfekt för pedagoger i rörelse.",
    image: "/images/photos/photo_1.jpg",
  },
  {
    id: "p-9",
    title: "Skolyoga T-shirt",
    category: "Kläder",
    price: 299,
    description: "Stilren t-shirt i 100% ekologisk bomull med Skolyoga-tryck på ryggen. Bekväm passform för lektions- och yogapass.",
    image: "/images/photos/photo_2.jpg",
  },
  {
    id: "p-10",
    title: "Skolyoga Keps",
    category: "Kläder",
    price: 249,
    description: "Klassisk bomullskeps med justerbart spänne och broderad turkos Skolyoga-mandala framtill.",
    image: "/images/photos/photo_11.jpg",
  },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Alla");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "checkout" | "success">("cart");
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const [orderForm, setOrderForm] = useState({
    name: "",
    email: "",
    school: "",
    address: "",
    reference: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredProducts = selectedCategory === "Alla" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId((curr) => (curr === product.id ? null : curr));
    }, 1500);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setIsSubmitting(true);

    const itemsSummary = cart
      .map(
        (item) =>
          `- ${item.product.title}: ${item.quantity} st á ${item.product.price} kr = ${
            item.product.price * item.quantity
          } kr`
      )
      .join("\n");

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: orderForm.name,
          email: orderForm.email,
          school: orderForm.school,
          subject: `Beställning Shop: ${totalCartCount} artiklar (Totalt ${totalCartPrice} kr)`,
          message: `BESTÄLLNING FRÅN SKOLYOGA SHOP:\n\nARTIKLAR:\n${itemsSummary}\n\nTOTALBELOPP: ${totalCartPrice} kr inkl moms\n\nBESTÄLLARE:\nNamn: ${orderForm.name}\nE-post: ${orderForm.email}\nSkola/Organisation: ${orderForm.school}\nLeverans/Fakturaadress:\n${orderForm.address}\nFaktura-referens / Märkning: ${orderForm.reference || "Ej angivet"}\n\nÖvrigt / Meddelande:\n${orderForm.message || "Inget meddelande"}`,
        }),
      });
      setCheckoutStep("success");
      setCart([]);
    } catch (err) {
      console.error(err);
      setCheckoutStep("success");
      setCart([]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      
      {/* Full-bleed Hero with authentic background image */}
      <PageHero
        badge="Skolyoga Butik"
        badgeIcon={<ShoppingBag className="w-3.5 h-3.5" />}
        title="Analogt material & Profilkläder"
        description="Tryckta metodkompendier, metodhandböcker, affirmationskort och profilkläder. Smidig fakturering till skolor, kommuner och organisationer."
        bgImage="/images/heroes/andas_fyrkant.jpg"
        bgAlt="Skolyoga Butik och analogt material bakgrund"
        align="center"
        objectPosition="object-[center_30%]"
      />

      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">

      {/* Category Filter Chips & Cart Trigger */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#E3DFC9] pb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full sm:w-auto">
          {["Alla", "Kompendier", "Böcker & Kort", "Kläder"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-brand-dustyPurple text-white shadow-md"
                  : "bg-brand-sand border border-[#E3DFC9] text-brand-dark hover:bg-[#EBE8DC]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            setCheckoutStep("cart");
            setIsCartOpen(true);
          }}
          className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white border border-[#D5D0BE] hover:border-brand-dustyPurple text-brand-dark text-xs font-bold shadow-sm transition-all cursor-pointer"
        >
          <ShoppingCart className="w-4 h-4 text-brand-dustyPurple" />
          <span>Varukorg ({totalCartCount})</span>
          {totalCartPrice > 0 && (
            <span className="text-brand-dustyPurple font-extrabold">• {totalCartPrice} kr</span>
          )}
        </button>
      </div>

      {/* Product Grid - Wide 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {filteredProducts.map((product) => {
          const isJustAdded = justAddedId === product.id;
          const cartItem = cart.find((i) => i.product.id === product.id);

          return (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-[#E3DFC9] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-4/3 w-full bg-brand-sand overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-brand-warmYellow text-brand-dark text-xs font-bold shadow-sm">
                        {product.badge}
                      </span>
                    </div>
                  )}
                  {cartItem && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-brand-dustyPurple text-white text-xs font-bold shadow">
                        {cartItem.quantity} i varukorg
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-brand-dustyPurple">
                    {product.category}
                  </div>
                  <h3 className="text-xl font-bold font-cardo text-brand-dark">
                    {product.title}
                  </h3>
                  <p className="text-xs text-brand-darkGrey leading-relaxed line-clamp-3">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#EBE8DC] mt-4 flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold font-cardo text-brand-dark">
                    {product.price} kr
                  </span>
                  <span className="text-[10px] text-brand-darkGrey block">inkl. moms</span>
                </div>

                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold shadow transition-all flex items-center gap-1.5 cursor-pointer ${
                    isJustAdded
                      ? "bg-emerald-600 text-white"
                      : "bg-brand-dustyPurple text-white hover:bg-[#781b61]"
                  }`}
                >
                  {isJustAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Tillagd!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Lägg i varukorg</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Callout */}
      <div className="bg-brand-sand rounded-3xl border border-[#E3DFC9] p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-3">
        <h3 className="text-xl font-bold font-cardo text-brand-dark">
          Större beställning till en hel skola eller kommun?
        </h3>
        <p className="text-sm text-brand-darkGrey max-w-xl mx-auto">
          Vill ni köpa klassuppsättningar av böcker, kompendier eller paketlösningar i samband med fortbildning? Kontakta oss direkt på{" "}
          <a href="mailto:hej@skolyoga.se" className="text-brand-dustyPurple font-bold underline">
            hej@skolyoga.se
          </a> så tar vi fram en offert.
        </p>
      </div>

      {/* Floating Cart Button (when items in cart) */}
      {totalCartCount > 0 && (
        <aside aria-label="Varukorgsöversikt" className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => {
              setCheckoutStep("cart");
              setIsCartOpen(true);
            }}
            className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-brand-dustyPurple hover:bg-[#781b61] text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-brand-warmYellow text-brand-dark text-[11px] font-bold flex items-center justify-center">
                {totalCartCount}
              </span>
            </div>
            <span className="text-sm font-bold">Varukorg • {totalCartPrice} kr</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </aside>
      )}

      {/* Shopping Cart Modal Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setIsCartOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-brand-darkGrey hover:bg-brand-sand cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* STEP: SUCCESS */}
            {checkoutStep === "success" && (
              <div className="text-center py-8 space-y-4">
                <CheckCircle className="w-14 h-14 text-brand-dustyTurquoise mx-auto" />
                <h3 className="text-2xl font-bold font-cardo text-brand-dark">Tack för din beställning!</h3>
                <p className="text-sm text-brand-darkGrey leading-relaxed">
                  Vi har mottagit din beställning. Vi skickar en orderbekräftelse och fakturainformation till <strong>{orderForm.email}</strong> så snart som möjligt.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-brand-dustyPurple text-white text-xs font-semibold cursor-pointer"
                >
                  Stäng varukorgen
                </button>
              </div>
            )}

            {/* STEP: CART ITEMS OVERVIEW */}
            {checkoutStep === "cart" && (
              <div className="space-y-6">
                <div className="border-b border-[#EBE8DC] pb-4">
                  <span className="text-xs font-bold text-brand-dustyPurple uppercase tracking-wider">Din varukorg</span>
                  <h3 className="text-2xl font-bold font-cardo text-brand-dark mt-1">
                    Valda produkter ({totalCartCount} st)
                  </h3>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <ShoppingCart className="w-12 h-12 text-stone-300 mx-auto" />
                    <p className="text-base font-semibold text-brand-dark">Din varukorg är tom</p>
                    <p className="text-xs text-brand-darkGrey">Lägg till kompendier, böcker eller kläder från butiken.</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-2 px-5 py-2 rounded-full bg-brand-sand text-brand-dark border border-[#D5D0BE] text-xs font-semibold"
                    >
                      Börja handla
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="divide-y divide-[#EBE8DC] max-h-64 overflow-y-auto pr-2">
                      {cart.map((item) => (
                        <div key={item.product.id} className="py-3.5 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-brand-sand shrink-0 border border-[#E3DFC9]">
                              <Image
                                src={item.product.image}
                                alt={item.product.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-brand-dark line-clamp-1">{item.product.title}</h4>
                              <p className="text-xs text-brand-darkGrey">{item.product.price} kr / st</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 border border-[#D5D0BE] rounded-full px-2 py-1 bg-brand-sand">
                              <button
                                onClick={() => updateQuantity(item.product.id, -1)}
                                className="w-5 h-5 rounded-full flex items-center justify-center text-brand-dark hover:bg-white transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold text-brand-dark min-w-[14px] text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, 1)}
                                className="w-5 h-5 rounded-full flex items-center justify-center text-brand-dark hover:bg-white transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="text-sm font-bold text-brand-dark min-w-[60px] text-right">
                              {item.product.price * item.quantity} kr
                            </span>

                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-stone-400 hover:text-red-500 transition-colors p-1"
                              title="Ta bort"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-[#EBE8DC] pt-4 flex items-center justify-between">
                      <span className="text-base font-bold text-brand-dark">Totalsumma:</span>
                      <span className="text-2xl font-bold font-cardo text-brand-dustyPurple">{totalCartPrice} kr</span>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2">
                      <button
                        onClick={() => setCart([])}
                        className="text-xs text-stone-500 hover:text-red-500 underline"
                      >
                        Töm varukorg
                      </button>

                      <button
                        onClick={() => setCheckoutStep("checkout")}
                        className="px-6 py-3 rounded-full bg-brand-dustyPurple hover:bg-[#781b61] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <span>Gå vidare till beställning</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* STEP: CHECKOUT FORM */}
            {checkoutStep === "checkout" && (
              <div>
                <div className="border-b border-[#EBE8DC] pb-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-brand-dustyPurple uppercase tracking-wider">Kassan</span>
                    <h3 className="text-2xl font-bold font-cardo text-brand-dark mt-1">
                      Fyll i beställningsuppgifter
                    </h3>
                  </div>
                  <button
                    onClick={() => setCheckoutStep("cart")}
                    className="text-xs text-brand-dustyPurple font-bold hover:underline"
                  >
                    ← Ändra varukorg
                  </button>
                </div>

                <div className="my-3 p-3 rounded-xl bg-brand-sand border border-[#E3DFC9] text-xs text-brand-dark flex items-center justify-between">
                  <span>Totalt <strong>{totalCartCount} st</strong> artiklar att beställa</span>
                  <span className="font-bold text-brand-dustyPurple">{totalCartPrice} kr inkl moms</span>
                </div>

                <form onSubmit={handleOrderSubmit} className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-brand-dark mb-1">
                        Ditt namn <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={orderForm.name}
                        onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                        placeholder="För- och efternamn"
                        className="w-full px-3 py-2 rounded-xl border border-[#D5D0BE] text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-dustyPurple"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-brand-dark mb-1">
                        E-postadress <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={orderForm.email}
                        onChange={(e) => setOrderForm({ ...orderForm, email: e.target.value })}
                        placeholder="namn@skola.se"
                        className="w-full px-3 py-2 rounded-xl border border-[#D5D0BE] text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-dustyPurple"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-brand-dark mb-1">
                        Skola / Organisation
                      </label>
                      <input
                        type="text"
                        value={orderForm.school}
                        onChange={(e) => setOrderForm({ ...orderForm, school: e.target.value })}
                        placeholder="T.ex. Centralskolan"
                        className="w-full px-3 py-2 rounded-xl border border-[#D5D0BE] text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-dustyPurple"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-brand-dark mb-1">
                        Faktura-referens / Märkning
                      </label>
                      <input
                        type="text"
                        value={orderForm.reference}
                        onChange={(e) => setOrderForm({ ...orderForm, reference: e.target.value })}
                        placeholder="T.ex. Ref-kod / Kostnadsställe"
                        className="w-full px-3 py-2 rounded-xl border border-[#D5D0BE] text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-dustyPurple"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-dark mb-1">
                      Leverans- och fakturaadress <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={orderForm.address}
                      onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                      placeholder="Gatuadress, Postnummer, Ort"
                      className="w-full px-3 py-2 rounded-xl border border-[#D5D0BE] text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-dustyPurple"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-dark mb-1">
                      Övrigt / Meddelande
                    </label>
                    <textarea
                      rows={2}
                      value={orderForm.message}
                      onChange={(e) => setOrderForm({ ...orderForm, message: e.target.value })}
                      placeholder="Ev. önskemål kring leverans eller storlekar..."
                      className="w-full px-3 py-2 rounded-xl border border-[#D5D0BE] text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-dustyPurple"
                    />
                  </div>

                  <p className="text-[11px] text-brand-darkGrey">
                    Vi skickar faktura (30 dagar) tillsammans med din leverans.
                  </p>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep("cart")}
                      className="px-4 py-2 text-xs font-semibold text-brand-dark hover:underline"
                    >
                      Tillbaka
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 rounded-full bg-brand-dustyPurple text-white text-xs font-semibold shadow hover:bg-[#781b61] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Skickar...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Slutför beställning ({totalCartPrice} kr)</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
      )}

      </div>
    </div>
  );
}
