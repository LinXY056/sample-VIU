import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, MoreVertical, Trash2, Info } from 'lucide-react';
import { Show } from '../types';

interface ContinueWatchingSectionProps {
  shows: Show[];
  onPlayEpisode: (show: Show, episodeNumber?: number) => void;
  onShowDetails: (show: Show) => void;
  onRemoveItem?: (showId: string) => void;
  language: 'EN' | 'ZH';
}

export const ContinueWatchingSection: React.FC<ContinueWatchingSectionProps> = ({
  shows,
  onPlayEpisode,
  onShowDetails,
  onRemoveItem,
  language,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const validShows = shows.filter((s) => s.continueWatching);
  if (validShows.length === 0) return null;

  return (
    <section className="py-6 md:py-8">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#ffcc00] rounded-full inline-block shadow-[0_0_8px_#ffcc00]" />
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              {language === 'EN' ? 'Continue Watching' : '繼續觀看'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-8 h-8 rounded-full bg-[#18181f] hover:bg-[#2a2a35] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
              aria-label="Previous items"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-8 h-8 rounded-full bg-[#18181f] hover:bg-[#2a2a35] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
              aria-label="Next items"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 16:9 Cards Row */}
        <div
          ref={scrollRef}
          className="flex items-start gap-5 overflow-x-auto no-scrollbar pb-3 pt-1 -mx-1 px-1 scroll-smooth"
        >
          {validShows.map((show) => {
            const cw = show.continueWatching!;
            const percent = Math.min(100, Math.round((cw.watchedMinutes / cw.totalMinutes) * 100));

            return (
              <div
                key={show.id}
                className="w-[280px] sm:w-[320px] md:w-[350px] shrink-0 group relative text-left"
              >
                {/* 16:9 Thumbnail Box */}
                <div
                  className="relative aspect-video rounded-lg overflow-hidden bg-[#18181f] border border-white/10 cursor-pointer shadow-md group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.8),0_0_16px_rgba(255,204,0,0.15)] transition-all duration-300 group-hover:scale-[1.02]"
                  onClick={() => onPlayEpisode(show, cw.episodeNumber)}
                >
                  <img
                    src={show.backdrop || show.poster}
                    alt={show.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                  {/* Top Right Remaining Time Pill */}
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[11px] font-semibold bg-black/60 text-zinc-200 border border-white/20 backdrop-blur-md">
                    {cw.leftMinutesText}
                  </span>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                    <div className="w-12 h-12 rounded-full bg-[#ffcc00] text-black flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
                      <Play className="w-5 h-5 fill-black ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20">
                    <div
                      className="h-full bg-[#ffcc00] transition-all duration-300 shadow-[0_0_6px_#ffcc00]"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                {/* Metadata Under Thumbnail */}
                <div className="pt-2.5 flex items-start justify-between gap-2">
                  <div
                    className="min-w-0 cursor-pointer flex-1"
                    onClick={() => onShowDetails(show)}
                  >
                    <p className="text-xs font-semibold text-[#ffcc00] truncate">
                      Ep {cw.episodeNumber} · {cw.episodeTitle}
                    </p>
                    <h3 className="text-sm font-bold text-white leading-snug truncate group-hover:text-[#ffcc00] transition-colors">
                      {show.title}
                    </h3>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      Watched {cw.watchedMinutes}m of {cw.totalMinutes}m
                    </p>
                  </div>

                  {/* 3-dots Menu */}
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuId(activeMenuId === show.id ? null : show.id);
                      }}
                      className="p-1 text-zinc-400 hover:text-white rounded hover:bg-white/10 transition-colors"
                      aria-label="More options"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {activeMenuId === show.id && (
                      <div className="absolute right-0 bottom-full mb-1 w-44 bg-[#1f1f26] border border-white/15 rounded-lg shadow-2xl p-1 z-30 animate-in fade-in zoom-in-95">
                        <button
                          onClick={() => {
                            onPlayEpisode(show, cw.episodeNumber);
                            setActiveMenuId(null);
                          }}
                          className="w-full text-left px-2.5 py-1.5 text-xs text-zinc-200 hover:bg-white/10 rounded flex items-center gap-2"
                        >
                          <Play className="w-3.5 h-3.5 text-[#ffcc00]" />
                          <span>Resume Ep {cw.episodeNumber}</span>
                        </button>
                        <button
                          onClick={() => {
                            onShowDetails(show);
                            setActiveMenuId(null);
                          }}
                          className="w-full text-left px-2.5 py-1.5 text-xs text-zinc-200 hover:bg-white/10 rounded flex items-center gap-2"
                        >
                          <Info className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Show Details</span>
                        </button>
                        {onRemoveItem && (
                          <button
                            onClick={() => {
                              onRemoveItem(show.id);
                              setActiveMenuId(null);
                            }}
                            className="w-full text-left px-2.5 py-1.5 text-xs text-red-400 hover:bg-red-500/10 rounded flex items-center gap-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove from List</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
