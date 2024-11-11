'use client';

import { useState, useEffect } from 'react';
import { Check, ChevronsUpDown, Loader2, Music } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useSpotify } from '@/contexts/spotifyContext';

type Playlist = {
  id: string;
  name: string;
};

type Song = {
  id: string;
  name: string;
  artist: string;
};

export default function PlaylistReviewer() {
  const { getUserPlaylists } = useSpotify();
  const [open, setOpen] = useState(false);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(
    null
  );
  const [reviewedSongs, setReviewedSongs] = useState<Song[]>([]);
  const [isReviewing, setIsReviewing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlaylists = async () => {
      try {
        const fetchedPlaylists = await getUserPlaylists();
        setPlaylists(fetchedPlaylists ?? []);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load playlists. Please try again later.');
        setIsLoading(false);
      }
    };
    loadPlaylists();
  }, []);

  const handleReview = async () => {
    if (selectedPlaylist) {
      setIsReviewing(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setReviewedSongs([
          { id: '1', name: 'Song 1', artist: 'Artist A' },
          { id: '2', name: 'Song 2', artist: 'Artist B' },
          { id: '3', name: 'Song 3', artist: 'Artist C' },
        ]);
      } catch (err) {
        setError('Failed to review playlist. Please try again later.');
      } finally {
        setIsReviewing(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <h3 className="text-xl font-semibold text-red-600">{error}</h3>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">
          Playlist DMCA Checker
        </h2>
        {playlists.length === 0 ? (
          <div className="text-center p-8">
            <Music className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">
              No playlists found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              It looks like you don't have any playlists on your Spotify
              account.
            </p>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[300px] justify-between"
                >
                  {selectedPlaylist
                    ? selectedPlaylist.name
                    : 'Select playlist...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0">
                <Command>
                  <CommandInput placeholder="Search playlist..." />
                  <CommandEmpty>No playlist found.</CommandEmpty>
                  <CommandGroup>
                    {playlists.map((playlist) => (
                      <CommandItem
                        key={playlist.id}
                        onSelect={() => {
                          setSelectedPlaylist(
                            selectedPlaylist?.id === playlist.id
                              ? null
                              : playlist
                          );
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            selectedPlaylist?.id === playlist.id
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {playlist.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <Button
              onClick={handleReview}
              disabled={!selectedPlaylist || isReviewing}
            >
              {isReviewing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Reviewing...
                </>
              ) : (
                'Review'
              )}
            </Button>
          </div>
        )}
      </div>

      {playlists.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Review Results</h3>
          {reviewedSongs.length > 0 ? (
            <ul className="space-y-2">
              {reviewedSongs.map((song) => (
                <li key={song.id} className="bg-gray-100 p-2 rounded">
                  {song.name} - {song.artist}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">
              {selectedPlaylist
                ? "Click 'Review' to check for potential DMCA issues."
                : 'Select a playlist to review for potential DMCA issues.'}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
