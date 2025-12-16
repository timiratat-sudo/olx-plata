export default function BellIcon({ size = 22, color = "currentColor" }) {
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
      <path d="M18 16V11a6 6 0 0 0-12 0v5l-2 2h16z" />
      <path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2z" />
    </svg>
  );
}