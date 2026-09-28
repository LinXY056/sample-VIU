import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Crown, Star } from 'lucide-react';
import { Show } from '../types';

interface Top10SectionProps {
  shows: Show[];
  onPlayShow: (show: Show) => void;
  onShowDetails: (show: Show) => void;
  language: 'EN' | 'ZH';
}

export const Top10Section: React.FC<Top10SectionProps> = ({
  shows,
  onPlayShow,
  onShowDetails,
  language,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 md:py-10">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#ffcc00] rounded-full inline-block shadow-[0_0_8px_#ffcc00]" />
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-3">
              <span>{language === 'EN' ? 'Top 10 in Singapore Today' : '今日新加坡 Top 10'}</span>
              <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded bg-white/10 text-zinc-300 border border-white/10 uppercase">
                {language === 'EN' ? 'UPDATED HOURLY' : '每小時更新'}
              </span>
            </h2>
          </div>

          {/* Navigation Chevrons */}
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

        {/* Horizontal Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-6 overflow-x-auto no-scrollbar pb-4 pt-2 -mx-2 px-2 scroll-smooth"
        >
          {shows.map((show, index) => {
            const rank = index + 1;
            return (
              <div
                key={show.id}
                className="relative flex items-end shrink-0 cursor-pointer group"
                onClick={() => onShowDetails(show)}
              >
                {/* Massive Number Rank behind/beside poster */}
                <div className="select-none pointer-events-none -mr-7 -mb-2 z-0">
                  <span
                    className="text-[120px] md:text-[145px] font-black leading-none tracking-tighter text-transparent"
                    style={{
                      WebkitTextStroke: '2px rgba(255, 255, 255, 0.22)',
                      textShadow: '0 8px 24px rgba(0,0,0,0.8)',
                    }}
                  >
                    {rank}
                  </span>
                </div>

                {/* Poster Card */}
                <div className="relative z-10 w-[165px] sm:w-[185px] md:w-[205px] h-[255px] sm:h-[285px] md:h-[315px] rounded-lg overflow-hidden bg-[#18181f] border border-white/5 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_12px_28px_rgba(0,0,0,0.8),0_0_20px_rgba(255,204,0,0.2)]">
                  {/* Poster Image */}
                  <img
                    src={show.poster}
                    alt={show.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 z-20 flex flex-col gap-1">
                    {show.rankBadge && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-black tracking-wider uppercase bg-[#ffcc00] text-black shadow-md">
                        {show.rankBadge === 'VIP' && <Crown className="w-3 h-3 fill-black" />}
                        {show.rankBadge === 'TRENDING #1' && <Star className="w-2.5 h-2.5 fill-black" />}
                        {show.rankBadge}
                      </span>
                    )}
                  </div>

                  {/* Hover Play Button Overlay */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[1px]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayShow(show);
                      }}
                      className="w-12 h-12 rounded-full bg-[#ffcc00] hover:bg-[#f5b300] text-black flex items-center justify-center shadow-lg transform transition-transform hover:scale-110"
                      aria-label={`Play ${show.title}`}
                    >
                      <Play className="w-5 h-5 fill-black ml-0.5" />
                    </button>
                  </div>

                  {/* Bottom Metadata */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 z-20 text-left">
                    <p className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider">
                      {show.latestEpisode || `${show.episodesCount} Episodes`}
                    </p>
                    <h3 className="text-sm font-bold text-white leading-tight truncate group-hover:text-[#ffcc00] transition-colors">
                      {show.title}
                    </h3>
                    <p className="text-[11px] text-zinc-400 mt-0.5 truncate">
                      {show.genres.join(' · ')}
                    </p>
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
