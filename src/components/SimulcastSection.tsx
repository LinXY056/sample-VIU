import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Show } from '../types';

interface SimulcastSectionProps {
  shows: Show[];
  onPlayShow: (show: Show) => void;
  onShowDetails: (show: Show) => void;
  language: 'EN' | 'ZH';
}

export const SimulcastSection: React.FC<SimulcastSectionProps> = ({
  shows,
  onPlayShow,
  onShowDetails,
  language,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-6 md:py-8">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#ffcc00] rounded-full inline-block shadow-[0_0_8px_#ffcc00]" />
            <div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white leading-tight">
                {language === 'EN'
                  ? 'Express Singapore Premiere'
                  : '新加坡極速同步首播'}
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                {language === 'EN'
                  ? 'With official English and Traditional Chinese subtitles'
                  : '提供官方中英雙語字幕 · 韓國同步 8 小時內上線'}
              </p>
            </div>
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
          {shows.map((show) => (
            <div
              key={show.id}
              className="w-[280px] sm:w-[320px] md:w-[350px] shrink-0 group relative text-left cursor-pointer"
              onClick={() => onShowDetails(show)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video rounded-lg overflow-hidden bg-[#18181f] border border-white/10 shadow-md group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.8),0_0_16px_rgba(255,204,0,0.15)] transition-all duration-300 group-hover:scale-[1.02]">
                <img
                  src={show.backdrop || show.poster}
                  alt={show.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {/* Badges on top left */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#ffcc00] text-black shadow-sm">
                    SIMULCAST
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-black/60 text-zinc-200 border border-white/20 backdrop-blur-md">
                    ENG/CHN
                  </span>
                </div>

                {/* Resolution Badge bottom right */}
                <span className="absolute bottom-2.5 right-2.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-black/70 text-zinc-300 border border-white/20">
                  {show.resolution || 'HD'}
                </span>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayShow(show);
                    }}
                    className="w-12 h-12 rounded-full bg-[#ffcc00] text-black flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110"
                    aria-label={`Play ${show.title}`}
                  >
                    <Play className="w-5 h-5 fill-black ml-0.5" />
                  </button>
                </div>
              </div>

              {/* Metadata */}
              <div className="pt-2.5">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="text-[#ffcc00] font-semibold">
                    {show.simulcastSchedule || 'Express Simulcast'}
                  </span>
                  <span className="font-medium text-zinc-300">
                    {show.latestEpisode}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white leading-snug mt-0.5 truncate group-hover:text-[#ffcc00] transition-colors">
                  {show.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5 truncate">
                  {show.starring.slice(0, 2).join(', ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
