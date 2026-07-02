export default function manifest() {
  return {
    name: 'BizReach',
    short_name: 'BizReach',
    description: 'منصة إدارة حملات الواتساب للأعمال',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#1e3a8a',
    theme_color: '#1d4ed8',
    categories: ['business', 'productivity'],
    icons: [
      {
        src: '/bizreach-icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/bizreach-icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  }
}
