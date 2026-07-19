import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Phone,
  Send,
  MessageCircle,
  Menu,
  X,
  ChevronRight,
  Heart,
  ArrowRight,
  ArrowUpRight,
  FileText,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  HandHeart,
  Users,
  Stethoscope,
  Home as HomeIcon,
  ExternalLink,
} from "lucide-react";

/* ==================================================================
   ФОНД «ДАРЬЯ» — премиальная версия сайта (2026)
   ------------------------------------------------------------------
   ⚠️ МЕСТА ДЛЯ ЗАМЕНЫ НА РЕАЛЬНЫЕ ДАННЫЕ (отмечены TODO):
   — Реальная история и фото/видео человека, в честь которого назван фонд
   — Юридические реквизиты (ИНН/ОГРН/номера свидетельств)
   — Ссылки на реальные PDF-документы
   — Ссылки на официальные сайты партнёров
   — Реальные фотографии (сейчас — стилизованные заглушки)
   ================================================================== */

const AMOUNTS = [500, 1000, 3000, 5000, 10000];

const ABOUT_CARDS = [
  {
    icon: HandHeart,
    title: "Чем занимаемся",
    text: "Оплачиваем лечение, лекарства и реабилитацию детям с тяжёлыми диагнозами, сопровождаем семьи на каждом этапе.",
  },
  {
    icon: Heart,
    title: "Почему существуем",
    text: "Фонд родился из личного опыта одной семьи — мы знаем, каково это, когда помощь нужна была вчера.",
  },
  {
    icon: Users,
    title: "Кому помогаем",
    text: "Детям с онкологическими и гематологическими заболеваниями и их родителям — от постановки диагноза до полного восстановления.",
  },
];

const IMPACT_CARDS = [
  { icon: Sparkles, title: "Даже небольшая сумма меняет ход дня", text: "500 рублей — это упаковка обезболивающих для ребёнка после химиотерапии уже сегодня вечером." },
  { icon: Stethoscope, title: "Помощь работает быстрее бюрократии", text: "Пока оформляются квоты и справки, фонд закрывает лечение здесь и сейчас — счёт часто идёт на дни." },
  { icon: HomeIcon, title: "Вы даёте не только деньги — вы даёте время", text: "Средства фонда освобождают родителей от финансовой паники, чтобы всё их время оставалось для ребёнка." },
  { icon: ShieldCheck, title: "Прозрачно на каждом шаге", text: "Каждое пожертвование отражается в отчётах фонда — вы всегда можете увидеть, куда пошла помощь." },
];

const STORIES = [
  { name: "История Миши, 7 лет", tag: "Лечение оплачено", text: "Курс таргетной терапии, который не входил в квоту, стал возможен благодаря 214 добрым людям." },
  { name: "История семьи Levy", tag: "Реабилитация", text: "Полгода восстановления после трансплантации — фонд взял на себя проживание рядом с клиникой." },
  { name: "История Сони, 4 года", tag: "Лекарства", text: "Редкий препарат, который пришлось везти из другого региона — успели за 36 часов." },
];

const NEWS = [
  { date: "18.07.26", cat: "События", title: "Благотворительный забег «От сердца к сердцу»", desc: "Приглашаем стать частью большого доброго дела в эти выходные." },
  { date: "12.07.26", cat: "Помощь", title: "Визит в детскую областную больницу", desc: "Передали необходимое маленьким пациентам вместе с партнёрами фонда." },
  { date: "09.07.26", cat: "Донорство", title: "Ещё один донор костного мозга", desc: "Друг фонда вступил в федеральный регистр — спасибо за неравнодушие." },
  { date: "05.07.26", cat: "Акции", title: "Акция «Тележки добра»", desc: "Собрали всё необходимое для детей, проходящих лечение." },
];

const PARTNERS = [
  { name: "Городская епархия", url: "https://example.org" },
  { name: "Детская клиника", url: "https://example.org" },
  { name: "Медиа-группа «Свет»", url: "https://example.org" },
  { name: "Регистр доноров КМ", url: "https://example.org" },
  { name: "Спортивная школа", url: "https://example.org" },
  { name: "Издательский дом", url: "https://example.org" },
]; // TODO: заменить на реальные названия и ссылки партнёров

const DOCS = [
  { title: "Свидетельство о регистрации", meta: "PDF · TODO номер" },
  { title: "Устав фонда", meta: "PDF · редакция TODO" },
  { title: "ИНН / ОГРН", meta: "TODO: реквизиты" },
  { title: "Финансовый отчёт за год", meta: "PDF · TODO год" },
  { title: "Отчёт о деятельности", meta: "PDF · TODO год" },
  { title: "Политика конфиденциальности", meta: "PDF" },
]; // TODO: подставить реальные ссылки на PDF

const STATS = [
  { value: 300, suffix: "+", label: "семей получили помощь" },
  { value: 4, suffix: "", label: "года работы фонда" },
  { value: 12, suffix: "", label: "регионов присутствия" },
  { value: 96, suffix: "%", label: "пожертвований — напрямую детям" },
];

