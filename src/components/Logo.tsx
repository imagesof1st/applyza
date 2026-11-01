// ApplyZa Logo — reproduced faithfully from the provided image
// Shape: A-letter mark with an upward-right orange/red arrow accent
// Colors: White letter form (#FFFFFF) + orange-red arrow (#E84320)

interface LogoProps {
  size?: number;
  className?: string;
  showWordmark?: boolean;
}

export function ApplyZaLogo({ size = 40, className = '', showWordmark = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`} style={{ lineHeight: 1 }}>
      {/* Icon mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="ApplyZa logo mark"
        role="img"
      >
        {/* A letter form — white */}
        <path
          d="M12 60 L32 16 L40 16 L52 44"
          stroke="white"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M20 42 L46 42"
          stroke="white"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        />
        {/* Upward-right orange arrow — overlapping the right leg */}
        <path
          d="M40 60 L62 22"
          stroke="#E84320"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        />
        {/* Arrow head pointing up-right */}
        <path
          d="M62 22 L48 24 M62 22 L60 36"
          stroke="#E84320"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      {/* Wordmark */}
      {showWordmark && (
        <span
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: size * 0.5,
            color: '#F5F5F5',
            letterSpacing: '-0.02em',
          }}
        >
          Apply<span style={{ color: '#E84320' }}>Za</span>
        </span>
      )}
    </div>
  );
}
