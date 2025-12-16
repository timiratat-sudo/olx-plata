export default function HeadsetIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
     xmlns="http://www.w3.org/2000/svg">

  <path d="M4 12a8 8 0 0 1 16 0"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round" />

  <rect x="3" y="10" width="3" height="6" rx="1.5"
        stroke="currentColor"
        stroke-width="2"
        fill="none" />

  <rect x="18" y="10" width="3" height="6" rx="1.5"
        stroke="currentColor"
        stroke-width="2"
        fill="none" />

  <path d="M17 17a3 3 0 0 1-3 3h-1"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round" />
</svg>

  );
}