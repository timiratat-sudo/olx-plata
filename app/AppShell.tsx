// app/AppShell.tsx
"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import ChatIcon from "@/components/Icons/ChatIcon";
import FavoriteIcon from "@/components/Icons/FavoriteIcon";
import BellIcon from "@/components/Icons/BellIcon";
import ProfileIcon from "@/components/Icons/ProfileIcon";
import BusinessIcon from "@/components/Icons/BusinessIcon";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // все страницы, начинающиеся с /payment – без навбара и футера
  const isPaymentFlow = pathname.startsWith("/payment");
  const wrapperClass = isPaymentFlow ? "no-header-footer" : "";

  return (
  <div className={`app-shell ${wrapperClass}`}>
      {/* ===== TOP BAR ===== */}
      {!isPaymentFlow && (
        <header className="olx-topbar">
          <div className="olx-topbar-inner">
            {/* Лого слева */}
            <div className="olx-logo-wrapper">
              <Image src="/logo.svg" alt="Logo" width={70} height={70} />
            </div>

            {/* Правый блок с иконками */}
            <div className="olx-topbar-right">
              {/* Czat */}
              <button className="olx-topbar-icon">
                <ChatIcon />
                <span>Czat</span>
              </button>

              {/* Ulubione (сердечко без текста) */}
              <button className="olx-topbar-icon">
                <span className="olx-topbar-icon-svg">
                  <FavoriteIcon />
                </span>
              </button>

              {/* Dzwonek (без текста) */}
              <button className="olx-topbar-icon">
                <BellIcon />
              </button>

              {/* Twoje konto */}
              <button className="olx-topbar-icon">
                <ProfileIcon />
                <span>Twoje konto</span>
              </button>

              {/* Большая белая кнопка */}
              <button className="olx-topbar-add">Dodaj ogłoszenie</button>

              {/* Вертикальная линия */}
              <div className="olx-topbar-divider" />

              {/* Dla biznesu */}
              <button className="olx-topbar-icon">
                <BusinessIcon />
                <span>Dla biznesu</span>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* ===== CONTENT ===== */}
      <main className="page-content">
        <div className="olx-page-wrapper">{children}</div>
      </main>

      {/* ===== FOOTER ===== */}
      {!isPaymentFlow && (
        <footer className="olx-footer">
          <div className="olx-footer-grid">
            {/* левая колонка */}
            <ul className="olx-col">
              <li>Aplikacje mobilne OLX.pl</li>
              <li>Pomoc</li>
              <li>Wyróżnione ogłoszenia</li>
              <li>Oferta dla firm</li>
              <li>Blog</li>
              <li>Regulamin</li>
              <li>Polityka prywatności</li>
              <li>Reklama</li>
              <li>Biuro prasowe</li>
              <li>Informacja o realizowanej strategii podatkowej</li>
            </ul>

            {/* правая колонка ссылок */}
            <ul className="olx-col olx-col-bold">
              <li>Zasady bezpieczeństwa</li>
              <li>Mapa kategorii</li>
              <li>Mapa miejscowości</li>
              <li>Mapa ministron</li>
              <li>Popularne wyszukiwania</li>
              <li>Kariera</li>
              <li>Pracodawcy na OLX</li>
              <li>Jak działa OLX.pl</li>
              <li>Cennik</li>
              <li>Zawodowo OLX - serwis o pracy</li>
              <li>Polityka cookies</li>
              <li>Ustawienia plików cookie</li>
            </ul>

            {/* блок приложений */}
            <div className="olx-apps">
              <div className="olx-apps-row">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  width={135}
                  height={40}
                />
                <Image
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store"
                  width={135}
                  height={40}
                />
              </div>
              <p>Darmowa aplikacja na Twój telefon</p>
            </div>
          </div>

          {/* нижние ссылки стран */}
          <div className="olx-footer-countries">
            <span>OLX.bg</span>
            <span>OLX.ro</span>
            <span>OLX.ua</span>
            <span>OLX.pt</span>
            <span>Fixly.pl</span>
            <span>Otodom.pl</span>
            <span>Otomoto.pl</span>
            <span>Obido.pl</span>
          </div>
        </footer>
      )}
    </div>
  );
}