const NAV = [
  { label: "О фонде", href: "#about" },
  { label: "Помочь", href: "#donate" },
  { label: "Истории", href: "#stories" },
  { label: "Новости", href: "#news" },
  { label: "Партнёры", href: "#partners" },
  { label: "Документы", href: "#docs" },
  { label: "Контакты", href: "#contacts" },
];

/* ---------- helpers ---------- */

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "", style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(22px)",
      transition: `opacity .8s ease ${delay}ms, transform .8s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function Counter({ value, suffix = "" }) {
  const [ref, visible] = useReveal(0.4);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = null;
    const dur = 1400;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, value]);
  return <span ref={ref} className="df-stat-n">{n}{suffix}</span>;
}

/* ---------- main component ---------- */

export default function CharityFundHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [donationType, setDonationType] = useState("once");
  const [amount, setAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [showFloat, setShowFloat] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => { setShowFloat(window.scrollY > 760); setScrollY(window.scrollY); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,450;9..144,600;9..144,700&family=Manrope:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const selectAmount = useCallback((v) => { setAmount(v); setCustomAmount(""); }, []);

  return (
    <div className="df-root" id="top">
      <style>{`
        .df-root {
          --bg:#FBFAF7; --panel:#FFFFFF; --panel-2:#F5F3EE;
          --ink:#1E2130; --ink-soft:#666B80; --ink-faint:#9BA0B2;
          --accent:#3E6FF2; --accent-deep:#2B52C4; --accent-soft:#EAF0FF;
          --sand:#EFE8D8; --line:#E8E6DD;
          font-family:'Manrope',sans-serif; background:var(--bg); color:var(--ink);
          position:relative; overflow-x:hidden;
        }
        .df-root * { box-sizing:border-box; }
        .df-serif { font-family:'Fraunces',serif; }
        .df-mono { font-family:'IBM Plex Mono',monospace; letter-spacing:.08em; }
        .df-container { max-width:1200px; margin:0 auto; padding:0 28px; position:relative; z-index:1; }

        /* topbar */
        .df-topbar { background:var(--ink); color:#EDEFF6; font-size:12.5px; }
        .df-topbar-inner { display:flex; justify-content:space-between; align-items:center; padding:8px 28px; max-width:1200px; margin:0 auto; }
        .df-topbar a { color:#EDEFF6; text-decoration:none; opacity:.85; display:inline-flex; align-items:center; gap:6px; }
        .df-topbar-social { display:flex; gap:16px; }

        /* header */
        .df-header { position:sticky; top:0; z-index:40; background:rgba(251,250,247,.78); backdrop-filter:blur(14px) saturate(160%); border-bottom:1px solid var(--line); }
        .df-header-inner { display:flex; align-items:center; justify-content:space-between; padding:16px 28px; max-width:1200px; margin:0 auto; }
        .df-logo { display:flex; align-items:center; gap:10px; text-decoration:none; color:var(--ink); }
        .df-logo-mark { width:40px; height:40px; border-radius:12px; background:linear-gradient(135deg,var(--accent),#7C9CFF); display:flex; align-items:center; justify-content:center; color:#fff; box-shadow:0 10px 24px -10px rgba(62,111,242,.55); }
        .df-logo-text { font-family:'Fraunces',serif; font-size:20px; font-weight:600; }
        .df-nav { display:flex; gap:26px; list-style:none; margin:0; padding:0; }
        .df-nav a { color:var(--ink-soft); text-decoration:none; font-size:14.5px; font-weight:600; position:relative; }
        .df-nav a::after { content:''; position:absolute; left:0; bottom:-6px; width:0; height:1.5px; background:var(--accent); transition:width .25s; }
        .df-nav a:hover { color:var(--ink); }
        .df-nav a:hover::after { width:100%; }
        .df-header-actions { display:flex; align-items:center; gap:12px; }
        .df-btn { border:none; border-radius:12px; padding:11px 20px; font-weight:700; font-size:14px; cursor:pointer; display:inline-flex; align-items:center; gap:8px; text-decoration:none; transition:transform .18s, box-shadow .18s, background .18s; }
        .df-btn-primary { background:var(--accent); color:#fff; box-shadow:0 10px 24px -10px rgba(62,111,242,.55); }
        .df-btn-primary:hover { background:var(--accent-deep); transform:translateY(-2px); }
        .df-btn-ghost { background:transparent; color:var(--ink); border:1.5px solid var(--line); }
        .df-btn-ghost:hover { border-color:var(--ink); }
        .df-burger { display:none; background:none; border:none; color:var(--ink); cursor:pointer; }
        @media (max-width:980px){ .df-nav{display:none;} .df-burger{display:block;} .df-header-actions .df-btn-ghost{display:none;} }
        .df-mobile-nav { display:flex; flex-direction:column; padding:8px 28px 20px; border-top:1px solid var(--line); }
        .df-mobile-nav a { padding:12px 0; color:var(--ink); text-decoration:none; font-weight:700; border-bottom:1px solid var(--line); }

        /* hero */
        .df-hero { position:relative; padding:64px 0 0; overflow:hidden; }
        .df-hero-inner { display:grid; grid-template-columns:1fr; }
        .df-hero-photo { position:relative; height:min(78vh,720px); border-radius:0 0 32px 32px; overflow:hidden;
          background:
            radial-gradient(circle at 18% 22%, rgba(124,156,255,.55), transparent 45%),
            radial-gradient(circle at 82% 78%, rgba(239,232,216,.6), transparent 50%),
            linear-gradient(150deg, #223 0%, #1E2130 55%, #2B355C 100%);
        }
        .df-hero-photo::after { content:''; position:absolute; inset:0; background:linear-gradient(0deg, rgba(30,33,48,.72) 0%, rgba(30,33,48,.15) 55%, rgba(30,33,48,.35) 100%); }
        .df-hero-photo-note { position:absolute; top:16px; right:16px; z-index:2; background:rgba(255,255,255,.14); backdrop-filter:blur(8px); color:#fff; font-size:11px; padding:6px 10px; border-radius:8px; border:1px solid rgba(255,255,255,.25); }
        .df-hero-content { position:absolute; inset:0; z-index:2; display:flex; flex-direction:column; justify-content:flex-end; padding:56px 28px; max-width:1200px; margin:0 auto; }
        .df-hero-eyebrow { display:inline-flex; align-items:center; gap:8px; color:#CBD6FF; font-size:12.5px; text-transform:uppercase; letter-spacing:.1em; margin-bottom:18px; }
        .df-hero-eyebrow .dot { width:6px; height:6px; border-radius:50%; background:#7C9CFF; }
        .df-hero h1 { font-family:'Fraunces',serif; font-weight:600; font-size:clamp(38px,6.4vw,72px); line-height:1.03; color:#fff; margin:0 0 20px; max-width:820px; }
        .df-hero h1 em { font-style:italic; color:#9FB4FF; }
        .df-hero p { color:rgba(255,255,255,.82); font-size:17px; line-height:1.65; max-width:560px; margin:0 0 32px; }
        .df-hero-actions { display:flex; gap:14px; flex-wrap:wrap; margin-bottom:26px; }
        .df-btn-lg { padding:16px 28px; font-size:15px; border-radius:14px; }
        .df-btn-white { background:#fff; color:var(--ink); }
        .df-btn-white:hover { background:#EDEFF6; transform:translateY(-2px); }
        .df-btn-glass { background:rgba(255,255,255,.12); color:#fff; border:1.5px solid rgba(255,255,255,.35); backdrop-filter:blur(6px); }
        .df-btn-glass:hover { background:rgba(255,255,255,.2); }
        .df-hero-meta { display:flex; gap:26px; flex-wrap:wrap; align-items:center; }
        .df-hero-meta a { color:#fff; text-decoration:none; font-weight:700; font-size:14.5px; display:inline-flex; align-items:center; gap:8px; opacity:.92; }

        /* stats strip */
        .df-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:var(--line); margin-top:-1px; border-radius:0 0 24px 24px; overflow:hidden; }
        @media (max-width:760px){ .df-stats{ grid-template-columns:repeat(2,1fr);} }
        .df-stat { background:var(--panel); padding:30px 24px; text-align:center; }
        .df-stat-n { font-family:'Fraunces',serif; font-size:36px; font-weight:600; color:var(--accent-deep); }
        .df-stat-l { font-size:13px; color:var(--ink-soft); margin-top:6px; }

        /* section shell */
        .df-section { padding:100px 0; }
        .df-section.tight { padding:70px 0; }
        .df-section.alt { background:var(--panel-2); }
        .df-eyebrow { font-family:'IBM Plex Mono',monospace; font-size:12px; text-transform:uppercase; letter-spacing:.12em; color:var(--accent-deep); display:block; margin-bottom:14px; }
        .df-h2 { font-family:'Fraunces',serif; font-size:clamp(28px,3.6vw,44px); font-weight:600; margin:0 0 18px; line-height:1.08; }
        .df-lead { color:var(--ink-soft); font-size:16.5px; line-height:1.7; max-width:640px; }

        /* about cards */
        .df-about-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; margin-top:44px; }
        @media (max-width:860px){ .df-about-grid{ grid-template-columns:1fr; } }
        .df-card { background:var(--panel); border:1px solid var(--line); border-radius:20px; padding:30px; transition:transform .25s, box-shadow .25s, border-color .25s; }
        .df-card:hover { transform:translateY(-5px); box-shadow:0 24px 50px -28px rgba(30,33,48,.22); border-color:var(--accent); }
        .df-card-icon { width:46px; height:46px; border-radius:12px; background:var(--accent-soft); color:var(--accent-deep); display:flex; align-items:center; justify-content:center; margin-bottom:18px; }
        .df-card h4 { font-size:17px; margin:0 0 8px; font-family:'Fraunces',serif; font-weight:600; }
        .df-card p { margin:0; color:var(--ink-soft); font-size:14.5px; line-height:1.6; }

        /* donation */
        .df-donate-shell { display:grid; grid-template-columns:1fr 1fr; gap:28px; align-items:start; }
        @media (max-width:900px){ .df-donate-shell{ grid-template-columns:1fr; } }
        .df-donate-card { background:var(--panel); border:1px solid var(--line); border-radius:24px; padding:36px; box-shadow:0 30px 70px -40px rgba(30,33,48,.25); }
        .df-toggle { display:inline-flex; background:var(--panel-2); border-radius:999px; padding:4px; margin-bottom:26px; width:100%; }
        .df-toggle button { flex:1; border:none; background:transparent; padding:11px 16px; border-radius:999px; font-weight:700; font-size:13.5px; cursor:pointer; color:var(--ink-soft); }
        .df-toggle button.active { background:var(--ink); color:#fff; }
        .df-amounts { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-bottom:16px; }
        @media (max-width:420px){ .df-amounts{ grid-template-columns:repeat(2,1fr);} }
        .df-amount-chip { border:1.5px solid var(--line); background:var(--panel); border-radius:12px; padding:13px 10px; font-weight:700; font-size:14.5px; cursor:pointer; color:var(--ink); transition:.18s; }
        .df-amount-chip.active { background:var(--accent); border-color:var(--accent); color:#fff; }
        .df-custom-input { width:100%; border:1.5px solid var(--line); border-radius:12px; padding:13px 14px; font-size:14.5px; font-family:'Manrope',sans-serif; margin-bottom:20px; }
        .df-custom-input:focus { outline:none; border-color:var(--accent); }
        .df-field-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:14px; }
        @media (max-width:480px){ .df-field-row{ grid-template-columns:1fr; } }
        .df-field label { font-size:12px; font-weight:700; color:var(--ink-soft); display:block; margin-bottom:6px; }
        .df-field input { width:100%; border:1.5px solid var(--line); border-radius:12px; padding:12px 14px; font-size:14px; font-family:'Manrope',sans-serif; }
        .df-field input:focus { outline:none; border-color:var(--accent); }
        .df-submit { width:100%; background:var(--accent); color:#fff; border:none; border-radius:14px; padding:16px; font-weight:800; font-size:15px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; margin-top:6px; }
        .df-submit:hover { background:var(--accent-deep); }
        .df-fineprint { font-size:12px; color:var(--ink-faint); margin-top:14px; line-height:1.5; }
        .df-donate-side { display:flex; flex-direction:column; gap:16px; }
        .df-donate-note { background:var(--accent-soft); border-radius:20px; padding:26px; }
        .df-donate-note p { margin:0; color:var(--accent-deep); font-family:'Fraunces',serif; font-size:19px; font-style:italic; line-height:1.5; }
        .df-trust-row { display:flex; gap:14px; }
        .df-trust-chip { flex:1; background:var(--panel); border:1px solid var(--line); border-radius:16px; padding:18px; text-align:center; }
        .df-trust-chip .n { font-family:'Fraunces',serif; font-weight:600; font-size:20px; color:var(--accent-deep); }
        .df-trust-chip .l { font-size:12px; color:var(--ink-soft); margin-top:4px; }

        /* impact cards */
        .df-impact-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; margin-top:44px; }
        @media (max-width:980px){ .df-impact-grid{ grid-template-columns:repeat(2,1fr);} }
        @media (max-width:560px){ .df-impact-grid{ grid-template-columns:1fr; } }
        .df-impact-card { background:var(--ink); color:#EDEFF6; border-radius:20px; padding:28px; }
        .df-impact-card .ic { width:42px; height:42px; border-radius:11px; background:rgba(124,156,255,.18); color:#9FB4FF; display:flex; align-items:center; justify-content:center; margin-bottom:20px; }
        .df-impact-card h4 { font-family:'Fraunces',serif; font-size:16px; margin:0 0 10px; line-height:1.35; font-weight:600; }
        .df-impact-card p { margin:0; font-size:13.5px; color:#B7BCD1; line-height:1.6; }

        /* stories */
        .df-stories-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; margin-top:44px; }
        @media (max-width:900px){ .df-stories-grid{ grid-template-columns:1fr; } }
        .df-story-card { border-radius:22px; overflow:hidden; background:var(--panel); border:1px solid var(--line); transition:transform .25s, box-shadow .25s; }
        .df-story-card:hover { transform:translateY(-6px); box-shadow:0 28px 60px -32px rgba(30,33,48,.28); }
        .df-story-media { height:180px; background:linear-gradient(135deg,#7C9CFF,#3E6FF2); position:relative; display:flex; align-items:center; justify-content:center; }
        .df-story-media .tag { position:absolute; top:14px; left:14px; background:rgba(255,255,255,.92); color:var(--accent-deep); font-size:11.5px; font-weight:700; padding:6px 12px; border-radius:999px; }
        .df-story-body { padding:22px; }
        .df-story-body h4 { font-family:'Fraunces',serif; font-size:17px; margin:0 0 8px; }
        .df-story-body p { margin:0 0 14px; font-size:14px; color:var(--ink-soft); line-height:1.6; }
        .df-story-link { font-size:13.5px; font-weight:700; color:var(--accent-deep); text-decoration:none; display:inline-flex; align-items:center; gap:6px; }

        /* motivator strip */
        .df-motivator { background:linear-gradient(120deg,var(--ink),#2B355C); padding:60px 0; }
        .df-motivator-inner { display:flex; gap:36px; overflow-x:auto; scrollbar-width:none; }
        .df-motivator-inner::-webkit-scrollbar{ display:none; }
        .df-motivator-item { flex:0 0 auto; font-family:'Fraunces',serif; font-style:italic; font-size:19px; color:#fff; opacity:.9; white-space:nowrap; }
        .df-motivator-item::after { content:'•'; margin-left:36px; color:#7C9CFF; }

        /* news */
        .df-news-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; margin-top:44px; }
        @media (max-width:980px){ .df-news-grid{ grid-template-columns:repeat(2,1fr);} }
        @media (max-width:560px){ .df-news-grid{ grid-template-columns:1fr; } }
        .df-news-card { background:var(--panel); border:1px solid var(--line); border-radius:18px; padding:22px; text-decoration:none; color:var(--ink); display:flex; flex-direction:column; gap:10px; transition:.2s; }
        .df-news-card:hover { border-color:var(--accent); transform:translateY(-4px); }
        .df-news-cat { font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:.06em; color:var(--accent-deep); }
        .df-news-card h4 { font-family:'Fraunces',serif; font-size:15.5px; margin:0; line-height:1.35; }
        .df-news-card p { font-size:13px; color:var(--ink-soft); margin:0; line-height:1.5; }
        .df-news-date { font-size:12px; color:var(--ink-faint); margin-top:auto; }

        /* partners */
        .df-partners-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-top:44px; }
        @media (max-width:760px){ .df-partners-grid{ grid-template-columns:1fr 1fr; } }
        @media (max-width:480px){ .df-partners-grid{ grid-template-columns:1fr; } }
        .df-partner-card { background:var(--panel); border:1px solid var(--line); border-radius:16px; padding:20px; display:flex; align-items:center; justify-content:space-between; text-decoration:none; color:var(--ink); transition:.2s; }
        .df-partner-card:hover { border-color:var(--accent); background:var(--accent-soft); }
        .df-partner-card .name { font-weight:700; font-size:14.5px; }

        /* docs */
        .df-docs-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-top:44px; }
        @media (max-width:760px){ .df-docs-grid{ grid-template-columns:1fr 1fr; } }
        @media (max-width:480px){ .df-docs-grid{ grid-template-columns:1fr; } }
        .df-doc-card { display:flex; align-items:center; gap:14px; background:var(--panel); border:1px solid var(--line); border-radius:16px; padding:16px 18px; text-decoration:none; color:var(--ink); transition:.2s; }
        .df-doc-card:hover { border-color:var(--accent); }
        .df-doc-ic { width:38px; height:38px; border-radius:10px; background:var(--accent-soft); color:var(--accent-deep); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .df-doc-card .t { font-weight:700; font-size:14px; }
        .df-doc-card .m { font-size:11.5px; color:var(--ink-faint); }
        .df-doc-card svg.ext { margin-left:auto; color:var(--ink-faint); }

        /* contacts / footer */
        .df-footer { background:var(--ink); color:#EDEFF6; padding-top:80px; }
        .df-contacts-grid { display:grid; grid-template-columns:1fr 1fr; gap:40px; padding-bottom:70px; border-bottom:1px solid rgba(255,255,255,.1); }
        @media (max-width:860px){ .df-contacts-grid{ grid-template-columns:1fr; } }
        .df-contact-row { display:flex; gap:14px; align-items:flex-start; margin-bottom:18px; }
        .df-contact-row .ic { width:38px; height:38px; border-radius:10px; background:rgba(124,156,255,.16); color:#9FB4FF; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .df-contact-row a, .df-contact-row span { color:#EDEFF6; text-decoration:none; font-size:14.5px; }
        .df-map { border-radius:18px; overflow:hidden; height:260px; border:1px solid rgba(255,255,255,.12); }
        .df-map iframe { width:100%; height:100%; border:0; filter:grayscale(.3) invert(.92) contrast(.9); }
        .df-footer-grid { display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr; gap:40px; padding:56px 0; }
        @media (max-width:800px){ .df-footer-grid{ grid-template-columns:1fr 1fr; } }
        @media (max-width:500px){ .df-footer-grid{ grid-template-columns:1fr; } }
        .df-footer h5 { font-size:12px; text-transform:uppercase; letter-spacing:.1em; color:#8A8FA6; margin:0 0 16px; font-family:'IBM Plex Mono',monospace; }
        .df-footer ul { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:10px; }
        .df-footer a { color:#EDEFF6; text-decoration:none; font-size:14.5px; opacity:.88; }
        .df-footer a:hover { opacity:1; text-decoration:underline; }
        .df-footer-bottom { border-top:1px solid rgba(255,255,255,.1); padding:22px 0; display:flex; justify-content:space-between; flex-wrap:wrap; gap:10px; font-size:12.5px; color:#8A8FA6; }

        /* floating cta */
        .df-float { position:fixed; right:22px; bottom:22px; z-index:50; background:var(--accent); color:#fff; border:none; border-radius:999px; padding:15px 22px; font-weight:800; font-size:14px; display:flex; align-items:center; gap:8px; box-shadow:0 16px 36px -14px rgba(62,111,242,.65); cursor:pointer; }
        .df-float:hover { background:var(--accent-deep); }

        /* modal */
        .df-modal-overlay { position:fixed; inset:0; background:rgba(20,20,30,.55); backdrop-filter:blur(4px); z-index:100; display:flex; align-items:center; justify-content:center; padding:20px; }
        .df-modal { background:#fff; border-radius:22px; padding:34px; max-width:400px; width:100%; position:relative; }
        .df-modal-close { position:absolute; top:16px; right:16px; background:var(--panel-2); border:none; border-radius:50%; width:32px; height:32px; display:flex; align-items:center; justify-content:center; cursor:pointer; }
      `}</style>

      {/* topbar */}
      <div className="df-topbar">
        <div className="df-topbar-inner">
          <a href="tel:+70000000000"><Phone size={13} />+7 (000) 000-00-00</a>
          <div className="df-topbar-social">
            <a href="#"><MessageCircle size={15} /></a>
            <a href="#"><Send size={15} /></a>
          </div>
        </div>
      </div>

      {/* header */}
      <header className="df-header">
        <div className="df-header-inner">
          <a href="#top" className="df-logo">
            <span className="df-logo-mark"><Heart size={19} fill="#fff" /></span>
            <span className="df-logo-text">Фонд «Дарья»</span>
          </a>
          <ul className="df-nav">
            {NAV.map((n) => <li key={n.label}><a href={n.href}>{n.label}</a></li>)}
          </ul>
          <div className="df-header-actions">
            <button className="df-btn df-btn-ghost" onClick={() => setCallbackOpen(true)}>Обратный звонок</button>
            <a href="#donate" className="df-btn df-btn-primary">Пожертвовать <ChevronRight size={15} /></a>
            <button className="df-burger" onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X size={24}/> : <Menu size={24}/>}</button>
          </div>
        </div>
        {menuOpen && (
          <div className="df-mobile-nav">
            {NAV.map((n) => <a key={n.label} href={n.href} onClick={() => setMenuOpen(false)}>{n.label}</a>)}
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="df-hero">
        <div className="df-hero-photo" style={{ transform: `translateY(${scrollY * 0.08}px)` }}>
          <span className="df-hero-photo-note">TODO: заменить фон на реальное фото фонда</span>
          <div className="df-hero-content">
            <span className="df-hero-eyebrow"><span className="dot" />национальный благотворительный фонд</span>
            <h1>Каждый день <em>на счету</em>.</h1>
            <p>Мы помогаем детям с тяжёлыми диагнозами и их семьям пройти путь лечения не в одиночку — быстро, лично и без лишней бюрократии.</p>
            <div className="df-hero-actions">
              <a href="#donate" className="df-btn df-btn-lg df-btn-white">Помочь сейчас <ArrowRight size={17} /></a>
              <a href="#about" className="df-btn df-btn-lg df-btn-glass">Подробнее о фонде</a>
            </div>
            <div className="df-hero-meta">
              <a href="tel:+70000000000"><Phone size={16} />+7 (000) 000-00-00</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setCallbackOpen(true); }}><MessageCircle size={16} />Обратный звонок</a>
            </div>
          </div>
        </div>
        <div className="df-container">
          <div className="df-stats">
            {STATS.map((s) => (
              <div className="df-stat" key={s.label}>
                <Counter value={s.value} suffix={s.suffix} />
                <div className="df-stat-l">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="df-section" id="about">
        <div className="df-container">
          <Reveal>
            <span className="df-eyebrow">кратко о фонде</span>
            <h2 className="df-h2">Помощь, которая приходит вовремя</h2>
            <p className="df-lead">Фонд создан людьми, которые сами прошли долгий путь лечения близкого человека — и знают, что значит поддержка в самый трудный момент жизни.</p>
          </Reveal>
          <div className="df-about-grid">
            {ABOUT_CARDS.map((c, i) => (
              <Reveal key={c.title} delay={i * 90}>
                <div className="df-card">
                  <div className="df-card-icon"><c.icon size={22} /></div>
                  <h4>{c.title}</h4>
                  <p>{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DONATE */}
      <section className="df-section alt" id="donate">
        <div className="df-container">
          <Reveal>
            <span className="df-eyebrow">как помочь</span>
            <h2 className="df-h2" style={{ marginBottom: 44 }}>Ваш вклад работает уже сегодня</h2>
          </Reveal>
          <div className="df-donate-shell">
            <Reveal>
              <div className="df-donate-card">
                <div className="df-toggle">
                  <button className={donationType === "once" ? "active" : ""} onClick={() => setDonationType("once")}>Разовое пожертвование</button>
                  <button className={donationType === "monthly" ? "active" : ""} onClick={() => setDonationType("monthly")}>Ежемесячная помощь</button>
                </div>

                <div className="df-amounts">
                  {AMOUNTS.map((v) => (
                    <button key={v} className={`df-amount-chip ${amount === v && !customAmount ? "active" : ""}`} onClick={() => selectAmount(v)}>{v.toLocaleString("ru-RU")} ₽</button>
                  ))}
                  <button className={`df-amount-chip ${customAmount ? "active" : ""}`} onClick={() => setCustomAmount(customAmount || " ")}>Своя сумма</button>
                </div>
                {customAmount !== "" && (
                  <input className="df-custom-input" placeholder="Введите сумму, ₽" value={customAmount.trim()} onChange={(e) => setCustomAmount(e.target.value)} />
                )}

                {donationType === "monthly" && (
                  <div className="df-field-row">
                    <div className="df-field"><label>Имя</label><input placeholder="Как к вам обращаться" /></div>
                    <div className="df-field"><label>Телефон</label><input placeholder="+7" /></div>
                  </div>
                )}
                <div className="df-field-row">
                  <div className="df-field"><label>E-mail</label><input placeholder="Для чека" /></div>
                  <div className="df-field"><label>Комментарий</label><input placeholder="Необязательно" /></div>
                </div>

                <button className="df-submit">Перевести {(customAmount ? customAmount.trim() : amount) || ""} ₽ <ArrowRight size={16} /></button>
                <p className="df-fineprint">Вы можете отключить регулярные платежи в любой момент. Нажимая «Перевести», вы соглашаетесь с политикой обработки персональных данных и публичной офертой.</p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="df-donate-side">
                <div className="df-donate-note">
                  <p>«Даже небольшое пожертвование может изменить чью-то жизнь — уже сегодня».</p>
                </div>
                <div className="df-trust-row">
                  <div className="df-trust-chip"><div className="n">96%</div><div className="l">идёт напрямую детям</div></div>
                  <div className="df-trust-chip"><div className="n">24ч</div><div className="l">среднее время реакции</div></div>
                </div>
                <div className="df-card">
                  <div className="df-card-icon"><ShieldCheck size={22} /></div>
                  <h4>Полная прозрачность</h4>
                  <p>Каждый перевод фиксируется в отчётах фонда — вы можете проверить, куда идёт ваша помощь, в разделе «Документы».</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="df-section">
        <div className="df-container">
          <Reveal>
            <span className="df-eyebrow">почему это важно</span>
            <h2 className="df-h2">Почему именно ваш вклад важен</h2>
          </Reveal>
          <div className="df-impact-grid">
            {IMPACT_CARDS.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <div className="df-impact-card">
                  <div className="ic"><c.icon size={20} /></div>
                  <h4>{c.title}</h4>
                  <p>{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section className="df-section alt" id="stories">
        <div className="df-container">
          <Reveal>
            <span className="df-eyebrow">истории помощи</span>
            <h2 className="df-h2">Истории, которые продолжаются благодаря вам</h2>
          </Reveal>
          <div className="df-stories-grid">
            {STORIES.map((s, i) => (
              <Reveal key={s.name} delay={i * 90}>
                <div className="df-story-card">
                  <div className="df-story-media"><span className="tag">{s.tag}</span><Heart size={34} color="#fff" opacity={.5} /></div>
                  <div className="df-story-body">
                    <h4>{s.name}</h4>
                    <p>{s.text}</p>
                    <a href="#" className="df-story-link">Читать историю <ArrowRight size={14} /></a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MOTIVATOR STRIP */}
      <div className="df-motivator">
        <div className="df-container">
          <div className="df-motivator-inner">
            <span className="df-motivator-item">Добро начинается с одного решения</span>
            <span className="df-motivator-item">Ваш вклад помогает уже сегодня</span>
            <span className="df-motivator-item">Спасибо, что дарите надежду</span>
            <span className="df-motivator-item">Каждый рубль — это время рядом с ребёнком</span>
          </div>
        </div>
      </div>

      {/* NEWS */}
      <section className="df-section" id="news">
        <div className="df-container">
          <Reveal>
            <span className="df-eyebrow">новости</span>
            <h2 className="df-h2">Что происходит в фонде</h2>
          </Reveal>
          <div className="df-news-grid">
            {NEWS.map((n, i) => (
              <Reveal key={n.title} delay={i * 70}>
                <a href="#" className="df-news-card">
                  <span className="df-news-cat">{n.cat}</span>
                  <h4>{n.title}</h4>
                  <p>{n.desc}</p>
                  <span className="df-news-date">{n.date}</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="df-section alt" id="partners">
        <div className="df-container">
          <Reveal>
            <span className="df-eyebrow">партнёры</span>
            <h2 className="df-h2">Вместе мы можем больше</h2>
          </Reveal>
          <div className="df-partners-grid">
            {PARTNERS.map((p, i) => (
              <Reveal key={p.name} delay={i * 60}>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="df-partner-card">
                  <span className="name">{p.name}</span>
                  <ExternalLink size={16} />
                </a>
              </Reveal>
            ))}
          </div>
          <p className="df-fineprint" style={{ marginTop: 20 }}>TODO: заменить на реальные названия и ссылки партнёров фонда.</p>
        </div>
      </section>

      {/* DOCUMENTS */}
      <section className="df-section" id="docs">
        <div className="df-container">
          <Reveal>
            <span className="df-eyebrow">официальные документы</span>
            <h2 className="df-h2">Прозрачность и отчётность</h2>
            <p className="df-lead">Все документы фонда доступны для скачивания — это часть нашей ответственности перед вами.</p>
          </Reveal>
          <div className="df-docs-grid">
            {DOCS.map((d, i) => (
              <Reveal key={d.title} delay={i * 60}>
                <a href="#" className="df-doc-card">
                  <div className="df-doc-ic"><FileText size={18} /></div>
                  <div>
                    <div className="t">{d.title}</div>
                    <div className="m">{d.meta}</div>
                  </div>
                  <ArrowUpRight size={16} className="ext" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS / FOOTER */}
      <footer className="df-footer" id="contacts">
        <div className="df-container">
          <div className="df-contacts-grid">
            <div>
              <span className="df-eyebrow" style={{ color: "#9FB4FF" }}>контакты</span>
              <h2 className="df-h2" style={{ color: "#fff", marginBottom: 30 }}>Мы на связи</h2>
              <div className="df-contact-row"><span className="ic"><Phone size={17} /></span><a href="tel:+70000000000">+7 (000) 000-00-00</a></div>
              <div className="df-contact-row"><span className="ic"><Mail size={17} /></span><a href="mailto:info@fond-darya.ru">info@fond-darya.ru</a></div>
              <div className="df-contact-row"><span className="ic"><MapPin size={17} /></span><span>г. Владимир, ул. Примерная, 1 (TODO: адрес)</span></div>
              <button className="df-btn df-btn-primary" style={{ marginTop: 12 }} onClick={() => setCallbackOpen(true)}>Заказать обратный звонок <ChevronRight size={15} /></button>
            </div>
            <div className="df-map">
              <iframe title="map" src="https://www.google.com/maps?q=Vladimir%20Russia&output=embed" loading="lazy" />
            </div>
          </div>

          <div className="df-footer-grid">
            <div>
              <div className="df-logo" style={{ marginBottom: 16 }}>
                <span className="df-logo-mark"><Heart size={18} fill="#fff" /></span>
                <span className="df-logo-text" style={{ color: "#fff" }}>Фонд «Дарья»</span>
              </div>
              <p style={{ color: "#8A8FA6", fontSize: 14, lineHeight: 1.6, maxWidth: 280 }}>Национальный благотворительный фонд помощи детям с тяжёлыми заболеваниями и их семьям.</p>
            </div>
            <div><h5>Информация</h5><ul><li><a href="#about">О фонде</a></li><li><a href="#stories">Истории</a></li><li><a href="#news">Новости</a></li></ul></div>
            <div><h5>Как помочь</h5><ul><li><a href="#donate">Пожертвовать</a></li><li><a href="#docs">Документы</a></li><li><a href="#partners">Партнёры</a></li></ul></div>
            <div><h5>Соцсети</h5><ul><li><a href="#">VKontakte</a></li><li><a href="#">Telegram</a></li><li><a href="#">MAX</a></li></ul></div>
          </div>

          <div className="df-footer-bottom">
            <span>Фонд «Дарья» © 2026. Все права защищены.</span>
            <span>Демо-версия — часть данных требует замены на реальные (см. TODO в коде)</span>
          </div>
        </div>
      </footer>

      {showFloat && (
        <a href="#donate" className="df-float"><Heart size={16} fill="#fff" /> Помочь сейчас</a>
      )}

      {callbackOpen && (
        <div className="df-modal-overlay" onClick={() => setCallbackOpen(false)}>
          <div className="df-modal" onClick={(e) => e.stopPropagation()}>
            <button className="df-modal-close" onClick={() => setCallbackOpen(false)}><X size={16} /></button>
            <h3 className="df-serif" style={{ fontSize: 22, marginTop: 0, marginBottom: 18 }}>Обратный звонок</h3>
            <div className="df-field" style={{ marginBottom: 14 }}><label>Ваше имя</label><input placeholder="Имя" /></div>
            <div className="df-field" style={{ marginBottom: 20 }}><label>Телефон</label><input placeholder="+7" /></div>
            <button className="df-submit">Отправить</button>
          </div>
        </div>
      )}
    </div>
  );
}
