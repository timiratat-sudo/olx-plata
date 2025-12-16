export default function AwardIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
     xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="8" r="5"
          stroke={color}
          stroke-width="2"
          fill="none" />
  <path d="M9 13l-2 7l5-3l5 3l-2-7"
        stroke={color}
        stroke-width="2"
        stroke-linejoin="round"
        fill="none" />
</svg>
  );
}