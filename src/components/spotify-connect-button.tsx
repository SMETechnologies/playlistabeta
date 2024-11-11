'use client';

import { Button } from '@/components/ui/button';
import { useSpotify } from '@/contexts/spotifyContext';
import { Music } from 'lucide-react';

export default function SpotifyConnectButton() {
  const { login } = useSpotify();

  return (
    <Button
      onClick={login}
      className="bg-[#1DB954] hover:bg-[#1ed760] text-white"
    >
      <Music className="mr-2 h-4 w-4" /> Connect to Spotify
    </Button>
  );
}
