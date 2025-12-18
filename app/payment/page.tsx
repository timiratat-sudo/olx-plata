// app/payment/page.tsx
import Link from "next/link";
import Image from "next/image";
import "../styles/payment.css";

export const metadata = { title: "Wybierz bank" };

const banks1 = [
  {
    slug: "santander",
    name: "Santander",
    logo: "/banks/santander.svg",
  },
  {
    slug: "millennium",
    name: "Bank Millennium",
    logo: "/banks/bank-millennium.svg",
  },
  {
    slug: "pekao",
    name: "Bank Pekao",
    logo: "/banks/bank-pekao.svg",
  },
  {
    slug: "credit-agricole",
    name: "Credit Agricole",
    logo: "/banks/credit-agricole.svg",
  },
  {
    slug: "bnp-paribas",
    name: "BNP Paribas",
    logo: "/banks/bnp-paribas.svg",
  },
  {
    slug: "alior",
    name: "Alior Bank",
    logo: "/banks/alior-bank.svg",
  },
  {
    slug: "velobank",
    name: "VeloBank",
    logo: "/banks/velobank.svg",
  },
  {
    slug: "pko",
    name: "PKO Bank Polski",
    logo: "/banks/pko-bp.svg",
  }
];

const banks = [
  {
    slug: "santander",
    name: "Santander",
    logo: "/banks/santander.svg",
  },
  {
    slug: "millennium",
    name: "Bank Millennium",
    logo: "/banks/bank-millennium.svg",
  },
  {
    slug: "bnp-paribas",
    name: "BNP Paribas",
    logo: "/banks/bnp-paribas.svg",
  },
  {
    slug: "pko",
    name: "PKO Bank Polski",
    logo: "/banks/pko-bp.svg",
  }
];

export default function PaymentPage() {
  return (
    <div className="olx-payment-page">
      <div className="olx-payment-card">
        <h1 className="olx-payment-title">Wybierz swój bank</h1>
        <p className="olx-payment-subtitle">
          Wybierz bank, w którym posiadasz konto, aby kontynuować.
        </p>

        <div className="olx-bank-grid">
          {banks.map((bank) => (
            <Link
              key={bank.slug}
              href={`/payment/${bank.slug}`}
              className="olx-bank-tile"
            >
              <div className="olx-bank-logo-wrap">
                <Image
                  src={bank.logo}
                  alt={bank.name}
                  width={260}
                  height={80}
                  className="olx-bank-logo"
                />
              </div>
            </Link>
          ))}
        </div>

        <p className="olx-payment-note">
          Transakcja jest szyfrowana i zabezpieczona.
        </p>
      </div>
    </div>
  );
}
