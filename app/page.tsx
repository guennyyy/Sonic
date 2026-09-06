"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Song = {
  id: string;
  title: string;
  artist: string;
  audio: string;
  cover: string;
  duration: string;
  album: string;
};

type Playlist = {
  id: string;
  name: string;
  songIds: string[];
};

const makePath = (folder: "audio" | "covers", filename: string) => {
  const actualFilename =
    folder === "covers" && filename !== "Save Your Tears.jpg"
      ? filename.replace(/\.jpg$/i, ".jpeg")
      : filename;

  return `/${folder}/${encodeURIComponent(actualFilename)}`;
};

const temporaryPlaylistCover = makePath("covers", "Tensionado.jpeg");

const handleCoverError = (event: React.SyntheticEvent<HTMLImageElement>) => {
  const image = event.currentTarget;

  if (image.dataset.jpegFallback !== "true") {
    image.dataset.jpegFallback = "true";
    image.src = image.src.replace(/\.jpg(?:\?.*)?$/i, ".jpeg");
    return;
  }

  image.src = temporaryPlaylistCover;
};

const songs: Song[] = [
  {
    id: "tensionado",
    title: "Tensionado",
    artist: "Soapdish",
    audio: makePath("audio", "Tensionado.mp3"),
    cover: makePath("covers", "Tensionado.jpg"),
    duration: "3:42",
    album: "Tensionado",
  },
  {
    id: "multo",
    title: "Multo",
    artist: "Cup of Joe",
    audio: makePath("audio", "Multo.mp3"),
    cover: makePath("covers", "Multo.jpg"),
    duration: "4:16",
    album: "Multo",
  },
  {
    id: "totoong-tayo",
    title: "Totoong Tayo",
    artist: "Jin DC",
    audio: makePath("audio", "Totoong Tayo.mp3"),
    cover: makePath("covers", "Tototong Tayo.jpeg"),
    duration: "3:28",
    album: "Totoong Tayo",
  },
  {
    id: "lifetime",
    title: "Lifetime",
    artist: "Ben&Ben",
    audio: makePath("audio", "Lifetime.mp3"),
    cover: makePath("covers", "Lifetime.jpg"),
    duration: "3:56",
    album: "Lifetime",
  },
  {
    id: "shot-puno",
    title: "Shot Puno",
    artist: "Juan Karlos Labajo",
    audio: makePath("audio", "Shot Puno.mp3"),
    cover: makePath("covers", "Shot Puno.jpg"),
    duration: "3:21",
    album: "Shot Puno",
  },
  {
    id: "balisong",
    title: "Balisong",
    artist: "Rico Blanco",
    audio: makePath("audio", "Balisong.mp3"),
    cover: makePath("covers", "Balisong.jpg"),
    duration: "4:08",
    album: "Balisong",
  },
  {
    id: "ikot",
    title: "Ikot",
    artist: "Over October",
    audio: makePath("audio", "Ikot.mp3"),
    cover: makePath("covers", "Ikot.jpg"),
    duration: "3:45",
    album: "Ikot",
  },
  {
    id: "aya",
    title: "Aya",
    artist: "Earl Agustin",
    audio: makePath("audio", "Aya.mp3"),
    cover: makePath("covers", "Aya.jpg"),
    duration: "3:30",
    album: "Aya",
  },
  {
    id: "di-nakakasawa",
    title: "Di Nakakasawa",
    artist: "Arthur Nery and Kiyo",
    audio: makePath("audio", "Di Nakakasawa.mp3"),
    cover: makePath("covers", "Di Nakakasawa.jpg"),
    duration: "3:52",
    album: "Di Nakakasawa",
  },
  {
    id: "tibok",
    title: "Tibok",
    artist: "Earl Agustin",
    audio: makePath("audio", "Tibok.mp3"),
    cover: makePath("covers", "Tibok.jpg"),
    duration: "3:40",
    album: "Tibok",
  },
  {
    id: "saturn",
    title: "Saturn",
    artist: "SZA",
    audio: makePath("audio", "Saturn.mp3"),
    cover: makePath("covers", "Saturn.jpg"),
    duration: "3:06",
    album: "Saturn",
  },
  {
    id: "save-your-tears",
    title: "Save Your Tears",
    artist: "The Weeknd",
    audio: makePath("audio", "Save Your Tears.mp3"),
    cover: makePath("covers", "Save Your Tears.jpg"),
    duration: "3:35",
    album: "After Hours",
  },
  {
    id: "body-so-tea",
    title: "Body So Tea",
    artist: "Coco Jones",
    audio: makePath("audio", "Body So Tea.mp3"),
    cover: makePath("covers", "Body So Tea.jpg"),
    duration: "3:24",
    album: "Body So Tea",
  },
  {
    id: "die-for-you",
    title: "Die For You",
    artist: "The Weeknd",
    audio: makePath("audio", "Die For You.mp3"),
    cover: makePath("covers", "Die For You.jpg"),
    duration: "4:20",
    album: "Starboy",
  },
  {
    id: "water",
    title: "Water",
    artist: "Tyla",
    audio: makePath("audio", "Water.mp3"),
    cover: makePath("covers", "Water.jpg"),
    duration: "3:20",
    album: "Water",
  },
  {
    id: "carino-brutal",
    title: "Cariño Brutal",
    artist: "Slapshock",
    audio: makePath("audio", "Cariño Brutal.mp3"),
    cover: makePath("covers", "Cariño Brutal.jpg"),
    duration: "3:47",
    album: "Cariño Brutal",
  },
  {
    id: "doble-kara",
    title: "Doble Kara",
    artist: "Greyhoundz",
    audio: makePath("audio", "Doble Kara.mp3"),
    cover: makePath("covers", "Doble Kara.jpg"),
    duration: "3:38",
    album: "Doble Kara",
  },
  {
    id: "bagsakan",
    title: "Bagsakan",
    artist: "Parokya ni Edgar (feat. Gloc-9 and Francis Magalona)",
    audio: makePath("audio", "Bagsakan.mp3"),
    cover: makePath("covers", "Bagsakan.jpg"),
    duration: "4:01",
    album: "Bagsakan",
  },
  {
    id: "meron-akong-ano",
    title: "Meron Akong Ano",
    artist: "Francis Magalona",
    audio: makePath("audio", "Meron Akong Ano.mp3"),
    cover: makePath("covers", "Meron Akong Ano.jpg"),
    duration: "3:33",
    album: "Meron Akong Ano",
  },
  {
    id: "agent-orange",
    title: "Agent Orange",
    artist: "Slapshock",
    audio: makePath("audio", "Agent Orange.mp3"),
    cover: makePath("covers", "Agent Orange.jpg"),
    duration: "3:49",
    album: "Agent Orange",
  },
  {
    id: "numb",
    title: "Numb",
    artist: "Slapshock",
    audio: makePath("audio", "Numb.mp3"),
    cover: makePath("covers", "Numb.jpg"),
    duration: "3:05",
    album: "Meteora",
  },
  {
    id: "aurora",
    title: "Aurora",
    artist: "TONEEJAY",
    audio: makePath("audio", "Aurora.mp3"),
    cover: makePath("covers", "Aurora.jpg"),
    duration: "3:44",
    album: "Aurora",
  },
  {
    id: "711",
    title: "711",
    artist: "TONEEJAY",
    audio: makePath("audio", "711.mp3"),
    cover: makePath("covers", "711.jpg"),
    duration: "3:27",
    album: "711",
  },
  {
    id: "parang-magic",
    title: "Parang Magic",
    artist: "TONEEJAY",
    audio: makePath("audio", "Parang Magic.mp3"),
    cover: makePath("covers", "Parang Magic.jpg"),
    duration: "3:51",
    album: "Parang Magic",
  },
  {
    id: "bawat-piyesa",
    title: "Bawat Piyesa",
    artist: "TONEEJAY",
    audio: makePath("audio", "Bawat Piyesa.mp3"),
    cover: makePath("covers", "Bawat Piyesa.jpg"),
    duration: "4:02",
    album: "Bawat Piyesa",
  },
  {
    id: "inner-child",
    title: "Inner Child",
    artist: "TONEEJAY",
    audio: makePath("audio", "Inner Child.mp3"),
    cover: makePath("covers", "Inner Child.jpg"),
    duration: "3:29",
    album: "Inner Child",
  },
];

