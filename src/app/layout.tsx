import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const geistSans = GeistSans; // Using direct import as per latest Geist recommendations
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: 'ResiGuide | Premium Real Estate',
  description: 'Your guide to premium real estate properties and services.',
  keywords: 'real estate, property, luxury homes, resiguide, realtor',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
