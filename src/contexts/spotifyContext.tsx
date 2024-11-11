'use client';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { useSearchParams } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type SpotifyContextType = {
  //   spotifyApi: SpotifyApi | null;
  user: any | null;
  login: () => Promise<void>;
  //   logout: () => void;
  getUserPlaylists: () => Promise<any[] | void>;
};

const SpotifyContext = createContext<SpotifyContextType | undefined>(undefined);

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || '';
const REDIRECT_URI = `http://localhost:3000`;
const SCOPES = [
  'user-read-private',
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative',
];

export const SpotifyProvider = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();
  const [sdk, setSdk] = useState<SpotifyApi | null>(null);
  const [user, setUser] = useState<any | null>(null);

  const login = async () => {
    const authResponse = await SpotifyApi.performUserAuthorization(
      CLIENT_ID,
      REDIRECT_URI,
      SCOPES,
      `${REDIRECT_URI}/api/spotify`
    );

    console.log('AUTH', authResponse);
  };

  const getUserPlaylists = async () => {
    if (!sdk) {
      return [];
    }
    try {
      const playlists = await sdk.currentUser.playlists.playlists();

      console.log('PLAY', playlists);
      return playlists.items;
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  const verify = async () => {
    const spotSdk = SpotifyApi.withUserAuthorization(
      CLIENT_ID,
      REDIRECT_URI,
      SCOPES
    );
    await spotSdk.authenticate();

    const user = await spotSdk.currentUser.profile();

    setUser(user);
    setSdk(spotSdk);
  };

  const verifyWithToken = async () => {
    const localToken = localStorage.getItem(
      'spotify-sdk:AuthorizationCodeWithPKCEStrategy:token'
    );
    if (!localToken) {
      setSdk(null);
      setUser(null);
      return;
    }
    const tokeData = JSON.parse(localToken);
    const spotSdk = SpotifyApi.withAccessToken(CLIENT_ID, tokeData);
    const user = await spotSdk.currentUser.profile();

    setUser(user);
    setSdk(spotSdk);
  };

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      verify();
    } else {
      verifyWithToken();
    }
  }, []);

  const value = {
    // spotifyApi,
    user,
    login,
    // logout,
    getUserPlaylists,
  };

  return (
    <SpotifyContext.Provider value={value}>{children}</SpotifyContext.Provider>
  );
};

export const useSpotify = () => {
  const context = useContext(SpotifyContext);
  if (context === undefined) {
    throw new Error('useSpotify must be used within a SpotifyProvider');
  }
  return context;
};