const playlists: Playlist[] = [
  {
    id: "yearner-final-boss",
    name: "yearner final boss",
    songIds: ["tensionado", "multo", "totoong-tayo", "lifetime", "shot-puno"],
  },
  {
    id: "parining",
    name: "parinig gusto, confess ayaw?",
    songIds: ["balisong", "ikot", "aya", "di-nakakasawa", "tibok"],
  },
  {
    id: "rnb-mix",
    name: "R&B Mix",
    songIds: ["saturn", "save-your-tears", "body-so-tea", "die-for-you", "water"],
  },
  {
    id: "kalmado",
    name: "kalmado ako neto ah",
    songIds: [
      "carino-brutal",
      "doble-kara",
      "bagsakan",
      "meron-akong-ano",
      "agent-orange",
      "numb",
    ],
  },
  {
    id: "live-love-toneejay",
    name: "live, love toneejay",
    songIds: ["aurora", "711", "parang-magic", "bawat-piyesa", "inner-child"],
  },
];

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${remaining}`;
};

const durationToSeconds = (duration: string) => {
  const [minutes, seconds] = duration.split(":").map(Number);
  return minutes * 60 + seconds;
};

const formatPlaylistDuration = (playlistSongs: Song[]) => {
  const totalSeconds = playlistSongs.reduce(
    (total, song) => total + durationToSeconds(song.duration),
    0,
  );
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  return hours > 0 ? `${hours} hr ${minutes} min` : `${minutes} min`;
};

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const nowPlayingPanelRef = useRef<HTMLElement | null>(null);

  const [currentSongId, setCurrentSongId] = useState("tensionado");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [search, setSearch] = useState("");
  const [activePlaylistId, setActivePlaylistId] = useState<string | null>(null);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [liked, setLiked] = useState<string[]>([]);
  const [recentlyPlayedIds, setRecentlyPlayedIds] = useState<string[]>([]);
  const [showAllPlaylists, setShowAllPlaylists] = useState(false);
  const [showAllRecent, setShowAllRecent] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [isMobilePlayerOpen, setIsMobilePlayerOpen] = useState(false);

  const currentSong =
    songs.find((song) => song.id === currentSongId) ?? songs[0];

  const filteredSongs = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return songs;

    return songs.filter(
      (song) =>
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query) ||
        song.album.toLowerCase().includes(query),
    );
  }, [search]);

  const activePlaylist = playlists.find(
    (playlist) => playlist.id === activePlaylistId,
  );

  const playlistSongs = activePlaylist
    ? activePlaylist.songIds
        .map((id) => songs.find((song) => song.id === id))
        .filter(Boolean) as Song[]
    : [];

  const favoriteSongs = liked
    .map((songId) => songs.find((song) => song.id === songId))
    .filter(Boolean) as Song[];

  const recentlyPlayedSongs = recentlyPlayedIds
    .map((songId) => songs.find((song) => song.id === songId))
    .filter(Boolean) as Song[];

  const displayedSongs = activePlaylist
    ? playlistSongs
    : search.trim()
      ? filteredSongs
      : favoriteSongs;

  const ensureAudioSource = () => {
    const audio = audioRef.current;
    if (!audio) return null;

    if (!audio.src || !audio.src.endsWith(currentSong.audio)) {
      audio.src = currentSong.audio;
      audio.load();
    }

    return audio;
  };

  const togglePlay = async () => {
    const audio = ensureAudioSource();
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    }
  };

  const playSong = async (song: Song) => {
    setCurrentSongId(song.id);
    setCurrentTime(0);
    setRecentlyPlayedIds((previous) => [
      song.id,
      ...previous.filter((id) => id !== song.id),
    ]);

    if (!audioRef.current) return;

    audioRef.current.src = song.audio;
    audioRef.current.load();
    audioRef.current.currentTime = 0;

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const getCurrentList = () => {
    if (activePlaylist) return playlistSongs;
    return songs;
  };

  const nextSong = async () => {
    const list = getCurrentList();
    if (list.length === 0) return;
    const currentIndex = list.findIndex((song) => song.id === currentSongId);

    let nextIndex;

    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * list.length);
      if (list.length > 1 && nextIndex === currentIndex) {
        nextIndex = (nextIndex + 1) % list.length;
      }
    } else {
      nextIndex = currentIndex + 1;

      if (nextIndex >= list.length) {
        nextIndex = repeat ? 0 : list.length - 1;
      }
    }

    const next = list[nextIndex];
    if (next) await playSong(next);
  };

  const previousSong = async () => {
    const list = getCurrentList();
    const currentIndex = list.findIndex((song) => song.id === currentSongId);
    const previousIndex = currentIndex <= 0 ? list.length - 1 : currentIndex - 1;
    const previous = list[previousIndex];

    if (previous) await playSong(previous);
  };

  const toggleLike = (songId: string) => {
    setLiked((previous) =>
      previous.includes(songId)
        ? previous.filter((id) => id !== songId)
        : [...previous, songId],
    );
  };

  const selectPlaylist = (playlist: Playlist) => {
    setActivePlaylistId(playlist.id);
    setActiveTab(playlist.name);
  };

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    const panel = nowPlayingPanelRef.current;
    if (panel && getComputedStyle(panel).display !== "none") {
      await panel.requestFullscreen();
    } else {
      await document.documentElement.requestFullscreen();
    }
  };

  const openNowPlaying = async () => {
    if (window.matchMedia("(max-width: 980px)").matches) {
      setIsMobilePlayerOpen(true);
      return;
    }

    await toggleFullscreen();
  };

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobilePlayerOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const ended = () => {
      if (repeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        nextSong();
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", ended);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", ended);
    };
  }, [repeat, currentSongId, volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const displayDuration = duration || Number(currentSong.duration.split(":")[0]) * 60;

  return (
    <main className="music-app">
      <audio
        ref={audioRef}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => setIsPlaying(false)}
      />

      <aside className="glass-sidebar">
        <div className="brand">
          <div className="brand-icon">♫</div>
          <span>toneejay</span>
        </div>

        <nav className="main-nav">
          <button
            className={activeTab === "Home" ? "nav-button active" : "nav-button"}
            onClick={() => {
              setActiveTab("Home");
              setActivePlaylistId(null);
            }}
          >
            <span>⌂</span>
            Home
          </button>

          <button
            className={activeTab === "Search" ? "nav-button active" : "nav-button"}
            onClick={() => setActiveTab("Search")}
          >
            <span>⌕</span>
            Search
          </button>

          <button
            className={
              activeTab === "Your Library" ? "nav-button active" : "nav-button"
            }
            onClick={() => setActiveTab("Your Library")}
          >
            <span>▥</span>
            Your Library
          </button>
        </nav>

        <div className="sidebar-divider" />

        <div className="sidebar-label">Your playlists</div>

        <div className="sidebar-playlists">
          {playlists.map((playlist) => {
            const firstSong = songs.find(
              (song) => song.id === playlist.songIds[0],
            );

            return (
              <button
                key={playlist.id}
                className={
                  activePlaylistId === playlist.id
                    ? "sidebar-playlist active"
                    : "sidebar-playlist"
                }
                onClick={() => selectPlaylist(playlist)}
              >
                <img
                  src={firstSong?.cover}
                  alt=""
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
                <span>{playlist.name}</span>
              </button>
            );
          })}
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <div className="sonic-wordmark" aria-label="Sonic">
            <span className="sonic-mark" aria-hidden="true">S</span>
            <span>Sonic</span>
          </div>

          {activePlaylist && (
            <div className="topbar-arrows">
              <button
                aria-label="Back to home"
                onClick={() => {
                  setActivePlaylistId(null);
                  setActiveTab("Home");
                  setSearch("");
                }}
              >
                ←
              </button>
            </div>
          )}

          <div className="search-wrapper">
            <span>⌕</span>
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setActiveTab("Search");
                setActivePlaylistId(null);
              }}
              placeholder="What do you want to play?"
            />
          </div>

          <div className="topbar-actions">
            <button aria-label="Notifications">♧</button>
            <button aria-label="Profile" className="profile-button">
              G
            </button>
          </div>
        </header>

        <div className={activePlaylist ? "page-content playlist-page-content" : "page-content"}>
          {!activePlaylist && <section className="hero-banner">
            <div className="hero-phone" aria-label="Sonic player preview">
              <div className="phone-speaker" />
              <div className="phone-screen">
                <div className="phone-status">
                  <span className="phone-logo" aria-label="Sonic logo">S</span>
                  <span>♫</span>
                </div>
                <img
                  src={currentSong.cover}
                  alt={currentSong.title}
                  onError={handleCoverError}
                />
                <div className="phone-song-info">
                  <strong>{currentSong.title}</strong>
                  <small>{currentSong.artist}</small>
                </div>
                <div className="phone-progress">
                  <span style={{ width: `${Math.min((currentTime / (displayDuration || 1)) * 100, 100)}%` }} />
                </div>
                <div className="phone-controls">
                  <button onClick={previousSong} aria-label="Previous song">◀</button>
                  <button className="phone-play" onClick={togglePlay} aria-label="Play or pause">
                    {isPlaying ? "Ⅱ" : "▶"}
                  </button>
                  <button onClick={nextSong} aria-label="Next song">▶</button>
                </div>
              </div>
            </div>

            <div className="hero-copy">
              <h1>Let the music<br />take you somewhere</h1>
              <p>Your personal soundtrack, always.</p>

              <button
                className="green-button"
                onClick={() => playSong(currentSong)}
              >
                <span>▶</span>
                Play something
              </button>
            </div>
          </section>}

          {activePlaylist ? (
            <section className="playlist-header">
              <img
                src={songs.find((song) => song.id === activePlaylist.songIds[0])?.cover}
                alt={activePlaylist.name}
              />
              <div>
                <span className="playlist-type">Gwen's Playlist</span>
                <h1>{activePlaylist.name}</h1>
                <p className="playlist-meta">
                  <strong>Sonic</strong><span>•</span>
                  <span>{playlistSongs.length} songs</span><span>•</span>
                  <span>{formatPlaylistDuration(playlistSongs)}</span>
                </p>
              </div>
            </section>
          ) : null}

          {activePlaylist ? (
            <div className="playlist-actions">
              <button
                className="playlist-play"
                onClick={() => playlistSongs[0] && playSong(playlistSongs[0])}
                aria-label="Play playlist"
              >
                ▶
              </button>
              <button
                className={isShuffle ? "playlist-action active" : "playlist-action"}
                onClick={() => setIsShuffle(!isShuffle)}
                aria-label="Shuffle playlist"
              >
                ⤨
              </button>
              <button className="playlist-action" aria-label="Favorite playlist">
                ♡
              </button>
              <button className="playlist-action" aria-label="More playlist options">
                ···
              </button>
            </div>
          ) : null}

          {!activePlaylist && <section className="content-section">
            <div className="section-title">
              <h2>{activePlaylist ? "Playlist songs" : "Made for you"}</h2>
              <button onClick={() => setShowAllPlaylists(!showAllPlaylists)}>
                {showAllPlaylists ? "Show less" : "Show all ›"}
              </button>
            </div>

            <div className={showAllPlaylists ? "playlist-cards show-all" : "playlist-cards"}>
              {(activePlaylist ? [activePlaylist] : playlists).map((playlist) => {
                const firstSong = songs.find(
                  (song) => song.id === playlist.songIds[0],
                );

                return (
                  <article
  className="playlist-card"
  key={playlist.id}
  onClick={() => selectPlaylist(playlist)}
>
  <div className="card-cover">
    <div className="playlist-collage">
      {playlist.songIds.slice(0, 4).map((songId) => {
        const song = songs.find((item) => item.id === songId);

        return (
          <img
            key={songId}
            src={song?.cover}
            alt=""
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        );
      })}
    </div>

    <button
      className="card-play"
      onClick={(event) => {
        event.stopPropagation();

        const firstSong = songs.find(
          (song) => song.id === playlist.songIds[0],
        );

        if (firstSong) playSong(firstSong);
      }}
    >
      ▶
    </button>
  </div>

  <h3>{playlist.name}</h3>
  <p>Playlist • Gwen</p>
</article>
                );
              })}
            </div>
          </section>}

          {!activePlaylist && (
            <section className="content-section">
              <div className="section-title">
                <h2>Recently played</h2>
                <button onClick={() => setShowAllRecent(!showAllRecent)}>
                  {showAllRecent ? "Show less" : "Show all ›"}
                </button>
              </div>

              <div className="recent-grid">
                {recentlyPlayedSongs.slice(0, showAllRecent ? recentlyPlayedSongs.length : 4).map((song) => {
                  return (
                    <button
                      className="recent-card"
                      key={song.id}
                      onClick={() => playSong(song)}
                    >
                      <img src={song.cover} alt={song.title} onError={handleCoverError} />
                      <span>
                        <strong>{song.title}</strong>
                        <small>{song.artist}</small>
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          <section className="content-section">
            <div className="section-title">
              <h2>{activePlaylist ? "Songs" : search.trim() ? "Search results" : "Your top songs"}</h2>
              {!activePlaylist && !search.trim() && favoriteSongs.length === 0 ? (
                <span className="section-note">Favorite songs will appear here.</span>
              ) : null}
            </div>

            <div className={activePlaylist ? "song-list playlist-song-list" : "song-list"}>
              <div className="song-list-heading">
                <span>#</span>
                <span>Title</span>
                <span>Artist</span>
                <span>Duration</span>
                <span />
              </div>

              {displayedSongs.map(
                (song, index) => (
                  <div
                    className={
                      currentSongId === song.id
                        ? "song-row selected"
                        : "song-row"
                    }
                    key={song.id}
                    onClick={() => playSong(song)}
                    role="button"
                    tabIndex={0}
                  >
                    <span className="song-number">
                      {currentSongId === song.id && isPlaying ? "♫" : index + 1}
                    </span>

                    <button
                      className="song-main"
                      tabIndex={-1}
                    >
                      <img
                        src={song.cover}
                        alt={song.title}
                        onError={(event) => {
                          event.currentTarget.src = temporaryPlaylistCover;
                        }}
                      />
                      <span>
                        <strong>{song.title}</strong>
                      </span>
                    </button>

                    <span className="song-album">{song.artist}</span>
                    <span className="song-duration">{song.duration}</span>

                    <button
                      className={
                        liked.includes(song.id)
                          ? "heart-button liked"
                          : "heart-button"
                      }
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleLike(song.id);
                      }}
                      aria-label="Like song"
                    >
                      {liked.includes(song.id) ? "♥" : "♡"}
                    </button>
                  </div>
                ),
              )}
            </div>
          </section>
        </div>
      </section>

      <aside
        className={isMobilePlayerOpen ? "now-playing-panel mobile-player-open" : "now-playing-panel"}
        ref={nowPlayingPanelRef}
      >
        <div className="now-playing-title">
          <button
            className="mobile-player-close"
            type="button"
            onClick={() => setIsMobilePlayerOpen(false)}
            aria-label="Close now playing"
          >
            ←
          </button>
          <span>▮▮</span>
          <strong>Now playing</strong>
          <button
            className="fullscreen-button"
            onClick={toggleFullscreen}
            aria-label="Toggle fullscreen player"
          >
            ⛶
          </button>
        </div>

        <img
          className="now-playing-cover"
          src={currentSong.cover}
          alt={currentSong.title}
          onError={(event) => {
            event.currentTarget.src = temporaryPlaylistCover;
          }}
        />

        <div className="now-playing-info">
          <div>
            <h2>{currentSong.title}</h2>
            <p>{currentSong.artist}</p>
          </div>

          <button
            className={liked.includes(currentSong.id) ? "liked" : ""}
            onClick={() => toggleLike(currentSong.id)}
            aria-label="Like current song"
          >
            {liked.includes(currentSong.id) ? "♥" : "♡"}
          </button>
        </div>

        <div className="panel-progress">
          <input
            type="range"
            min="0"
            max={displayDuration || 1}
            value={Math.min(currentTime, displayDuration || 1)}
            onChange={(event) => {
              const nextTime = Number(event.target.value);
              setCurrentTime(nextTime);

              if (audioRef.current) {
                audioRef.current.currentTime = nextTime;
              }
            }}
          />
          <div>
            <span>{formatTime(currentTime)}</span>
            <span>{currentSong.duration}</span>
          </div>
        </div>

        <div className="large-controls">
          <button
            type="button"
            className={isShuffle ? "control-active" : ""}
            onClick={() => setIsShuffle(!isShuffle)}
            aria-label="Shuffle"
          >
            ⤨
          </button>

          <button type="button" onClick={previousSong} aria-label="Previous song">
            ◀
          </button>

          <button type="button" className={isPlaying ? "big-play is-playing" : "big-play"} onClick={togglePlay} aria-label="Play">
            {isPlaying ? "Ⅱ" : "▶"}
          </button>

          <button type="button" onClick={nextSong} aria-label="Next song">
            ▶
          </button>

          <button
            type="button"
            className={repeat ? "control-active" : ""}
            onClick={() => setRepeat(!repeat)}
            aria-label="Repeat"
          >
            ↻
          </button>
        </div>

        <div className="queue-divider" />

        <div className="queue-heading">
          <strong>Queue</strong>
          <span>{getCurrentList().length} songs</span>
        </div>

        <div className="queue-list">
          {getCurrentList()
            .slice(0, 5)
            .map((song, index) => (
              <button
                className={
                  currentSongId === song.id ? "queue-item active" : "queue-item"
                }
                key={song.id}
                onClick={() => playSong(song)}
              >
                <span>{index + 1}</span>
                <img src={song.cover} alt="" />
                <span className="queue-text">
                  <strong>{song.title}</strong>
                  <small>{song.artist}</small>
                </span>
                <small>{song.duration}</small>
              </button>
            ))}
        </div>
      </aside>

      <footer className="bottom-player">
        <div
          className="bottom-song"
          role="button"
          tabIndex={0}
          onClick={(event) => {
            if (!(event.target as HTMLElement).closest("button")) openNowPlaying();
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") openNowPlaying();
          }}
          aria-label="Open now playing"
        >
          <img src={currentSong.cover} alt={currentSong.title} />
          <span>
            <strong>{currentSong.title}</strong>
            <small>{currentSong.artist}</small>
          </span>
          <button
            className={liked.includes(currentSong.id) ? "liked" : ""}
            onClick={() => toggleLike(currentSong.id)}
          >
            {liked.includes(currentSong.id) ? "♥" : "♡"}
          </button>
        </div>

        <div className="bottom-center">
          <div className="bottom-controls">
            <button type="button" onClick={() => setIsShuffle(!isShuffle)} aria-label="Shuffle">⤨</button>
            <button type="button" onClick={previousSong} aria-label="Previous song">◀</button>
            <button type="button" className={isPlaying ? "bottom-play is-playing" : "bottom-play"} onClick={togglePlay} aria-label="Play">
              {isPlaying ? "Ⅱ" : "▶"}
            </button>
            <button type="button" onClick={nextSong} aria-label="Next song">▶</button>
            <button type="button" onClick={() => setRepeat(!repeat)} aria-label="Repeat">↻</button>
          </div>

          <div className="bottom-progress">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={displayDuration || 1}
              value={Math.min(currentTime, displayDuration || 1)}
              onChange={(event) => {
                const nextTime = Number(event.target.value);
                setCurrentTime(nextTime);

                if (audioRef.current) {
                  audioRef.current.currentTime = nextTime;
                }
              }}
            />
            <span>{currentSong.duration}</span>
          </div>
        </div>

        <div className="bottom-volume">
          <button
            type="button"
            className="fullscreen-button mobile-fullscreen-button"
            onClick={openNowPlaying}
            aria-label="Open fullscreen player"
          >
            ⛶
          </button>
          <span>🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
          />
        </div>
      </footer>

      <nav className="mobile-nav">
        <button onClick={() => setActiveTab("Home")}>⌂<span>Home</span></button>
        <button onClick={() => setActiveTab("Search")}>⌕<span>Search</span></button>
        <button onClick={() => setActiveTab("Your Library")}>▥<span>Library</span></button>
      </nav>
    </main>
  );
}
