export default function LaundryDrumIcon({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="56" height="56" rx="6"
            stroke={color} strokeWidth="4" fill="none"/>
      <circle cx="32" cy="32" r="16"
              stroke="currentColor" strokeWidth="4" fill="none"/>
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
    </svg>
  );
}