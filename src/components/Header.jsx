"use client";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router";
import Modal from "./Modal";
import { Menu, X, Phone, Heart, ChevronDown } from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const socialRef = useRef(null);

  const closeMobileMenu = () => setMobileOpen(false);

  // Блокировка скролла при открытом меню
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Закрытие соц-дропдауна при клике вне (десктоп)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (socialRef.current && !socialRef.current.contains(event.target)) {
        setSocialOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
    
      <div className="header__top">
        <div className="container header__top-inner">
          <a href="tel:+79001234567" className="header__phone">
            <Phone size={14} /> + (996) 123-45-67
          </a>
          <nav className="header__social">
            <a href="#" aria-label="VK">
              VK
            </a>
            <a href="#" aria-label="Telegram">
              TG
            </a>
          </nav>
        </div>
      </div>

      {/* Основная часть */}
      <div className="header__main">
        <div className="container header__inner">
          <Link to="/" className="logo" onClick={closeMobileMenu}>
            <span className="logo__mark">
           logo
            </span>
            <span className="logo__text">Фонд «Дария»</span>
          </Link>

          {/* Десктопная навигация */}
          <nav className="nav">
            <Link to="/about">О фонде</Link>
            <Link to="/help">Помочь</Link>
            <Link to="/news">Новости</Link>
            <Link to="/partners">Партнёры</Link>
            <Link to="/documents">Документы</Link>
            <Link to="/contacts">Контакты</Link>

            {/* Dropdown "Мы в соц.сетях" */}
            <div
              className={`nav__dropdown ${socialOpen ? "nav__dropdown--open" : ""}`}
              ref={socialRef}
            >
              <button
                className="nav__dropdown-toggle"
                onClick={() => setSocialOpen(!socialOpen)}
                aria-expanded={socialOpen}
                aria-haspopup="true"
              >
                Мы в соц.сетях <ChevronDown size={16} />
              </button>
              <div className="nav__dropdown-menu">
                <a
                  href="https://max.ru/your-channel"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MAX-канал
                </a>
                <a
                  href="https://t.me/yourchannel"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Telegram-канал
                </a>
                <a
                  href="https://vk.com/yourgroup"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Группа Вконтакте
                </a>
              </div>
            </div>
          </nav>

          <div className="header__actions">
            <button
              className="btn btn--outline"
              onClick={() => setCallbackOpen(true)}
            >
              Обратный звонок
            </button>
            <button
              className="burger"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Мобильное меню через Portal */}
      {typeof document !== "undefined" &&
        createPortal(
          <>
            <div
              className={`mobile-menu-overlay ${mobileOpen ? "mobile-menu-overlay--open" : ""}`}
              onClick={closeMobileMenu}
            />
            <aside
              className={`mobile-drawer ${mobileOpen ? "mobile-drawer--open" : ""}`}
            >
              <button
                className="mobile-drawer__close"
                onClick={closeMobileMenu}
                aria-label="Закрыть меню"
              >
                <X />
              </button>
              <nav className="mobile-drawer__nav">
                <Link to="/about" onClick={closeMobileMenu}>
                  О фонде
                </Link>
                <Link to="/help" onClick={closeMobileMenu}>
                  Помочь
                </Link>
                <Link to="/news" onClick={closeMobileMenu}>
                  Новости
                </Link>
                <Link to="/partners" onClick={closeMobileMenu}>
                  Партнёры
                </Link>
                <Link to="/documents" onClick={closeMobileMenu}>
                  Документы
                </Link>
                <Link to="/contacts" onClick={closeMobileMenu}>
                  Контакты
                </Link>
              </nav>

              {/* Соцсети в мобильной панели — всегда видны */}
              <div className="mobile-drawer__socials">
                <span className="mobile-drawer__socials-title">
                  Мы в соц.сетях
                </span>
                <a
                  href="https://max.ru/your-channel"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MAX-канал
                </a>
                <a
                  href="https://t.me/yourchannel"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Telegram-канал
                </a>
                <a
                  href="https://vk.com/yourgroup"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Группа Вконтакте
                </a>
              </div>
            </aside>
          </>,
          document.body
        )}

      <Modal isOpen={callbackOpen} onClose={() => setCallbackOpen(false)} />
    </header>
  );
}