'use client';
import PlaylistReviewer from '@/components/playlist-reviewer';
import SignInCard from '@/components/sign-in-card';
import { useSpotify } from '@/contexts/spotifyContext';

export default function Home() {
  const { user } = useSpotify();

  if (!user) {
    return <SignInCard />;
  }

  return <PlaylistReviewer />;
}
