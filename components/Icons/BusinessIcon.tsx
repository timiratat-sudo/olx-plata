export default function BusinessIcon({ size = 22, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="18" />
      <rect x="14" y="8" width="7" height="13" />
      <path d="M6 6h1M6 10h1M17 16h1" />
    </svg>
  );
}
