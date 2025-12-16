export default function PaymentLayout({ children }: { children: React.ReactNode }) {
  return (
    <body className="no-header-footer">
      {children}
    </body>
  );
}
