/**
 * USMapSilhouette — Accurate continental US map silhouette.
 * The original SVG was served as application/octet-stream, which iOS Safari
 * does not render in an <img>. This PNG preserves the same red silhouette
 * while working consistently in mobile browsers.
 */
export default function USMapSilhouette({ className = "" }: { className?: string }) {
  return (
    <img
      src="/manus-storage/us-map-silhouette_d829c942.png"
      alt="United States map"
      className={className}
    />
  );
}
