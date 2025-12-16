"use client";

const car = {
  title: "Audi A4 B6 2.0 benzyna, dobry stan",
  price: "5 900 zł",
  negotiable: true,
  location: "Piaseczno, mazowieckie",
  addedAt: "Dodane 29 listopada 2025",
  description: `
AUTO.OPG - Najlepsze oferty samochodów!

Możliwość dostawy auta pod dom!

Na sprzedaż Audi A4 B6

Samochód w dobrym stanie, serwisowany na bieżąco. Idealny do codziennego użytku.
Silnik i skrzynia pracuje bez zarzutu, sztywne zawieszenie, do zrobienia drzwi od kierowcy (wgniecenie).
Opłaty są aktualne.
  `.trim(),
  params: [
    { label: "Model", value: "A4 Limousine" },
    { label: "Rok produkcji", value: "2003" },
    { label: "Paliwo", value: "Benzyna" },
    { label: "Typ nadwozia", value: "Sedan" },
    { label: "Przebieg", value: "330 000 km" },
    { label: "Moc", value: "150 KM" },
    { label: "Skrzynia biegów", value: "Manualna" },
    { label: "Napęd", value: "Na przednie koła" },
  ],
  seller: {
    name: "KomisautoOPG",
    since: "Na OLX od grudzień 2024",
    lastOnline: "Ostatnio online dziś o 12:04",
  },
  images: [
    "https://via.placeholder.com/800x500?text=Audi+A4+front",
    "https://via.placeholder.com/800x500?text=Audi+A4+rear",
    "https://via.placeholder.com/800x500?text=Audi+A4+interior",
  ],
};

export default function CarListingCard() {
  return (
    <div className="olx-page">
      <div className="olx-card">
        {/* Левая колонка: фото + описание */}
        <div className="olx-left">
          <div className="olx-gallery-main">
            <img src={car.images[0]} alt={car.title} />
          </div>

          <div className="olx-gallery-thumbs">
            {car.images.map((src, i) => (
              <div key={i} className="olx-thumb">
                <img src={src} alt={`${car.title} ${i + 1}`} />
              </div>
            ))}
          </div>

          <div className="olx-section">
            <h2 className="olx-section-title">Opis</h2>
            <p className="olx-description">
              {car.description.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* Правая колонка: цена, параметры, продавец, контакты */}
        <div className="olx-right">
          <div className="olx-main-info">
            <h1 className="olx-title">{car.title}</h1>
            <div className="olx-price-row">
              <span className="olx-price">{car.price}</span>
              {car.negotiable && (
                <span className="olx-badge-muted">do negocjacji</span>
              )}
            </div>
            <p className="olx-location">{car.location}</p>
            <p className="olx-added">{car.addedAt}</p>
          </div>

          <div className="olx-params-box">
            {car.params.map((p) => (
              <div key={p.label} className="olx-param-item">
                <span className="olx-param-label">{p.label}</span>
                <span className="olx-param-value">{p.value}</span>
              </div>
            ))}
          </div>

          <div className="olx-contact-box">
            <button className="olx-btn-primary">Wyślij wiadomość</button>
            <button className="olx-btn-secondary">Pokaż numer telefonu</button>
          </div>

          <div className="olx-seller-box">
            <div className="olx-seller-avatar">KO</div>
            <div className="olx-seller-info">
              <p className="olx-seller-name">{car.seller.name}</p>
              <p className="olx-seller-meta">{car.seller.since}</p>
              <p className="olx-seller-meta">{car.seller.lastOnline}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
