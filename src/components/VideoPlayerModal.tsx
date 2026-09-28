import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Settings,
  MessageSquare,
  ListVideo,
  SkipForward,
  ChevronRight,
  Crown,
} from 'lucide-react';
import { Show, Episode } from '../types';

interface VideoPlayerModalProps {
  show: Show | null;
  initialEpisodeNumber?: number;
  onClose: () => void;
  language: 'EN' | 'ZH';
  isVip: boolean;
  onOpenVipModal: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  show,
  initialEpisodeNumber = 1,
  onClose,
  language,
  isVip,
  onOpenVipModal,
}) => {
  if (!show) return null;

  const [currentEpNum, setCurrentEpNum] = useState<number>(initialEpisodeNumber);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(38 * 60 + 24); // default ~38:24
  const [totalDurationSec, setTotalDurationSec] = useState<number>(70 * 60);
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [subtitlesLanguage, setSubtitlesLanguage] = useState<string>('English');
  const [audioTrack, setAudioTrack] = useState<string>('Korean (Original)');
  const [quality, setQuality] = useState<string>('1080p Full HD');
  const [showSubtitlesMenu, setShowSubtitlesMenu] = useState<boolean>(false);
  const [showQualityMenu, setShowQualityMenu] = useState<boolean>(false);
  const [showEpisodeDrawer, setShowEpisodeDrawer] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showSkipIntro, setShowSkipIntro] = useState<boolean>(true);

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  // Find current episode object or fallback
  const currentEp: Episode =
    show.episodes.find((e) => e.episodeNumber === currentEpNum) || {
      id: `ep-${currentEpNum}`,
      episodeNumber: currentEpNum,
      title: `Episode ${currentEpNum}`,
      duration: 70,
      thumbnail: show.backdrop,
      synopsis: show.synopsis,
    };

  // Timer simulation for playback
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTimeSec((prev) => {
          if (prev >= totalDurationSec) {
            setIsPlaying(false);
            return totalDurationSec;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalDurationSec]);

  // Hide skip intro after 10 seconds or when clicked
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkipIntro(false);
    }, 12000);
    return () => clearTimeout(timer);
  }, [currentEpNum]);

  // Handle mouse move to auto-hide controls
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying && !showSubtitlesMenu && !showQualityMenu && !showEpisodeDrawer) {
        setShowControls(false);
      }
    }, 3500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = Number(e.target.value);
    setCurrentTimeSec(targetTime);
  };

  const handleSkip = (seconds: number) => {
    setCurrentTimeSec((prev) => Math.max(0, Math.min(totalDurationSec, prev + seconds)));
  };

  const handleNextEpisode = () => {
    const nextEp = currentEpNum + 1;
    if (nextEp <= show.episodesCount) {
      setCurrentEpNum(nextEp);
      setCurrentTimeSec(0);
      setIsPlaying(true);
      setShowSkipIntro(true);
    }
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={playerContainerRef}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-50 bg-black flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Video Content Canvas / Simulation */}
      <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
        <img
          src={currentEp.thumbnail || show.backdrop}
          alt={show.title}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover filter brightness-90 transition-transform duration-700 ${
            isPlaying ? 'scale-105' : 'scale-100'
          }`}
        />
        {/* Subtle cinematic grain & gradient overlay */}
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/30 to-black/80" />

        {/* Dynamic Mock Subtitle Layer */}
        {subtitlesLanguage !== 'Off' && (
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 max-w-2xl px-6 text-center z-10 pointer-events-none">
            <p className="inline-block px-4 py-1.5 rounded bg-black/60 text-white font-semibold text-lg md:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] backdrop-blur-xs">
              {subtitlesLanguage.includes('Chinese')
                ? '「你以為只要藏在黑暗中，正義就永遠找不上你嗎？」'
                : '"Do you truly believe you can hide inside the shadows forever?"'}
            </p>
          </div>
        )}

        {/* Center Pause/Play Indicator */}
        {!isPlaying && (
          <div
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer z-10"
          >
            <div className="w-20 h-20 rounded-full bg-[#ffcc00] hover:bg-[#f5b300] text-black flex items-center justify-center shadow-2xl transform transition-transform hover:scale-110">
              <Play className="w-10 h-10 fill-black ml-1.5" />
            </div>
          </div>
        )}
      </div>

      {/* Top Header Bar */}
      <div
        className={`relative z-20 w-full p-4 md:p-6 bg-gradient-to-b from-black/90 via-black/50 to-transparent flex items-center justify-between transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
            title="Exit Player"
            aria-label="Exit Player"
          >
            <X className="w-6 h-6" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#ffcc00] text-black">
                {show.resolution || '4K UHD'}
              </span>
              <span className="text-xs font-semibold text-zinc-300">
                Ep {currentEpNum} · {currentEp.title}
              </span>
            </div>
            <h2 className="text-base md:text-xl font-extrabold text-white mt-0.5">
              {show.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isVip && (
            <button
              onClick={onOpenVipModal}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffcc00] hover:bg-[#f5b300] text-black text-xs font-bold shadow-md"
            >
              <Crown className="w-3.5 h-3.5 fill-black" />
              <span>Unlock 4K & Dolby</span>
            </button>
          )}

          <button
            onClick={() => setShowEpisodeDrawer(!showEpisodeDrawer)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md transition-colors"
          >
            <ListVideo className="w-4 h-4 text-[#ffcc00]" />
            <span className="hidden sm:inline">Episodes</span>
          </button>
        </div>
      </div>

      {/* Floating Skip Intro Button */}
      {showSkipIntro && (
        <div className="absolute bottom-28 right-8 z-30 animate-in fade-in">
          <button
            onClick={() => {
              handleSkip(85);
              setShowSkipIntro(false);
            }}
            className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-xs md:text-sm backdrop-blur-md border border-white/20 flex items-center gap-1.5 shadow-xl transition-transform hover:scale-105"
          >
            <span>Skip Intro</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Bottom Controls Bar */}
      <div
        className={`relative z-20 w-full p-4 md:p-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Scrub Bar */}
        <div className="w-full mb-3 flex items-center gap-3 group">
          <span className="text-xs font-mono text-zinc-300 w-12 text-right tabular-nums">
            {formatTime(currentTimeSec)}
          </span>
          <div className="relative flex-1 flex items-center">
            <input
              type="range"
              min="0"
              max={totalDurationSec}
              value={currentTimeSec}
              onChange={handleSeek}
              className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#ffcc00] focus:outline-none"
            />
            {/* Active filled track */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-[#ffcc00] rounded-l-lg pointer-events-none"
              style={{ width: `${(currentTimeSec / totalDurationSec) * 100}%` }}
            />
          </div>
          <span className="text-xs font-mono text-zinc-400 w-12 tabular-nums">
            {formatTime(totalDurationSec)}
          </span>
        </div>

        {/* Primary Controls */}
        <div className="flex items-center justify-between">
          {/* Left Buttons: Play/Pause, Rewind, Fast Forward, Volume */}
          <div className="flex items-center gap-3 md:gap-5">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-[#ffcc00] hover:bg-[#f5b300] text-black flex items-center justify-center transition-transform active:scale-95 shadow-md"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black ml-0.5" />}
            </button>

            <button
              onClick={() => handleSkip(-10)}
              className="p-2 text-zinc-300 hover:text-white transition-colors"
              title="Rewind 10 seconds"
              aria-label="Rewind 10 seconds"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={() => handleSkip(10)}
              className="p-2 text-zinc-300 hover:text-white transition-colors"
              title="Forward 10 seconds"
              aria-label="Forward 10 seconds"
            >
              <RotateCw className="w-5 h-5" />
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 text-zinc-300 hover:text-white transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  setIsMuted(false);
                }}
                className="w-16 md:w-20 h-1 bg-white/20 rounded accent-[#ffcc00] cursor-pointer"
              />
            </div>
          </div>

          {/* Right Buttons: Subtitles, Quality, Next Ep, Fullscreen */}
          <div className="flex items-center gap-2 md:gap-4 relative">
            {/* Subtitles Popover */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowSubtitlesMenu(!showSubtitlesMenu);
                  setShowQualityMenu(false);
                }}
                className={`p-2 rounded-full transition-colors ${
                  subtitlesLanguage !== 'Off' ? 'text-[#ffcc00] bg-white/10' : 'text-zinc-300 hover:text-white'
                }`}
                title="Subtitles & Audio"
                aria-label="Subtitles and Audio"
              >
                <MessageSquare className="w-5 h-5" />
              </button>

              {showSubtitlesMenu && (
                <div className="absolute right-0 bottom-full mb-3 w-56 bg-[#18181f] border border-white/15 rounded-xl shadow-2xl p-3 z-40 text-left text-xs">
                  <p className="font-bold text-white mb-2 pb-1 border-b border-white/10">Subtitles</p>
                  <div className="space-y-1 mb-3">
                    {['English', 'Traditional Chinese (繁體中文)', 'Simplified Chinese (简体中文)', 'Off'].map(
                      (lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            setSubtitlesLanguage(lang);
                            setShowSubtitlesMenu(false);
                          }}
                          className={`w-full text-left px-2 py-1.5 rounded transition-colors ${
                            subtitlesLanguage === lang
                              ? 'bg-[#ffcc00] text-black font-bold'
                              : 'text-zinc-300 hover:bg-white/10'
                          }`}
                        >
                          {lang}
                        </button>
                      ),
                    )}
                  </div>

                  <p className="font-bold text-white mb-2 pb-1 border-b border-white/10">Audio Track</p>
                  <div className="space-y-1">
                    {['Korean (Original)', 'Mandarin Dubbed'].map((track) => (
                      <button
                        key={track}
                        onClick={() => {
                          setAudioTrack(track);
                          setShowSubtitlesMenu(false);
                        }}
                        className={`w-full text-left px-2 py-1.5 rounded transition-colors ${
                          audioTrack === track
                            ? 'bg-[#ffcc00] text-black font-bold'
                            : 'text-zinc-300 hover:bg-white/10'
                        }`}
                      >
                        {track}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quality Popover */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowQualityMenu(!showQualityMenu);
                  setShowSubtitlesMenu(false);
                }}
                className="p-2 text-zinc-300 hover:text-white transition-colors"
                title="Streaming Quality"
                aria-label="Streaming Quality"
              >
                <Settings className="w-5 h-5" />
              </button>

              {showQualityMenu && (
                <div className="absolute right-0 bottom-full mb-3 w-48 bg-[#18181f] border border-white/15 rounded-xl shadow-2xl p-3 z-40 text-left text-xs">
                  <p className="font-bold text-white mb-2 pb-1 border-b border-white/10">Resolution</p>
                  <div className="space-y-1">
                    {['4K Ultra HD', '1080p Full HD', '720p HD', 'Auto (Adaptive)'].map((q) => (
                      <button
                        key={q}
                        onClick={() => {
                          setQuality(q);
                          setShowQualityMenu(false);
                        }}
                        className={`w-full text-left px-2 py-1.5 rounded transition-colors ${
                          quality === q ? 'bg-[#ffcc00] text-black font-bold' : 'text-zinc-300 hover:bg-white/10'
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Next Episode Button */}
            {currentEpNum < show.episodesCount && (
              <button
                onClick={handleNextEpisode}
                className="p-2 text-zinc-300 hover:text-white transition-colors"
                title="Next Episode"
                aria-label="Next Episode"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            )}

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-2 text-zinc-300 hover:text-white transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              aria-label="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Episode List Side Drawer */}
      {showEpisodeDrawer && (
        <div className="absolute top-0 right-0 bottom-0 w-80 md:w-96 bg-[#131318]/95 backdrop-blur-xl border-l border-white/10 z-40 flex flex-col p-4 animate-in slide-in-from-right">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="font-bold text-white text-sm">Episodes ({show.episodesCount})</h3>
            <button
              onClick={() => setShowEpisodeDrawer(false)}
              className="p-1 text-zinc-400 hover:text-white"
              aria-label="Close episode drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2.5 mt-3 pr-1">
            {show.episodes.map((ep) => {
              const isCurrent = ep.episodeNumber === currentEpNum;
              return (
                <div
                  key={ep.id}
                  onClick={() => {
                    setCurrentEpNum(ep.episodeNumber);
                    setCurrentTimeSec(0);
                    setIsPlaying(true);
                    setShowEpisodeDrawer(false);
                  }}
                  className={`flex gap-3 p-2 rounded-lg cursor-pointer transition-all ${
                    isCurrent ? 'bg-[#ffcc00]/20 border border-[#ffcc00]/50' : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="relative w-24 aspect-video rounded overflow-hidden bg-black shrink-0">
                    <img
                      src={ep.thumbnail || show.backdrop}
                      alt={ep.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0.5 right-1 text-[9px] bg-black/70 px-1 rounded text-zinc-200">
                      {ep.duration}m
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className={`text-xs font-bold truncate ${isCurrent ? 'text-[#ffcc00]' : 'text-white'}`}>
                      Ep {ep.episodeNumber} · {ep.title}
                    </p>
                    <p className="text-[11px] text-zinc-400 line-clamp-2 mt-0.5">{ep.synopsis}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
