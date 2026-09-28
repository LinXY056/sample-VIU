import React from 'react';
import { X, Play, Plus, Check, Share2, Star, Clock, Sparkles, Crown } from 'lucide-react';
import { Show, Episode } from '../types';

interface ShowDetailModalProps {
  show: Show | null;
  onClose: () => void;
  onPlayEpisode: (show: Show, episodeNumber?: number) => void;
  onToggleWatchlist: (show: Show) => void;
  isInWatchlist: boolean;
  onShare: (show: Show) => void;
  language: 'EN' | 'ZH';
}

export const ShowDetailModal: React.FC<ShowDetailModalProps> = ({
  show,
  onClose,
  onPlayEpisode,
  onToggleWatchlist,
  isInWatchlist,
  onShare,
  language,
}) => {
  if (!show) return null;

  // Generate fallback episode list if array is sparse
  const episodeList: Episode[] =
    show.episodes.length > 0
      ? show.episodes
      : Array.from({ length: Math.min(show.episodesCount, 16) }, (_, i) => ({
          id: `${show.id}-ep-${i + 1}`,
          episodeNumber: i + 1,
          title: `Episode ${i + 1}`,
          duration: 65,
          thumbnail: show.backdrop || show.poster,
          synopsis: `The journey intensifies as secrets unravel in Episode ${i + 1}.`,
          airDate: `Week ${i + 1}`,
        }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#14141a] border border-white/10 rounded-2xl overflow-y-auto custom-scrollbar shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all hover:scale-105"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Backdrop */}
        <div className="relative aspect-[16/8] md:aspect-[21/9] w-full overflow-hidden bg-black">
          <img
            src={show.backdrop || show.poster}
            alt={show.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-[0.8]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14141a] via-[#14141a]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#14141a] via-transparent to-transparent" />

          {/* Quick Play & Action Overlay on Banner */}
          <div className="absolute bottom-6 left-6 md:left-8 right-6 flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {show.isOriginal && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#ffcc00] text-black">
                    VIU ORIGINAL
                  </span>
                )}
                {show.isVipOnly && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-500 text-black flex items-center gap-1">
                    <Crown className="w-3 h-3 fill-black" /> VIP
                  </span>
                )}
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-white/10 text-white border border-white/20">
                  {show.rating}
                </span>
                <span className="text-xs text-zinc-300 font-semibold">{show.releaseYear}</span>
                <span className="text-xs text-zinc-400 font-medium">
                  {show.episodesCount} Episodes
                </span>
              </div>

              <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
                {show.title}
              </h1>
              {show.koreanTitle && (
                <p className="text-xs md:text-sm text-zinc-400 font-medium">{show.koreanTitle}</p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onPlayEpisode(show, 1)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ffcc00] hover:bg-[#f5b300] text-black font-extrabold text-sm transition-all transform hover:scale-105 shadow-[0_4px_16px_rgba(255,204,0,0.3)]"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>{language === 'EN' ? 'Play Episode 1' : '立即播放第 1 集'}</span>
              </button>

              <button
                onClick={() => onToggleWatchlist(show)}
                className={`p-2.5 rounded-full border text-sm transition-all ${
                  isInWatchlist
                    ? 'bg-[#ffcc00]/20 border-[#ffcc00] text-[#ffcc00]'
                    : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                }`}
                title="Watchlist"
                aria-label="Add to Watchlist"
              >
                {isInWatchlist ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>

              <button
                onClick={() => onShare(show)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all"
                title="Share"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Details Content Body */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Synopsis & Key Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {language === 'EN' ? 'Synopsis' : '劇情簡介'}
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">{show.synopsis}</p>
            </div>

            <div className="space-y-2.5 text-xs border-l border-white/10 pl-0 md:pl-6">
              <div>
                <span className="text-zinc-500 block">Starring:</span>
                <span className="text-zinc-200 font-medium">{show.starring.join(', ')}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Genres:</span>
                <span className="text-zinc-200 font-medium">{show.genres.join(', ')}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Subtitles:</span>
                <span className="text-zinc-200 font-medium">English, Traditional Chinese, Simplified Chinese</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Resolution:</span>
                <span className="text-[#ffcc00] font-semibold">{show.resolution || '1080p Full HD'}</span>
              </div>
            </div>
          </div>

          {/* Episode Rail */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>{language === 'EN' ? 'Episodes' : '分集列表'}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-zinc-300">
                  {show.episodesCount} Total
                </span>
              </h3>
            </div>

            <div className="space-y-3">
              {episodeList.map((ep) => (
                <div
                  key={ep.id}
                  onClick={() => onPlayEpisode(show, ep.episodeNumber)}
                  className="flex items-center justify-between gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-3 md:gap-4 min-w-0">
                    {/* Thumbnail */}
                    <div className="relative w-28 md:w-36 aspect-video rounded-lg overflow-hidden bg-black shrink-0">
                      <img
                        src={ep.thumbnail || show.backdrop}
                        alt={ep.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-6 h-6 fill-[#ffcc00] text-[#ffcc00]" />
                      </div>
                      <span className="absolute bottom-1 right-1 text-[10px] font-mono bg-black/80 px-1.5 py-0.5 rounded text-zinc-300">
                        {ep.duration}m
                      </span>
                    </div>

                    {/* Ep info */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#ffcc00]">
                          Ep {ep.episodeNumber}
                        </span>
                        <h4 className="text-xs md:text-sm font-bold text-white truncate group-hover:text-[#ffcc00] transition-colors">
                          {ep.title}
                        </h4>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                        {ep.synopsis}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <button
                      className="px-3 py-1.5 rounded-full bg-white/10 group-hover:bg-[#ffcc00] group-hover:text-black text-white text-xs font-bold transition-colors flex items-center gap-1"
                      aria-label="Play this episode"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span className="hidden sm:inline">Play</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
