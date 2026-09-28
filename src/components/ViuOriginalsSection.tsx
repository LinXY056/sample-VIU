import React, { useRef } from 'react';
import { ChevronRight, Play, Crown } from 'lucide-react';
import { Show } from '../types';

interface ViuOriginalsSectionProps {
  shows: Show[];
  onPlayShow: (show: Show) => void;
  onShowDetails: (show: Show) => void;
  language: 'EN' | 'ZH';
}

export const ViuOriginalsSection: React.FC<ViuOriginalsSectionProps> = ({
  shows,
  onPlayShow,
  onShowDetails,
  language,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-6 md:py-8">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#ffcc00] rounded-full inline-block shadow-[0_0_8px_#ffcc00]" />
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              {language === 'EN' ? 'Viu Originals & Exclusives' : 'Viu 原創及獨家劇集'}
            </h2>
          </div>

          <button
            onClick={() => onShowDetails(shows[0])}
            className="flex items-center gap-1 text-xs md:text-sm font-bold text-[#ffcc00] hover:text-[#f5b300] transition-colors"
          >
            <span>{language === 'EN' ? 'View All' : '查看全部'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 2:3 Vertical Posters Grid / Scroll */}
        <div
          ref={scrollRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5"
        >
          {shows.map((show) => (
            <div
              key={show.id}
              className="group cursor-pointer text-left"
              onClick={() => onShowDetails(show)}
            >
              {/* 2:3 Aspect Ratio Card */}
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-[#18181f] border border-white/10 shadow-md group-hover:shadow-[0_12px_28px_rgba(0,0,0,0.8),0_0_20px_rgba(255,204,0,0.2)] transition-all duration-300 group-hover:scale-105">
                <img
                  src={show.poster}
                  alt={show.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
                  {show.isVipOnly ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 to-[#ffcc00] text-black shadow-sm">
                      <Crown className="w-2.5 h-2.5 fill-black" />
                      VIP EXCLUSIVE
                    </span>
                  ) : show.isExclusive ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-blue-600 text-white shadow-sm">
                      EXCLUSIVE
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#ffcc00] text-black shadow-sm">
                      ORIGINAL
                    </span>
                  )}
                </div>

                {/* Hover Play Button */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[1px]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayShow(show);
                    }}
                    className="w-11 h-11 rounded-full bg-[#ffcc00] text-black flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110"
                    aria-label={`Play ${show.title}`}
                  >
                    <Play className="w-4 h-4 fill-black ml-0.5" />
                  </button>
                </div>

                {/* Card Bottom Meta */}
                <div className="absolute bottom-0 left-0 right-0 p-2.5 z-20">
                  <span className="text-[10px] font-semibold text-zinc-300 block">
                    {show.latestEpisode || `${show.episodesCount} Episodes`}
                  </span>
                  <h3 className="text-xs md:text-sm font-bold text-white leading-tight truncate group-hover:text-[#ffcc00] transition-colors mt-0.5">
                    {show.title}
                  </h3>
                </div>
              </div>

              {/* Subtitle / Cast */}
              <div className="pt-2">
                <p className="text-[11px] text-zinc-400 truncate">
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
