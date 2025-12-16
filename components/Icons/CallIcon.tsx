export default function CallIcon({ size = 22, color = "currentColor" }) {
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
      <path d="M7 18c0-4 2.5-7 5-7s5 3 5 7H7z" />
      <path d="M12 11c3 0 6-2.5 6-5.5S15 1 12 1 6 3.5 6 5.5 9 11 12 11z" />
      <path d="M3 19h18" />
      <path d="M10 22a2 2 0 0 0 4 0" />
    </svg>
  );
}