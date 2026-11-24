// GraduationCapIcon — red circle with white outline graduation cap
// Matches WrestlingSingletIcon style: red circle bg, white stroke, no fill

export default function GraduationCapIcon({ size = 22 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: "#C41E3A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width={size * 0.60}
        height={size * 0.60}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Mortarboard cap top */}
        <polygon points="12 2 22 8.5 12 15 2 8.5 12 2" />
        {/* Left tassel drop */}
        <polyline points="6 11.5 6 17.5 12 21 18 17.5 18 11.5" />
        {/* Tassel cord */}
        <line x1="22" y1="8.5" x2="22" y2="14" />
      </svg>
    </div>
  );
}
