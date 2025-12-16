export default function LockIcon({ size = 20}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg">
  <path d="M8 10V7a4 4 0 0 1 8 0v3"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round" />

  <rect x="5" y="10" width="14" height="10" rx="2"
        stroke="currentColor"
        stroke-width="2"
        fill="none" />

  <circle cx="12" cy="15" r="1" fill="currentColor" />
  <path d="M12 16v2"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round" />
</svg>
  );
}