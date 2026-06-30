import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 55%, #2563eb 100%)',
        gap: '6px',
      }}
    >
      <span
        style={{
          color: 'white',
          fontSize: 80,
          fontWeight: 900,
          fontFamily: 'sans-serif',
          letterSpacing: '-4px',
          lineHeight: 1,
        }}
      >
        BR
      </span>
      <span
        style={{
          color: 'rgba(255, 255, 255, 0.70)',
          fontSize: 19,
          fontWeight: 500,
          fontFamily: 'sans-serif',
          letterSpacing: '4px',
        }}
      >
        BizReach
      </span>
    </div>,
    { ...size }
  )
}
