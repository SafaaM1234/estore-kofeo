import React, { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

const SITE_FEEDBACK_KEY = "kofeo_site_feedback";

const SiteFeedbackSection = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem(SITE_FEEDBACK_KEY);
        setItems(raw ? JSON.parse(raw) : []);
      } catch {
        setItems([]);
      }
    };
    load();
    const onStorage = (e) => {
      if (e.key === SITE_FEEDBACK_KEY) {
        try {
          setItems(e.newValue ? JSON.parse(e.newValue) : []);
        } catch {
          setItems([]);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("kofeo-site-feedback", load);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("kofeo-site-feedback", load);
    };
  }, []);

  if (!items.length) return null;

  return (
    <section className="bg-[#F5F1EE] py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#C68642]/20 flex items-center justify-center text-[#C68642]">
            <MessageCircle size={22} />
          </div>
          <div>
            <p className="text-[10px] text-[#C68642] uppercase tracking-[0.2em] font-semibold">
              Témoignages
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A0F0A] font-serif">
              Ce que disent nos clients du site
            </h2>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {items.slice(0, 6).map((it, idx) => (
            <article
              key={`${it.createdAt}-${idx}`}
              className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E0D8]"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-[#1A0F0A]">{it.name}</p>
                  <p className="text-xs text-[#6B5B4A]">{it.role}</p>
                </div>
                <p className="text-amber-400 text-lg shrink-0">
                  {"★".repeat(it.rating || 5)}
                </p>
              </div>
              <p className="mt-4 text-[#4A3F36] text-sm leading-relaxed">
                {it.comment}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SiteFeedbackSection;
