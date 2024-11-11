import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import SpotifyConnectButton from './spotify-connect-button';
import { useSpotify } from '@/contexts/spotifyContext';

const SignInCard = () => {
  const { user } = useSpotify();
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Playlister Beta
        </CardTitle>
        <CardDescription className="text-center">
          Review your playlists for potential DMCA issues
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center">
          Our app analyzes your Spotify playlists to identify songs that might
          be at risk of DMCA takedowns. Protect your content and stay informed
          about potential copyright issues in your music selection.
        </p>
        <div className="flex justify-center">
          <SpotifyConnectButton />
        </div>
        {user && JSON.stringify(user, null, 2)}
      </CardContent>
    </Card>
  );
};

export default SignInCard;
