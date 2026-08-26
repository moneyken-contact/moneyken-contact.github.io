import type { Metadata } from 'next';
import './globals.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: 'Aurelia Coffee — кофе в движении',
  description: 'Редкие зёрна, точная обжарка и кинематографичный кофейный ритуал.',
  icons: { icon: `${basePath}/favicon.png` },
  openGraph: {
    title: 'Aurelia Coffee — кофе в движении',
    description: 'Редкие зёрна. Точная обжарка. Глубокий вкус.',
    type: 'website',
    locale: 'ru_RU',
    images: [{ url: `${basePath}/og.png`, width: 1680, height: 945, alt: 'Aurelia Coffee — кофе в движении' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aurelia Coffee — кофе в движении',
    description: 'Редкие зёрна. Точная обжарка. Глубокий вкус.',
    images: [`${basePath}/og.png`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <head>
        <link rel="preload" as="image" href={`${basePath}/media/hero-poster.webp`} fetchPriority="high" />
      </head>
      <body>{children}</body>
    </html>
  );
}
