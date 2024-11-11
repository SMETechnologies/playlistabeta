import type { Metadata } from 'next';
import './globals.css';

import { Inter } from 'next/font/google';
import { SpotifyProvider } from '@/contexts/spotifyContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Playlister Beta',
  description: 'Review your Spotify playlists',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
          <SpotifyProvider>{children}</SpotifyProvider>
        </div>
      </body>
    </html>
  );
}
